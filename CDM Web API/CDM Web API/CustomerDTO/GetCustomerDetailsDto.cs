using CDM_Web_API.AccountDTO;
using CDM_Web_API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.CustomerDTO
{
    public class GetCustomerDetailsDto
    {

        public string gstin { get; set; }

        public string cname { get; set; }

        public string logo { get; set; }

        public string typeOfCompany { get; set; }

        public string description { get; set; }


        public string email { get; set; }


        public string headquarter { get; set; }

        public string phoneNo { get; set; }

        public string website { get; set; }

        public string countryCode { get; set; }
        public virtual IList<DispAccountDto> Accounts { get; set; }
    }
}
