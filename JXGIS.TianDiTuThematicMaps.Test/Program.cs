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
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Spatial;
using System.Data.SqlClient;

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

            //var s = SystemUtils.MySQLEFDbContext.Test.ToList();

            //var a = EntityUtils.EntityToFeature(s[0]);



            //using (MySql.Data.MySqlClient.MySqlDataAdapter sda = new MySql.Data.MySqlClient.MySqlDataAdapter())
            //{
            //    MySql.Data.MySqlClient.MySqlParameter pLng = new MySql.Data.MySqlClient.MySqlParameter("@lng", 120.771042);
            //    MySql.Data.MySqlClient.MySqlParameter pLat = new MySql.Data.MySqlClient.MySqlParameter("@lat", 30.740626);

            //    MySql.Data.MySqlClient.MySqlCommand cmd = new MySql.Data.MySqlClient.MySqlCommand("select_schoolarea", new MySql.Data.MySqlClient.MySqlConnection(SystemUtils.Config.MySQLDbConStr.ToString()));

            //    cmd.CommandType = CommandType.StoredProcedure;

            //    cmd.Parameters.Add(pLng);
            //    cmd.Parameters.Add(pLat);

            //    sda.SelectCommand = cmd;
            //    DataTable dt = new DataTable();
            //    sda.Fill(dt);


            //    var dic = EntityUtils.DataRowToDictionary(dt.Rows[0]);

            //    var geo = DbGeography.FromBinary(dic["Geometry"] as byte[]);
            //}
            MySql.Data.MySqlClient.MySqlParameter pLng = new MySql.Data.MySqlClient.MySqlParameter("@lng", 120.771042);
            MySql.Data.MySqlClient.MySqlParameter pLat = new MySql.Data.MySqlClient.MySqlParameter("@lat", 30.740626);

            var dataTable = SystemUtils.MySQLComDbContext.GetDataTable("select_schoolarea", CommandType.StoredProcedure, pLng, pLat);

        }
    }
}
