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
    public class LayerUtils
    {
        public static List<Layer> GetSchoolLayers()
        {
            var schools = SystemUtils.SQLEFDbContext.EduSchool.ToList();

            var schoolLayer = from s in schools
                              group s by s.SType into g
                              select new Layer
                              {
                                  Type = g.Key,
                                  Features = EntityUtils.EntitiesToFeatureCollection(g)
                              };
            return schoolLayer.ToList();
        }

        public static List<Layer> GetSchoolAreaLayers()
        {
            var schoolAreas = SystemUtils.SQLEFDbContext.EduSchoolArea.ToList();
            var layers = (from sa in schoolAreas
                          group sa by sa.SType into g
                          select new Layer
                          {
                              Type = g.Key,
                              Features = EntityUtils.EntitiesToFeatureCollection(g)
                          }).ToList();
            return layers;
        }
    }
}
