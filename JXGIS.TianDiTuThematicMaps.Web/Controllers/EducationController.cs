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
    public class EducationController : Controller
    {
        // GET: Education
        public ActionResult Index()
        {
            var eduConfig = SystemUtils.Config.Education;
            ViewBag.EducationConfig = eduConfig;
            ViewBag.Title = eduConfig.Title;
            ViewBag.KeyWords = eduConfig.KeyWords;
            ViewBag.Description = eduConfig.Description;
            ViewBag.Favicon = eduConfig.Favicon;
            return View();
        }

        [HttpPost]
        public ActionResult GetLayers()
        {
            ReturnObject ro = null;
            try
            {
                var layers = new List<Layer>();
                var schoolLayers = LayerUtils.GetSchoolLayers();
                layers.AddRange(schoolLayers);
                ro = new ReturnObject(layers);
            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex);
            }
            string sRt = Newtonsoft.Json.JsonConvert.SerializeObject(ro);
            return Json(sRt);
        }

        [HttpPost]
        public ActionResult GetSchools(SchoolSearchCondition condition)
        {
            ReturnObject ro = null;
            try
            {
                var result = SchoolSearchUtils.GetSchools(condition.SearchText, condition.SType, condition.PageSize, condition.PageNumber);
                ro = new ReturnObject(result);
            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex);
            }

            var sRt = Newtonsoft.Json.JsonConvert.SerializeObject(ro);
            return Json(sRt);
        }
    }

    public class SchoolSearchCondition
    {
        public string SearchText { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public string SType { get; set; }
    }
}