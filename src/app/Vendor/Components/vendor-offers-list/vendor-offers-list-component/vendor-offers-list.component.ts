import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { OfferService } from 'src/app/Services/Offer/Offer.service';
import { IOffer } from 'src/app/Share/IOffer';


@Component({
  selector: 'app-vendor-offers-list-component',
  templateUrl: './vendor-offers-list.component.html',
  styleUrls: ['./vendor-offers-list.component.css']
})
export class VendorOffersListComponent {

  Offers: Array<IOffer> = [];
  pageIndex: number = 1;
  pageSize: number = 4;
  count: number = 5;
  //for search
  title: string = "";
  CategoryName: string = "";
  CategoryId: number = 0;
  OrderBy: string = "ID";
  IsAscending: boolean = false;
  ApiImgUrl: string = "https://localhost:7104/Images/";
  //
  OffersBublished: number;
  OffersDraft: number;
  isvisible: boolean = false;
  isdraft: boolean = false;
  constructor(private OfferServ: OfferService, private toastr: ToastrService) {
    this.OffersBublished = 0;
    this.OffersDraft = 0;
    this.GetAll();
  }

  Search(search: any) {
    this.title = search.value;
    this.CategoryName = search.value;
    console.log("search input", search.value)
    this.OfferServ.SearchForVendor(this.title, this.CategoryName).subscribe({
      next: data => {
        console.log("daaddadda", data.data)
        this.Offers = data.data.data;
        this.count = data.data.count;
        this.pageIndex = data.data.pageIndex;
        this.pageSize = data.data.pageSize;

        console.log(" coooooooooooooont", this.count)
      }
    })
  }
  delete(id: number) {
    this.OfferServ.Delete(id).subscribe({
      next: messgae => {
        this.GetAll();
        this.toastr.info(messgae.message);
        this.OffersDraft++;

      },
      error: error => {
        this.toastr.error(error.message)
      }
    })
  }
  GetAll() {
    this.OfferServ.GetAllForVendor(this.pageSize, this.pageIndex, this.isdraft).subscribe({
      next: data => {
        console.log("daaddadda", data.data)
        this.isvisible = true;
        this.Offers = data.data.data;
        this.count = data.data.count;
        this.pageIndex = data.data.pageIndex;
        this.pageSize = data.data.pageSize;
        this.Offers.forEach(i => {
          let generateCode = Math.floor(Math.random() * 10) + 12246;
          i.code = String(generateCode);
        })
        console.log(this.Offers);
      }
    })

  }
  changePageSize(input: any) {
    this.pageSize = input.target.value;
    this.GetAll()
  }

  ChangePage(event: number) {
    console.log("event", event);
    this.pageIndex = event;
    this.GetAll()
  }

  change(event: any) {
    console.log(event.target.value);
    if (event.target.value == "Draft") {
      console.log("is Draft");
      this.isdraft = true;
      this.OfferServ.GetAllForVendor(this.pageSize, this.pageIndex, this.isdraft).subscribe({
        next: data => {
          this.Offers = data.data.data

        }
      })
    }
    else {
      this.isdraft = false;
      this.GetAll();
    }

  }
}
