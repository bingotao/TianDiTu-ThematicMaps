using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using alatas.GeoJSON4EntityFramework;

namespace JXGIS.Common.Entity
{
    [Table("Edu_SchoolArea")]
    public class EduSchoolArea
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("Area")]
        public string Area { get; set; }

        [Column("Districts")]
        public string Districts { get; set; }

        [Column("SType")]
        public string SType { get; set; }

        [Column("SchoolID")]
        public string SchoolID { get; set; }

        [JsonIgnore]
        [Column("Geometry")]
        public DbGeography Geometry { get; set; }

        [NotMapped]
        public GeoJsonGeometry GeoJson
        {
            get
            {
                return Geometry == null ? null : GeoJsonGeometry.FromDbGeography(Geometry);
            }
        }

        [ForeignKey("SchoolID")]
        public virtual EduSchool School { get; set; }
    }
}
