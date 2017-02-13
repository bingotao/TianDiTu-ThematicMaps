using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace JXGIS.Common.BaseLib
{
    public static class SystemUtils
    {
        private static readonly object _lockObject1 = new object();
        private static readonly object _lockObject2 = new object();
        private static readonly object _lockObject3 = new object();

        private static dynamic _Config;
        private static ComDbContext _ComDbContext;
        private static EFDbContext _EFDbContext;

        public static string BaseUrl
        {
            get
            {
                string appPath = HttpContext.Current == null ? string.Empty : HttpContext.Current.Request.ApplicationPath;
                return appPath == "/" ? string.Empty : appPath;
            }
        }

        private static string configPath = AppDomain.CurrentDomain.BaseDirectory + "Config\\SystemParameters.json";
        public static dynamic Config
        {
            get
            {
                if (_Config == null)
                {
                    lock (_lockObject1)
                    {
                        using (StreamReader sr = new StreamReader(configPath))
                        {
                            string json = sr.ReadToEnd();
                            _Config = Newtonsoft.Json.JsonConvert.DeserializeObject(json);
                        }
                    }
                }
                return _Config;
            }
        }

        public static ComDbContext ComDbContext
        {
            get
            {
                if (SystemUtils._ComDbContext == null)
                    lock (_lockObject2)
                        SystemUtils._ComDbContext = new ComDbContext();
                return SystemUtils._ComDbContext;
            }
        }

        public static EFDbContext EFDbContext
        {
            get
            {
                if (SystemUtils._EFDbContext == null)
                    lock (_lockObject3)
                        SystemUtils._EFDbContext = new EFDbContext();
                return SystemUtils._EFDbContext;
            }
        }
    }
}