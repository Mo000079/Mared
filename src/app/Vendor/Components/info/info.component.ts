import { Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { isEmpty } from 'rxjs';
import { AccountService } from 'src/app/Services/account.service';
import { IAccount } from 'src/app/Share/iaccount';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  PhoneNo: any;
  UserName: any;
  pic: any;
  email: any;
  data = new FormData;
  url: any = "https://localhost:7104/Images/OIP.jpg";

  InfoForm: FormGroup = new FormGroup({
    UserName: new FormControl(),
    PhoneNumber: new FormControl(),
    Email: new FormControl()
  })

  constructor(private _account: AccountService, private _ToastrService:ToastrService) { }

  ngOnInit(): void {
    // this.checkImg();
    this.UserName = localStorage.getItem("userName");
    this.PhoneNo = localStorage.getItem("phoneNo");
    this.pic = localStorage.getItem("pic");
    this.email = localStorage.getItem("email")
    console.log(this.pic);

    this.url = `https://localhost:7104/Images/${this.pic}`;
    console.log(this.url);
  }



  saveChanges() {

    for (const info in this.InfoForm.value) {
      this.data.append(info, this.InfoForm.controls[info].value)
    }

    this._account.updateInfo(this.data).subscribe(res => {
      // console.log(res);
      // console.log(this.data);
      // console.log(this.pic);
      localStorage.setItem('pic', this.pic);
      localStorage.setItem('userName', this.UserName);
      localStorage.setItem('phoneNo', this.PhoneNo);
      this.url = `https://localhost:7104/Images/${this.pic}`;
      this._ToastrService.info(res.message)
// console.log(this.url);
    })
  console.log(this.data)




  }
  Update(img: any) {
    console.log('object');
    console.log(img.files[0]);

    if (img.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(img.files[0]);
      reader.onload = (img) => {
        this.url = img.target?.result;
        console.log(img.target);
      }
    }
    this.data.append('Photo', img.files[0]);
    this.pic = img.files[0].name;
    console.log(img.files[0].name);
  }

}
