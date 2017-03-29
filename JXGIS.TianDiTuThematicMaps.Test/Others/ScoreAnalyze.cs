using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.Test
{
    class ScoreAnalyze
    {

        static void Analyze()
        {
            //string filePath = @"C:\Users\chentao\Desktop\七年级登分表.xlsx";
            //string workSheetName = "七年级考场名单";

            //string groupField = "班级";
            //string[] calculateFields = { "语文", "数学", "英语", "社会", "科学" };

            //double best = 85;
            //double better = 60;

            //DataTable dtExcel = new DataTable();
            //OleDbConnection con = new OleDbConnection(
            //    string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended properties=\"Excel 12.0;Imex=1;HDR=Yes;\"", filePath));
            //OleDbDataAdapter adapter = new OleDbDataAdapter("Select * from [" + workSheetName + "$]", con);

            //con.Open();
            //adapter.FillSchema(dtExcel, SchemaType.Mapped);
            //adapter.Fill(dtExcel);
            //con.Close();
            //dtExcel.TableName = workSheetName;

            //var resultList = new List<Student>();
            //foreach (var cField in calculateFields)
            //{
            //    var result = (from r in dtExcel.AsEnumerable()
            //                  group r by r.Field<string>(groupField) into g
            //                  select new Student
            //                  {
            //                      Class = g.Key,
            //                      Subject = cField,
            //                      Average = Math.Round(g.Average(p => p.Field<double>(cField)), 2, MidpointRounding.AwayFromZero),
            //                      Top85 = Math.Round(100.0 * g.Where(p => p.Field<double>(cField) >= best).Count() / g.Count(), 2, MidpointRounding.AwayFromZero),
            //                      Top60 = Math.Round(100.0 * g.Where(p => p.Field<double>(cField) >= better).Count() / g.Count(), 2, MidpointRounding.AwayFromZero)
            //                  }).ToList();
            //    resultList.AddRange(result);
            //}
            //resultList = resultList.OrderBy(p => p.Class).ThenBy(p => p.Subject).ToList();

            //StringBuilder sb = new StringBuilder("班级\t学科\t平均分\t优秀率\t及格率\n");

            //foreach (var s in resultList)
            //{
            //    sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\n", s.Class, s.Subject, s.Average, s.Top85, s.Top60);
            //}

            //string ss = sb.ToString();
        }


        public static List<Student> GetStudents(string filePath, string workSheetName)
        {
            DataTable dtExcel = new DataTable();
            List<Student> students = new List<Student>();
            using (OleDbConnection con =
                new OleDbConnection(string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended properties=\"Excel 12.0;Imex=1;HDR=Yes;\"", filePath)))
            {
                OleDbDataAdapter adapter = new OleDbDataAdapter("Select * from [" + workSheetName + "$]", con);
                con.Open();
                adapter.FillSchema(dtExcel, SchemaType.Mapped);
                adapter.Fill(dtExcel);
                con.Close();

                string nameField = null,
                        classField = null,
                        chineseField = null,
                        mathField = null,
                        englishField = null,
                        societyField = null,
                        scienceField = null;

                foreach (var alias in Header.Headers.Where(p => p.Name == "Name").FirstOrDefault().Aliases)
                {
                    if (dtExcel.Columns.Contains(alias))
                    {
                        nameField = alias;
                        break;
                    }
                }

                foreach (var alias in Header.Headers.Where(p => p.Name == "Class").FirstOrDefault().Aliases)
                {
                    if (dtExcel.Columns.Contains(alias))
                    {
                        classField = alias;
                        break;
                    }
                }

                foreach (var alias in Subject.Subjects.Where(p => p.Name == "Chinese").FirstOrDefault().Aliases)
                {
                    if (dtExcel.Columns.Contains(alias))
                    {
                        chineseField = alias;
                        break;
                    }
                }

                foreach (var alias in Subject.Subjects.Where(p => p.Name == "Math").FirstOrDefault().Aliases)
                {
                    if (dtExcel.Columns.Contains(alias))
                    {
                        mathField = alias;
                        break;
                    }
                }

                foreach (var alias in Subject.Subjects.Where(p => p.Name == "English").FirstOrDefault().Aliases)
                {
                    if (dtExcel.Columns.Contains(alias))
                    {
                        englishField = alias;
                        break;
                    }
                }

                foreach (var alias in Subject.Subjects.Where(p => p.Name == "Society").FirstOrDefault().Aliases)
                {
                    if (dtExcel.Columns.Contains(alias))
                    {
                        societyField = alias;
                        break;
                    }
                }

                foreach (var alias in Subject.Subjects.Where(p => p.Name == "Science").FirstOrDefault().Aliases)
                {
                    if (dtExcel.Columns.Contains(alias))
                    {
                        scienceField = alias;
                        break;
                    }
                }


                foreach (DataRow dr in dtExcel.Rows)
                {
                    students.Add(new Student()
                    {
                        Name = dr[nameField].ToString(),
                        ClassName = dr[classField].ToString(),
                        ChineseScore = (double)dr[chineseField],
                        MathScore = (double)dr[mathField],
                        EnglishScore = (double)dr[englishField],
                        ScienceScore = (double)dr[scienceField],
                        SocietyScore = (double)dr[societyField]
                    });
                }
            }

            return students;
        }

        public static void RankStudents(List<Student> students, string subject)
        {
            students = students.OrderByDescending(s => s[subject].Score).ToList();

            for (int i = 0, l = students.Count; i < l; i++)
            {
                var rank = i + 1;
                var score = students[i][subject].Score;
                if (i - 1 >= 0)
                {
                    var lastScore = students[i - 1][subject].Score;

                    if (lastScore == score)
                    {
                        rank = students[i - 1][subject].Rank;
                    }
                }
                students[i][subject] = new SubjectScore
                {
                    Name = subject,
                    Score = score,
                    Rank = rank
                };
            }
        }

        public static void RankAllSubjects(List<Student> students)
        {
            foreach (var subject in Subject.Subjects)
            {
                RankStudents(students, subject.Name);
            }
            RankStudents(students, "");
        }
    }
}
