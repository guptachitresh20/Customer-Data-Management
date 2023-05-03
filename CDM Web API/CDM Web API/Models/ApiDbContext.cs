using Microsoft.EntityFrameworkCore;
using CDM_Web_API.Models;

namespace CDM_Web_API.Models
{
    public class ApiDbContext:DbContext
    {
        public ApiDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>().ToTable("admins");
        }

        public DbSet<CDM_Web_API.Models.Logs> Logs { get; set; }
    }
}
