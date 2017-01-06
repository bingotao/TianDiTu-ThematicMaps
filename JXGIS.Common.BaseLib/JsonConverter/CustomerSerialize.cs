using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib
{
    public class CustomerSerialize
    {
        /// <summary>
        /// 常用JSON序列化，保留两位小数，时间格式按照中文格式
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string Serialize(object obj)
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(obj, new CustomDoubleConverter(), new CustomDecimalConverter(), new CustomDateTimeConverter("yyyy年MM月dd日"));
        }
    }
}
