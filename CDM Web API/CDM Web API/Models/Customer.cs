using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.Models
{
    public class Customer
    {
        [Key]
        public string gstin { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string cname { get; set; }

        public string logo { get; set; }

        public string typeOfCompany { get; set; }

        public string description { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string email { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string headquarter { get; set; }

        public string phoneNo { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string website { get; set; }

        public string countryCode { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }
    }
}