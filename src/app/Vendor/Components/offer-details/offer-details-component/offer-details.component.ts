import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/Services/Offer/Offer.service';
import { IOffer } from 'src/app/Share/IOffer';

@Component({
  selector: 'app-offer-details-component',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  isProducts: boolean = true;
  isSellarInfo: boolean = false;
  isRelated: boolean = false;
  OfferId:number =0;
  Offers: Array<IOffer>=[];
  myOffer!: IOffer;
  relatedOffers: any[] = [];
  ApiImgUrl:string="https://localhost:7104/Images/";
constructor(private OfferServ:OfferService , private activeRoute:ActivatedRoute)
{
  this.activeRoute.params.subscribe(data=>{
    console.log("id in details",data["id"])
    this.OfferId = data["id"] as number
    this.OfferServ.GetOne(this.OfferId).subscribe({
      next:data=>{
        this.myOffer =data.data
        console.log("get one",this.myOffer);

      },
      error:er=>{
        console.log(er)
      }
    })
  })

  }
  ngOnInit(): void {
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
    this.OfferServ.Search('', cateName).subscribe(res => {
      for (let i = 0; i < 3; i++) {
        this.relatedOffers.push(res.data.data[i]);
      }
      this.relatedOffers = this.relatedOffers.filter(i => i != null && i.title != this.myOffer.title);
    })
  }
}
