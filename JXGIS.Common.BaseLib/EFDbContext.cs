using JXGIS.Common.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib
{
    public class EFDbContext : DbContext
    {

        public EFDbContext() : base((string)SystemUtility.Config.DbConStr)
        {
            this.Database.Initialize(false);
        }

        //重新OnModelCreating方法
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("dbo");
        }

        public DbSet<EduSchool> EduSchool { get; set; }
    }
}