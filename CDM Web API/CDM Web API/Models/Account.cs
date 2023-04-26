﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.Models
{
    public class Account
    {
        [Key]
        public string email { get; set; }
        public string accountId { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public string location { get; set; }

        [ForeignKey(nameof(gstin))]
        public string gstin { get; set; }

        public string accountName { get; set; }
        

        public string phoneNo { get; set; }

        public string yearOfEst { get; set; }

        public string operatingHours { get; set; }

        public string manager { get; set; }

        public string servicesOffered { get; set; }

        public string expenses { get; set; }

        public string profit { get; set; }

        public string revenue { get; set; }

        public string noOfDept { get; set; }
        public string noOfEmp { get; set; }

        [ForeignKey(nameof(gstin))]
        public virtual Customer Customer { get; set; }
    }
}