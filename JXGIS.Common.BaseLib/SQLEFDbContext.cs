using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.Entity;

namespace JXGIS.Common.BaseLib
{

    public class SQLEFDbContext : DbContext
    {
        public SQLEFDbContext() : base((string)SystemUtils.Config.SQLDbConStr)
        {
            this.Database.Initialize(false);
        }

        //重新OnModelCreating方法
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("dbo");
        }

        public DbSet<EduSchool> EduSchool { get; set; }

        public DbSet<EduSchoolArea> EduSchoolArea { get; set; }

        public DbSet<EduResidence> EduResidence { get; set; }
    }
}