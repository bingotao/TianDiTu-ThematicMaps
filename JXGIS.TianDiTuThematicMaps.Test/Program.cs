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

namespace JXGIS.Common.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            var s = LayerUtility.GetSchoolLayers();
            var ss = Newtonsoft.Json.JsonConvert.SerializeObject(s);
        }
    }
}
