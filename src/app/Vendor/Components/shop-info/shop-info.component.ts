import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { error } from 'highcharts';
import { ToastrService } from 'ngx-toastr';
import { ShopServicesService } from 'src/app/Services/Shop/shop-services.service';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent {
  name: any;
  commercialNumber: any;
  description: any;
  Location: any;
  shopImgUrl: any = "./../../../../assets/img/empty2.png";
  LogoImgUrl: any = "./../../../../assets/img/Empty.png";
  shopImg: any;
  logoImg: any;
  data = new FormData();
  shopForm: FormGroup = new FormGroup({
    Name: new FormControl(),
    CommercialNumber: new FormControl(),
    Description: new FormControl(),
    Location: new FormControl()
  })
  constructor(private _shopServicesService: ShopServicesService , private tostar:ToastrService) {

  }
  ngOnInit(): void {
    this.GetShopInfo();
  }
  shopChanges() {
    // console.log(this.shopForm.control)

    for (const info in this.shopForm.value) {
      this.data.append(info, this.shopForm.controls[info].value)
    }
    this._shopServicesService.Add(this.data).subscribe(res => {
      console.log(res);
      this.tostar.success(" Your Shop Info Updated")
    })
  }

  GetShopInfo() {
    this._shopServicesService.GetOneInfo().subscribe({
      next:res=>
      {
        this.name = res.data.name;
        this.commercialNumber = res.data.commercialNumber;
        this.description = res.data.description;
        this.Location = res.data.location;
        this.shopImgUrl = `https://localhost:7104/Images/${res.data.img}`;
        this.LogoImgUrl = `https://localhost:7104/Images/${res.data.logo}`;
      },
      error:err=>
      {
        this.tostar.error("Faild")
      }
    })

  }
  // getData(res:any) {
  //   this.Name = res.name;
  //   this.CommercialNumber = res.commercialNumber;
  //   this.Description = res.description;
  //   this.Location = res.location;
  // }
  uploadimg(img: any) {
    // this.data.append('ImgURL', img.files[0])
    // console.log(img.files)
    if (img.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(img.files[0]);
      reader.onload = (img) => {
        this.shopImgUrl = img.target?.result;
        console.log(img.target);
      }
    }
    this.data.append('ImgURL', <File>img.files[0]);
    this.shopImg = img.files[0].name;
    console.log(img.files[0].name);
  }



  uploadLogo(logo: any) {
    // this.data.append('LogoURL', logo.files[0])
    console.log(logo.files[0].name)
    if (logo.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(logo.files[0]);
      reader.onload = (logo) => {
        this.LogoImgUrl = logo.target?.result;
        console.log(logo.target?.result);
      }
    }
    this.data.append('LogoURL', <File>logo.files[0]);
    this.logoImg = logo.files[0].name;
    console.log(logo.files[0].name);
  }
}


