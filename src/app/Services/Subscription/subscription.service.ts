import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from 'src/app/ViewModel/APIResult';

@Injectable({
  providedIn: "root"
}
)
export class SubscriptionService {

  constructor(private http: HttpClient) { }
  ApiUrl: string = "https://localhost:7104/Subscription/";
  Getone() {
    return this.http.get<APIResult>(this.ApiUrl+"GetOne")
  }
  AddNewSubscription(memperShipId:number)
  {
    return this.http.post<APIResult>(this.ApiUrl+`AddNewSubscription?memperShipId=${memperShipId}`,{})
  }
}
