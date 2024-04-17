import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../Services/Review/review.service';
import { ProductService } from '../../../Services/Product/Product.service';

@Component({
  selector: 'app-vendor-review',
  templateUrl: './vendor-review.component.html',
  styleUrls: ['./vendor-review.component.css']
})
export class VendorReviewComponent implements OnInit{
  pageIndex: number = 1;
  pageSize: number = 5;
  count: number = 5;
//   VProducts :Array<any>=[
//     {
//      Id : 1,
//      title:"A4TECH BH300 Bluetooth Wireless Headset",
//      ImgUrl:"./assets/img/product-image-12-346x310.jpg" ,
//      Rating:4.9,

//     },
//     {
//      Id : 2,
//      title:"A4TECH BH300 Bluetooth Wireless Headset",
//      ImgUrl:"./assets/img/product-image-51-346x310.jpg" ,
//      Rating:4,
//     },
//     {
//      Id : 3,
//      title:"A4TECH BH300 Bluetooth Wireless Headset",
//      ImgUrl:"./assets/img/product-image-47-346x310.jpg" ,
//      Rating:3.8,
//     },
//     {
//      Id : 4,
//      title:"A4TECH BH300 Bluetooth Wireless Headset",
//      ImgUrl:"./assets/img/product-image-58-346x310.jpg" ,
//      Rating:4.2,
//     },
//     {
//      Id : 5,
//      title:"A4TECH BH300 Bluetooth Wireless Headset",
//      ImgUrl:"./assets/img/product-image-50-346x310.jpg" ,
//      Rating:3.1,

//     }

//  ];
  products!: any;
  Reviews!: any[];

  constructor(private _ReviewService: ReviewService,
    private _ProductService: ProductService) { }
  ngOnInit(): void {
    this.GetAll();
    this.getAllProduct();
  }
  GetAll() {
    this._ReviewService.getAll().subscribe(res => {
      console.log(res);
      this.Reviews = res.data;
    })
  }
  getAllProduct() {
    this._ProductService.GetForVendor(this.pageSize,this.pageIndex).subscribe(res => {
      this.products = res.data.data;
      console.log(this.products);
    })
  }
  filter(_e: any){
    let id = _e.target.value;
    this._ReviewService.filter(id).subscribe(res => {
      this.Reviews = res.data;
      console.log(this.Reviews);
    })
  }

  ChangePage(event: number) {
    console.log("event", event);
    this.pageIndex = event;
    this.GetAll()
  }


}
