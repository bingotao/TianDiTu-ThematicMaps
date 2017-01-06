using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib.Utilities
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
    }
}
