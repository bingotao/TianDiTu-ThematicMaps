using alatas.GeoJSON4EntityFramework;
using JXGIS.Common.BaseLib;
using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.TianDiTuThematicMaps.Business
{
    public class LayerUtils
    {
        public static List<Layer> GetSchoolLayers()
        {
            var schools = SystemUtils.SQLEFDbContext.EduSchool.ToList();

            var schoolLayer = from s in schools
                              group s by s.SType into g
                              select new Layer
                              {
                                  Type = g.Key,
                                  Features = EntityUtils.EntitiesToFeatureCollection(g)
                              };
            return schoolLayer.ToList();
        }

        public static List<Layer> GetSchoolLayers2()
        {
            string sql = "select ID,Name,ShortName,SchoolType,County,Street,Address,Postcode,Telephone,ComplaintsHotline,Website,Email,SchoolNature,SchoolDistrict,WorkTime,Abstract,X Lng,Y Lat,SType,SchoolID,ST_AsText(Geometry) Geometry from edu_school";
            var dt = SystemUtils.MySQLComDbContext.GetDataTable(sql, CommandType.Text);
            var schools = EntityUtils.DataTableToEntities<EduSchool2>(dt);
            var schoolLayer = from s in schools
                              group s by s.SType into g
                              select new Layer
                              {
                                  Type = g.Key,
                                  Features = EntityUtils.EntitiesToFeatureCollection(g, "Geometry")
                              };
            return schoolLayer.ToList();
        }

        public static List<Layer> GetSchoolAreaLayers()
        {
            var schoolAreas = SystemUtils.SQLEFDbContext.EduSchoolArea.ToList();
            var layers = (from sa in schoolAreas
                          group sa by sa.SType into g
                          select new Layer
                          {
                              Type = g.Key,
                              Features = EntityUtils.EntitiesToFeatureCollection(g)
                          }).ToList();
            return layers;
        }

        public static List<Layer> GetSchoolAreaLayers2()
        {
            var sql = "select ID,Name,Area,Districts,SType,SchoolID,Name2,ST_AsText(Geometry) Geometry from edu_schoolarea";
            var dt = SystemUtils.MySQLComDbContext.GetDataTable(sql, CommandType.Text);
            var schoolAreas = EntityUtils.DataTableToEntities<EduSchoolArea2>(dt);
            var layers = (from sa in schoolAreas
                          group sa by sa.SType into g
                          select new Layer
                          {
                              Type = g.Key,
                              Features = EntityUtils.EntitiesToFeatureCollection(g, "Geometry")
                          }).ToList();
            return layers;
        }
    }
}
