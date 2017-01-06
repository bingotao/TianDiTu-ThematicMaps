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
    /// 保留两位小数的Json序列化工具 decimal 类型
    /// </summary>
    public class CustomDecimalConverter : CustomCreationConverter<decimal>
    {
        private int round = 2;
        public CustomDecimalConverter(int iRound = 2)
        {
            this.round = iRound;
        }

        public override bool CanWrite
        {
            get
            {
                return true;
            }
        }

        public override decimal Create(Type objectType)
        {
            return 0.0M;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value == null)
            {
                writer.WriteNull();
            }
            else
            {
                var formatted = Math.Round((decimal)value, this.round);
                writer.WriteValue(formatted);
            }
        }
    }

    

    
}
