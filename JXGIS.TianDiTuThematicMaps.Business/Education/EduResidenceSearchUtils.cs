using JXGIS.Common.BaseLib;
using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.TianDiTuThematicMaps.Business
{
    public class EduResidenceSearchUtils
    {
        public static Results<EduResidence> GetResidence(string keyWord, int pageNumber, int pageSize, string schoolAreaID = null, string schoolID = null)
        {
            IQueryable<EduResidence> query = null;

            if (!string.IsNullOrEmpty(schoolID))
            {
                query = from r in SystemUtils.SQLEFDbContext.EduResidence
                        from sa in SystemUtils.SQLEFDbContext.EduSchoolArea
                        where sa.SchoolID == schoolID && sa.Geometry.Intersects(r.Geometry)
                        select r;
            }
            else if (!string.IsNullOrEmpty(schoolAreaID))
            {
                query = from r in SystemUtils.SQLEFDbContext.EduResidence
                        from sa in SystemUtils.SQLEFDbContext.EduSchoolArea
                        where sa.ID2 == schoolAreaID && sa.Geometry.Intersects(r.Geometry)
                        select r;
            }
            else
            {
                query = from r in SystemUtils.SQLEFDbContext.EduResidence select r;
            }

            if (!string.IsNullOrEmpty(keyWord))
                query = query.Where(p => p.Name.Contains(keyWord) || p.ShortName.Contains(keyWord) || p.Address.Contains(keyWord));

            var count = query.Count();

            query = query.OrderBy(p => p.Index).Skip((pageNumber - 1) * pageSize).Take(pageSize);
            var rows = query.ToList();

            return new Results<EduResidence>()
            {
                count = count,
                rows = rows
            };
        }
    }

    public class Results<T>
    {
        public int count { get; set; }

        public List<T> rows { get; set; }

    }
}
