import { Component, OnInit , Input } from '@angular/core';
import { IOffer } from 'src/app/Share/IOffer';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent implements OnInit {
  ApiImgUrl:string="https://localhost:7104/Images/";
  @Input() myOffer!: IOffer;
  constructor() { }


  ngOnInit() {
  }

}
