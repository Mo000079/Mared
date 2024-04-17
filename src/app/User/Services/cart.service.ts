import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICaritem } from 'src/app/Share/ICartitem';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIResult } from 'src/app/ViewModel/APIResult';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  localhost: string = "https://localhost:7104/";
  getproduct: any;
  Objective = new BehaviorSubject<number>(this.getCartCount())
  count: number = 0;
  cartitems:Array<ICaritem> =[];
  constructor(private http: HttpClient) {
    this.GetCart().subscribe({
      next:data=>{
        this.cartitems =data.data
        this.Objective.next(this.cartitems.length)
        console.log("carrrrrrrrrrt",data.data);
  
      }
    })
  }
  GetCart(): Observable<APIResult> {
    return this.http.get<APIResult>(this.localhost + 'CartItem/Get');
  }
  AddCart(id: number , qty:number =1) {
    return this.http.post<APIResult>(this.localhost + `CartItem/Add?productId=${id}&qty=${qty}`, {});
  }
  AddAllCart(id: Array<any>) {
    return this.http.post<APIResult>(this.localhost + `CartItem/AddAll?ids=${id}`, {});
  }
  UpdateCart(cart: any): Observable<APIResult> {
    return this.http.put<APIResult>(this.localhost +'CartItem/Update', cart);
  }

removcaritems(id:number):Observable<APIResult>{
  return this.http.delete<APIResult>(this.localhost+`CartItem/Delete/${id}`)
}


cartCount():number  // subject
{

  return this.cartitems.length;

}

GetById(id:number):Observable<APIResult>
{
  return this.http.get<APIResult>(this.localhost+`CartItem/GetById?id=${id}`)
}
// add to cart array
setcartitems(id:number)
{
  this.GetById(id).subscribe({
    next:data=>{
      this.cartitems.push(data.data);
    }
  })

  this.Objective.next(this.cartitems.length);
  this.cartCount()
  console.log("this.cartitems.length",this.cartitems.length);

}
  setCartCount(){
    this.GetCart().subscribe(data=>{

      this.Objective.next(data.data.length)
      localStorage.setItem("popop78115###",JSON.stringify(data.data.length))
    })
  }
  getCartCount():number{
    return parseInt(localStorage.getItem("popop78115###")??"0")
  }

}


