﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.Entity
{
    public class SchoolLayer : Layer
    {
        public List<School> Schools { get; set; }
    }

    public class School
    {
        public string type = "Feature";

        public EduSchool properties { get; set; }

        public SchoolGeo geometry { get; set; }
    }


    public class SchoolGeo
    {
        public string type = "Point";
        public double[] coordinates;
    }
}