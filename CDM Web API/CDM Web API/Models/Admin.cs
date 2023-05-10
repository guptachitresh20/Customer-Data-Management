using System.ComponentModel.DataAnnotations;

namespace CDM_Web_API.Models
{
    public class Admin
    {
        [Key]
        public string email { get; set; }
        public string Name { get; set; }
        public string phone { get; set; }
        public string password { get; set; }
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
