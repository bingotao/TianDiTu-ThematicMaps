using alatas.GeoJSON4EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib
{
    public class EntityUtils
    {
        public static string GetPrimaryKey<T>(string json, out T entity) where T : class
        {
            entity = Newtonsoft.Json.JsonConvert.DeserializeObject<T>(json);
            Type t = entity.GetType();
            var prop = t.GetProperties().Where(p => p.GetCustomAttributes(typeof(KeyAttribute), false).Length > 0).FirstOrDefault();

            if (prop != null)
            {
                return prop.GetValue(entity).ToString();
            }
            return null;
        }

        public static T UpdateEntityByJson<T>(string json, T entity) where T : class
        {
            Type t = entity.GetType();
            var props = t.GetProperties();
            Dictionary<string, object> obj = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, object>>(json);

            foreach (var p in props)
            {
                var name = p.Name;
                var type = p.PropertyType.FullName;

                if (obj.ContainsKey(name))
                {
                    var value = obj[name];

                    if (type == "System.String" && value != null)
                    {
                        p.SetValue(entity, value.ToString());
                    }
                    else if (type.Contains("System.DateTime"))
                    {
                        DateTime dTime = DateTime.Now;
                        if (DateTime.TryParse(value.ToString(), out dTime))
                        {
                            p.SetValue(entity, dTime);
                        }
                    }
                    else if (type.Contains("System.Double"))
                    {
                        double dValue = 0.0d;
                        if (Double.TryParse(value.ToString(), out dValue))
                        {
                            p.SetValue(entity, dValue);
                        }
                    }
                    else if (type.Contains("System.Int32"))
                    {
                        int iValue = 0;
                        if (Int32.TryParse(value.ToString(), out iValue))
                        {
                            p.SetValue(entity, iValue);
                        }
                    }
                }
            }
            return entity;
        }

        public static FeatureCollection EntitiesToFeatureCollection<T>(
            IEnumerable<T> entities,
            string geographyField = null
            )
        {
            List<Feature> fts = new List<Feature>();

            foreach (var entity in entities)
            {
                var ft = EntityToFeature(entity, geographyField);
                fts.Add(ft);
            }
            FeatureCollection ftCol = new FeatureCollection() { Features = fts };
            return ftCol;
        }

        public static Feature EntityToFeature<T>(T entity, string geographyField = null)
        {
            PropertyInfo geoProperty = null;
            if (string.IsNullOrEmpty(geographyField))
            {
                geoProperty = entity.GetType().GetProperties().Where(p => p.PropertyType.Equals(typeof(DbGeography)) || p.PropertyType.Equals(typeof(DbGeometry))).FirstOrDefault();
            }
            else
            {
                geoProperty = entity.GetType().GetProperty(geographyField);
            }
            if (geoProperty == null)
            {
                throw new Exception("当前实体不包含任何DbGegraphy属性");
            }
            geographyField = geoProperty.Name;
            Feature feature = null;
            if (geoProperty.PropertyType.Equals(typeof(DbGeography)))
            {
                DbGeography geography = geoProperty.GetValue(entity) as DbGeography;
                feature = new Feature(geography);
            }
            else if (geoProperty.PropertyType.Equals(typeof(DbGeometry)))
            {
                DbGeometry geometry = geoProperty.GetValue(entity) as DbGeometry;
                feature = new Feature(geometry);
            }
            else if (geoProperty.PropertyType.Equals(typeof(string)))
            {
                string wkt = geoProperty.GetValue(entity) as string;
                feature = new Feature(wkt);
            }
            else
            {
                return null;
            }

            var propertyInfos = entity.GetType().GetProperties();
            var properties = EntityUtils.EntityToDictionary(entity, propertyInfos);
            properties.Remove(geographyField);
            feature.Properties = properties;
            return feature;
        }

        public static Dictionary<string, object> EntityToDictionary<T>(T entity)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            foreach (PropertyInfo pInfo in entity.GetType().GetProperties())
            {
                dict.Add(pInfo.Name, pInfo.GetValue(entity));
            }
            return dict;
        }

        public static Dictionary<string, object> EntityToDictionary<T>(T entity, PropertyInfo[] propertyInfos)
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            foreach (PropertyInfo pInfo in propertyInfos)
            {
                dict.Add(pInfo.Name, pInfo.GetValue(entity));
            }
            return dict;
        }

        public static Dictionary<string, object> DataRowToDictionary(DataRow dataRow)
        {
            return DataRowToDictionary(dataRow, dataRow.Table.Columns);
        }

        public static Dictionary<string, object> DataRowToDictionary(DataRow dataRow, DataColumnCollection dataColumns)
        {
            Dictionary<string, object> dic = new Dictionary<string, object>();

            foreach (DataColumn dc in dataColumns)
            {
                var oValue = dataRow[dc];
                dic[dc.ColumnName] = oValue;
            }
            return dic;
        }

        public static T DataRowToEntity<T>(DataRow dataRow, PropertyInfo[] props = null) where T : new()
        {
            T entity = default(T);
            if (dataRow == null) return entity; else entity = new T();
            props = props == null ? typeof(T).GetProperties() : props;
            var columns = dataRow.Table.Columns;
            foreach (var prop in props)
            {
                var column = columns[prop.Name];
                if (column != null)
                {
                    var value = dataRow[column];
                    if (value != DBNull.Value)
                    {
                        prop.SetValue(entity, Convert.ChangeType(value, prop.PropertyType));
                    }
                }
            }
            return entity;
        }


        public static List<T> DataTableToEntities<T>(DataTable dataTable, PropertyInfo[] props = null) where T : new()
        {
            List<T> list = new List<T>();
            if (dataTable == null) return list;
            var rows = dataTable.Rows;
            props = props == null ? typeof(T).GetProperties() : props;
            foreach (DataRow row in rows)
            {
                var entity = DataRowToEntity<T>(row, props);
                list.Add(entity);
            }
            return list;
        }

        public static Dictionary<string, string> GetFieldsAlias<T, A>(string propName) where A : class
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();

            Type t = typeof(T);
            Type a = typeof(A);
            PropertyInfo prop = a.GetProperty(propName);

            var attrs = from p in t.GetProperties().Where(p => p.GetCustomAttribute(a, false) != null)
                        select new
                        {
                            Name = p.Name,
                            Alias = prop.GetValue(p.GetCustomAttribute(a, false)).ToString()
                        };
            foreach (var attr in attrs)
            {
                dic[attr.Name] = attr.Alias;
            }
            return dic;
        }

        public static Dictionary<string, string> GetFieldsAlias<T>()
        {
            return GetFieldsAlias<T, DisplayAttribute>("Name");
        }
    }
}
