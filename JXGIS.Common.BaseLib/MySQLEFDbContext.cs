using JXGIS.Common.Entity;
using MySql.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class MySQLEFDbContext : DbContext
    {
        public MySQLEFDbContext() : base((string)SystemUtils.Config.MySQLDbConStr)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            string conStr = SystemUtils.Config.MySQLDbConStr.ToString();
            string[] constrs = conStr.Split(';');
            string uidStr = constrs.Where(p => p.ToUpper().IndexOf("UID") >= 0).FirstOrDefault();
            var uid = uidStr.Split('=')[1];
            modelBuilder.HasDefaultSchema(uid);
        }

        public DbSet<Test> Test { get; set; }
    }
}
