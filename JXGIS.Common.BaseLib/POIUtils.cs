using JXGIS.Common.BaseLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib
{
    public class POIUtils
    {

        private static string _POIUrl = "http://www.jxmap.gov.cn/ZJDituWebService/Service.asmx/QueryPOI?&key={0}&pac={1}&type={2}&flds={3}&pageIndex={4}&pageStep={5}&taghead={6}&tagtail={7}";

        public static string GetPOI(POICondition condition)
        {
            var c = condition;
            string POIUrl = string.Format(_POIUrl, c.Keywords, c.AreaCode, c.Type, c.Fields, c.PageIndex, c.PageStep, c.TagHead, c.TagTail);
            return ServiceUtils.Get(POIUrl, Encoding.UTF8);
        }

    }

    public class POICondition
    {
        /// <summary>
        /// 关键字
        /// </summary>
        public string Keywords { get; set; } = string.Empty;

        /// <summary>
        /// 区域代码（默认嘉兴市本级）
        /// </summary>
        public string AreaCode { get; set; } = "330400";

        /// <summary>
        /// POI类型
        /// </summary>
        public string Type { get; set; } = string.Empty;

        /// <summary>
        /// 查询显示的字段
        /// </summary>
        public string Fields { get; set; } = string.Empty;

        /// <summary>
        /// 第几页
        /// </summary>
        public int PageIndex { get; set; } = 1;

        /// <summary>
        /// 每页数量
        /// </summary>
        public int PageStep { get; set; } = 20;

        /// <summary>
        /// 查询结果标记的头的class显示名称
        /// </summary>
        public string TagHead { get; set; } = string.Empty;


        /// <summary>
        /// 查询结果标记尾的class显示名称
        /// </summary>
        public string TagTail { get; set; } = string.Empty;

    }
}
