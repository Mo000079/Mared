import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResult } from 'src/app/ViewModel/APIResult';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from 'src/app/Share/IProduct';
import { id } from '@swimlane/ngx-charts';
import { IproductVM } from 'src/app/Share/iproduct-vm';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  Objective = new BehaviorSubject<number>(this.getWishCount())
  localhost: string = "https://localhost:7104/";
  constructor(private http: HttpClient) { }

  Pagination(PS:number,PI:number)
  {
    return this.http.get<APIResult>(`${this.localhost}Product/Pagination?PageSize=${PS}&PageIndex=${PI}`)
  }
  // get all cate
  GetAllProduct(): Observable<APIResult> {
    return this.http.get<APIResult>(`${this.localhost}Product/Get`)
  }
  //get categories
  GetCategor() {
    return this.http.get<APIResult>(this.localhost + 'Category/Get');
  }
  //get Subcategoties
  GetSubCategory() {
    return this.http.get<APIResult>(this.localhost + 'SubCategory/Get');
  }
  //get subcategories by category Id
  GetSubByCategory(Id: number) {
    return this.http.get<APIResult>(this.localhost + 'SubCategory/GetbyCategory?id=' + Id);
  }

  GetForVendor(PS?:number,PI?:number,isdraft?:boolean)
  {
    return this.http.get<APIResult>(`${this.localhost}Product/GetForVendor?PageSize=${PS}&PageIndex=${PI}&isdraft=${isdraft}`)
  }
  Delete(id:number)
  {
    return this.http.delete<APIResult>(this.localhost+`Product/Delete?id=${id}`)
  }
  //get one prodcut

  // GetOne(Id: Number): Observable<APIResult> {
  //   return this.http.get<APIResult>(`${this.localhost}Product/GetOneById?id=${Id}`);
  // }
// <<<<<<< HEAD
//   GetOne(Id: Number): Observable<any> {
//     return this.http.get<any>(`${this.localhost}Product/GetOneById/${Id}`);

//   GetOne(Id: Number): Observable<IProduct> {
//     return this.http.get<IProduct>(`${this.localhost}Product/GetOneById?id=${Id}`);

//   }
  GetOne(Id: Number): Observable<any> {
    return this.http.get<any>(`${this.localhost}Product/GetOneById/${Id}`);
    // return this.http.get<IProduct>(`${this.localhost}Product/GetOneById?id=${Id}`);
  }

  //add prodcut
  AddProduct(productData: object): Observable<APIResult> {
    console.log(productData);
    return this.http.post<APIResult>(this.localhost + 'Product/Add', productData);
  }
  //search
  SearchForVendor(
    Name: string = "",
    CategoryName: string = "",
    CategoryId: number = 0,
    SubCategoryId: number = 0,
    SubCategoryName: string = "",
    ProductId: number = 0,
    Price: number = 0,
    RateAverage: string[] = [],
    BrandName: string = "",
    OrderBy: string = "",
    IsAscending: boolean = false,
    PageIndex: number = 1,
    PageSize: number = 8
  ) {
    return this.http.get<APIResult>(this.localhost + `Product/SearchForVendor?Name=${Name}&CategoryName=${CategoryName}&CategoryId=${CategoryId}
      &SubCategoryId=${SubCategoryId}&SubCategoryName=${SubCategoryName}&ProductId=${ProductId}?Price=${Price}
      &RateAverage=${RateAverage}&BrandName=${BrandName}&OrderBy=${OrderBy}&IsAscending=${IsAscending}
      &PageIndex=${PageIndex}&PageSize=${PageSize}`);
  }
  //
  Search(
    Name: string = "",
    CategoryName: string = "",
    CategoryId: number = 0,
    SubCategoryId: number = 0,
    SubCategoryName: string = "",
    ProductId: number = 0,
    Price: number = 0,
    RateAverage: string[] = [],
    BrandName: string = "",
    OrderBy: string = "",
    IsAscending: boolean = false,
    PageIndex: number = 1,
    PageSize: number = 8
  ) {
    console.log("service");

    return this.http.get<APIResult>(this.localhost + `Product/Search?Name=${Name}&CategoryName=${CategoryName}&CategoryId=${CategoryId}
      &SubCategoryId=${SubCategoryId}&SubCategoryName=${SubCategoryName}&ProductId=${ProductId}?Price=${Price}
      &RateAverage=${RateAverage}&BrandName=${BrandName}&OrderBy=${OrderBy}&IsAscending=${IsAscending}
      &PageIndex=${PageIndex}&PageSize=${PageSize}`);
  }
  getWishlist(): Observable<APIResult> {
    return this.http.get<APIResult>(this.localhost + "WishListItem/Get");
  }
  AddWishList(id: number): Observable<APIResult> {

    return this.http.post<APIResult>(this.localhost +`WishListItem/Add?ProductId=${id}`,{});
  }
  DeleteWishList(id: number): Observable<any> {
    return this.http.delete<any>(this.localhost + `WishListItem/Delete/${id}`);
  }

  GetOwnProductsCount() {
    return this.http.get(`${this.localhost}Product/GetOwnProducts`);
  }
  setWishlistCount()
  {
    this.getWishlist().subscribe({
      next:data=>{
        console.log("lenth",data.data.length);
        this.Objective.next(data.data.length)
          localStorage.setItem("wishlist###",JSON.stringify(data.data.length));
      }
    })
  }
  getWishCount():number
  {
    return parseInt(localStorage.getItem("wishlist###")??"0")
  }

  updateProduct(product: IproductVM) {
    console.log(product)

    return this.http.put(`${this.localhost}Product/Update`,product);
  }
}
