using JXGIS.Common.BaseLib;
using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JXGIS.TianDiTuThematicMaps.Web.Controllers
{
    public class PublicServiceController : Controller
    {
        // GET: PublicService
        public ActionResult Index()
        {
            try
            {
                var ps = SystemUtils.Config.PublicService;
                var vb = ViewBag;
                vb.Title = ps.Title;
                vb.KeyWords = ps.KeyWords;
                vb.Description = ps.Description;
                vb.Favicon = ps.Favicon;
            }
            catch (Exception ex)
            {

            }
            return View();
        }

        public ActionResult GetPOI(string searchText)
        {
            var rt = POIUtils.GetPOI(new POICondition() { Keywords = searchText });
            return Content(rt);
        }

        public ActionResult GetRoute(RouteOptions routeOptions)
        {
            var route = RoutePlanningUtils.GetRoute(routeOptions);
            return Content(route);
        }
    }
}