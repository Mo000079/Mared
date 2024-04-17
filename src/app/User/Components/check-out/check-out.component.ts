import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { HttpClient } from '@angular/common/http';
import { ICaritem } from 'src/app/Share/ICartitem';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from 'src/app/Services/Wallet.service';
import { OrderService } from 'src/app/Services/Order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  username!: string;
  userPhone!: string;
  userEmail!: string;
  cartItems:Array<ICaritem>=[]
  totalPrice:number=0;
  isDisplayed:boolean=true;
  IsPayedByPoints:boolean =false;
  Wallet:any;
  Location :string= "";
  city= ""
  street= ""
  address= ""
  others= ""
  constructor(private OrderSer:OrderService,private CarServ:CartService , private http:HttpClient ,private tostar:ToastrService ,private WalletServ:WalletService,private router:Router)
  {
      this.CarServ.GetCart().subscribe({
        next:data=>{
          console.log(data.data);
          this.cartItems = data.data;
          this.cartItems.forEach(element => {
            this.totalPrice += element.subPrice


          });
        }
      })
  }
  ngOnInit() {
    this.gitUserInfo();
    this.WalletServ.getWallet().subscribe({
      next:res=>{
        console.log("wallet",res.data)
        this.Wallet = res.data
      }
    })
  }
  gitUserInfo() {
    this.userEmail = localStorage.getItem('email')!;
    this.username = localStorage.getItem('userName')!;
    console.log(localStorage.getItem('userName'));
    this.userPhone = localStorage.getItem('phoneNo')!;
  }
  ChangePyby(event:any)
  {
    if (event.target.value == "point") {
      this.IsPayedByPoints = true;
      if(this.Wallet.earnedPoints >= this.totalPrice){
        this.tostar.info("Great, You have Enough point")
      }
      else{
        this.IsPayedByPoints = false;
        this.tostar.info("Sorry, You don't have Enough point to buy this offer")
        this.isDisplayed = false
      }

    }
    else{
      this.IsPayedByPoints = false;
    }
  }
  MakeOrder()
  {
    this.Location = this.city+ ", " +this.address + ", " +this.street+ ", " +this.others
    this.OrderSer.MakeOrder(this.Location,this.IsPayedByPoints).subscribe({
      next:(res)=>
      {
        console.log(res.data);
        if(res.success)
        {
          this.tostar.info(res.message);
          this.CarServ.setCartCount()
          this.router.navigate(["/user/thanks"])
        }
        else
        {
          this.tostar.error(res.message);
        }
      }
    })
  }
}
