using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using Newtonsoft.Json;

namespace JXGIS.Common.Entity
{
    [Table("PoliceOffice")]
    public class PoliceOffice
    {
        [Column("ID"), Key]
        public string ID { get; set; }

        [Column("Type")]
        public int Type { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("SSGAJ")]
        public string SSGAJ { get; set; }

        [Column("SSFJ")]
        public string SSFJ { get; set; }

        [Column("SSPCS")]
        public string SSPCS { get; set; }

        [Column("City")]
        public string City { get; set; }

        [Column("County")]
        public string County { get; set; }

        [Column("Town")]
        public string Town { get; set; }

        [Column("FeatureGUID")]
        public string FeatureGUID { get; set; }

        [Column("Geometry"), JsonIgnore]
        public DbGeography Geometry { get; set; }

        [Column("Parent")]
        public string Parent { get; set; }

        [NotMapped]
        public List<PoliceOffice> SubOffice { get; set; }
    }
}
