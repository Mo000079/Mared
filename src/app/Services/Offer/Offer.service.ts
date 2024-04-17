import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from 'src/app/ViewModel/APIResult';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

localhost:string = "https://localhost:7104/";
constructor(private http : HttpClient) { }



GetAll(Psize:number,Pindex:number)
{
  return this.http.get<APIResult>(this.localhost+`Offer/GetAll?PageSize=${Psize}&PageIndex=${Pindex}`);
}
GetAllForVendor(PS:number,PI:number ,isdraft:boolean = false){
  return this.http.get<APIResult>(this.localhost+`Offer/GetAllForVendor?PageSize=${PS}&PageIndex=${PI}&isdraft=${isdraft}`)
}
GetOne(id:number)
{
  return this.http.get<APIResult>(this.localhost+`Offer/GetOne?id=${id}`)
}
Add(offer:object)
{
  return this.http.post<APIResult>(this.localhost+'Offer/Add',offer)
}
Update(offer:object)
{
  return this.http.put<APIResult>(this.localhost+'Offer/Edit',offer)
}
SearchForVendor(
  title:string ="",
  CategoryName:string ="",
  CategoryId:number =0,
  Discount:number =0,
  OrderBy:string ="ID",
  IsAscending:boolean =false,
  PageIndex:number = 1 ,
  PageSize:number = 20
)
{
 return  this.http.get<APIResult>(this.localhost+`Offer/SearchForVendor?title=${title}&CategoryName=${CategoryName}
  &CategoryId=${CategoryId}&Discount=${Discount}&OrderBy=${OrderBy}&IsAscending=${IsAscending}&PageIndex=${PageIndex}&PageSize=${PageSize},`)
}
Search(
  title:string ="",
  CategoryName:string ="",
  CategoryId:number =0,
  Discount:number =0,
  OrderBy:string ="ID",
  IsAscending:boolean =false,
  PageIndex:number = 1 ,
  PageSize:number = 20
)
{
 return  this.http.get<APIResult>(this.localhost+`Offer/Search?title=${title}&CategoryName=${CategoryName}
  &CategoryId=${CategoryId}&Discount=${Discount}&OrderBy=${OrderBy}&IsAscending=${IsAscending}&PageIndex=${PageIndex}&PageSize=${PageSize},`)
}
Delete(id:number)
{
  return this.http.delete<APIResult>(this.localhost+`Offer/Delete?id=${id}`)
}


MakOrderByOffer(OfferId:number,Count:number,Location:string,IsPayedByPoints:boolean){
  console.log("id ",OfferId);
  
  return this.http.post<APIResult>(
    this.localhost+`Order/AddOfferOrder?OfferId=${OfferId}&Count=${Count}&Location=${Location}&IsPayedByPoints=${IsPayedByPoints}`,{})
}
}
