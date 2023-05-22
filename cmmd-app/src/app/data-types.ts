export interface ICustomer {
  CustomerName?: string;
  Logo?: string;
  TypeOfCompany?: string;
  Description?: string;
  Email?: string;
  Gstin?: string;
  Headquarter?: string;
  PhoneNo?: string;
  Website?: string;
  CountryCode?: string;
  Accounts?: IDisplayAccount[];
}
export interface IDisplayCustomer {
  Length: any;
  CustomerName?: string;
  Logo?: string;
  Gstin?: string;
  Email?: string;
  TypeOfCompany?: string;
  Headquarter?: string;
}

export interface IDisplayAccount {
  Length: any;
  AccountId?: string;
  AccountName?: string;
  Location?: string;
  Email?: string;
  YearOfEst?: string;
  Latitude?: number;
  Longitude?: number;
}

export interface IAccount {
  AccountId?: string;
  AccountName?: string;
  Email?: string;
  PhoneNo?: string;
  NoOfEmp?: string;
  YearOfEst?: string;
  OperatingHours?: string;
  Manager?: string;
  ServicesOffered?: string;
  Expenses?: string;
  Profit?: string;
  Revenue?: string;
  NoOfDept?: string;
  Location?: string;
  Latitude?: number;
  Longitude?: number;
  Gstin?: string;
}


export interface IAdmin{
  Name?:string,
  Email?:string,
  Phone?:string,
  Password?:string,
  Token?:string,
  NewPassword?:string
}

export interface ILogs {
  Length?: any;
  LogId?: number;
  Email?:string;
  AdminName?: string;
  CustomerName?: string;
  AccountName?: string;
  Action?: string;
  SectionModified?: string;
  Date?: string;
  Time?:string
}

export interface IPaginatedResults<T>{
  TotalCount:number,
  Items: T[]
}

export interface IAccountsPaginatedResults{
  TotalCount:number,
  Item:ICustomer
}