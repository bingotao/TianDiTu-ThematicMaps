using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib
{
    public class RoutePlanningUtils
    {
        private static string _transUrl = "http://api.tianditu.com/apiserver/ajaxproxy?proxyReqUrl=";
        private static string _busUrl = "http://map.tianditu.com/query.shtml?postStr={{'startposition':'{0}','endposition':'{1}','linetype':'{2}'}}&type=busline";
        private static string _drivingUrl = "http://map.tianditu.com/query.shtml?postStr={{'orig':'{0}','dest':'{1}','mid':'{2}','style':'{3}'}}&type=search";


        public static string GetRoute(RouteOptions routeOptions)
        {
            var ro = routeOptions;
            var url = string.Empty;
            var routeString = string.Empty;
            var semicolon = ';';

            string start = GetCorStr(ro.Start.Point);
            string end = GetCorStr(ro.End.Point);

            if (ro.PlanningType == PlanningType.Bus)
            {
                url = string.Format(_busUrl, start, end, (int)ro.TripMode);
                routeString = ServiceUtils.Get(url, Encoding.UTF8);
            }
            else
            {
                string mid = string.Empty;
                if (ro.Middle != null)
                {
                    foreach (var midPnt in ro.Middle)
                    {
                        mid += GetCorStr(midPnt) + semicolon;
                    }
                    mid = mid.Trim(semicolon);
                }
                url = string.Format(_drivingUrl, start, end, mid, (int)ro.TripMode);
                url = _transUrl + System.Web.HttpUtility.UrlEncode(url);
                routeString = ServiceUtils.Get(url, Encoding.UTF8);
                routeString = routeString.Substring(routeString.IndexOf("{")).Trim(semicolon);
            }
            return routeString;
        }

        private static string GetCorStr(IPoint point)
        {
            return string.Format("{0},{1}", point.X, point.Y);
        }

    }

    /// <summary>
    /// 线路优选类型
    /// </summary>
    public enum TripMode
    {
        // 较便捷
        LessTime = 1,

        // 少换乘
        LessTransfer = 2,

        // 少步行
        LessWalk = 4,

        // 不坐地铁
        NoSubway = 8,

        // 最快线路
        LessTime2 = 0,

        // 最短线路
        LessDistance = 1,

        // 少走高速
        LessHighway = 2,

        // 步行
        OnlyWalk = 3
    }

    /// <summary>
    /// 线路规划类型
    /// </summary>
    public enum PlanningType
    {
        Bus = 0,
        Drive = 1,
        Walk = 2
    }

    /// <summary>
    /// 线路设置
    /// </summary>
    public class RouteOptions
    {
        public Postion Start { get; set; }

        public Postion End { get; set; }

        public IEnumerable<Point> Middle { get; set; }

        public TripMode TripMode { get; set; }

        public PlanningType PlanningType { get; set; }
    }

    public class Postion {
        public string Name { get; set; }
        public Point Point { get; set; }
    }
}
