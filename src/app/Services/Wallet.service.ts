import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from '../ViewModel/APIResult';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  localhost:string = "https://localhost:7104/";
  constructor(private http : HttpClient) { }
  getWallet()
  {
    return this.http.get<APIResult>(this.localhost+"Wallet/Get")
  }
  

}
