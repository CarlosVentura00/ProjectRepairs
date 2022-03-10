using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HitachiAPI.Data
{
    public class RepairInfo
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string LaptopType { get; set; }
        public string Issue { get; set; }
        public string Notes { get; set; }
        public DateTime Date { get; set; }
        public string SerialNumber { get; set; }
        public byte[]? Picture { get; set; }
    }
}
