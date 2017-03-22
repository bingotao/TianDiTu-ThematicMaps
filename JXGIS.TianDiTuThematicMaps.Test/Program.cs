using JXGIS.Common.BaseLib;
using JXGIS.TianDiTuThematicMaps.Business;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using alatas.GeoJSON4EntityFramework;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Spatial;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;
using JXGIS.Common.Entity;
using System.Web;
using System.Data.OleDb;

namespace JXGIS.Common.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            //var url = "http://map.tianditu.com/query.shtml?postStr={'orig':'120.58678,30.84595','dest':'120.63566,30.84645','style':'0','mid':'120.60238,30.83865;'}&type=search";
            //url = "http://api.tianditu.com/apiserver/ajaxproxy?proxyReqUrl=" + HttpUtility.UrlEncode(url);
            //var str = ServiceUtils.Get(url, Encoding.UTF8);



            //{ 'startposition':'120.10844,30.32127','endposition':'120.17882,30.30514',linetype: '1'}
            //{ 'orig':'120.10844,30.32127','dest':'120.17111,30.32426','style':'0','mid':'120.12697,30.33075;120.14946,30.32672;'}
            //var s = RoutePlanningUtils.GetRoute(new RouteOptions()
            //{
            //    Start = new Point() { X = 120.10844, Y = 30.32127 },
            //    End = new Point() { X = 120.17882, Y = 30.30514 },
            //    PlanningType = PlanningType.Bus,
            //    TripMode = 1
            //});

            var s = RoutePlanningUtils.GetRoute(new RouteOptions()
            {
                Start = new Point() { X = 120.10844, Y = 30.32127 },
                End = new Point() { X = 120.17882, Y = 30.30514 },
                Middle = new List<Point>() { new Point() { X = 120.12697, Y = 30.33075 }, new Point() { X = 120.14946, Y = 30.32672 } },
                PlanningType = PlanningType.Drive,
                TripMode = 0
            });
        }

        public class Point : IPoint
        {
            public double X
            {
                get; set;
            }

            public double Y
            {
                get; set;
            }
        }
    }
}

