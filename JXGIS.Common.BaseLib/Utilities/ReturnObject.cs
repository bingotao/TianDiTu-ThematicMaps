using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib
{
    /// <summary>
    /// 返回数据对象
    /// </summary>
    public class ReturnObject2
    {
        /// <summary>
        /// 数据对象
        /// </summary>
        private Dictionary<string, object> m_Dict = new Dictionary<string, object>();
        public string ErrorMessage = null;


        public ReturnObject2()
        { }
        /// <summary>
        /// 以错误消息初始化返回对象
        /// </summary>
        /// <param name="ErrorMessage"></param>
        public ReturnObject2(string ErrorMessage)
        {
            this.ErrorMessage = ErrorMessage;
        }

        /// <summary>
        /// 数据对象
        /// </summary>
        public Dictionary<string, object> Data
        {
            get { return this.m_Dict; }
            set { this.m_Dict = value; }
        }

        /// <summary>
        /// 添加数据
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public void AddData(string key, object value)
        {
            this.m_Dict[key] = value;
        }

    }

    public class ReturnObject
    {
        private object _data = null;
        private string _errorMessage = null;
        private bool _showDefaultErrorMessage = ReturnObject.GetShowDefaultErrorMessage();

        /// <summary>
        /// 默认的错误消息
        /// </summary>
        private static string _defaultErrorMessage = ReturnObject.GetInitDefaultErrorMessage();

        /// <summary>
        /// 设置默认的错误消息
        /// </summary>
        /// <param name="defaultErrorMessage"></param>
        private static void SetDefaultErrorMessage(string defaultErrorMessage)
        {
            _defaultErrorMessage = defaultErrorMessage;
        }

        /// <summary>
        /// 获取初始情况下默认的“错误消息”
        /// </summary>
        /// <returns></returns>
        private static string GetInitDefaultErrorMessage()
        {
            string errorMessage = System.Configuration.ConfigurationManager.AppSettings["errorMessage"];
            if (string.IsNullOrEmpty(errorMessage))
            {
                errorMessage = "当前操作发生了错误，请联系系统管理员。";
            }
            return errorMessage;
        }

        /// <summary>
        /// 默认情况下是否显示“错误消息”
        /// </summary>
        /// <returns></returns>
        private static bool GetShowDefaultErrorMessage()
        {

#if DEBUG
            return false;
#endif
            return true;
        }

        public string ErrorMessage
        {
            get
            {
                if (_showDefaultErrorMessage)
                    return _defaultErrorMessage;
                else
                    return _errorMessage;
            }
        }
        public ReturnObject()
        {

        }

        public ReturnObject(Exception ex) : this(ex.Message)
        {
        }

        public ReturnObject(Exception ex, bool showDefaultErrorMessage) : this(ex.Message, showDefaultErrorMessage)
        {
        }

        public ReturnObject(string errorMessage)
        {
            this._errorMessage = errorMessage;
        }

        public ReturnObject(string errorMessage, bool showDefaultErrorMessage)
        {
            this._errorMessage = errorMessage;
            this._showDefaultErrorMessage = showDefaultErrorMessage;
        }

        public ReturnObject(object obj)
        {
            this._data = obj;
        }

        public object Data
        {
            get
            {
                return this._data;
            }

            set
            {
                this._data = value;
            }
        }

        /// <summary>
        /// 请确保你的返回类型为 Dictionary<string, object>
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public void AddData(string key, object value)
        {
            if (this._data == null || !(this._data is Dictionary<string, object>))
            {
                this._data = new Dictionary<string, object>();
            }
            (this._data as Dictionary<string, object>)[key] = value;
        }


    }

}
