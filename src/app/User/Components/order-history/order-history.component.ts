import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { OrderService } from '../../../Services/Order/order.service';
import { ReviewService } from '../../../Services/Review/review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  orderList: any[] = [];
  id: number = 1;
  Massegge: string = "";
  review: boolean = false;
  rate: any;
  constructor(private _OrderService: OrderService,
    private _ReviewService: ReviewService,
    private _ToastrService:ToastrService) { }
  ngOnInit(): void {
    this.getOrders();

  }



  getOrders() {
    this._OrderService.GetAll().subscribe(res => {
      console.log("mmmm",res.data);
      this.orderList = res.data;
      this.orderList.forEach(i => {
        i.orderDetailsModel.map((i:any) => {
          i.price = Math.abs(i.price),
          i.quantity = Math.abs(i.quantity)
        })
      })
      
      console.log(this.orderList);
    })
  }




  makeRevw(_id:any) {
    this.review = true;
    this.id = _id
  }
  addReview() {
    let ratVal = 0;
    let Inputs = document.querySelectorAll('input');
    Inputs.forEach(i => {
      if (i.checked)
      ratVal = Number(i.value);
    })
    this._ReviewService.Add(this.Massegge, this.id, ratVal).subscribe({
      next: res => {
        console.log(res);
        this._ToastrService.info(res.data)
      }
    })
    // this.review == false;
  }
  getRate(_e:number) {
    console.log(_e);
  }
  ratVal(_e: any) {
    console.log(_e);
    console.log(_e.value);
  }
}
