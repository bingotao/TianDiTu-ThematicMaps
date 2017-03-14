using JXGIS.Common.BaseLib;
using JXGIS.TianDiTuThematicMaps.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JXGIS.TianDiTuThematicMaps.Web.Controllers
{
    public class GovSubmitController : Controller
    {
        // GET: GovSubmit
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetLayer(string layerName)
        {
            ReturnObject ro = null;
            try
            {
                var layer = GSLayerUtils.GetLayer(layerName);
                ro = new ReturnObject(layer);
            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex);
            }
            string rt = Newtonsoft.Json.JsonConvert.SerializeObject(ro);
            return Json(rt);
        }
    }
}