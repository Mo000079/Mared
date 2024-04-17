import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from 'src/app/Services/Offer/Offer.service';
import { IOffer } from 'src/app/Share/IOffer';

@Component({
  selector: 'app-customer-offer-details',
  templateUrl: './customer-offer-details.component.html',
  styleUrls: ['./customer-offer-details.component.css' ]
})
export class CustomerOfferDetailsComponent implements OnInit{
  user:boolean=false;
  isUser:boolean=false;
  Offers : Array<IOffer>=[];
  myOffer!:IOffer;
  OfferId: number = 0;
  isFound: boolean = true;
  count: number = 1;
  isProducts: boolean = true;
  isSellarInfo: boolean = false;
  isRelated: boolean = false;
  relatedOffers: any[] = [];
  ApiImgUrl:string="https://localhost:7104/Images/";
  constructor(
    private OfferServ:OfferService,
    private activeRoute:ActivatedRoute,
    private router: Router,
    private tostar:ToastrService) {


    this.activeRoute.params.subscribe(data=>{
      console.log("id in details", data["id"])
      this.relatedOffers = [];
      this.OfferId = data["id"] as number
      this.OfferServ.GetOne(this.OfferId).subscribe({
        next: data => {
          if (data.data != "") {
            this.myOffer = data.data;
            this.isFound = true;
          } else {
            this.isFound = false;
          }

          console.log("get one",this.myOffer);

        },
        error:er=>{
          console.log(er)
        }
      })
      this.OfferServ.GetAll(4,1).subscribe({
        next:data=>{
          this.Offers = data.data.data
          console.log("offffffffffffffff",this.Offers);
          this.getRelatedOffers();
        },
        error:er=>{
          console.log(er)
        }
      })
    })
  }
  check()
  {
    if(this.user == true)
    {
      this.isUser = true;


    } else {

        this.tostar.info("Create Account");
        this.router.navigate(["/register"])

    }
  }
  ngOnInit(): void {
    this.user = localStorage.getItem("token") ? true : false;

  }
  genchChount(event:any)
  {
    this.count =event.target.value;
    console.log(this.count);

  }

  getSellarInfo() {
    this.isSellarInfo = this.isSellarInfo == false ? true : false;
    this.isProducts = false;
    this.isRelated = false;
    this.relatedOffers = [];
    console.log(this.isSellarInfo);
  }
  getProductsSide() {
    this.isProducts = this.isProducts == false ? true : false;
    this.isSellarInfo = false;
    this.isRelated = false;
    this.relatedOffers = [];
  }
  getRelatedOfferSide() {
    this.isRelated = this.isRelated == false ? true : false;
    this.isSellarInfo = false;
    this.isProducts = false;
    this.getRelatedOffers();
  }
  getRelatedOffers() {
    let cateName = this.myOffer.categoryName;
    console.log("myOffer", this.myOffer.title)

    this.OfferServ.Search('', cateName).subscribe(res => {
      this.relatedOffers = [];
      for (let i = 0; i < 4; i++) {
        this.relatedOffers.push(res.data.data[i]);
      }
      console.log(this.relatedOffers);
      this.relatedOffers = this.relatedOffers.filter(i => i != null && i.title != this.myOffer.title);
    })
  }
}
