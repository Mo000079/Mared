import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentStatus } from 'src/app/Share/IOrder';
import { APIResult } from 'src/app/ViewModel/APIResult';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = "https://localhost:7104/Order/"
  constructor(private _HttpClient:HttpClient) { }

  MakeOrder(location:string,IsPayedByPoints:boolean){
    return this._HttpClient.post<APIResult>(`${this.url}makeOrder?location=${location}&IsPayedByPoints=${IsPayedByPoints}`,{})
  }
  GetAll() {
    return this._HttpClient.get<APIResult>(`${this.url}GetAll`);
  }
  GetSalesCount() {
    return this._HttpClient.get<APIResult>(`${this.url}GetSales`);
  }
  GetAllOrdersForVndr(psize?:number,pindex?:number) {
    return this._HttpClient.get<APIResult>(`${this.url}GetOrdersV?PageSize=${psize}&PageIndex=${pindex}`);
  }
  ChangePaymentStatus(id:number ,status:PaymentStatus)
  {
    return this._HttpClient.get<APIResult>(this.url+`changePaymentStatus?id=${id}&status=${status}`)
  }
  filterForVndr(status:any) {
    return this._HttpClient.get<APIResult>(`${this.url}Filter?s=${status}`);
  }
}
