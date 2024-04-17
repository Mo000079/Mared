import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../User/Services/cart.service';
import { ProductService } from '../Services/Product/Product.service';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router ,private cartSev:CartService,private PrdServ:ProductService) {

  }

  loginForm: FormGroup = new FormGroup({
    UserName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    Password: new FormControl(null, [Validators.minLength(8), Validators.required])
  })

  error: string = '';
  SubmitLoginForm(form: FormGroup) {
  //   var data= new FormData()
  // data.append("Images",fils)
    this._AuthService.SignIn(form.value).subscribe({
      next: (response) => {
        console.log(response);

        if (response.success == true) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('pic', response.data.userPicture);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('userName', response.data.userName);
          localStorage.setItem('phoneNo', response.data.phoneNumber);
          localStorage.setItem('email', response.data.email);
          this._AuthService.objective.next(true)
          this.cartSev.setCartCount()
          this.PrdServ.setWishlistCount()
          this._AuthService.saveUserData()
          if (response.data.role == "Customer")
            this._Router.navigate(['/']);
          if (response.data.role == "Vendor")
            this._Router.navigate(['/vendor/profile-setting/shop-info']);
          if (response.data.role == "Admin")
            this._Router.navigate(['/admin']);
        }
        else {
          this.error = response.message;
        }
      }
    });
  }


  ngOnInit() {

  }
}
