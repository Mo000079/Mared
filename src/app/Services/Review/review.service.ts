import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResult } from 'src/app/ViewModel/APIResult';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  url = "https://localhost:7104/Review/";
  constructor(private _HttpClient: HttpClient) { }
  Add(massg:string,id:number,val:number):Observable<APIResult> {
    return this._HttpClient.post<APIResult>(`${this.url}AddReview?msg=${massg}&id=${id}&val=${val}`,{});
  }
  Get(id: number) {
    return this._HttpClient.get<APIResult>(`${this.url}Get?id=${id}`);
  }
  // getAll per vendor
  getAll() {
    return this._HttpClient.get<APIResult>(`${this.url}GeyAll`);
  }
  filter(id:number) {
    return this._HttpClient.get<APIResult>(`${this.url}GetByFilter?id=${id}`);
  }
}
