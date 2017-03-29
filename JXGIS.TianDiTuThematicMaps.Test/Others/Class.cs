using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.Test
{
    public class Class
    {
        private int _GradeStudentCount = 0;
        private double _ARatio = 0.2;
        private double _ERatio = 0.2;

        public Class(string ClassName, List<Student> students, int gradeStudentCount, double aRatio = 0.2, double eRatio = 0.2)
        {
            this.ClassName = ClassName;
            this.Students = students;
            this._GradeStudentCount = gradeStudentCount;
            this._ARatio = aRatio;
            this._ERatio = eRatio;
        }

        public List<Student> Students { get; set; }

        public string ClassName { get; set; }

        public int StudentCount
        {
            get
            {
                return Students == null ? 0 : Students.Count;
            }
        }

        public int GetTopCount(int topNumber)
        {
            int count = 0;
            if (Students != null)
            {
                count = Students.Where(p => p.Rank <= topNumber).Count();
            }
            return count;
        }

        public int GetLastCount(int lastNumber, int totalCount)
        {
            int count = 0;
            if (Students != null)
            {
                count = Students.Where(s => s.Rank >= totalCount - lastNumber).Count();
            }
            return count;
        }

        public double GetSubjectAverageScore(string subject)
        {
            return Students.Average(s => s[subject].Score);
        }

        public int GetScoreRangeCount(string subject, double min, double max, double totalScore = 100)
        {
            var count = 0;
            if (Students != null)
            {
                count = Students.Where(s => 100 * s[subject].Score / totalScore >= min && 100 * s[subject].Score / totalScore < max).Count();
            }
            return count;
        }

        public double GetAScore(string subject, int totalStudentCount)
        {
            double score = 0;
            if (Students != null)
            {
                int maxRank = (int)Math.Round(totalStudentCount * this._ARatio, 0, MidpointRounding.AwayFromZero);
                score = Students.Where(s => s[subject].Rank <= maxRank).Min(s => s[subject].Score);
            }
            return score;
        }

        public int GetACount(string subject, int totalStudentCount)
        {
            int count = 0;
            if (Students != null)
            {
                int maxRank = (int)Math.Round(totalStudentCount * this._ARatio, 0, MidpointRounding.AwayFromZero);
                count = Students.Where(s => s[subject].Rank <= maxRank).Count();
            }
            return count;
        }

        public double GetARatio(string subject, int totalStudentCount)
        {
            return 100.0 * this.GetACount(subject, totalStudentCount) / this.StudentCount;
        }

        public double GetEScore(string subject, int totalStudentCount)
        {
            double score = 0;
            if (Students != null)
            {
                int minRank = (int)(totalStudentCount * (1 - this._ERatio));
                score = Students.Where(s => s[subject].Rank >= minRank).Max(s => s[subject].Score);
            }
            return score;
        }

        public int GetECount(string subject, int totalStudentCount)
        {
            int count = 0;
            if (Students != null)
            {
                int minRank = (int)(totalStudentCount * (1 - this._ERatio));
                count = Students.Where(s => s[subject].Rank >= minRank).Count();
            }
            return count;
        }

        public double GetERatio(string subject, int totalStudentCount)
        {
            return 100.0 * this.GetECount(subject, totalStudentCount) / this.StudentCount;
        }

        #region 扩展属性

        /// <summary>
        /// 平均分
        /// </summary>
        public double AverageScore
        {
            get
            {
                return this.GetSubjectAverageScore(string.Empty);
            }
        }
        #region 年级分布

        /// <summary>
        /// 年级前十个数
        /// </summary>
        public int Top10Count
        {
            get
            {
                return this.GetTopCount(10);

            }
        }

        /// <summary>
        /// 年级前二十个数
        /// </summary>
        public int Top20Count
        {
            get
            {
                return this.GetTopCount(20);

            }
        }

        /// <summary>
        /// 年级前五十个数
        /// </summary>
        public int Top50Count
        {
            get
            {
                return this.GetTopCount(50);

            }
        }

        /// <summary>
        /// 年级前八十个数
        /// </summary>
        public int Top80Count
        {
            get
            {
                return this.GetTopCount(80);

            }
        }

        /// <summary>
        /// 年级后二十个数
        /// </summary>
        public int Last20Count
        {
            get
            {
                return this.GetLastCount(20, this._GradeStudentCount);

            }
        }
        #endregion

        #region A、E分析
        public double AScore
        {
            get
            {
                return this.GetAScore(string.Empty, this._GradeStudentCount);
            }
        }

        public double ACount
        {
            get
            {
                return this.GetACount(string.Empty, this._GradeStudentCount);
            }
        }

        public double ARatio
        {
            get
            {
                return 100 * this.ACount / this.StudentCount;
            }
        }

        public double EScore
        {
            get
            {
                return this.GetEScore(string.Empty, this._GradeStudentCount);
            }
        }

        public double ECount
        {
            get
            {
                return this.GetECount(string.Empty, this._GradeStudentCount);
            }
        }

        public double ERatio
        {
            get
            {
                return 100 * this.ECount / this.StudentCount;
            }
        }

        #endregion

        #endregion
    }
}
