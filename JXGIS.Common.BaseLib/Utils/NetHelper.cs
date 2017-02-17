using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Runtime.InteropServices;

namespace JXGIS.Common.BaseLib
{
    /// <summary>
    ///NetHelper 的摘要说明
    /// </summary>
    public class NetHelper
    {
        [DllImport("Iphlpapi.dll")]
        static extern int SendARP(Int32 DestIP, Int32 SrcIP, ref Int64 MacAddr, ref Int32 PhyAddrLen);
        [DllImport("Ws2_32.dll")]
        static extern Int32 inet_addr(string ipaddr);

        public static string GetBrowserType()
        {
            return HttpContext.Current.Request.Browser.Type;
        }

        public static string GetSysVersion()
        {
            string Agent = HttpContext.Current.Request.ServerVariables["HTTP_USER_AGENT"];

            if (Agent.IndexOf("NT 4.0") > 0)
            {
                return "Windows NT ";
            }
            else if (Agent.IndexOf("NT 5.0") > 0)
            {
                return "Windows 2000";
            }
            else if (Agent.IndexOf("NT 5.1") > 0)
            {
                return "Windows XP";
            }
            else if (Agent.IndexOf("NT 5.2") > 0)
            {
                return "Windows 2003";
            }
            else if (Agent.IndexOf("NT 6.0") > 0)
            {
                return "Windows Vista";
            }
            else if (Agent.IndexOf("WindowsCE") > 0)
            {
                return "Windows CE";
            }
            else if (Agent.IndexOf("NT") > 0)
            {
                return "Windows NT ";
            }
            else if (Agent.IndexOf("9x") > 0)
            {
                return "Windows ME";
            }
            else if (Agent.IndexOf("98") > 0)
            {
                return "Windows 98";
            }
            else if (Agent.IndexOf("95") > 0)
            {
                return "Windows 95";
            }
            else if (Agent.IndexOf("Win32") > 0)
            {
                return "Win32";
            }
            else if (Agent.IndexOf("Linux") > 0)
            {
                return "Linux";
            }
            else if (Agent.IndexOf("SunOS") > 0)
            {
                return "SunOS";
            }
            else if (Agent.IndexOf("Mac") > 0)
            {
                return "Mac";
            }
            else if (Agent.IndexOf("Linux") > 0)
            {
                return "Linux";
            }
            else if (Agent.IndexOf("Windows") > 0)
            {
                return "Windows";
            }
            return "unknow";
        }


        /// <summary>
        /// 如果有代理那么越过代理直接取值
        /// </summary>
        /// <returns></returns>
        public static string GetClientIP()
        {
            if (HttpContext.Current.Request.ServerVariables["HTTP_VIA"] != null)
                return HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
            else
                return HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"].ToString();
        }

        public static string GetHostName()
        {
            string ip = GetClientIP();
            return GetHostName(ip);
        }

        public static string GetHostName(string ipStr)
        {
            string hostName = string.Empty;
            try
            {
                System.Net.IPAddress ip = System.Net.IPAddress.Parse(ipStr);
                System.Net.IPHostEntry host = System.Net.Dns.GetHostEntry(ip);
                hostName = host.HostName;
            }
            catch
            { }
            return hostName;
        }

        public static string GetMacAddr_Remote()
        {
            string ip = GetClientIP();
            return GetMacAddr_Remote(ip);
        }


        /// <summary> 
        /// SendArp获取MAC地址 
        /// </summary> 
        /// <param name="RemoteIP">目标机器的IP地址如(192.168.1.1)</param> 
        /// <returns>目标机器的mac 地址</returns> 
        public static string GetMacAddr_Remote(string RemoteIP)
        {
            StringBuilder macAddress = new StringBuilder();
            try
            {
                Int32 remote = inet_addr(RemoteIP);
                Int64 macInfo = new Int64();
                Int32 length = 6;
                SendARP(remote, 0, ref macInfo, ref length);
                string temp = Convert.ToString(macInfo, 16).PadLeft(12, '0').ToUpper();
                int x = 12;
                for (int i = 0; i < 6; i++)
                {
                    if (i == 5)
                    {
                        macAddress.Append(temp.Substring(x - 2, 2));
                    }
                    else
                    {
                        macAddress.Append(temp.Substring(x - 2, 2) + "-");
                    }
                    x -= 2;
                }
                return macAddress.ToString();
            }
            catch
            {
                return macAddress.ToString();
            }
        }
    }
}