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

            string start = GetCorStr(ro.Start);
            string end = GetCorStr(ro.End);

            if (ro.PlanningType == PlanningType.Bus)
            {
                url = string.Format(_busUrl, start, end, ro.TripMode);
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
                url = string.Format(_drivingUrl, start, end, mid, ro.TripMode);
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

    public interface IPoint
    {
        double X { get; set; }

        double Y { get; set; }

    }

    /// <summary>
    /// 线路优选类型
    /// </summary>
    public class TripMode
    {
        // 较便捷
        public const int LessTime = 1;

        // 少换乘
        public const int LessTransfer = 2;

        // 少步行
        public const int LessWalk = 4;

        // 不坐地铁
        public const int NoSubway = 8;

        // 最快线路
        public const int LessTime2 = 0;

        // 最短线路
        public const int LessDistance = 1;

        // 少走高速
        public const int LessHighway = 2;

        // 步行
        public const int OnlyWalk = 3;
    }

    /// <summary>
    /// 线路规划类型
    /// </summary>
    public class PlanningType
    {
        public const int Bus = 0;
        public const int Drive = 1;
        public const int Walk = 2;
    }

    /// <summary>
    /// 线路设置
    /// </summary>
    public class RouteOptions
    {
        public IPoint Start { get; set; }

        public IPoint End { get; set; }

        public IEnumerable<IPoint> Middle { get; set; }

        public int TripMode { get; set; }

        public int PlanningType { get; set; }
    }
}
