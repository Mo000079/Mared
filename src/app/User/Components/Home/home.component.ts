import { Component } from '@angular/core';
import { OfferService } from 'src/app/Services/Offer/Offer.service';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { ShopServicesService } from 'src/app/Services/Shop/shop-services.service';
import { IOffer } from 'src/app/Share/IOffer';
import { IProduct } from 'src/app/Share/IProduct';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products!: Array<IProduct>;
  Offers? : Array<IOffer>;
  pageIndex:number=1;
  pageSize:number=4;
  count:number=0;
  isdraft:boolean=false;
  brands:Array<any>=[];
  constructor(private offSrv:OfferService ,private shop:ShopServicesService, private PrdServ:ProductService ,private AuthServ:AuthService) {
    this.AuthServ.objective.subscribe({
      next:data=>{
        
      }
    })
    this.GetBrands()
    this.GetAllProduct()
    this.GetOffer()
  }

GetAllProduct()
{
  this.PrdServ.Pagination(this.pageSize,this.pageIndex).subscribe(
    (data) => {
      this.products = data.data.data;
      this.count  = data.data.count;
      this.pageIndex  = data.data.pageIndex;
      this.pageSize  = data.data.pageSize;
      console.log("prodct",this.products)
    },
    (error) => {
      console.log(error);
    });
}
GetOffer()
{
  this.offSrv.GetAll(4,1).subscribe({
    next:(data)=>
    {
      this.Offers =data.data.data
      console.log("offffffffff",data.data.data);
      
    }
  })
}
Prv()
{
  console.log(this.pageIndex);
  if(this.pageIndex>1)
  {
    this.pageIndex--;
  }
  else
  {
    this.pageIndex =1;
  }
  this.GetAllProduct()
}
Next()
{
  console.log(this.pageIndex);
  if(this.pageIndex> this.count +1)
  {
    this.pageIndex =1
  }
  else
  {
    this.pageIndex++;
  }

  this.GetAllProduct()
}
GetBrands()
{
  this.shop.GetAll().subscribe({
  next:res=>{
   
    res.data.forEach((element:any) => {
      this.brands.push(element.logo)
    });
    console.log("brands",this.brands);
    
  }
  })
}
}
