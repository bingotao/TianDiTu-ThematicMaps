using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JXGIS.Common.Entity
{
    [Table("GSSymbol")]
    public class GSSymbol
    {
        [Key]
        [Column("ID")]
        public string ID { get; set; }

        [Column("LayerName")]
        public string LayerName { get; set; }

        [Column("MarkerSymbolClass")]
        public string MarkerSymbolClass { get; set; }

        [Column("Symbol")]
        public string Symbol { get; set; }

    }
}
