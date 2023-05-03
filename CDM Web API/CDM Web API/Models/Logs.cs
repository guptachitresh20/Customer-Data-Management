using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.Models
{
    public class Logs
    {
        [Key]
        public string logId { get; set; }



        [ForeignKey(nameof(adminId))]
        public int adminId { get; set; }
        public string customerName { get; set; }
        public string accountName { get; set; }
        public string action { get; set; }
        public string sectionModified { get; set; }
        public string date { get; set; }
        public string time { get; set; }

        [ForeignKey(nameof(adminId))]
        public virtual Admin Admin { get; set; }
    }
}
