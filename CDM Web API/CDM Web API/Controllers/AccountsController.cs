using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CDM_Web_API.Models;
using CDM_Web_API.AccountDTO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using CDM_Web_API.CustomerDTO;

namespace CDM_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountsController : ControllerBase
    {
        private readonly ApiDbContext _context;
        //to map the dto to base class and vice versa
        private readonly IMapper _mapper;

        public AccountsController(ApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Accounts
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        //{
        //    return await _context.Accounts.ToListAsync();
        //}

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetAccountDto>> GetAccount(string id)
        {
            //Find the record of customer with help of email
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }
            var records1 = _mapper.Map<GetAccountDto>(account);

            return Ok(records1);
        }

        [HttpGet]
        [Route("/api/Accounts$like")]
        public async Task<ActionResult<IEnumerable<DispAccountDto>>> SearchAccounts([FromQuery] string search)
        {
            var accounts = await _context.Accounts.Where(d => d.accountName.Contains(search)
            || d.location.Contains(search) || d.accountId.Contains(search) || d.email.Contains(search) || d.yearOfEst.Contains(search)).ToListAsync();
            var records = _mapper.Map<List<DispAccountDto>>(accounts);
            return Ok(records);
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(string id, PutAccountDto putAccountDto)
        {
            //check if any account exists or not
            if (id != putAccountDto.email)
            {
                return BadRequest();
            }
            //get the account detail
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            //reafactoring the data
            _mapper.Map(putAccountDto, account);
            //save the modified state
            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(AddAccountDto addAccountDto)
        {
            //gets the data dan save the data
            var account = _mapper.Map<Account>(addAccountDto);
            _context.Accounts.Add(account);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AccountExists(account.email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAccount", new { id = account.email }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(string id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(string id)
        {
            return _context.Accounts.Any(e => e.email == id);
        }
    }
}
