import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FilterProductsService } from 'src/app/Services/Product/filter-products.service';
import { SubCategoryService } from '../../../Services/sub-category.service';
import { CategoryService } from '../../../Services/category.service';
import { ShopServicesService } from '../../../Services/Shop/shop-services.service';
import { ProductService } from 'src/app/Services/Product/Product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  productList: any[] = [];
  FinalProducsList: any[] = [];
  subCateFilter: any[] = [];
  ShopNameFilter: any[] = [];
  SubCateList: any[] = [];
  cateList: any[] = [];
  shopList: any[] = [];
  price: number = 0;
  constructor(private _FilterProductsService: FilterProductsService, private SubCategoryService: SubCategoryService, private _CategoryService: CategoryService, private _ShopServicesService: ShopServicesService, private _ProductService: ProductService) { }
  ngOnInit(): void {
    this.getAllSubCate();
    this.getAllCate();
    this.getAllShop();
    this.getAll();
    console.log(this.subCateFilter);

  }
  getAllCate() {
    this._CategoryService.GetAll().subscribe(res => {
      this.cateList = res.data;
      console.log(this.cateList);
    })
  }
  getAllSubCate() {
    this.SubCategoryService.GetAll().subscribe(res => {
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
      console.log();
      if (i.checked) {
        this.SubCateList.forEach(subCat => {
          if (i.name == subCat) return this.subCateFilter.push(i.name);
          else return;
        })
        this.shopList.forEach(shop => {
          if (i.name == shop) return this.ShopNameFilter.push(i.name);
          return;
        })
      }
      return;
    })

    this.GetFilteredProducts();

  }
  GetFilteredProducts() {
    this._FilterProductsService.Filter(this.subCateFilter, this.ShopNameFilter, this.price).subscribe(res => {
      console.log(res.data);
      this.FinalProducsList = res.data;
    })
  }

  priceRng(val: any) {
    console.log(val.value);
    this.price = Number(val.value)
  }

  selectedCat(event: any) {
    console.log(event)

    console.log(event.name);
    console.log(event.checked);

  }


  getAll() {
    this._ProductService.GetAllProduct().subscribe(res => {
      console.log(res);
      this.productList = res.data;
      console.log(this.productList);
    })
  }

}


