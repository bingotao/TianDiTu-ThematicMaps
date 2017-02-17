using JXGIS.Common.BaseLib;
using JXGIS.TianDiTuThematicMaps.Business;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using alatas.GeoJSON4EntityFramework;

namespace JXGIS.Common.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            //var s = LayerUtility.GetSchoolLayers();
            //var ss = Newtonsoft.Json.JsonConvert.SerializeObject(s);
            //SchoolSearchUtils.GetSchools("小学", "all", 1, 10);

            //var s = SystemUtils.EFDbContext.EduSchoolArea.First();
            //var a = Newtonsoft.Json.JsonConvert.SerializeObject(s);

            //var polygon = GeoJsonGeometry.FromDbGeography(s.Geometry);
            //a = polygon.Serialize(true);


            //var layers = LayerUtils.GetSchoolAreaLayers();
            //var s = POIUtils.GetPOI(new POICondition() { Key = "小区", Type = "100202", PageIndex = 1, PageStep = 20 });
            //var g = System.Data.Entity.Spatial.DbGeography.FromText(string.Format("POINT({0} {1})", 120.729934294, 30.73954));

            //var point = System.Data.Entity.Spatial.DbGeography.FromText(string.Format("POINT({0} {1})", 120.729934294, 30.73954));
            //var schoolAreas =
            //    (from sa in SystemUtils.EFDbContext.EduSchoolArea
            //     select sa).ToList();

            //var fts = EntityUtils.EntitiesToFeatureCollection(schoolAreas);
            //var s = Newtonsoft.Json.JsonConvert.SerializeObject(fts);
        }
    }
}
