import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: any;
  constructor(private _adminServ:AdminService){
    this.getAllCustomers()
  }

  getAllCustomers()
  {
    this._adminServ.GetCustomers().subscribe(Response=>
      {
        this.customers=Response.data;
        console.log("FTH",this.customers);
      })
  }

}
