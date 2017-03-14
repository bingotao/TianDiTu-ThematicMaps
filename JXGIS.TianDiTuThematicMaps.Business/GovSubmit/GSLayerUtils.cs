using alatas.GeoJSON4EntityFramework;
using JXGIS.Common.BaseLib;
using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.TianDiTuThematicMaps.Business
{
    public class GSLayer
    {
        /// <summary>
        /// 图层名
        /// </summary>
        public string LayerName { get; set; }

        /// <summary>
        /// 图层要素
        /// </summary>
        public FeatureCollection FeatureCollection { get; set; }

        /// <summary>
        /// 点状要素标识文字
        /// </summary>
        public string MarkerSymbolClass { get; set; }

        /// <summary>
        /// 符号
        /// </summary>
        public string Symbol { get; set; }

        /// <summary>
        /// 字段别名
        /// </summary>
        public Dictionary<string, string> FieldAlias { get; set; }

    }

    public class GSLayerUtils
    {
        public static GSLayer GetLayer(string layerName)
        {
            var entities = SystemUtils.SQLEFDbContext.GovSubmit.Where(p => p.LayerName == layerName).ToList();
            var ftCol = EntityUtils.EntitiesToFeatureCollection(entities);

            return new GSLayer()
            {
                LayerName = layerName,
                FeatureCollection = ftCol,
                FieldAlias = EntityUtils.GetFieldsAlias<GovSubmit>()
            };
        }
    }
}
