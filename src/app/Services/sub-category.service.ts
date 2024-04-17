import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  url: string = "https://localhost:7104/SubCategory/";
  constructor(private _httpClient: HttpClient) { }
  GetAll():Observable<any> {
    return this._httpClient.get(`${this.url}Get`);
  }
  Add(data:any):Observable<any> {
    return this._httpClient.post(`${this.url}Add`, data);
  }
  Delete(id:number): Observable<any>{
    return this._httpClient.delete(`${this.url}Delete/${id}`);
  }
}
