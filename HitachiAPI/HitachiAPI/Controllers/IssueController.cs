using HitachiAPI.Data;
using HitachiAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing;
using System.IO;

namespace HitachiAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IssueController : ControllerBase
    {
        private HitachiRepairsContext _dbContext;

        public IssueController(HitachiRepairsContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("GetRepair")]
        public IActionResult Get([FromBody] GetRequests filtros)
        {
            try
            {
                var repairs = from r in _dbContext.repairInfo
                               select r;

                if (!String.IsNullOrEmpty(filtros.issue))
                {
                    repairs = repairs.Where(r => r.Issue.Equals(filtros.issue));
                }
                if (!String.IsNullOrEmpty(filtros.laptopType))
                {
                    repairs = repairs.Where(r => r.LaptopType.Equals(filtros.laptopType));
                }
                if (!String.IsNullOrEmpty(filtros.date))
                {
                    repairs = repairs.Where(r => r.Date.Equals(DateTime.Parse(filtros.date)));
                }

                var list = repairs.ToList();

                if (list.Count == 0)
                {
                    return StatusCode(404, "No Repair Requests Found");
                }

                var returnRequests = new List<RepairRequest>();
                foreach(var request in list)
                {
                    var newRequest = new RepairRequest();
                    newRequest.Id = request.Id;
                    newRequest.Name = request.Name;
                    newRequest.Email = request.Email;
                    newRequest.LaptopType = request.LaptopType;
                    newRequest.Issue = request.Issue;
                    newRequest.Notes = request.Notes;
                    newRequest.Date = request.Date.ToString("yyyy/MM/dd");
                    newRequest.SerialNumber = request.SerialNumber;
                    newRequest.Picture = request.Picture != null ? Convert.ToBase64String(request.Picture) : "";

                    returnRequests.Add(newRequest);
                }

                return Ok(returnRequests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("CreateRepair")]
        public IActionResult Create([FromBody] RepairRequest request)
        {

            RepairInfo repair = new RepairInfo();
            repair.Name = request.Name;
            repair.Email = request.Email;
            repair.LaptopType = request.LaptopType;
            repair.Issue = request.Issue;
            repair.Notes = request.Notes;
            repair.Date = DateTime.Parse(request.Date);
            repair.SerialNumber = request.SerialNumber;

            if (!String.IsNullOrWhiteSpace(request.Picture))
            {
                byte[] img = Convert.FromBase64String(request.Picture);

                repair.Picture = img;
            }

            try
            {
                var response = _dbContext.repairInfo.Add(repair);
                _dbContext.SaveChanges();

                return Ok(response.Entity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

       /* [HttpPut("UpdateRepair")]
        public IActionResult Update([FromBody] RepairRequest request)
        {
            try
            {
                var repair = _dbContext.repairInfo.FirstOrDefault(x => x.Id == request.Id);
                if (repair == null)
                {
                    return StatusCode(404, "Repair not found");
                }

                repair.Name = request.Name;
                repair.Email = request.Email;
                repair.LaptopType = request.LaptopType;
                repair.Issue = request.Issue;
                repair.Notes = request.Notes;
                repair.Date = DateTime.Parse(request.Date);
                repair.SerialNumber = request.SerialNumber;

                _dbContext.Entry(repair).State = EntityState.Modified;
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error has occurred");
            }

            var repairs = _dbContext.repairInfo.ToList();
            return Ok(repairs);
        }

        [HttpDelete("DeleteRepair/{Id}")]
        public IActionResult Delete([FromRoute] int Id)
        {
            try
            {
                var repair = _dbContext.repairInfo.FirstOrDefault(x => x.Id == Id);
                if (repair == null)
                {
                    return StatusCode(404, "Repair not found");
                }

                _dbContext.Entry(repair).State = EntityState.Deleted;
                _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An Error has occurred");
            }

            var repairs = _dbContext.repairInfo.ToList();
            return Ok(repairs);
        }*/
    }
}
