using JXGIS.Common.BaseLib;
using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.TianDiTuThematicMaps.Business
{


    public class PoliceOfficeUtils
    {
        /// <summary>
        /// 根据空间点查找公安部门
        /// </summary>
        /// <param name="point"></param>
        /// <param name="regionLevel"></param>
        /// <param name="neareast"></param>
        /// <param name="inregion"></param>
        /// <returns></returns>
        public static List<PoliceOffice> GetPoliceOfficeInRegion(DbGeography point, AdminRegionLevel regionLevel)
        {
            IQueryable<PoliceOffice> query = null;

            if (regionLevel == AdminRegionLevel.All || regionLevel == AdminRegionLevel.City)
            {
                query = from p in SystemUtils.SQLEFDbContext.PoliceOffice
                        select p;
                if (regionLevel == AdminRegionLevel.City)
                {
                    query = query.Where(p => (AdminRegionLevel)p.Type == AdminRegionLevel.City);
                }
            }
            else if (AdminRegionLevel.Village == regionLevel)
            {
                query = from p in SystemUtils.SQLEFDbContext.PoliceOffice
                        from c in SystemUtils.SQLEFDbContext.AdministrativeRegion
                        where
                            (AdminRegionLevel)p.Type == AdminRegionLevel.Village
                            &&
                            ((AdminRegionLevel)c.Type == AdminRegionLevel.Village && point.Intersects(c.Geometry) && p.Geometry.Intersects(c.Geometry))
                        select p;

                // 当社区内没有警务室时查找街道派出所
                if (query.Count() == 0)
                {
                    query = from p in SystemUtils.SQLEFDbContext.PoliceOffice
                            from c in SystemUtils.SQLEFDbContext.AdministrativeRegion
                            where
                                (AdminRegionLevel)p.Type == AdminRegionLevel.Town
                                &&
                                ((AdminRegionLevel)c.Type == AdminRegionLevel.Town && point.Intersects(c.Geometry) && p.Geometry.Intersects(c.Geometry))
                            select p;
                }
            }
            else if (AdminRegionLevel.Town == regionLevel)
            {
                query = from p in SystemUtils.SQLEFDbContext.PoliceOffice
                        from c in SystemUtils.SQLEFDbContext.AdministrativeRegion
                        where
                            (AdminRegionLevel)p.Type == AdminRegionLevel.Town
                            &&
                            ((AdminRegionLevel)c.Type == AdminRegionLevel.Town && point.Intersects(c.Geometry) && p.Geometry.Intersects(c.Geometry))
                        select p;
            }
            else if (AdminRegionLevel.County == regionLevel)
            {
                // 先查所在街道的派出所，再查这个派出所所属的分局
                // 存在经开区这种特殊情况
                var ssfj = (from p in SystemUtils.SQLEFDbContext.PoliceOffice
                            from c in SystemUtils.SQLEFDbContext.AdministrativeRegion
                            where
                                (AdminRegionLevel)p.Type == AdminRegionLevel.Town
                                &&
                                ((AdminRegionLevel)c.Type == AdminRegionLevel.Town && point.Intersects(c.Geometry) && p.Geometry.Intersects(c.Geometry))
                            select p.SSFJ).ToList();

                query = from p in SystemUtils.SQLEFDbContext.PoliceOffice
                        where ssfj.Contains(p.Name)
                        select p;
            }
            query = query.Where(p => p.County == "秀洲区" || p.County == "南湖区");
            return query.ToList();
        }

        public static PoliceOffice GetOfficeTree()
        {
            var officeList = (from p in SystemUtils.SQLEFDbContext.PoliceOffice
                              where (p.County == "秀洲区" || p.County == "南湖区")
                              select p).ToList();

            var rootOffice = officeList.Where(p => p.Type == 0).FirstOrDefault();
            rootOffice = GetOffice(rootOffice, officeList);
            return rootOffice;
        }

        public static PoliceOffice GetOffice(PoliceOffice rootOffice, List<PoliceOffice> list)
        {
            List<PoliceOffice> subOffices = (from l in list
                                             where l.Parent == rootOffice.Name
                                             select l).ToList();

            foreach (var office in subOffices)
            {
                if (rootOffice.SubOffice == null)
                    rootOffice.SubOffice = new List<PoliceOffice>();
                rootOffice.SubOffice.Add(GetOffice(office, list));
            }
            return rootOffice;
        }
    }
}
