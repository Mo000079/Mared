import { Component, ViewChild, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../Services/Product/Product.service';
import { IProduct } from 'src/app/Share/IProduct';
import { ReviewService } from '../../../Services/Review/review.service';
import { isEmpty } from 'rxjs';
import { CartService } from '../../Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { compileNgModule } from '@angular/compiler';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product!: any;
  productId!: number;
  review!: any[];
  isReview: boolean = true;
  isSellarInfo: boolean = false;
  isFav: boolean = false;
  isFound: boolean = true;
  similarProduct: any[]= [];
  user:any;
  cartitems:Array<any>=[];
  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private cartServ: CartService,
    private router:Router,
    private _ProductService: ProductService,
    private _ReviewService:ReviewService,
    private tostar: ToastrService) { }
  // ngOnChanges(): void {
  //   this.getProduct()
  // }
  ngOnInit(): void {
    this.getProduct();
    this.getReview();
    this.isFav = localStorage.getItem('isFav') == 'true' ? true : false;
    this.user = localStorage.getItem("token")?true:false
  }
 // @ViewChild('botmBrdr') botmBrdr?: ElementRef<any>;
  getReviewSide() {
    this.isReview = this.isReview == false ? true : false;
    this.isSellarInfo = false;
  }
  getSellarInfo() {
    this.isSellarInfo = this.isSellarInfo == false ? true : true;
    this.isReview = false;
  }
  Fav() {
    this.isFav = this.isFav == false ? true : false;
    let prodParam = this._ActivatedRoute.snapshot.paramMap.get('id')!;
    console.log(prodParam);
    if (this.isFav == true) {
      this._ProductService.AddWishList(Number(prodParam)).subscribe(res => {
        console.log(res);
        localStorage.setItem('isFav', 'true')
      })
    } else {
      this._ProductService.DeleteWishList(Number(prodParam)).subscribe(res => {
        console.log(res);
        localStorage.setItem('isFav', 'false')
      })
    }

  }
  getProduct() {
    this._ActivatedRoute.params.subscribe({
      next: data => {
        this.similarProduct = [];
        console.log(data);
        this.productId = data["id"] as number;
        this._ProductService.GetOne(this.productId).subscribe({
          next: res => {
            if (res.data != "") {
              this.product = res.data;
              this.isFound = true;
              this.getSimilarProduct(res);
            } else {
              this.isFound = false;
            }

          },

          // }res => {
          //   console.log(res);
          //   if (res.data != "") {

          //   }
          //   this.product = res.data;
          //   console.log(this.product);

          //   this.getSimilarProduct(res);
        })
      }
    });

  }

  getReview() {
    let prodParam = this._ActivatedRoute.snapshot.paramMap.get('id')!;
    this._ReviewService.Get(Number(prodParam)).subscribe(res => {
      this.review = res.data;
      console.log(this.review)

    })
  }

  getSimilarProduct(res:any) {
    let SubCategoryName = res.data.subCategoryName;
    this._ProductService.Search("","",0,0,SubCategoryName,0).subscribe(res => {
      console.log(res);
      for (let i = 0; i < 4; i++){
        this.similarProduct.push(res.data.data[i]);
        console.log(res);

      }
      this.similarProduct = this.similarProduct.filter(i => i != null && i.name != this.product.name);
      console.log(this.similarProduct);
    })



    // this._ProductService.GetAllProduct().subscribe(res => {
    //   let prods = res.data;
    //   console.log(prods);
    // })


  }
  addtoCart(id:number,val:any )
  {
    console.log("value",val.value);
    if(this.user ==true )
    {
      console.log("user");

      this.cartServ.GetCart().subscribe({
        next:data=>{
          if(data.success)
          {
            this.cartitems = data.data;
          if(this.cartitems !=null)
          {
            console.log(this.cartitems);
            this.cartServ.Objective.next(this.cartitems.length)
              console.log("id",id);

              this.AddSubmit(id ,val.value);
          }
          this.tostar.success(data.message);
          }
        },
        error:ERR=>{
          this.tostar.info("Something wrong")
        }
      })
    } else{
      this.tostar.info("Create Account");
      this.router.navigate(["/register"])
    }
}
AddSubmit(id:number ,qty:number)
{

  this.cartServ.AddCart(id,qty).subscribe({
    next:data=>{
      console.log("id",data.message);
      this.cartServ.setCartCount()
    }
  })
}
}
