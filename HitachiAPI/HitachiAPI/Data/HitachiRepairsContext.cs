using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HitachiAPI.Data
{
    public class HitachiRepairsContext : DbContext
    {
        public HitachiRepairsContext(DbContextOptions<HitachiRepairsContext> options) : base(options)
        {

        }

        public DbSet<RepairInfo> repairInfo { get; set; }
    }
}
