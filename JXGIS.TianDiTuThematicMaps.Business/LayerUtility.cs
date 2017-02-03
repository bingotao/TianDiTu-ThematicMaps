using JXGIS.Common.BaseLib;
using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.TianDiTuThematicMaps.Business
{
    public class LayerUtility
    {
        public static List<SchoolLayer> GetSchoolLayers()
        {
            var schools = SystemUtility.EFDbContext.EduSchool.ToList();

            var schoolLayer = from s in schools
                              group s by new { s.SchoolType, s.SType } into g
                              select new SchoolLayer
                              {
                                  Type = g.Key.SchoolType,
                                  SType = g.Key.SType,
                                  Schools = (from c in g
                                             select new School
                                             {
                                                 properties = new EduSchool
                                                 {
                                                     Name = c.Name,
                                                     SchoolType = c.SchoolType,
                                                     ShortName = c.ShortName,
                                                     SType = c.SType,
                                                     Address = c.Address,
                                                     Telephone = c.Telephone,
                                                     Website = c.Website,
                                                     Geometry = c.Geometry
                                                 },
                                                 geometry = new SchoolGeo
                                                 {
                                                     coordinates = new double[] { c.Lng, c.Lat }
                                                 }
                                             }).ToList()
                              };
            return schoolLayer.ToList();
        }


    }
}
