using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JXGIS.TianDiTuThematicMaps.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            //自定义过滤器
            filters.Add(new ConfigActionFilter());
        }
    }
}