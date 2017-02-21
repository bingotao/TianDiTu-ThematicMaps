using JXGIS.Common.BaseLib;
using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.TianDiTuThematicMaps.Business
{
    public class SchoolSearchUtils
    {

        public static SchoolSearchResult GetSchools(string searchText, string schoolType, int pageSize, int pageNumber)
        {
            if (searchText == null) searchText = string.Empty;
            var baseSQL = (from s in SystemUtils.SQLEFDbContext.EduSchool
                           where (s.Name.Contains(searchText)|| s.ShortName.Contains(searchText)) && (schoolType == "all" ? true : s.SType == schoolType)
                           select s);

            var totalCount = baseSQL.Count();

            var schools = baseSQL.OrderBy(p=>p.Name).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new SchoolSearchResult
            {
                Count = totalCount,
                Schools = schools
            };
        }

        public static SchoolSearchResult2 GetSchools2(string searchText, string schoolType, int pageSize, int pageNumber)
        {
            if (searchText == null) searchText = string.Empty;
            var groups = (from s in SystemUtils.SQLEFDbContext.EduSchool
                          where s.Name.Contains(searchText)
                          group s by new { s.SchoolType, s.SType } into g
                          select new SchoolGroup
                          {
                              SchoolType = g.Key.SchoolType,
                              SType = g.Key.SType,
                              Count = g.Count()
                          }).ToList();

            var schools = (from s in SystemUtils.SQLEFDbContext.EduSchool
                           where s.Name.Contains(searchText) && (schoolType == "all" ? true : s.SType == schoolType)
                           select s).OrderBy(p => p.Name).Skip((pageSize - 1) * pageNumber).Take(pageNumber).ToList();

            var totalCount = groups.Sum(p => p.Count);
            var currentGroup = groups.Find(p => p.SType == schoolType);
            var currentTotalCount = currentGroup == null ? totalCount : currentGroup.Count;

            groups.Add(new SchoolGroup { SchoolType = "全部", SType = "all", Count = totalCount });

            return new SchoolSearchResult2
            {
                CurrentTotalCount = currentTotalCount,
                SchoolGroup = groups,
                Schools = schools,
                TotalCount = totalCount
            };
        }
    }

    public class SchoolGroup
    {
        public string SchoolType;
        public string SType;
        public int Count;
    }

    public class SchoolSearchResult2
    {
        public List<SchoolGroup> SchoolGroup;
        public int TotalCount;
        public int CurrentTotalCount;
        public List<EduSchool> Schools;
    }

    public class SchoolSearchResult
    {
        public int Count;
        public List<EduSchool> Schools;
    }
}
