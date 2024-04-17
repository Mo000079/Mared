import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from 'src/app/ViewModel/APIResult';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _httpClient: HttpClient) { }
  ApiUrl: string = "https://localhost:7104/GetAll/";



  //Get All Vendors
  GetVendors() {
    return this._httpClient.get<APIResult>(this.ApiUrl + "GetAllVendors");
  }

  //Get Customers(Users)
  GetCustomers() {
    return this._httpClient.get<APIResult>(this.ApiUrl + "GetAllUsers")
  }

  //Get Orders
  GetOrders() {
    return this._httpClient.get<APIResult>(this.ApiUrl + "GetAllOrders")
  }

  //Get Offers
  GetOffers(PS:number,PI:number) {
    return this._httpClient.get<APIResult>(this.ApiUrl + `GetAllOffers?PageSize=${PS}&PageIndex=${PI}`)
  }

  getProduct(PS:number,PI:number){
    console.log("serv");  
    return this._httpClient.get<APIResult>(this.ApiUrl + `GetAllproduct?PageSize=${PS}&PageIndex=${PI}`)
  }

  GetMemberRequests()
  {
    return this._httpClient.get<APIResult>(this.ApiUrl+"GetRequests")
  }
  ApproveSubscription(id:string)
  {
    return this._httpClient.get<APIResult>(this.ApiUrl+`ApproveSubscription?UserId=${id}`)
  }
  CancelSubscription(id:string)
  {
    return this._httpClient.get<APIResult>(this.ApiUrl+`CancelSubscription?UserId=${id}`)
  }
}
