using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.Models
{
    public class Logs
    {
        [Key]
        public int logId { get; set; }

        public string adminName { get; set; }

        [ForeignKey(nameof(email))]
        public string email { get; set; }
        public string customerName { get; set; }
        public string accountName { get; set; }
        public string action { get; set; }
        public string sectionModified { get; set; }
        public string date { get; set; }
        public string time { get; set; }

        [ForeignKey(nameof(email))]
        public virtual Admin Admin { get; set; }
    }
}
