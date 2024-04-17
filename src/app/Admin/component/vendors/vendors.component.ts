import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent {
  vendors!: any[];
  constructor(private adminServ:AdminService) {
   this.adminServ.GetVendors().subscribe({
    next:data=>{
      console.log("dddddddd");
        this.vendors =data.data
        console.log("vendorsssssssssssssssssssssss",this.vendors);   
    },
    error:err=>{
      console.log(err.message);
      
    }
   })
  }

}
