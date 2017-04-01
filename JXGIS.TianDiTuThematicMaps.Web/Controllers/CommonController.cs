using JXGIS.Common.BaseLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JXGIS.TianDiTuThematicMaps.Web.Controllers
{
    public class CommonController : Controller
    {
        public ActionResult GetRoute(RouteOptions routeOptions)
        {
            var route = RoutePlanningUtils.GetRoute(routeOptions);
            return Content(route);
        }


        public ActionResult GetPOI(string searchText)
        {
            var rt = POIUtils.GetPOI(new POICondition() { Keywords = searchText });
            return Content(rt);
        }
    }
}