using AutoMapper;
using CDM_Web_API.AccountDTO;
using CDM_Web_API.CustomerDTO;
using CDM_Web_API.DTO;
using CDM_Web_API.Models;

namespace CDM_Web_API.Confiurations
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Customer, AddCustomerDto>().ReverseMap();
            CreateMap<Customer, GetCustomerDto>().ReverseMap();
            CreateMap<Customer, PutCustomerDto>().ReverseMap();
            CreateMap<Customer, GetCustomerDetailsDto>().ReverseMap();

            CreateMap<Account, AddAccountDto>().ReverseMap();
            CreateMap<Account, GetAccountDto>().ReverseMap();
            CreateMap<Account, PutAccountDto>().ReverseMap();
            CreateMap<Account, DispAccountDto>().ReverseMap();





        }
    }
}
