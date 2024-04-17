import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Services/Product/Product.service';
import { ReviewService } from '../../../Services/Review/review.service';

@Component({
  selector: 'app-vendor-product-details',
  templateUrl: './vendor-product-details.component.html',
  styleUrls: ['./vendor-product-details.component.css']
})
export class VendorProductDetailsComponent implements OnInit {
  isReview: boolean = true;
  isSellarInfo: boolean = false;
  product!: any;
  review!: any[];
  constructor(private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _ReviewService: ReviewService) { }
  ngOnInit(): void {
    this.getDetails();
    this.getReview();
  }
  getDetails() {
    let prodParam = this._ActivatedRoute.snapshot.paramMap.get('id')!;
    this._ProductService.GetOne(Number(prodParam)).subscribe(res => {
      this.product = res.data;
      console.log(this.product)

    })
  }
  getReview() {
    let prodParam = this._ActivatedRoute.snapshot.paramMap.get('id')!;
    this._ReviewService.Get(Number(prodParam)).subscribe(res => {
      this.review = res.data;
      console.log(this.review)

    })
  }
  getSellarInfo() {
    this.isSellarInfo = this.isSellarInfo == false ? true : true;
    this.isReview = false;
  }
  getReviewSide() {
    this.isReview = this.isReview == false ? true : false;
    this.isSellarInfo = false;
  }
}
