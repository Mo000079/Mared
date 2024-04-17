import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { OfferService } from 'src/app/Services/Offer/Offer.service';
import { ProductService } from 'src/app/Services/Product/Product.service';
import { IOffer } from 'src/app/Share/IOffer';
import { IOfferPrd } from 'src/app/Share/IOfferPrd';
import { IProduct } from 'src/app/Share/IProduct';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  //
  isUpdate: boolean = false;
  Updatebtn = new BehaviorSubject<boolean>(this.isUpdate);
  ApiImgUrl: string = "https://localhost:7104/Images/";
  //for Update
  MyOffer!: IOffer;
  OfferId: number = 0;
  Img!: any;
  Url: any = "https://localhost:7104/Images/";
  //for add
  PrdOfferList: any[] = [];
  Products: IOfferPrd[] = [];
  OfferDetails: Array<object> = [];
  TotalPrice: number = 0;
  TotalEarnedPoints: number = 0;
  TotalQuantity: number = 0;
  Discount: number = 0;
  isFound: boolean = false;   // is found this product in list of offers
  //for search
  Name: string = "";
  CategoryName: string = "";
  SubCategoryName: string = "";
  //data
  OfferData: FormData = new FormData();
  //form group
  AddOfferForm: FormGroup = new FormGroup({});
  constructor(private PrdServ: ProductService, private _Router: Router, private OfferServ: OfferService, private toastr: ToastrService, private activeRoute: ActivatedRoute) {
    //from group
    this.AddOfferForm = new FormGroup({
      Title: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      Description: new FormControl(null, [Validators.maxLength(300), Validators.minLength(10)]),
      Code: new FormControl(null, [Validators.required]),
      Limit: new FormControl(null, [Validators.required]),
      StartDate: new FormControl(null, [Validators.required]),
      ExpirationDate: new FormControl(null, [Validators.required]),
    });


  }
  GetOfferByParams() {
    this.activeRoute.params.subscribe(data => {
      console.log("id in details", data["id"])
      this.OfferId = data["id"] as number
      this.GetOne(this.OfferId)
    })
  }
  GetOne(id:number) {
    if (id> 0) {
      this.isUpdate = true;
      this.OfferServ.GetOne(id).subscribe({
        next: data => {
          this.MyOffer = data.data
          console.log("my offer", this.MyOffer);

          this.MyOffer.offerDetailsViews.forEach(element => {
            this.PrdServ.GetOne(element.id).subscribe
            ({
              next:data=>{
                this.PrdOfferList.push(data.data)
              }
            })

          });
          console.log("prd of offer", this.PrdOfferList);

          this.Discount = this.MyOffer.discount;
          this.TotalPrice = this.MyOffer.totalPrice;
          this.TotalQuantity = this.MyOffer.totalQuantity;
          this.TotalEarnedPoints = this.MyOffer.earnedPoints;
          this.isUpdate = true;
          this.Updatebtn.next(this.isUpdate);
        },
        error: er => {

          console.log(er)
        }
      })
    }
    else {
      console.log("not update");
      this.isUpdate == false;
      this.Updatebtn.subscribe();
    }

  }
  ngOnInit(): void {
    this.GetOfferByParams()
    // this.GetOne();
  }
  //add product from cards to tables
  AddtoOffer(id: number) {
    this.TotalPrice = 0
    this.TotalQuantity = 0;
    this.TotalEarnedPoints = 0;
    this.Discount = 0;

    this.PrdOfferList.forEach(element => {
      if (element.id == id) {
        this.isFound = true;
      }
    });
    this.Products.forEach(element => {
      if (element.id == id && this.isFound == false) {
        element.oldQuantity=element.quantity
        element.quantity = 1
        this.PrdOfferList.push(element)
        this.Products.splice(this.Products.indexOf(element), 1)
      }
    });
    this.PrdOfferList.forEach(element => {
      element.oldPrice = element.price;
      this.TotalPrice += (element.oldPrice * element.quantity);
      this.TotalEarnedPoints += (element.earnedPoint * element.quantity)
      this.Discount += (element.price * element.quantity);
      console.log("dis", this.Discount);
      console.log("qyt", element.quantity);
      this.TotalQuantity += element.quantity;
    })

  }
  //remove from offer list
  RemoveFromOffer(id: number) {
    this.TotalPrice = 0
    this.TotalQuantity = 0;
    this.TotalEarnedPoints = 0;
    this.Discount = 0
    this.PrdOfferList.forEach(element => {
      if (element.id == id) {
        this.PrdOfferList.splice(this.PrdOfferList.indexOf(element), 1)
      }
    });
    this.PrdOfferList.forEach(element => {
      this.TotalPrice += element.price * element.quantity;
      this.TotalEarnedPoints += (element.earnedPoint * element.quantity)
      this.TotalQuantity += element.quantity;
      this.Discount += (element.price * element.quantity);

    })
  }
  //search Function
  Search(input: any) {
    this.Name = input.value;
    this.CategoryName = input.value;
    this.SubCategoryName = input.value;
    this.PrdServ.SearchForVendor(this.Name, this.CategoryName, 0, 0, this.SubCategoryName).subscribe(
      (data) => {
        this.Products = data.data.data as IOfferPrd[];
        console.log("prodct", this.Products);
        console.log("prodctttttvv",this.Products);
      });


  }
  // set price
  setPrice(id: number, event: any) {
    this.TotalPrice = 0;
    this.Discount = 0
    this.PrdOfferList.forEach(p => {
      if (p.id == id) {

        //  this.Discount += event.target.value * p.quantity
        p.price = event.target.value
      }
      //this.TotalPrice +=p.price
      this.Discount += p.price * p.quantity
      this.TotalPrice += p.oldPrice * p.quantity

    })
  }
  setCount(id: number, event: any) {
    this.Discount = 0
    this.TotalQuantity = 0;
    this.TotalPrice = 0;
    this.TotalEarnedPoints = 0;
    // console.log(parseInt(event.target.value));
    this.PrdOfferList.forEach(p => {
      if (p.id == id) {
        p.quantity = parseInt(event.target.value);
      }
      this.Discount += (p.price * p.quantity);
      this.TotalQuantity += p.quantity;
      this.TotalPrice += (p.oldPrice * p.quantity);
      this.TotalEarnedPoints += (p.earnedPoint * p.quantity)

    })

  }
  /// send data to service
  //uplade main image
  // upload(file: any) {
  //   this.Img = file.files[0].name;
  //   console.log("image", this.Img);

  //   this.OfferData.append("MainImage", <File>file.files[0], file.files[0].name)
  //   console.log("file name", file.files[0].name)
  // }

  upload(img: any) {
    console.log('object');
    console.log(img.files[0]);

    if (img.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(img.files[0]);
      reader.onload = (img) => {
        this.Url = img.target?.result;
        console.log(img.target);
      }
    }
    this.OfferData.append('MainImage', img.files[0]);
    // this.pic = img.files[0].name;
    console.log(img.files[0].name);
  }






  //submit function
  SubmitOffer() {

    this.OfferData.append("Discount", this.Discount.toString());

    this.PrdOfferList.forEach(e => {
      this.OfferData.append("ProductIds", JSON.stringify(e.id));
      this.OfferData.append("Counts", JSON.stringify(e.quantity));
    })

    for (const key in this.AddOfferForm.value) {
      this.OfferData.append(key, this.AddOfferForm.controls[key].value);
    }

    this.OfferData.append("Discount", this.Discount.toString());
    this.OfferData.append("TotalQuantity", this.TotalQuantity.toString())
    this.OfferData.append("TotalPrice", this.TotalPrice.toString())

    this.OfferServ.Add(this.OfferData).subscribe({
      next: data => {

        if (data.success == false) {
          this.OfferData = new FormData()
          this.toastr.warning("Some Input are inValid Check again", "Something Want Wrong")
        }
        else {
          this.toastr.success("Add Successfuly")
          this._Router.navigate(['/vendor/offers']);
        }

      },
      error: error => {
        console.log(error.message);
      }
    });


  }
  //Update
  Update() {
    // this.OfferServ.Update(this.OfferData).subscribe({
    //   next: data => {
    //     this.toastr.success("Update Offer Successfuly")
    //     if (data.success == false) {
    //       this.OfferData = new FormData()
    //       this.toastr.warning("Some Input are inValid Check again", "Something Want Wrong")
    //     }

    //   },
    //   error: error => {
    //     console.log(error.message);
    //   }
    // })
  }
}
