import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { ICategory } from 'src/app/Share/ICategory';
import { controllers } from 'chart.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  Data: FormData = new FormData();
  Categories: Array<ICategory> = []
  id = 0;
  SubCategory: any[] = [];
  ErrorMessage: string = '';
  AddProductForm: FormGroup = new FormGroup({});
  error: string = '';
  clothes:boolean = false;

  constructor(private activate: ActivatedRoute,private builder : FormBuilder, private _productservice: ProductService, private _Router: Router , private tostar:ToastrService) {
    this.AddProductForm = new FormGroup({
      Name: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      Price: new FormControl(null, [Validators.required]),
      Description: new FormControl(),
      SubCategoryId: new FormControl(),
      Quantity: new FormControl(),
      BrandName: new FormControl(),
      Weight: new FormControl(),
      ColorSize: this.builder.array([])
    });


    //Get SubCategory
    _productservice.GetSubByCategory(1).subscribe({
      next:(response)=> this.SubCategory = response.data,
      error:(err)=>this.ErrorMessage = err
    });

    //get categories
    this._productservice.GetCategor().subscribe({
      next: data => {
        this.Categories = data.data;

      }
    })

    this.activate.params.subscribe(prams => {
      if (prams['id'] == '' || prams['id'] == undefined)
        this.id = 0
      else
        this.id = parseInt(prams['id'])
      //app to get one product
    })

  }
get colorSizeController(){
  return this.AddProductForm.get('ColorSize') as FormArray;
}
addColorSize()
{
  const ColorSize = this.builder.group({
    Color: '',
    Size: '',
  });
  this.colorSizeController.push(ColorSize);
}
  SubmitProduct() {
    for (const key in this.AddProductForm.value) {
      this.Data.append(key, this.AddProductForm.controls[key].value);
    }
    console.log("images",this.Data.get("Images"));
    console.log("all data ",this.Data);

    this._productservice.AddProduct(this.Data).subscribe({
      next: (response) => {
        if (response.success) {
          this.tostar.info(response.message)
          this._Router.navigate(['/vendor/productlist']);
        }
        else {
          this.tostar.error(response.message)
          this.error = response.message;
        }
      }
    });
  }

  GetSubCat(catid: number) {
    this._productservice.GetSubByCategory(catid).subscribe({
      next: data => {
        this.SubCategory = data.data;
        for(var i= 0 ; i<data.data.length; i++)
        {
          console.log(data.data[i].categoryName)
        if(data.data[i].categoryName == "Clothes")
        {
          console.log(data.data.name)
          this.clothes = true;
        }
        else
        {
          this.clothes = false;
        }
        }
        console.log("data",data.data);
      },
      error: error => {
        console.log(error)
      }
    })

  }
  supCatCheck(id: number) {
    console.log(id)
    this.AddProductForm.controls["SubCategoryId"].setValue(id)
    this.Data.append("SubCategoryId", id.toString())
  }

  upload(fileholder: any) {
    console.log("fileholder.length",fileholder.files.length);

    for(var i =0; i< fileholder.files.length ; i++) {
      this.Data.append("Images", <File>fileholder.files[i],fileholder.files[i].name)
    }
    console.log(<File>fileholder.files[0],fileholder.files[0].name);

  }


}
