using System.ComponentModel.DataAnnotations.Schema;

namespace CDM_Web_API.AccountDTO
{
    public class GetAccountDto
    {
        public string email { get; set; }
        public string accountId { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string location { get; set; }

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
    }
}
