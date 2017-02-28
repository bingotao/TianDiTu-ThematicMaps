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
    [Table("Edu_Residence")]
    public class EduResidence
    {
        [Key]
        [Column("FEATUREGUID")]
        public string ID { get; set; }


        [Column("NAME")]
        public string Name { get; set; }

        [Column("SHORTNAME")]

        public string ShortName { get; set; }

        [Column("ADDRESS")]

        public string Address { get; set; }

        [Column("FSCALE")]
        public double Index { get; set; }

        [Column("X")]
        public double X { get; set; }

        [Column("Y")]
        public double Y { get; set; }

        [Column("Geometry")]
        public DbGeography Geometry { get; set; }

    }
}
