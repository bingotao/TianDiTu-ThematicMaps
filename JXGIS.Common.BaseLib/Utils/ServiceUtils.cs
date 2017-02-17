using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;


namespace JXGIS.Common.BaseLib
{
    public class ServiceUtils
    {
        /// <summary>
        /// Post方法
        /// </summary>
        /// <param name="url">Post地址</param>
        /// <param name="postData">post数据</param>
        /// <returns></returns>
        public static string Post(string url, string postData)
        {
            //创建客户端并Post数据
            WebClient wc = new WebClient();
            byte[] content = Encoding.UTF8.GetBytes(postData);
            wc.Headers.Add("Content-Type", "text/html;charset:utf-8;");
            wc.Headers.Add("ContentLength", content.Length.ToString());
            byte[] responseData = wc.UploadData(url, "POST", content);
            //将返回的Data转换成string
            return Encoding.UTF8.GetString(responseData);
        }

        /// <summary>
        /// Get方法
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static string Get(string url, Encoding encoding)
        {
            WebClient wc = new WebClient();
            wc.Encoding = encoding ?? Encoding.UTF8;
            return wc.DownloadString(url);
        }

    }
}
