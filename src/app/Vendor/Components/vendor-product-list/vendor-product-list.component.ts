import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { ICategory } from 'src/app/Share/ICategory';
import { IProduct } from 'src/app/Share/IProduct';

@Component({
  selector: 'app-vendor-product-list',
  templateUrl: './vendor-product-list.component.html',
  styleUrls: ['./vendor-product-list.component.css']
})
export class VendorProductListComponent implements OnInit {
  productName: any;
  Products: IProduct[] = [];
  categories: Array<ICategory> = []
  ProductId: number = 0;
  pageIndex: number = 1;
  pageSize: number = 4;
  count: number = 5;
  countOfPublish: number = this.Products.length;
  countOfDraft: number = 0;
  isdraft: boolean = false;
  ApiUrl: string = "https://localhost:7104/Images/";
  constructor(private PrdServ: ProductService, private toastr: ToastrService) {
    this.PrdServ.GetCategor().subscribe({
      next: data => {
        this.categories = data.data;
      }
    });
    this.GetAll();
  }
  ngOnInit(): void {
    // this.GetAll()
  }
  GetAll() {
    this.PrdServ.GetForVendor(this.pageSize, this.pageIndex, this.isdraft).subscribe(
      (data) => {
        this.Products = data.data.data;
        console.log(this.Products)
        this.Products.forEach(i=> i.quantity = Math.abs(i.quantity!))
        this.pageIndex = data.data.pageIndex;
        this.pageSize = data.data.pageSize
        this.count = data.data.count;
        this.countOfPublish = this.Products.length
        console.log("prodct", this.Products)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  GetOne(id: number) {
    this.PrdServ.GetOne(this.ProductId).subscribe(
      (data) => {
        this.Products = [data.data];
        console.log(data);
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
  delete(id: any) {
    this.PrdServ.Delete(id).subscribe({
      next: messgae => {
        this.GetAll();
        this.toastr.info(messgae.message);


      },
      error: error => {
        this.toastr.error(error.message)
      }
    })
  }
  change(event: any) {
    console.log(event.target.value);
    if (event.target.value == "false") {
      console.log("is     Draft");

      this.isdraft = true;
      this.GetAll();


    }
    else {
      this.isdraft = false;
      this.GetAll();
      this.countOfPublish = this.Products.length
    }

  }

  filter(_e: any) {
    console.log(_e.target.value);
    let careId = _e.target.value;
    this.PrdServ.SearchForVendor("", "", careId).subscribe(res => {
      console.log(res);
      this.Products = res.data.data;
    })
  }

  Search(search:any) {
  this.productName = search.value;
    console.log("search input", search.value);
    this.PrdServ.SearchForVendor(this.productName).subscribe({
        next: data => {
        console.log("daaddadda", data.data)
        this.Products = data.data.data;
          this.count = data.data.count;
          this.pageIndex = data.data.pageIndex;
          this.pageSize = data.data.pageSize;
          console.log(" coooooooooooooont", this.count)
        }
      })

  }
















  // //search
  //   Search() {
  //     var searchParams = {
  //       Name: 'Product Name',
  //       CategoryId: 1,
  //       // Include other search parameters as needed
  //     };

  //   this.PrdServ.Search(searchParams).subscribe(
  //     (data) => {
  //       this.Products = data.data;
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

}




