import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../Services/Order/order.service';
import { ProductService } from '../../../Services/Product/Product.service';
import { ReviewService } from '../../../Services/Review/review.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  salesCount: number = 0;
  ProductCount: any;
  ReviewsCount: number = 0;
  ordersCount: number =0
  constructor(private _OrderService: OrderService,
    private _ProductService: ProductService,
    private _ReviewService:ReviewService) { }
  ngOnInit(): void {
    this.getSalesCount();
    this.getProductsCount();
    this.getAllReview();
    this.getAllOrder();
  }
  getSalesCount() {
    this._OrderService.GetSalesCount().subscribe(res => {
      this.salesCount = res.data;
    })
  }
  getProductsCount() {
    this._ProductService.GetOwnProductsCount().subscribe(res => {
      console.log(res);
      this.ProductCount = res;
    })
  }
  getAllReview() {
    this._ReviewService.getAll().subscribe(res => {
      this.ReviewsCount = res.data.length;
    })
  }
  getAllOrder() {
    this._OrderService.GetAllOrdersForVndr().subscribe((res) => {
      this.ordersCount = res.data.data.length;
    })
  }
}
