using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.Test.Others
{
    class ScoreAnalyze
    {

        static void Analyze()
        {
            string filePath = @"C:\Users\chentao\Desktop\七年级登分表.xlsx";
            string workSheetName = "七年级考场名单";

            string groupField = "班级";
            string[] calculateFields = { "语文", "数学", "英语", "社会", "科学" };

            double best = 85;
            double better = 60;

            DataTable dtExcel = new DataTable();
            OleDbConnection con = new OleDbConnection(
                string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended properties=\"Excel 12.0;Imex=1;HDR=Yes;\"", filePath));
            OleDbDataAdapter adapter = new OleDbDataAdapter("Select * from [" + workSheetName + "$]", con);

            con.Open();
            adapter.FillSchema(dtExcel, SchemaType.Mapped);
            adapter.Fill(dtExcel);
            con.Close();
            dtExcel.TableName = workSheetName;

            var resultList = new List<Score>();
            foreach (var cField in calculateFields)
            {
                var result = (from r in dtExcel.AsEnumerable()
                              group r by r.Field<string>(groupField) into g
                              select new Score
                              {
                                  Class = g.Key,
                                  Subject = cField,
                                  Average = Math.Round(g.Average(p => p.Field<double>(cField)), 2, MidpointRounding.AwayFromZero),
                                  Top85 = Math.Round(100.0 * g.Where(p => p.Field<double>(cField) >= best).Count() / g.Count(), 2, MidpointRounding.AwayFromZero),
                                  Top60 = Math.Round(100.0 * g.Where(p => p.Field<double>(cField) >= better).Count() / g.Count(), 2, MidpointRounding.AwayFromZero)
                              }).ToList();
                resultList.AddRange(result);
            }

            resultList = resultList.OrderBy(p => p.Class).ThenBy(p => p.Subject).ToList();

            StringBuilder sb = new StringBuilder("班级\t学科\t平均分\t优秀率\t及格率\n");

            foreach (var s in resultList)
            {
                sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\n", s.Class, s.Subject, s.Average, s.Top85, s.Top60);
            }

            string ss = sb.ToString();
        }
    }
    public class Score
    {
        public string Class;
        public string Subject;
        public double Average;
        public double Top85;
        public double Top60;
    }
}
