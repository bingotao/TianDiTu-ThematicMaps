using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace JXGIS.Common.Entity
{
    [Table("AdministrativeRegion")]
    public class AdministrativeRegion
    {
        [Column("ID"), Key]
        public string ID { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("Type")]
        public int Type { get; set; }

        [Column("Geometry")]
        public DbGeography Geometry { get; set; }
    }
}
