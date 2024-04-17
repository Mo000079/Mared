import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterProductsService {
  url: string = "https://localhost:7104/Product/Search";
  constructor(private _HttpClient: HttpClient) { }

  Filter(subCate?: string[], shop?: string[], Price?: number, rate?: string[]):Observable<any>{
    return this._HttpClient.get(`${this.url}?SubCategoryNameList=${subCate}&ShopNameList=${shop}&Price=${Price}&RateAverage=${rate}`);
  }
}
