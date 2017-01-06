using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib
{
    /// <summary>
    /// DateTime格式化
    /// </summary>
    public class CustomDateTimeConverter : CustomCreationConverter<DateTime>
    {
        private string DateTimeFormat;
        public CustomDateTimeConverter(string DateTimeFormat = "yyyy-MM-dd")
        {
            this.DateTimeFormat = DateTimeFormat;
        }

        public override bool CanWrite
        {
            get
            {
                return true;
            }
        }

        public override DateTime Create(Type objectType)
        {
            return DateTime.MinValue;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value == null)
            {
                writer.WriteNull();
            }
            else
            {
                DateTime dateTime = (DateTime)value;
                string TimeString = dateTime.Year == 1 ? string.Empty : dateTime.ToString(this.DateTimeFormat);
                writer.WriteValue(TimeString);
            }
        }
    }

    /// <summary>
    /// DateTime格式化
    /// </summary>
    public class CustomNullableDateTimeConverter : CustomCreationConverter<DateTime?>
    {
        private string DateTimeFormat;
        public CustomNullableDateTimeConverter(string DateTimeFormat = "yyyy-MM-dd")
        {
            this.DateTimeFormat = DateTimeFormat;
        }

        public override bool CanWrite
        {
            get
            {
                return true;
            }
        }

        public override DateTime? Create(Type objectType)
        {
            return DateTime.MinValue;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value == null)
            {
                writer.WriteNull();
            }
            else
            {
                DateTime dateTime = value == null ? DateTime.MinValue : (DateTime)value;
                string TimeString = dateTime.Year == 1 ? string.Empty : dateTime.ToString(this.DateTimeFormat);
                writer.WriteValue(TimeString);
            }
        }
    }
}
