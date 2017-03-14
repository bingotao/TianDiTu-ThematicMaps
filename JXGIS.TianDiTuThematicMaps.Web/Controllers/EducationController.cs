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

        public ActionResult SchoolDetails(string ID)
        {
            EduSchool school = null;
            try
            {
                var s = SystemUtils.SQLEFDbContext.EduSchool.Where(p => p.ID == ID).FirstOrDefault();

                school = s == null ? new EduSchool() : s;
            }
            catch (Exception ex)
            {
            }
            return View(school);
        }

        [HttpPost]
        public ActionResult GetLayers()
        {
            ReturnObject ro = null;
            try
            {
                var layers = new List<Layer>();
                var schoolLayers = EduLayerUtils.GetSchoolLayers();
                var schoolAreaLayers = EduLayerUtils.GetSchoolAreaLayers();

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
                var result = EduSchoolSearchUtils.GetSchools(condition.SearchText, condition.SType, condition.PageSize, condition.PageNumber);
                ro = new ReturnObject(result);
            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex);
            }

            var sRt = Newtonsoft.Json.JsonConvert.SerializeObject(ro);
            return Json(sRt);
        }


        public ActionResult GetResidence(string searchText, int pageNumber, int pageSize, string schoolAreaID, string schoolID)
        {
            ReturnObject ro = null;
            try
            {
                var rs = EduResidenceSearchUtils.GetResidence(searchText, pageNumber, pageSize, schoolAreaID, schoolID);
                var fts = EntityUtils.EntitiesToFeatureCollection(rs.rows);

                ro = new ReturnObject();
                ro.Data = Newtonsoft.Json.JsonConvert.SerializeObject(new
                {
                    count = rs.count,
                    rows = fts
                });
            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex);
            }
            return Json(ro);
        }

        public ActionResult GetSchoolArea(string schoolID, string sType, double? lat, double? lng)
        {
            ReturnObject ro = null;
            try
            {
                List<EduSchoolArea> schoolAreas = null;
                if (!string.IsNullOrEmpty(schoolID))
                {
                    schoolAreas = (from s in SystemUtils.SQLEFDbContext.EduSchoolArea
                                   where s.SchoolID == schoolID
                                   select s).ToList();
                }
                else
                {
                    var point = System.Data.Entity.Spatial.DbGeography.FromText(string.Format("POINT({0} {1})", lng, lat));
                    schoolAreas =
                        (from sa in SystemUtils.SQLEFDbContext.EduSchoolArea
                         where sa.Geometry.Intersects(point) && sa.SType == sType
                         select sa).ToList();
                }

                if (schoolAreas.Count == 0)
                {
                    ro = new ReturnObject("未找到所属学区", false);
                }
                else
                {
                    var fts = EntityUtils.EntitiesToFeatureCollection(schoolAreas);
                    ro = new ReturnObject(fts);
                }

            }
            catch (Exception ex)
            {
                ro = new ReturnObject(ex);
            }
            string sRt = Newtonsoft.Json.JsonConvert.SerializeObject(ro);
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