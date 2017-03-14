using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXGIS.Common.BaseLib.Attributes
{
    public class Column : ColumnAttribute
    {
        public Column() : base()
        {

        }

        public string AliasName { get; set; }

    }
}
