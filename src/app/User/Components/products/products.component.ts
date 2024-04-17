import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../Services/Product/Product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { SubCategoryService } from 'src/app/Services/sub-category.service';
import { ShopServicesService } from 'src/app/Services/Shop/shop-services.service';
import { FilterProductsService } from 'src/app/Services/Product/filter-products.service';
import { CartService } from '../../Services/cart.service';
import { IProduct } from 'src/app/Share/IProduct';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  url: string = "https://localhost:7104/Images/";
  Name: string = "";
  isFav: boolean = false;
  CategoryName: string = "";
  CategoryId:number =0;
  SubCategoryName: string = "";
  pageIndex: number = 1;
  pageSize: number = 5;
  count: number = 5;
  totalProducts: number = 0;
  isRateFilter: boolean = false;
  isRateFilter2: boolean = false;
  ratingFilter: any[] = [];
  productList: IProduct[] = [];

  subCateFilter: any[] = [];

  ShopNameFilter: any[] = [];

  SubCateList: any[] = [];

  cateList: any[] = [];

  shopList: any[] = [];

  price: number = 0;

  constructor(private _ProductService: ProductService ,private activeRoute:ActivatedRoute ,    private _ShopServicesService: ShopServicesService,
    private _FilterProductsService: FilterProductsService , private _CategoryService: CategoryService,
    private _SubCategoryService: SubCategoryService,
    ){}

  ngOnInit(): void {
    this.getAllProduct();
    this.activeRoute.params.subscribe({
      next:data=>{
        if(data["catId"] != null || data["Name"] != null)
        {
          console.log("searrrrrrrrrrrrr");

          this.CategoryId = data["catId"] as number
          this.Name = data["Name"]
          this.CategoryName= data["Name"]
          console.log(this.Name,this.CategoryName,this.CategoryId);

          this._ProductService.Search(this.Name,this.CategoryName,this.CategoryId).subscribe({
            next:data=>
            {
              this.productList = data.data.data

              console.log("daaaaaaaaa",this.productList);
            }
          })
        }
      }
    })
    this.getAllSubCate();
    this.getAllCate();
    this.getAllShop();
  }

  getAllCate() {
    this._CategoryService.GetAll().subscribe(res => {
      this.cateList = res.data;
      console.log(this.cateList);
    })
  }
  getAllSubCate() {
    this._SubCategoryService.GetAll().subscribe(res => {
      console.log(res);
      this.SubCateList = res.data;
      console.log(this.SubCateList);
    });
  }
  getAllShop() {
    this._ShopServicesService.GetAll().subscribe(res => {
      this.shopList = res.data;
      console.log(this.shopList);
    })
  }
  Apply() {
    let Inputs = document.querySelectorAll("input");
    Inputs.forEach(i => {
      if (i.checked) {
        this.SubCateList.forEach(subCat => {
          if (i.name == subCat.name) {
            this.subCateFilter.push(i.name)
          }
        })

        this.shopList.forEach(shop => {
          console.log(this.shopList);
          if (i.name == shop.name) {
            this.ShopNameFilter.push(i.name);
            console.log("If ");
          }

        })
        if (i.name == "5"|| i.name == "4" || i.name == "3" || i.name == "2" || i.name == "1") {
          this.ratingFilter.push(i.name);
          console.log('object', this.ratingFilter);
        }

      } else {
        this.subCateFilter = this.subCateFilter.filter(x => x != i.name);
        this.ShopNameFilter = this.ShopNameFilter.filter(x => x != i.name);
        this.ratingFilter = this.ratingFilter.filter(x => x != i.name);
      }
    })
    this.GetFilteredProducts();
  }
  GetFilteredProducts() {
    this._FilterProductsService.Filter(this.subCateFilter, this.ShopNameFilter, this.price,this.ratingFilter).subscribe(res => {
      this.productList = res.data.data;
      this.count = this.productList.length
      console.log(this.productList)

    })

  }


  priceRng(val: any) {
    console.log(val.value);
    this.price = Number(val.value)
  }

  getAllProduct() {
      this._ProductService.Pagination(this.pageSize, this.pageIndex).subscribe({
        next: data => {
          console.log("daaddadda", data.data)
          this.productList = data.data.data;
          this.count = data.data.count;
          this.pageIndex = data.data.pageIndex;
          this.pageSize = data.data.pageSize;
          console.log('productList', this.productList);
        },
        error: error => {
          console.log(error);
        }
      })

    }


  ChangePage(event: number) {
    console.log(event);
    this.pageIndex = event;
    this.getAllProduct()
  }

  fav(id: number) {
    this.isFav = this.isFav == true ? false : true;
    let item;
      item = document.getElementById(`${id}`);
    if (this.isFav) {
      item!.style.color = "red";
      this._ProductService.AddWishList(id).subscribe(res => {
        console.log(res);
      })
    } else {
      this._ProductService.DeleteWishList(id).subscribe(res => {
        item!.style.color = "black";
        console.log(res);
      })
    }
  }



}
