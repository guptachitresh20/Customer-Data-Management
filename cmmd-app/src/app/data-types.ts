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
    accounts?:IDisplayAccount[]
};
export interface IDisplayCustomer{
    length: any
    cname?:string,
    logo?:string,
    gstin?:string,
    email?:string,
    typeOfCompany?:string,
    headquarter?:string
}

export interface IDisplayAccount{
    length: any
    accountId?:string,
    accountName?:string,
    location?:string,
    email?:string,
    yearOfEst?:string,
}

export interface IAccount{
    accountId?:string,
    accountName?: string,
    email?: string,
    phoneNo?: string,
    noOfEmp?:string,
    yearOfEst?:string,
    operatingHours?:string,
    manager?:string,
    servicesOffered?:string,
    expenses?:string,
    profit?:string,
    revenue?:string,
    noOfDept?:string,
    location?:string,
    // latitude?:string|null,
    // longitude?:string|null,
    gstin?:string
  };