using JXGIS.Common.BaseLib;
using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.TianDiTuThematicMaps.Business
{
    public class EduSchoolSearchUtils
    {
        public static EduSchool2 GetSchoolByID2(string id)
        {
            string sql = "select ID,Name,ShortName,SchoolType,County,Street,Address,Postcode,Telephone,ComplaintsHotline,Website,Email,SchoolNature,SchoolDistrict,WorkTime,Abstract,X Lng,Y Lat,SType,SchoolID,ST_AsText(Geometry) Geometry from edu_school where id=@id";
            var idPar = new MySql.Data.MySqlClient.MySqlParameter("@id", id);
            var dt = SystemUtils.MySQLComDbContext.GetDataTable(sql, System.Data.CommandType.Text, idPar);
            if (dt.Rows.Count > 0)
            {
                return EntityUtils.DataRowToEntity<EduSchool2>(dt.Rows[0]);
            }
            else
            {
                return null;
            }
        }

        public static SchoolSearchResult GetSchools(string searchText, string schoolType, int pageSize, int pageNumber)
        {
            if (searchText == null) searchText = string.Empty;
            var baseSQL = (from s in SystemUtils.SQLEFDbContext.EduSchool
                           where (s.Name.Contains(searchText) || s.ShortName.Contains(searchText)) && (schoolType == "all" ? true : s.SType == schoolType)
                           select s);

            var totalCount = baseSQL.Count();

            var schools = baseSQL.OrderBy(p => p.Name).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new SchoolSearchResult
            {
                Count = totalCount,
                Schools = schools
            };
        }

        public static SchoolSearchResult2 GetSchools2(string searchText, string schoolType, int pageSize, int pageNumber)
        {
            if (searchText == null) searchText = string.Empty;
            int totalCount = 0;
            List<EduSchool2> schools = null;
            var sqlBase = "select ID,Name,ShortName,SchoolType,County,Street,Address,Postcode,Telephone,ComplaintsHotline,Website,Email,SchoolNature,SchoolDistrict,WorkTime,Abstract,X Lng,Y Lat,SType,SchoolID,ST_AsText(Geometry) Geometry from edu_school t";
            var sqlCount = string.Format("select count(*) from ({0}) where (Name like @name or ShortName like &shortName) and SType like @stype", sqlBase);
            var sqlRows = string.Format("{0} where (Name like @name or ShortName like &shortName) and SType like @stype order by name limit @start,@count");

            var namePar = new MySql.Data.MySqlClient.MySqlParameter("@name", string.Format("%{0}%", searchText));
            var shortNamePar = new MySql.Data.MySqlClient.MySqlParameter("@shortName", string.Format("%{0}%", searchText));
            var stypePar = new MySql.Data.MySqlClient.MySqlParameter("@stype", string.Format("%{0}%", schoolType == "all" ? string.Empty : schoolType));
            var startPar = new MySql.Data.MySqlClient.MySqlParameter("@start", pageSize * (pageNumber - 1));
            var countPar = new MySql.Data.MySqlClient.MySqlParameter("@count", pageSize);

            var dtCount = SystemUtils.MySQLComDbContext.GetDataTable(sqlCount, System.Data.CommandType.Text, namePar, shortNamePar, stypePar);
            var dtRows = SystemUtils.MySQLComDbContext.GetDataTable(sqlCount, System.Data.CommandType.Text, namePar, shortNamePar, stypePar, startPar, countPar);

            totalCount = (int)System.Convert.ChangeType(dtCount.Rows[0][0], typeof(int));
            schools = EntityUtils.DataTableToEntities<EduSchool2>(dtRows);

            return new SchoolSearchResult2
            {
                Count = totalCount,
                Schools = schools
            };
        }

        public static EduSchoolArea2 GetSchoolAreaByID2(string id)
        {
            EduSchoolArea2 schoolArea = null;

            var sqlSchoolArea = "select ID,Name,Area,Districts,SType,SchoolID,Name2,ST_AsText(Geometry) Geometry from edu_school t where schoolid=@schoolid";
            var sqlSchool = "select ID,Name,ShortName,SchoolType,County,Street,Address,Postcode,Telephone,ComplaintsHotline,Website,Email,SchoolNature,SchoolDistrict,WorkTime,Abstract,X Lng,Y Lat,SType,SchoolID,ST_AsText(Geometry) Geometry from edu_school t where schoolid=@schoolid";
            MySql.Data.MySqlClient.MySqlParameter idPar = new MySql.Data.MySqlClient.MySqlParameter("@schoolid", id);
            var dtSchoolArea = SystemUtils.MySQLComDbContext.GetDataTable(sqlSchoolArea, System.Data.CommandType.Text, idPar);
            schoolArea = EntityUtils.DataRowToEntity<EduSchoolArea2>(dtSchoolArea.Rows[0]);

            if (schoolArea != null)
            {
                var dtSchool = SystemUtils.MySQLComDbContext.GetDataTable(sqlSchool, System.Data.CommandType.Text, idPar);
                schoolArea.School = EntityUtils.DataRowToEntity<EduSchool2>(dtSchool.Rows[0]);
            }
            return schoolArea;
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
        public int Count;
        public List<EduSchool2> Schools;
    }

    public class SchoolSearchResult
    {
        public int Count;
        public List<EduSchool> Schools;
    }
}
