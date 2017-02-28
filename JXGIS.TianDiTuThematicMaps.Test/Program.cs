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
using MySql.Data.MySqlClient;

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

            //    var geo = DbGeometry.FromBinary(dic["Geometry"] as byte[]);
            //}
            //MySql.Data.MySqlClient.MySqlParameter pLng = new MySql.Data.MySqlClient.MySqlParameter("@lng", 120.771042);
            //MySql.Data.MySqlClient.MySqlParameter pLat = new MySql.Data.MySqlClient.MySqlParameter("@lat", 30.740626);

            //var dataTable = SystemUtils.MySQLComDbContext.GetDataSet("select fun()", CommandType.Text);

            //var layers = LayerUtils.GetSchoolAreaLayers2();

            //var s = SystemUtils.MySQLEFDbContext.Test.ToList();


            //var txt = "POLYGON((120.72900758900005 30.755549376000033,120.72548825100012 30.755413619000024,120.7247089330001 30.755575307000072,120.72356777900006 30.75750491200006,120.72172432100001 30.757672081000067,120.72175452500005 30.75838394300007,120.7218459930001 30.760704385000054,120.72183237100012 30.761897085000044,120.72498424100002 30.76222152300005,120.727503823 30.76255475100004,120.72854422000012 30.762951987000065,120.72895626100001 30.762953414000037,120.73085964200004 30.762976265000077,120.73329568400004 30.76332361300007,120.73535621300005 30.763617375000024,120.73814449100007 30.764428422000037,120.73837121300005 30.763217670000074,120.73842896400004 30.762765324000043,120.73802953600011 30.76144223800003,120.73743801700004 30.759455010000067,120.73714012100004 30.75891275500004,120.7369971820001 30.758220642000026,120.73746517900008 30.75747485000005,120.73627999000007 30.755777488000035,120.73447235600008 30.75558261900005,120.73122099400007 30.755562867000037,120.72900758900005 30.755549376000033))";
            //var geometry = DbGeometry.FromText(txt, 4326);
            //var geo = SystemUtils.MySQLEFDbContext.Database.SqlQuery<JXGIS.Common.Entity.Test>("select st_asgeojson(geometry) GeoJSON from edu_schoolarea").First();

            var s = ResidenceSearchUtils.GetResidence(null, 0, 10, "E0108977-E929-4206-AB11-DF4E73073CFF");

        }
    }
}
