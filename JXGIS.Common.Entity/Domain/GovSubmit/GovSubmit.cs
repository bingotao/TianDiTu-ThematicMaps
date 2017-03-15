using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;
using Newtonsoft.Json;

namespace JXGIS.Common.Entity
{
    [Table("GovSubmit")]
    public class GovSubmit
    {
        [Key]
        [Column("ID"), Display(Name = "ID")]

        public string ID { get; set; }

        [Column("Name"), Display(Name = "名称")]
        public string Name { get; set; }

        [Column("City"), Display(Name = "所在市")]
        public string City { get; set; }

        [Column("County"), Display(Name = "所在区（县）")]

        public string County { get; set; }

        [Column("Town"), Display(Name = "所在乡镇")]
        public string Town { get; set; }

        [Column("Address"), Display(Name = "地址")]
        public string Address { get; set; }

        [Column("Postcode"), Display(Name = "邮编")]
        public string Postcode { get; set; }

        [Column("Telephone"), Display(Name = "电话")]
        public string Telephone { get; set; }

        [Column("Website"), Display(Name = "网站")]
        public string Website { get; set; }

        [Column("Email"), Display(Name = "邮箱")]
        public string Email { get; set; }

        [Column("WorkTime"), Display(Name = "工作时间")]
        public string WorkTime { get; set; }

        [Column("ServiceTelephone"), Display(Name = "服务电话")]
        public string ServiceTelephone { get; set; }

        [Column("BriefIntroduction"), Display(Name = "简介")]
        public string BriefIntroduction { get; set; }

        [Column("SubmitPerson"), Display(Name = "报送人")]
        public string SubmitPerson { get; set; }

        [Column("SubmitDepartment"), Display(Name = "报送部门")]
        public string SubmitDepartment { get; set; }

        [Column("SubmitTime"), Display(Name = "报送时间")]
        public string SubmitTime { get; set; }

        [Column("CheckPerson"), Display(Name = "校核人")]
        public string CheckPerson { get; set; }

        [Column("CheckTime"), Display(Name = "校核时间")]
        public string CheckTime { get; set; }

        [Column("CheckState"), Display(Name = "校核结果")]
        public string CheckState { get; set; }

        [Column("CheckInstruction"), Display(Name = "校核说明")]
        public string CheckInstruction { get; set; }

        [Column("PublishPerson"), Display(Name = "发布人")]
        public string PublishPerson { get; set; }

        [Column("PublishTime"), Display(Name = "发布时间")]
        public string PublishTime { get; set; }

        [Column("PublishResult"), Display(Name = "发布结果")]
        public string PublishResult { get; set; }

        [Column("PublishInstruction"), Display(Name = "发布说明")]
        public string PublishInstruction { get; set; }

        [Column("SubmitState"), Display(Name = "报送状态")]
        public string SubmitState { get; set; }

        [Column("SerialNumber"), Display(Name = "数据编号")]
        public string SerialNumber { get; set; }

        [Column("LayerName"), Display(Name = "图层名")]
        public string LayerName { get; set; }

        [Column("TicketPrice"), Display(Name = "门票")]
        public string TicketPrice { get; set; }

        [Column("TourismCharacteristic"), Display(Name = "特色")]
        public string TourismCharacteristic { get; set; }

        [Column("ShortName"), Display(Name = "简称")]
        public string ShortName { get; set; }

        [Column("Property"), Display(Name = "性质")]
        public string Property { get; set; }

        [Column("IsRetireOpen"), Display(Name = "是否开通离休")]
        public string IsRetireOpen { get; set; }

        [Column("MedicalProperty"), Display(Name = "医保定点性质")]
        public string MedicalProperty { get; set; }

        [Column("MedicalArea"), Display(Name = "医保定点统筹区")]
        public string MedicalArea { get; set; }

        [Column("MedicalBelongTo"), Display(Name = "医保定点所属")]
        public string MedicalBelongTo { get; set; }

        [Column("BusLine"), Display(Name = "开通班次")]
        public string BusLine { get; set; }

        [Column("DailyThroughput"), Display(Name = "日处理量")]
        public string DailyThroughput { get; set; }

        [Column("MainProduct"), Display(Name = "主要产品")]
        public string MainProduct { get; set; }

        [Column("CulturalSerialNumber"), Display(Name = "文化遗产编号")]
        public string CulturalSerialNumber { get; set; }

        [Column("Inheritor"), Display(Name = "传承人")]
        public string Inheritor { get; set; }

        [Column("JusticeScope"), Display(Name = "公证范围")]
        public string JusticeScope { get; set; }

        [Column("Type"), Display(Name = "类型")]
        public string Type { get; set; }

        [Column("Grade"), Display(Name = "等级")]
        public string Grade { get; set; }

        [Column("BicycleCount"), Display(Name = "自行车数")]
        public string BicycleCount { get; set; }

        [Column("PeopleCount"), Display(Name = "人数")]
        public string PeopleCount { get; set; }

        [Column("ContactPerson"), Display(Name = "联系人")]
        public string ContactPerson { get; set; }

        [Column("CoreIndustry"), Display(Name = "核心产业")]
        public string CoreIndustry { get; set; }

        [Column("ParkingCount"), Display(Name = "车位数")]
        public string ParkingCount { get; set; }

        [Column("TombCount"), Display(Name = "墓穴数")]
        public string TombCount { get; set; }

        [Column("BedCount"), Display(Name = "床位数")]
        public string BedCount { get; set; }

        [Column("LineSerialNumber"), Display(Name = "线路编号")]
        public string LineSerialNumber { get; set; }

        [Column("Mileage"), Display(Name = "里程")]
        public string Mileage { get; set; }

        [Column("PutInTime"), Display(Name = "通车时间")]
        public string PutInTime { get; set; }

        [Column("Geometry"), Display(Name = "几何图形")]
        //[JsonIgnore]
        public DbGeography Geometry { get; set; }

        //[NotMapped]
        //public double? X { get { return Geometry.Longitude; } }

        //[NotMapped]
        //public double? Y { get { return Geometry.Latitude; } }
    }
}