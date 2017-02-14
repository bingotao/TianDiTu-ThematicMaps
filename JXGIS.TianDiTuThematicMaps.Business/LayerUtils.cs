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
        public static List<SchoolLayer> GetSchoolLayers()
        {
            var schools = SystemUtils.EFDbContext.EduSchool.ToList();

            var schoolLayer = from s in schools
                              group s by new { s.SchoolType, s.SType } into g
                              select new SchoolLayer
                              {
                                  Type = g.Key.SchoolType,
                                  SType = g.Key.SType,
                                  List = (from c in g
                                          select new School
                                          {
                                              properties = new EduSchool
                                              {
                                                  ID = c.ID,
                                                  Name = c.Name,
                                                  SchoolType = c.SchoolType,
                                                  County = c.County,
                                                  Street = c.Street,
                                                  Email = c.Email,
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

        public static List<SchoolAreaLayer> GetSchoolAreaLayers()
        {
            var schoolAreas = SystemUtils.EFDbContext.EduSchoolArea.ToList();
            var layers = (from sa in schoolAreas
                          group sa by sa.SType into g
                          select new SchoolAreaLayer()
                          {
                              SType = g.Key,
                              List = (from c in g
                                      select new SchoolArea()
                                      {
                                          properties = new EduSchoolArea()
                                          {
                                              ID = c.ID,
                                              SType = c.SType,
                                              Name = c.Name,
                                              Area = c.Area,
                                              Districts = c.Districts
                                          },
                                          geometry = c.GeoJson
                                      }
                                      ).ToList()
                          }).ToList();
            return layers;
        }
    }
}
