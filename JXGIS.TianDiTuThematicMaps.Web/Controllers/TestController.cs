using JXGIS.Common.BaseLib;
using JXGIS.TianDiTuThematicMaps.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JXGIS.TianDiTuThematicMaps.Web.Controllers
{
    public class TestController : Controller
    {
        // GET: Test
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult TestWmts()
        {
            return View();
        }

        public ActionResult FullScreen()
        {
            return View();
        }

        public ActionResult GetLayer(string layerName)
        {
            var layer = GSLayerUtils.GetLayer(layerName);
            string s = Newtonsoft.Json.JsonConvert.SerializeObject(layer);
            return Content(s);
        }

        public ActionResult Cesium()
        {
            return View();
        }



        public ActionResult AccurateGPS()
        {
            return View();
        }

        public ActionResult GetAccurateGPS(decimal lat, decimal lng)
        {
            var rt = new AccurateGPSServiceRef.AccurateGPSSoapClient().Accurate(lat, lng);

            var _lat = rt.Split('|')[0];
            var _lng = rt.Split('|')[1];

            return Json(new { lat = _lat, lng = _lng });
        }

        public ActionResult GetAdminRegions()
        {
            var adminRegion = SystemUtils.SQLEFDbContext.AdministrativeRegion.Where(p => p.Type == 1).ToList();
            var ftCol = EntityUtils.EntitiesToFeatureCollection(adminRegion);
            string s = Newtonsoft.Json.JsonConvert.SerializeObject(ftCol);
            return Content(s);
        }
    }
}