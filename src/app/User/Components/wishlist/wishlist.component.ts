import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { IProduct } from 'src/app/Share/IProduct';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
url:string="https://localhost:7104/Images/";
isvisible:boolean=false;
  constructor(private _productServices:ProductService , private carServ:CartService) 
  { 

  }
  wishArray!:any[];
WishlistId:Array<number>=[]
  getWish(){
    this._productServices.getWishlist().subscribe(Response=>
      {
        this.isvisible =true;
         this.wishArray = Response.data
         let stringImg = Response.data.imagesUrl;
         console.log(Response.data.length);
         this._productServices.setWishlistCount()
      });

  }


  ngOnInit() {
    this.getWish();
  }
  delete(_id:number){
      this._productServices.DeleteWishList(_id).subscribe(res=>{
        console.log(_id)
        this._productServices.setWishlistCount()
        this.getWish()
      });
  }
  addToCart(id:number)
  {
    console.log("idddddddddd",id);
    
    this.carServ.AddCart(id).subscribe({
      next:data=>{
        console.log("id",data.message);
        if(data.success)
        {
         
          this.wishArray.forEach(element => {
            if(element.productId ==id)
            {
              console.log("idddddddddd",element.id,id);
              this.delete(element.id);
              // this._productServices.DeleteWishList(id);
              // this.wishArray.splice(this.wishArray.indexOf(element),1)
            }
          });
        }
      }
    })
  }
  // addAllTOCart()
  // {
  //   this.wishArray.forEach(element => {
  //     this.carServ.AddCart(element.productId).subscribe({
  //       next:res=>{
  //         if(res.success)
  //         {
  //           this.wishArray.splice(this.wishArray.indexOf(element),1)
  //         }
  //       }
  //     })
  //   });
  // }
}
