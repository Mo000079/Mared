import { Component } from '@angular/core';
import { OfferService } from 'src/app/Services/Offer/Offer.service';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { ICategory } from 'src/app/Share/ICategory';
import { IOffer } from 'src/app/Share/IOffer';

@Component({
  selector: 'app-offer-filter',
  templateUrl: './offer-filter.component.html',
  styleUrls: ['./offer-filter.component.css']
})
export class OfferFilterComponent {

  Offers:Array<IOffer>=[]
  pageIndex:number=1;
  pageSize:number = 6;
  count:number = 5;
 Categories:ICategory[]=[];
 Price:number=0;
 isvisible:boolean=false;
 //for search
  VendorId?:string;
   title?:string;
   CategoryName?:string;
   CategoryId:number = 0;
   OrderBy:string = "ID";
   IsAscending:boolean = false;
   PageIndex:number= 1;
  PageSize:number = 10
 constructor( private PrdServ:ProductService, private OfferServ:OfferService){
//get categories
  this.PrdServ.GetCategor().subscribe({
    next:data=>{
      this.Categories=data.data;
    }
  })
  //get all
  this.pagination()
 }
 //search input
 Search(input:any)
 {
this.title =input.value;
this.CategoryName= input.value;
console.log("search input",input.value);

    this.OfferServ.Search(this.title,this.CategoryName).subscribe({
        next:data=>{
          this.Offers =data.data.data;
         
        }
 })
 }
 //order by
 orderBy(value:any)
 {
  this.OrderBy= value.target.value;
  console.log("order",this.OrderBy);
  
    this.OfferServ.Search(this.title,this.CategoryName,this.CategoryId,0,this.OrderBy).subscribe({
      next:data=>
      {
        this.Offers =data.data.data
        console.log("orderby",this.Offers);
        
      }
    })
 }
//change price value
onRangeValueChange(event:any)
{
  this.Price = event.value  
}
//change chategor
ChangeGategor(event:any)
{
  this.CategoryId = event.target.value;
  console.log("id",this.CategoryId);
  
}
 //form for gategory and price
 SearchCatPrice()
 {
  this.OfferServ.Search(this.title,this.CategoryName,this.CategoryId,this.Price,this.OrderBy).subscribe({
    next:data=>
    {
      this.Offers =data.data.data
      console.log("range of price",this.Offers);
      
    }
  })
 }
 //pagination
 pagination()
 {
  this.OfferServ.GetAll(this.pageSize,this.pageIndex).subscribe({
    next:data=>{
      console.log("daaddadda",data.data)
      this.isvisible =true;
     this.Offers= data.data.data;
     this.count  = data.data.count;
     this.pageIndex  = data.data.pageIndex;
     this.pageSize  = data.data.pageSize;
     console.log("count",this.count);
    },
    error:error=>{
      console.log(error);
    }
  })
 }
 ChangePage(event:number){
  console.log(event);
  this.pageIndex = event;
  this.pagination()
  }
  //end pagination
 
}
