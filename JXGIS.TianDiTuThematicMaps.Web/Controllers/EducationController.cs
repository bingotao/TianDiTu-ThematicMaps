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
                var schoolAreaLayers = LayerUtils.GetSchoolAreaLayers();
                layers.AddRange(schoolLayers);
                layers.AddRange(schoolAreaLayers);
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


        public ActionResult GetResidence(string searchText, int pageNumber, int pageSize)
        {
            ReturnObject ro = null;
            try
            {
                string s = POIUtils.GetPOI(new POICondition() { Key = searchText, Type = "100202", PageIndex = pageNumber, PageStep = pageSize });
                ro = new ReturnObject();
                ro.Data = s;
            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex);
            }
            return Json(ro);
        }

        public ActionResult GetSchoolArea(double lat, double lng)
        {
            ReturnObject ro = null;
            try
            {
                var point = System.Data.Entity.Spatial.DbGeography.FromText(string.Format("POINT({0} {1})", lng, lat));
                var schoolAreas =
                    (from sa in SystemUtils.EFDbContext.EduSchoolArea
                     where sa.Geometry.Intersects(point)
                     select new SchoolArea()
                     {
                         properties = new EduSchoolArea()
                         {
                             ID = sa.ID,
                             Area = sa.Area,
                             SchoolID = sa.SchoolID,
                             SType = sa.SType,
                             Districts = sa.Districts,
                             Name = sa.Name
                         },
                         geometry = sa.GeoJson
                     }).ToList();
                ro = schoolAreas.Count == 0 ? new ReturnObject("未找到所属学区") : new ReturnObject(schoolAreas);
            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex);
            }
            string s = Newtonsoft.Json.JsonConvert.SerializeObject(ro);
            return Json(s);
        }

        public ActionResult GetSchoolArea(string schoolID)
        {
            ReturnObject ro = null;
            try
            {
                var schoolArea =
                    (from sa in SystemUtils.EFDbContext.EduSchoolArea
                     where sa.SchoolID == schoolID
                     select new SchoolArea()
                     {
                         properties = new EduSchoolArea()
                         {
                             ID = sa.ID,
                             Area = sa.Area,
                             SchoolID = sa.SchoolID,
                             SType = sa.SType,
                             Districts = sa.Districts,
                             Name = sa.Name
                         },
                         geometry = sa.GeoJson
                     }).First();
                ro = schoolArea == null ? new ReturnObject("未找到所属学区") : new ReturnObject(schoolArea);
            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex);
            }
            string s = Newtonsoft.Json.JsonConvert.SerializeObject(ro);
            return Json(s);
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