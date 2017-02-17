using alatas.GeoJSON4EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.Entity
{
    public class Layer
    {
        public string Type { get; set; }
        public FeatureCollection Features { get; set; }
    }
}
