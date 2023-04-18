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
export interface IAccount{
    accountId?:string,
    accountName?: string,
    branch?:string,
    email?: string,
    phoneNo?: string,
    noOfEmp?:string,
    yearOfEst?:string,
    operatingHrs?:string,
    manager?:string,
    servicesOffered?:string,
    expenses?:string,
    profit?:string,
    revenue?:string,
    noOfDept?:string,
    id?: string
  };