import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit{
  isCollapse: boolean = false;
  userName!: string;
  userImg!: string;
  ngOnInit(): void {
    this.userName = localStorage.getItem("userName")!;
    this.userImg = `https://localhost:7104/Images/${localStorage.getItem("pic")!}`;
  }
  collapse() {
    console.log('colapse');
    if (!this.isCollapse) {
      this.isCollapse = true;
    } else {
      this.isCollapse = false;
    }

  }

}
