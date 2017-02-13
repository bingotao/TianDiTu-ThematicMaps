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


            var layers = LayerUtils.GetSchoolAreaLayers();

        }
    }
}
