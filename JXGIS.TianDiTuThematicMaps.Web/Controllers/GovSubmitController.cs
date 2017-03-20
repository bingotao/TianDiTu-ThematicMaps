using JXGIS.Common.BaseLib;
using JXGIS.Common.Entity;
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

        static SQLEFDbContext _dbContext = SystemUtils.SQLEFDbContext;
        // GET: GovSubmit
        public ActionResult Index()
        {
            ViewBag.GovSubmitAlias = Newtonsoft.Json.JsonConvert.SerializeObject(EntityUtils.GetFieldsAlias<GovSubmit>()).ToString();
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
            return Content(rt);
        }

        public ActionResult GetItems(string layerName, string keyword, int pageNumber, int pageSize)
        {
            ReturnObject ro = null;
            try
            {
                var query = (from c in _dbContext.GovSubmit
                             select c);
                if (!string.IsNullOrEmpty(layerName)) query = query.Where(p => p.LayerName == layerName);
                if (!string.IsNullOrEmpty(keyword)) query = query.Where(p => p.Name.Contains(keyword));

                var rows = query.OrderBy(p => p.Name).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
                var count = query.Count();
                var ftCol = EntityUtils.EntitiesToFeatureCollection(rows);
                ro = new ReturnObject(new
                {
                    ftCol = ftCol,
                    count = count
                });
            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex);
            }

            var rt = Newtonsoft.Json.JsonConvert.SerializeObject(ro);
            return Json(rt);
        }
    }
}