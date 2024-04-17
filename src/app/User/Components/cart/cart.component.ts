import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { ICaritem } from 'src/app/Share/ICartitem';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  // CartList:any[];

  constructor(private Cartserv: CartService, private toastr: ToastrService) {
    // this.CartList=this.Cartserv.cart;

  }
  url: string = "https://localhost:7104/Images/";
  CartedItem!: ICaritem[];
  subPrice: number = 0;
  //
  totalPrice: number = 0;
  TotalPoints: number = 0;
  getFromCart() {

    this.Cartserv.GetCart().subscribe(Response => {
      this.CartedItem = Response.data;
      console.log("fff", this.CartedItem);
      let stringImage = Response.data.ProductImgUrl
      this.CalcToatal()
    });

    console.log("Price")
    console.log(this.CartedItem)

  }
  removeItem(id: number) {
    this.Cartserv.removcaritems(id).subscribe(res => {
      this.getFromCart();
      this.Cartserv.setCartCount();

    });


  }
  ngOnInit() {
    this.getFromCart();

  }
  CalcToatal() {
    console.log("calc");
    this.totalPrice = 0;
    this.TotalPoints = 0;
    this.CartedItem.forEach(i => {
      this.TotalPoints += i.earntPoints
      this.totalPrice += i.originalPrice * i.quantaty
      // console.log("dddddddddddddddd",i.earntPoints ,i.quantaty);

    })
  }
  addQty(id: any) {
    this.CartedItem.forEach(e => {
      console.log("id1111111", e);

      if (e.id == id) {
        console.log("yes", e.originalStock, e.quantaty);
        if (e.quantaty < e.originalStock) {
          e.quantaty = e.quantaty + 1;  
        }
        console.log("element",e);
          this.Cartserv.UpdateCart(e).subscribe({
            next: data => {
              if(data.success) {
                console.log("updated");
                // this.toastr.success("Your Cart is Updated Succesfully")
                e.subPrice = e.quantaty * e.originalPrice
                this.CalcToatal()
                this.Cartserv.setCartCount()

              }
              else {
                this.toastr.error("Something Wrong Happened")

              }
            }
          })
        
      }
    })
  }
  minqty(id: any) {
    this.CartedItem.forEach(e => {
      console.log(e.productId);

      if (e.id == id) {
        if (e.quantaty > 1) {
          e.quantaty = e.quantaty - 1;
        }  
        this.Cartserv.UpdateCart(e).subscribe({
          next: data => {
            if (data.success) {
              console.log("updated");
              this.toastr.success("Your Cart is Updated Succesfully")
              e.subPrice = e.quantaty * e.originalPrice;
              this.CalcToatal()
              this.Cartserv.setCartCount()
            }
            else {
              this.toastr.error("Something Wrong Happened")

            }
          }
        })
      }
    })

  }
}