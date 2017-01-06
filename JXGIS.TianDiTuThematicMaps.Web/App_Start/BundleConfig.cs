﻿using JXGIS.Common.BaseLib;
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

        public static void RegisterBundles(BundleCollection bundles)
        {
            #region 全局
            //全局style
            bundles.Add(new StyleBundle("~/gStyles").Include(
                _refPath + "mCustomScrollbar/jquery.mCustomScrollbar.min.css",
                _refPath + "antd/antd.min.css",
                _refPath + "leaflet/leaflet.css",
                _refPath + "ctfont/iconfont.css",
                "~/Extends/globalStyle.css"
                ));
            //全局script
            bundles.Add(new ScriptBundle("~/gScripts").Include(
                _refPath + "jquery-1.12.4.min.js",
                _refPath + "react/react.min.js",
                _refPath + "react/react-dom.min.js",
                _refPath + "antd/antd.min.js",
                _refPath + "leaflet/leaflet.js",
                _refPath + "mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js",
                "~/Extends/CommonJS/__Events__.js",
                "~/Extends/CommonJS/commonTool.js",
                "~/Extends/CommonJS/geoLocation.js"
                ));
            #endregion
        }
    }
}