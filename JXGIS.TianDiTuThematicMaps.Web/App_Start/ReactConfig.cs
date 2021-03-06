using React;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(JXGIS.TianDiTuThematicMaps.Web.ReactConfig), "Configure")]

namespace JXGIS.TianDiTuThematicMaps.Web
{
    public static class ReactConfig
    {
        public static void Configure()
        {
            // If you want to use server-side rendering of React components, 
            // add all the necessary JavaScript files here. This includes 
            // your components as well as all of their dependencies.
            // See http://reactjs.net/ for more information. Example:
            //ReactSiteConfiguration.Configuration
            //	.AddScript("~/Scripts/First.jsx")
            //	.AddScript("~/Scripts/Second.jsx");

            // If you use an external build too (for example, Babel, Webpack,
            // Browserify or Gulp), you can improve performance by disabling 
            // ReactJS.NET's version of Babel and loading the pre-transpiled 
            // scripts. Example:
            //ReactSiteConfiguration.Configuration
            //	.SetLoadBabel(false)
            //	.AddScriptWithoutTransform("~/Scripts/bundle.server.js")

            ReactSiteConfiguration.Configuration
                .AddScript("~/Reference/antd/antd.min.js")
                .AddScript("~/Extends/Components/Education/EduMap/EduMap.jsx")
                .AddScript("~/Extends/Components/Education/EduNav/EduNav.jsx")
                .AddScript("~/Extends/Components/Education/EduBaseLayerToggle/EduBaseLayerToggle.jsx")
                .AddScript("~/Extends/Components/Education/EduClearButton/EduClearButton.jsx")
                //.AddScript("~/Extends/Components/Education/EduPopup/EduSchoolDistrictPopup.jsx")
                //.AddScript("~/Extends/Components/Education/EduPopup/EduSchoolPopup.jsx")
                .AddScript("~/Views/Education/js/Index.jsx")
                .AddScript("~/Views/Education/js/SchoolDetails.jsx");

        }
    }
}