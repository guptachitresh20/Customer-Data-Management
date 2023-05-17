using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CDM_Web_API.Models;
using Microsoft.AspNetCore.Authorization;
using CDM_Web_API.Helper;
using System.Security.Policy;

namespace CDM_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LogsController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public LogsController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Logs
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Logs>>> GetLogs([FromQuery] int startIndex, [FromQuery] int pageSize)
        //{
        //    int totalCount = await _context.Logs.CountAsync();
        //    return await _context.Logs.Skip(startIndex).Take(pageSize).ToListAsync();
        //}

        [HttpGet]
        public async Task<ActionResult<PaginationResult<Logs>>> GetLogs([FromQuery] int startIndex, [FromQuery] int pageSize)
        {
            int totalCount = await _context.Logs.CountAsync();
            var items = await _context.Logs.OrderByDescending(x=>x.logId).Skip(startIndex).Take(pageSize).ToListAsync();
            return new PaginationResult<Logs>
            {
                Items = items,
                TotalCount = totalCount
            };
        }

        [HttpGet]
        [Route("/api/Logs$like")]
        public async Task<ActionResult<IEnumerable<Logs>>> SearchLogs([FromQuery] string search)
        {
            return Ok(await _context.Logs.Where(d => d.adminName.Contains(search) || d.customerName.Contains(search) || d.accountName.Contains(search) || d.sectionModified.Contains(search)
            || d.date.Contains(search) || d.time.Contains(search) || d.action.Contains(search)).ToListAsync());
        }

                // GET: api/Logs/5
                //[HttpGet("{id}")]
                //public async Task<ActionResult<Logs>> GetLogs(string id)
                //{
                //    var logs = await _context.Logs.FindAsync(id);

                //    if (logs == null)
                //    {
                //        return NotFound();
                //    }

                //    return logs;
                //}

                // PUT: api/Logs/5
                // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
                //[HttpPut("{id}")]
                //public async Task<IActionResult> PutLogs(string id, Logs logs)
                //{
                //    if (id != logs.logId)
                //    {
                //        return BadRequest();
                //    }

                //    _context.Entry(logs).State = EntityState.Modified;

                //    try
                //    {
                //        await _context.SaveChangesAsync();
                //    }
                //    catch (DbUpdateConcurrencyException)
                //    {
                //        if (!LogsExists(id))
                //        {
                //            return NotFound();
                //        }
                //        else
                //        {
                //            throw;
                //        }
                //    }

                //    return NoContent();
                //}

                // POST: api/Logs
                // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
                [HttpPost]
        public async Task<ActionResult<Logs>> PostLogs(Logs logs)
        {
            _context.Logs.Add(logs);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LogsExists(logs.logId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLogs", new { id = logs.logId }, logs);
        }

        // DELETE: api/Logs/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteLogs(string id)
        //{
        //    var logs = await _context.Logs.FindAsync(id);
        //    if (logs == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Logs.Remove(logs);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool LogsExists(int id)
        {
            return _context.Logs.Any(e => e.logId == id);
        }
    }
}
