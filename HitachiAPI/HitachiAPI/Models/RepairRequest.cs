using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HitachiAPI.Models
{
    public class RepairRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string LaptopType { get; set; }
        public string Issue { get; set; }
        public string Notes { get; set; }
        public string Date { get; set; }
        public string SerialNumber { get; set; }
        public string Picture { get; set; }
    }
}
