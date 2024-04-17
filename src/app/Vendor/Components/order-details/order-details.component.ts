import { Component, OnInit } from '@angular/core';

import { OrderListServiceService } from '../../Services/order-list-service.service';
import { compileNgModule } from '@angular/compiler';
import { OrderService } from '../../../Services/Order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  RecOrderId: number = 0;
  orders!: any;
  OrderDetails!: any;
  OrderObj!: any;
  totalPrice: number = 0;
  constructor(private ActivRout: ActivatedRoute,
              private _OrderService:OrderService) { }
    // private OrderListServ: OrderListServiceService

  // ) { this.OrderDetails = this.OrderListServ.OrderList }

  ngOnInit(): void {
    // this.getDetails();
  }

  // getDetails() {
  //   this.RecOrderId = Number(this.ActivRout.snapshot.paramMap.get('id'));
  //   this._OrderService.GetAllOrdersForVndr(5,1).subscribe(res => {
  //     this.OrderObj = res.data.data;
  //     console.log(this.OrderObj);
  //     this.orders = res.data.data.find((i: any) => i.id == this.RecOrderId);
  //     this.OrderDetails = this.orders.orderDetailsModel;
  //     this.calcTotal(this.OrderDetails);
  //     console.log("details",this.OrderDetails);
  //     this.OrderDetails.forEach((i:any) => {
  //       i.price = Math.abs(i.price),
  //       i.quantity = Math.abs(i.quantity)
  //     });
  //   })
  // }
  calcTotal(ordrD:any) {
    ordrD.forEach((i:any) => {
      this.totalPrice += i.price
    });
}

}
