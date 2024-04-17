import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ICategory } from 'src/app/Share/ICategory';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { AuthService, LoggedUser } from 'src/app/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Share/IProduct';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  Categories: ICategory[] = [];
  selectedCateg: number = 0;
  SearchInput: string = ""
  isLogin: boolean = false;
  iscustomer: boolean = false;
  CartItemCount: number = 0;
  WishlistCount: number = 0;
  //for search
  productName: any;
  Products: IProduct[] = [];
  count: number = 5;
  pageIndex: number = 1;
  pageSize: number = 4;
  SubCategoryName: any;
  constructor(private cartser: CartService, private PrdServ: ProductService, private authServ: AuthService, private router: Router,) {
    this.login()
    this.cartser.Objective.subscribe({
      next: (data) => {
        this.CartItemCount = data
      }
    })
    this.PrdServ.Objective.subscribe({
      next: num => {
        this.WishlistCount = num
      }
    })
    this.PrdServ.GetCategor().subscribe({
      next: data => {
        this.Categories = data.data;

      }
    })


  }
  ngOnInit(): void {
  }
  logout() {

    this.authServ.SignOut().subscribe({
      next: data => {
        if (data.success) {
          localStorage.removeItem('token');
          localStorage.removeItem('pic');
          localStorage.removeItem('role');
          localStorage.removeItem('userName');
          localStorage.removeItem('phoneNo');
          localStorage.removeItem('email');
          localStorage.setItem("popop78115###", "0")
          localStorage.setItem("wishlist###", "0")

          this.authServ.objective.next(false)
          this.iscustomer = false;
        }

      }
    });
  }
  login() {

    console.log("login");
    this.authServ.userDataSubject.subscribe(
      value => {
        this.cartser.setCartCount()
        this.PrdServ.setWishlistCount()
        this.isLogin = (value != null) ? true : false

        this.iscustomer = (value?.role == "Customer") ? true : false

      }
    )
  }
  BecomeSeller() {
    this.authServ.userDataSubject.subscribe(
      value => {
        if (value?.role == "Vendor") { this.router.navigateByUrl('/vendor'); }
        else if (value?.role == "Customer") { this.iscustomer == true }
        else {
          this.router.navigateByUrl('/register');
          this.authServ.objective.next(false)
        }
      }
    )
  }
  goSearch(category: any, search: any) {

    console.log('g', category.value);
    console.log(search.value);

    this.router.navigate(["/user/shop2", category.value, search.value])
  }

  Search(search: any) {
    this.productName = search.value;
    console.log("search input", search.value);
    this.PrdServ.Search(this.productName).subscribe({
      next: data => {
        console.log("data", data.data)
        this.Products = data.data.data;
        this.count = data.data.count;
        this.pageIndex = data.data.pageIndex;
        this.pageSize = data.data.pageSize;
        this.SubCategoryName = data.data.SubCategoryName;
      }
    })

  }
}






//






