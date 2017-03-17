using JXGIS.Common.BaseLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace JXGIS.TianDiTuThematicMaps.Web
{
    public class BundleConfig
    {
        private static string _refPath = "~/Reference/";
        private static string _viewPath = "~/Views/";
        private static string _cmpPath = "~/Extends/Components/";

        public static void RegisterBundles(BundleCollection bundles)
        {
            #region 全局
            //全局style
            bundles.Add(new Bundle("~/gStyles").Include(
                _refPath + "antd/antd.min.css",
                _refPath + "leaflet/leaflet.css",
                _refPath + "ctfont/iconfont.css",
                "~/Extends/globalStyle.css"
                ));

            //全局script
            bundles.Add(new Bundle("~/gScripts").Include(
                _refPath + "jquery-1.12.4.min.js",
                _refPath + "react/react.min.js",
                _refPath + "react/react-dom.min.js",
                _refPath + "antd/antd.min.js",
                _refPath + "leaflet/leaflet.js",
                _refPath + "leaflet-plugins/esri/esri-leaflet.js",
                "~/Extends/CommonJS/__Events__.js",
                "~/Extends/CommonJS/__leafletExtends__.js",
                "~/Extends/CommonJS/commonTool.js",
                "~/Extends/CommonJS/geoLocation.js"
                ));

            bundles.Add(new BabelBundle("~/gBabels")
                   .IncludeDirectory("~/Extends/Base", "*.jsx", true));
            #endregion

            #region 教育专题
            bundles.Add(new BabelBundle("~/education/index/js")
                   .IncludeDirectory(_cmpPath + "Education", "*.jsx", true)
                   .Include(_viewPath + "Education/js/Index.jsx"));
            bundles.Add(new LessBundle("~/education/index/css")
                   .IncludeDirectory(_cmpPath + "Education", "*.less", true)
                   .Include(_viewPath + "Education/css/Index.less"));

            bundles.Add(new BabelBundle("~/education/schooldetails/js")
                   .Include(_viewPath + "Education/js/SchoolDetails.jsx"));
            bundles.Add(new LessBundle("~/education/schooldetails/css")
                   .Include(_viewPath + "Education/css/SchoolDetails.less"));
            #endregion

            #region 政务报送专题
            bundles.Add(new BabelBundle("~/govsubmit/index/js")
                   .IncludeDirectory(_cmpPath + "GovSubmit", "*.jsx", true)
                   .Include(_viewPath + "GovSubmit/js/Config.jsx")
                   .Include(_viewPath + "GovSubmit/js/Index.jsx"));
            bundles.Add(new LessBundle("~/govsubmit/index/css")
                   .IncludeDirectory(_cmpPath + "GovSubmit", "*.less", true)
                   .Include(_viewPath + "GovSubmit/css/Index.less"));

            #endregion
        }
    }
}