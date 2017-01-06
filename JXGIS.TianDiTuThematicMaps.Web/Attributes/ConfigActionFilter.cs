using JXGIS.Common.BaseLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JXGIS.TianDiTuThematicMaps.Web
{
    public class ConfigActionFilter : ActionFilterAttribute
    {

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                var viewBag = filterContext.Controller.ViewBag;
                viewBag.Title = SystemUtility.Config.Title.ToString();
                viewBag.BaseUrl = SystemUtility.BaseUrl;
            }
            catch
            {

            }
        }
    }
}