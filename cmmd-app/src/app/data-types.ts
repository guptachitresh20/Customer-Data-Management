export interface ICustomer{
    cname?:string,
    logo?:string,
    typeOfCompany?:string,
    description?:string,
    email?:string,
    gstin?:string,
    headquarter?:string,
    phoneNo?:string,
    website?:string,
    countryCode?:string,
    id?:string
};
export interface IDisplayCustomer{
    length: any
    cname?:string,
    logo?:string,
    gstin?:string,
    email?:string,
    id?:string,
    typeOfCompany?:string
}
    phoneNo?:string,
};
export interface IAccount{
    accountid?:string,
    accountname?: string,
    branch?:string,
    email?: string,
    phoneNo?: string,
    noofemp?:string,
    yearofest?:string,
    operatinghrs?:string,
    manager?:string,
    servicesoffered?:string,
    expenses?:string,
    profit?:string,
    revenue?:string,
    noofdept?:string,
    long?:string,
    lat?:string,
    id?: string
  };