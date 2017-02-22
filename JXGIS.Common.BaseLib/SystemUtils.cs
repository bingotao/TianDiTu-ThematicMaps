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
        private static readonly object _lockConfig = new object();
        private static readonly object _lockSQLEFDbContext = new object();
        private static readonly object _lockMySQLEFDbContext = new object();
        private static readonly object _lockSQLComContext = new object();
        private static readonly object _lockMySQLComContext = new object();

        private static dynamic _Config;
        private static SQLEFDbContext _SQLEFDbContext;
        private static MySQLEFDbContext _MySQLEFDbContext;
        private static SQLComDbContext _SQLComDbContext;
        private static MySQLComDbContext _MySQLComDbContext;


        public static string BaseUrl
        {
            get
            {
                string appPath = HttpContext.Current == null ? string.Empty : HttpContext.Current.Request.ApplicationPath;
                return appPath == "/" ? string.Empty : appPath;
            }
        }

        private static string configPath
        {
            get
            {
                string path = System.Configuration.ConfigurationManager.AppSettings["SysParFilePath"];
                return AppDomain.CurrentDomain.BaseDirectory + (string.IsNullOrEmpty(path) ? "Config\\SystemParameters.json" : path);
            }
        }

        public static dynamic Config
        {
            get
            {
                if (_Config == null)
                {
                    lock (_lockConfig)
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
        public static SQLEFDbContext SQLEFDbContext
        {
            get
            {
                if (SystemUtils._SQLEFDbContext == null)
                    lock (_lockSQLEFDbContext)
                        SystemUtils._SQLEFDbContext = new SQLEFDbContext();
                return SystemUtils._SQLEFDbContext;
            }
        }

        public static MySQLEFDbContext MySQLEFDbContext
        {
            get
            {
                if (SystemUtils._MySQLEFDbContext == null)
                    lock (_lockMySQLEFDbContext)
                        SystemUtils._MySQLEFDbContext = new MySQLEFDbContext();
                return SystemUtils._MySQLEFDbContext;
            }
        }

        public static SQLComDbContext SQLComDbContext
        {
            get
            {
                if (SystemUtils._SQLComDbContext == null)
                    lock (_lockSQLComContext)
                        SystemUtils._SQLComDbContext = new SQLComDbContext();
                return SystemUtils._SQLComDbContext;
            }
        }

        public static MySQLComDbContext MySQLComDbContext
        {
            get
            {
                if (SystemUtils._MySQLComDbContext == null)
                    lock (_lockMySQLComContext)
                        SystemUtils._MySQLComDbContext = new MySQLComDbContext();
                return SystemUtils._MySQLComDbContext;
            }
        }
    }
}