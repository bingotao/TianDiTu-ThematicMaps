using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.Test
{
    public class Student
    {
        private static PropertyInfo[] _props = typeof(Student).GetProperties();

        public string ClassName { get; set; }

        public string Name { get; set; }

        public double ChineseScore { get; set; }

        public int ChineseRank { get; set; }

        public double MathScore { get; set; }

        public int MathRank { get; set; }

        public double EnglishScore { get; set; }

        public int EnglishRank { get; set; }

        public double ScienceScore { get; set; }

        public int ScienceRank { get; set; }

        public double SocietyScore { get; set; }

        public int SocietyRank { get; set; }


        //private double _score = 0;
        public double Score
        {
            get
            {
                return ChineseScore + MathScore + EnglishScore + SocietyScore + ScienceScore;
            }

            set { }
        }

        public int Rank { get; set; }


        public SubjectScore this[string Subject]
        {
            get
            {
                var scoreProp = _props.Where(p => p.Name == Subject + "Score").FirstOrDefault();
                var rankProp = _props.Where(p => p.Name == Subject + "Rank").FirstOrDefault();

                return new SubjectScore
                {
                    Name = Subject,
                    Score = (double)scoreProp.GetValue(this),
                    Rank = (int)rankProp.GetValue(this)
                };
            }

            set
            {
                var scoreProp = _props.Where(p => p.Name == Subject + "Score").FirstOrDefault();
                var rankProp = _props.Where(p => p.Name == Subject + "Rank").FirstOrDefault();

                scoreProp.SetValue(this, value.Score);
                rankProp.SetValue(this, value.Rank);
            }
        }
    }


}
