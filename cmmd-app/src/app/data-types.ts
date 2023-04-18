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