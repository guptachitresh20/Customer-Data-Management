import { Component, ViewChild, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import {Router } from '@angular/router';
import {NgConfirmService} from 'ng-confirm-box'
import { NgToastService } from 'ng-angular-popup';


export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: number;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'Amazon', name: 'AMZIN', weight: 'XXABXCXXDEFX1ZX', symbol: 1},
  {position: 'TCS', name: 'TCSIN', weight: 'XXCDXDXXDEFX1ZX', symbol: 2},
  {position: 'Dell',  name: 'DLLIN', weight: 'XXRFXRXXDEFX1ZX', symbol: 2},
  {position: 'HP',name: 'HPEIN', weight: 'XXGHXFXXDEFX1ZX', symbol: 1},
  {position: 'Flipkart',name: 'FRTIN', weight: 'XXIJXGXXDEFX1ZX', symbol: 2},
  {position: 'Amazon', name: 'AMZIN', weight: 'XXABXCXXDEFX1ZX', symbol: 1},
  {position: 'TCS', name: 'TCSIN', weight: 'XXCDXDXXDEFX1ZX', symbol: 2},
  {position: 'Dell',  name: 'DLLIN', weight: 'XXRFXRXXDEFX1ZX', symbol: 2},
  {position: 'HP',name: 'HPEIN', weight: 'XXGHXFXXDEFX1ZX', symbol: 1},
  {position: 'Flipkart',name: 'FRTIN', weight: 'XXIJXGXXDEFX1ZX', symbol: 2},
];

@Component({
  selector: 'app-customer-home2',
  templateUrl: './customer-home2.component.html',
  styleUrls: ['./customer-home2.component.css']
})
export class CustomerHome2Component implements OnInit{
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort!:MatSort;
  public displayedColumns: string[]=['position', 'name', 'weight', 'symbol', 'action'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private router: Router, private confirm:NgConfirmService, private toastService:NgToastService){}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){

  }

  // getUsers(){
  //   this.api.getRegisteredUser().subscribe(res=>{
  //     this.users=res;
  //     this.dataSource=new MatTableDataSource(this.users);
  //     this.dataSource.paginator=this.paginator;
  //     this.dataSource.sort=this.sort;
  //   })
  // }
applyFilter(event: Event){}

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
edit(id:number){}
  // edit(id:number){
  //   this.router.navigate(['update', id]);
  // }

  delete(id:number){}
  // delete(id:number){
  //   this.confirm.showConfirm("Are you sure want to delete?", ()=>{
  //     this.api.deleteRegistered(id).subscribe(res=>{
  //       this.toastService.success({detail:'SUCCESS', summary: 'Deleted Successfully', duration: 3000});
  //       this.getUsers();
  //     })
  //   }, ()=>{

  //   })
    
  // }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
