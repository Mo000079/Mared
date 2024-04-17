import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-admin-offers-list',
  templateUrl: './admin-offers-list.component.html',
  styleUrls: ['./admin-offers-list.component.css']
})
export class AdminOffersListComponent {
  Offers! :Array<any>;
  pageIndex: number = 1;
  pageSize: number = 10;
  count: number = 10;
  ApiImgUrl: string = "https://localhost:7104/Images/";
  constructor(private adminServ:AdminService)
  {
    this.adminServ.GetOffers(this.pageSize, this.pageIndex).subscribe(
      {
        next:data=>{
          if(data.success)
          {
            this.Offers =data.data.data
            this.count = data.data.count;
            this.pageIndex = data.data.pageIndex;
            this.pageSize = data.data.pageSize;
            console.log(this.Offers , this.pageSize);
            
          }
        }
      }
    )
  }

  ChangePage(event: number) {
    console.log("event", event);
    this.pageIndex = event;
  }
}
