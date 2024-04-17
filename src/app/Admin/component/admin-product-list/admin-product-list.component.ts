import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { IProduct } from 'src/app/Share/IProduct';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent {
  pageIndex: number = 1;
  pageSize: number = 4;
  count: number = 5;
  Products: IProduct[] = [];
  ApiUrl: string = "https://localhost:7104/Images/";
constructor(private adminServ: AdminService, private toastr: ToastrService)
{
  this.GetAll()
}
GetAll() {
  this.adminServ.getProduct(this.pageSize,this.pageIndex).subscribe(
    (data) => {
      this.Products = data.data.data;
      this.pageIndex = data.data.pageIndex;
      this.pageSize = data.data.pageSize
      this.count = data.data.count;
      console.log("prodct", this.Products)
    },
    (error) => {
      console.log(error);
    }
  );
}
ChangePage(event: any) {
  this.pageIndex = event
  this.GetAll()

}
}