using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CDM_Web_API.Models;
using CDM_Web_API.DTO;
using AutoMapper;
using System.Diagnostics.Metrics;
using CDM_Web_API.CustomerDTO;

namespace CDM_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;

        public CustomersController(ApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetCustomerDto>>> GetCustomers()
        {
            var records = await _context.Customers.ToListAsync();
            var records1 = _mapper.Map<List<GetCustomerDto>>(records);
            return Ok(records1);
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetCustomerDetailsDto>> GetCustomer(string id)
        {

            var customer = await _context.Customers.Include(q => q.Accounts).FirstOrDefaultAsync(q => q.gstin == id);

            if (customer == null)
            {
                return NotFound();
            }
            var customerDetailDto = _mapper.Map<GetCustomerDetailsDto>(customer);
            return Ok(customerDetailDto);
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(string id, PutCustomerDto putCustomerDto)
        {
            if (id != putCustomerDto.gstin)
            {
                return BadRequest();
            }
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            _mapper.Map(putCustomerDto, customer);
            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(AddCustomerDto addCustomerDto)
        {
            var customer = _mapper.Map<Customer>(addCustomerDto);
            _context.Customers.Add(customer);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CustomerExists(customer.gstin))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCustomer", new { id = customer.gstin }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(string id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(string id)
        {
            return _context.Customers.Any(e => e.gstin == id);
        }
    }
}
