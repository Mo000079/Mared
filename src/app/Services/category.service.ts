import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = "https://localhost:7104/Category/"
  constructor(private _httpClient: HttpClient) { }

  GetAll():Observable<any> {
    return this._httpClient.get(`${this.url}Get`);
  }
  Add(data:any):Observable<any> {
    return this._httpClient.post(`${this.url}Add`,data);
  }
  Delete(id:number): Observable<any> {
    return this._httpClient.delete(`${this.url}Delete/${id}`)
  }
}
