import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { IProduct } from 'src/app/Share/IProduct';
import { ToastrService } from 'ngx-toastr';
import { ICaritem } from 'src/app/Share/ICartitem';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit 
{
  @Input() product!: any ;
  cartitems!:Array<ICaritem>;
  MyProduct!:IProduct;
  user:boolean=false;
  carId:number =0;
  ApiImgUrl:string= "https://localhost:7104/Images/"
  constructor(
    private cartserv: CartService ,
    private _ProductService:ProductService ,
     private tostar:ToastrService,
     private auth:AuthService,
     private router:Router){}
  ngOnInit(): void {
   this.user = localStorage.getItem("token")?true:false
  
  }

  addToCart(id:number)
  {
    if(this.user ==true )
    {
      this.cartserv.GetCart().subscribe({
        next:data=>{
          if(data.success)
          {
            this.cartitems = data.data;
          if(this.cartitems !=null)
          {
            console.log(this.cartitems);
            this.cartserv.Objective.next(this.cartitems.length)
              console.log("id",id);
  
              this.AddSubmit(id);
          }
          this.tostar.success(data.message);
          }
        },
        error:ERR=>{
          this.tostar.info("Something wrong")
        }
      })
    }
    else
    {
      this.tostar.info("Create Account");
      this.router.navigate(["/register"])
    }
   
  }

  AddSubmit(id:number)
  {

    this.cartserv.AddCart(id).subscribe({
      next:data=>{
        console.log("id",data.message);
        this.cartserv.setCartCount()
      }
    })
  }
  addFav(id:number){
    console.log("idddddddddddddddddddddd",id);

    this._ProductService.AddWishList(id).subscribe(
      {
        next:(data)=>
        {
          if(data.success)
          {
            this._ProductService.setWishlistCount()
            this.tostar.info(data.message)
          }
        }
      }
    );
  }

}


