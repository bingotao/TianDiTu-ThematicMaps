﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.Entity
{
    [Table("Edu_School")]
    public class EduSchool
    {
        [Key]
        [Column("ID")]
        public string ID { get; set; }

        [Column("SchoolID")]
        public string SchoolID { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("ShortName")]
        public string ShortName { get; set; }

        [Column("SchoolType")]
        public string SchoolType { get; set; }

        [Column("County")]
        public string County { get; set; }

        [Column("Street")]
        public string Street { get; set; }

        [Column("Address")]
        public string Address { get; set; }

        [Column("Postcode")]
        public string Postcode { get; set; }

        [Column("Telephone")]
        public string Telephone { get; set; }

        [Column("ComplaintsHotline")]
        public string ComplaintsHotline { get; set; }

        [Column("Website")]
        public string Website { get; set; }

        [Column("Email")]
        public string Email { get; set; }

        [Column("SchoolNature")]
        public string SchoolNature { get; set; }

        [Column("SchoolDistrict")]
        public string SchoolDistrict { get; set; }

        [Column("WorkTime")]
        public string WorkTime { get; set; }

        [Column("Abstract")]
        public string Abstract { get; set; }

        [Column("SType")]
        public string SType { get; set; }

        [JsonIgnore]
        [Column("Geometry")]
        public DbGeography Geometry { get; set; }

        [NotMapped]
        public double Lat { get { return Geometry == null ? 0 : (Geometry.Latitude ?? 0); } }

        [NotMapped]
        public double Lng { get { return Geometry == null ? 0 : (Geometry.Longitude ?? 0); } }

    }
}
