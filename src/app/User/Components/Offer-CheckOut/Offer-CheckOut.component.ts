import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from 'src/app/Services/Offer/Offer.service';
import { WalletService } from 'src/app/Services/Wallet.service';
import { IOffer } from 'src/app/Share/IOffer';

@Component({
  selector: 'app-Offer-CheckOut',
  templateUrl: './Offer-CheckOut.component.html',
  styleUrls: ['./Offer-CheckOut.component.css']
})
export class OfferCheckOutComponent implements OnInit {

  OfferOrder!: IOffer;
  count: number = 0;
  OfferId: number = 0;
  IsPayedByPoints: boolean = false;
  isDisplayed:boolean= true;
  Location :string= "";
  city= ""
  street= ""
  address= ""
  others= ""

  wallet:any;
  constructor(private activeRoute: ActivatedRoute, 
    private OfferServ: OfferService,
    private Wallet:WalletService,
    private toastr:ToastrService,
    private router:Router) {
    this.activeRoute.params.subscribe(data => {
      console.log("id in details", data["id"])
      this.OfferId = data["id"] as number
      this.count = data["count"] as number
      this.OfferServ.GetOne(this.OfferId).subscribe({
        next: data => {
          this.OfferOrder = data.data
          console.log("get one", this.OfferOrder);

        },
        error: er => {
          console.log(er)
        }
      })

    })
  }
  ChangePyby(event: any) {
    if (event.target.value == "point") {
      this.IsPayedByPoints = true;
      if(this.wallet.earnedPoints >= this.OfferOrder.totalPrice){
        this.toastr.info("Great, You have Enough point")
      }
      else{
        this.IsPayedByPoints = false;
        this.toastr.info("Sorry, You don't have Enough point to buy this offer")
        this.isDisplayed = false
      }
      
    }
    else{
      this.IsPayedByPoints = false;
    }
  }
  ngOnInit() {
    this.Wallet.getWallet().subscribe({
      next:(res)=>{
        console.log("wallet",res.data)
        this.wallet = res.data
      }
    })
  }
  onSubmit(){
    this.Location = this.city+ ", " +this.address + ", " +this.street+ ", " +this.others  
    if(this.count < 0){
      this.toastr.error("Cant Complete Order on 0 Count")
      return;
    }
    
    this.OfferServ.MakOrderByOffer(this.OfferId,this.count,this.Location,this.IsPayedByPoints).subscribe({
      next:(resp)=>{
        console.log(resp.message);
       if(resp.success)
       {
        this.toastr.success(resp.message)
        this.router.navigate(["/user/thanks"])
       }
       else
       {
        this.toastr.error(resp.message)
       }
      },
      error:(err)=>{
        
      }
    })
  }

}
