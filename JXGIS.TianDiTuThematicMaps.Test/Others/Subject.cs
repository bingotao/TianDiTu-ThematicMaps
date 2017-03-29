using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.Test
{
    public class SubjectScore
    {
        public string Name { get; set; }
        public double Score { get; set; }
        public int Rank { get; set; }
    }

    public class Header
    {

        public string Name { get; set; }

        public string[] Aliases { get; set; }

        public static List<Header> Headers = new List<Header> {
            new Header { Name="Name",Aliases=new [] { "姓名" } },
            new Header { Name="Class",Aliases=new [] { "班级" } }
        };
    }

    public class Subject : Header
    {
        public int Index { get; set; }
        public double TotalScore { get; set; }

        public static List<Subject> Subjects { get; set; } = new List<Subject>() {
            new Subject { Index=1, Name="Chinese", Aliases=new string[] { "语文" }, TotalScore=100 },
            new Subject { Index=2, Name="Math", Aliases=new string[] { "数学" }, TotalScore=100 },
            new Subject { Index=3, Name="English", Aliases=new string[] { "英语", "外语" }, TotalScore=100 },
            new Subject { Index=4, Name="Society", Aliases=new string[] { "社会", "社思" }, TotalScore=100 },
            new Subject { Index=5, Name="Science", Aliases=new string[] { "科学" }, TotalScore=100 },
            new Subject { Index=6, Name="", Aliases=new string[] { "总分" }, TotalScore=500 }
        };
    }
}
