import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResult } from 'src/app/ViewModel/APIResult';

@Injectable({
  providedIn: 'root'
})
export class ShopServicesService {
  URL: string = "https://localhost:7104/Shop/";
  constructor(private _httpClient: HttpClient) { }
  Add(shopInfo: any): Observable<any> {
    return this._httpClient.post(`${this.URL}Add`, shopInfo);
  }
  Update(updatedInfo: any): Observable<any> {
    return this._httpClient.put(`${this.URL}Update`, updatedInfo);
  }
  GetAll():Observable<any> {
    return this._httpClient.get(`${this.URL}GetAll`);
  }
  GetOneInfo() {
    return this._httpClient.get<APIResult>(`${this.URL}GetInfo`);
  }

}
