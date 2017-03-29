using JXGIS.Common.BaseLib;
using JXGIS.TianDiTuThematicMaps.Business;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
//using alatas.GeoJSON4EntityFramework;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Spatial;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;
using JXGIS.Common.Entity;
using System.Web;
using System.Data.OleDb;

namespace JXGIS.Common.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            //var url = "http://map.tianditu.com/query.shtml?postStr={'orig':'120.58678,30.84595','dest':'120.63566,30.84645','style':'0','mid':'120.60238,30.83865;'}&type=search";
            //url = "http://api.tianditu.com/apiserver/ajaxproxy?proxyReqUrl=" + HttpUtility.UrlEncode(url);
            //var str = ServiceUtils.Get(url, Encoding.UTF8);



            //{ 'startposition':'120.10844,30.32127','endposition':'120.17882,30.30514',linetype: '1'}
            //{ 'orig':'120.10844,30.32127','dest':'120.17111,30.32426','style':'0','mid':'120.12697,30.33075;120.14946,30.32672;'}
            //var s = RoutePlanningUtils.GetRoute(new RouteOptions()
            //{
            //    Start = new Point() { X = 120.10844, Y = 30.32127 },
            //    End = new Point() { X = 120.17882, Y = 30.30514 },
            //    PlanningType = PlanningType.Bus,
            //    TripMode = 1
            //});

            //var s = RoutePlanningUtils.GetRoute(new RouteOptions()
            //{
            //    Start = new Point() { X = 120.10844, Y = 30.32127 },
            //    End = new Point() { X = 120.17882, Y = 30.30514 },
            //    Middle = new List<Point>() { new Point() { X = 120.12697, Y = 30.33075 }, new Point() { X = 120.14946, Y = 30.32672 } },
            //    PlanningType = (PlanningType)1,
            //    TripMode = 0
            //});


            //var s0 = PoliceOfficeUtils.GetPoliceOfficeInRegion(DbGeography.FromText("POINT(120.773 30.71)"), AdminRegionLevel.City);
            //var s1 = PoliceOfficeUtils.GetPoliceOfficeInRegion(DbGeography.FromText("POINT(120.773 30.71)"), AdminRegionLevel.County);
            //var s2 = PoliceOfficeUtils.GetPoliceOfficeInRegion(DbGeography.FromText("POINT(120.773 30.71)"), AdminRegionLevel.Town);
            //var s3 = PoliceOfficeUtils.GetPoliceOfficeInRegion(DbGeography.FromText("POINT(120.773 30.71)"), AdminRegionLevel.Village);

            //var s4 = PoliceOfficeUtils.GetPoliceOfficeInRegion(DbGeography.FromText("POINT(120.773 30.71)"), AdminRegionLevel.All);


            //var police = GetOffice(s4.Where(p => string.IsNullOrEmpty(p.Parent)).First(), s4);
            //var s = Newtonsoft.Json.JsonConvert.SerializeObject(police);


            //var office = PoliceOfficeUtils.GetOfficeTree();


            //var students = ScoreAnalyze.GetStudents(@"E:\others\MathTeachingAids\Documents\期末成绩分析.xlsx", "七年级成绩汇总");
            var students = ScoreAnalyze.GetStudents(@"E:\others\MathTeachingAids\Documents\七年级登分表3.20.xlsx", "七年级成绩（可排序)");

            var totalCount = students.Count;
            var classNames = (from s in students select s.ClassName).Distinct().OrderBy(s => s).ToList();
            var classes = new List<Class>();
            ScoreAnalyze.RankAllSubjects(students);

            //  全体学生分数及各科排名
            var sb = new StringBuilder("姓名\t班级\t语文\t\t数学\t\t英语\t\t科学\t\t社会\t\t总分\t\n");
            foreach (var s in students)
            {
                sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}\t{8}\t{9}\t{10}\t{11}\t{12}\t{13}\n",
                    s.Name, s.ClassName,
                    s.ChineseScore, s.ChineseRank,
                    s.MathScore, s.MathRank,
                    s.EnglishScore, s.EnglishRank,
                    s.ScienceScore, s.ScienceRank,
                    s.SocietyScore, s.SocietyRank,
                    s.Score, s.Rank);
            }
            var studentsScore = sb.ToString();

            //  班级成绩分析

            sb = new StringBuilder("班级\t人数\t平均分\t前10\t前20\t前50\t前80\t后20\n");
            foreach (var c in classNames)
            {
                var sTemp = students.Where(s => s.ClassName == c).ToList();
                var cls = new Class(c, sTemp, totalCount);
                classes.Add(cls);
                sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}\n",
                    c, cls.StudentCount, cls.AverageScore,
                    cls.Top10Count, cls.Top20Count, cls.Top50Count, cls.Top80Count, cls.Last20Count);
            }
            classes.Add(new Class("7年级", students, totalCount));
            var classAnalyze = sb.ToString();

            //  班级学科成绩分析

            sb = new StringBuilder("学科\t班级\t分数>=95\t95>分数>=90\t90>分数>=85\t85>分数>=80\t80>分数>=75\t75>分数>=70\t70>分数>=60\t分数<60\tA分\tA数\tA率\tE分\tE数\tE率\n");
            double[,] ranges = new double[,] {
                { 95,double.MaxValue},
                { 90,95},
                { 85,90},
                { 80,85},
                { 75,80},
                { 70,75},
                { 60,70},
                { double.MinValue,60}
            };
            //string[] subjects = new string[] { "Chinese", "Math", "English", "Society", "Science" };

            foreach (var subject in Subject.Subjects)
            {
                foreach (var c in classes)
                {
                    var subjectName = subject.Name;

                    sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}\t{8}\t{9}\t{10}\t{11}\t{12}\t{13}\t{14}\t{15}\n",
                        subject.Aliases[0], c.ClassName,
                        c.GetScoreRangeCount(subjectName, ranges[0, 0], ranges[0, 1], subject.TotalScore),
                        c.GetScoreRangeCount(subjectName, ranges[1, 0], ranges[1, 1], subject.TotalScore),
                        c.GetScoreRangeCount(subjectName, ranges[2, 0], ranges[2, 1], subject.TotalScore),
                        c.GetScoreRangeCount(subjectName, ranges[3, 0], ranges[3, 1], subject.TotalScore),
                        c.GetScoreRangeCount(subjectName, ranges[4, 0], ranges[4, 1], subject.TotalScore),
                        c.GetScoreRangeCount(subjectName, ranges[5, 0], ranges[5, 1], subject.TotalScore),
                        c.GetScoreRangeCount(subjectName, ranges[6, 0], ranges[6, 1], subject.TotalScore),
                        c.GetScoreRangeCount(subjectName, ranges[7, 0], ranges[7, 1], subject.TotalScore),

                        c.GetAScore(subjectName, totalCount),
                        c.GetACount(subjectName, totalCount),
                        c.GetARatio(subjectName, totalCount),
                        c.GetEScore(subjectName, totalCount),
                        c.GetECount(subjectName, totalCount),
                        c.GetERatio(subjectName, totalCount)
                        );
                }
            }

            string classSubjectAnalyze = sb.ToString();
        }



    }
}

