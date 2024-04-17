import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OrderListServiceService {
// OrderList:Array<any>;
// PaymentStatus:Array<String>;
  constructor() {
    // this.OrderList=[
    //   {Image:'../../../../assets/img/product-image-46-346x310.jpg',
    //   Id:1,Customer:'Anna',Date:'1May2923(10:12 am)',Payment:'Paypal',Status:'Pending',Amount:8},
    //   {Image:'../../../../assets/img/product-image-46-346x310.jpg',
    //   Id:2,Customer:'Rosy',Date:'9May2923(10:12 am)',Payment:'Cash',Status:'Success',Amount:2},
    //   {Image:'../../../../assets/img/product-image-46-346x310.jpg',
    //   Id:3,Customer:'Lay',Date:'12May2923(10:12 am)',Payment:'Point',Status:'Cancel',Amount:1},
    //   {Image:'../../../../assets/img/product-image-46-346x310.jpg',
    //   Id:4,Customer:'Jone',Date:'23May2923(10:12 am)',Payment:'Paypal',Status:'Pending',Amount:4}
    // ]
    // this.PaymentStatus=['Cancel','Pending','Success'];
  };

  FilterStatus(OrderStatus:string){

    
  //  if (OrderStatus == '')
  //     return this.OrderList;
  //   else
  //     return this.OrderList.filter(o => o.Status == OrderStatus);
  }

  GetOrderById(OrderId:number){
    // return this.OrderList.find(o => o.Id == OrderId);
  }
}
