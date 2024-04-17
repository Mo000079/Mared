import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url: string = "https://localhost:7104/Account/";

  constructor(private _HttpClient: HttpClient) { }
  updateInfo(_data:any):Observable<any> {
    return this._HttpClient.put(`${this.url}UpdateInfo`,_data)
  }

}
