using Aspose.Cells;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib
{
    public class HtmlTableToExcel
    {
        private static string sHeader = "<html xmlns:x='urn:schemas-microsoft-com:office:excel'><meta http-equiv='Content-Type' content='text/html; charset=gb2312'><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{0}</x:Name><x:WorksheetOptions><x:Print><x:ValidPrinterInfo /></x:Print></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></header><body>{1}</body>";
        private string sHtmlTable = string.Empty;

        public HtmlTableToExcel(string sTable, string sSheetName)
        {
            this.sHtmlTable = string.Format(sHeader, sSheetName, sTable);
        }

        public string SaveAs(string sPath, int[,] iRange)
        {
            Stream stream = this.GetStream();
            LoadOptions loadOptions = new LoadOptions(LoadFormat.Html);
            Workbook workbook = new Workbook(stream, loadOptions);
            Style style = SetStyle(workbook);
            Worksheet worksheet = workbook.Worksheets[0];
            Range range = worksheet.Cells.CreateRange(iRange[0, 0], iRange[0, 1], iRange[1, 0], iRange[1, 1]);
            range.SetStyle(style);
            workbook.Save(sPath, new XlsSaveOptions(SaveFormat.Excel97To2003));
            stream.Close();
            return sPath;
        }

        public MemoryStream Save(int[,] iRange)
        {
            Stream stream = this.GetStream();
            LoadOptions loadOptions = new LoadOptions(LoadFormat.Html);
            Workbook workbook = new Workbook(stream, loadOptions);
            Style style = SetStyle(workbook);
            Worksheet worksheet = workbook.Worksheets[0];
            Range range = worksheet.Cells.CreateRange(iRange[0, 0], iRange[0, 1], iRange[1, 0], iRange[1, 1]);
            range.SetStyle(style);
            MemoryStream mStream = new MemoryStream();
            workbook.Save(mStream, new XlsSaveOptions(SaveFormat.Excel97To2003));
            return mStream;
        }

        public Stream GetStream()
        {
            MemoryStream stream = new MemoryStream();
            StreamWriter writer = new StreamWriter(stream, Encoding.UTF8);
            writer.WriteLine(this.sHtmlTable);
            writer.Flush();
            return stream;
        }

        private Style SetStyle(Workbook workbook)
        {
            Style style = workbook.Styles[workbook.Styles.Add()];
            style.HorizontalAlignment = TextAlignmentType.CenterAcross;
            style.Pattern = BackgroundType.Solid;
            style.Borders[BorderType.TopBorder].LineStyle = CellBorderType.Thin;
            style.Borders[BorderType.TopBorder].Color = Color.Black;
            style.Borders[BorderType.BottomBorder].LineStyle = CellBorderType.Thin;
            style.Borders[BorderType.BottomBorder].Color = Color.Black;
            style.Borders[BorderType.LeftBorder].LineStyle = CellBorderType.Thin;
            style.Borders[BorderType.LeftBorder].Color = Color.Black;
            style.Borders[BorderType.RightBorder].LineStyle = CellBorderType.Thin;
            style.Borders[BorderType.RightBorder].Color = Color.Black;
            return style;
        }
    }
}
