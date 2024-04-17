import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../Services/Product/Product.service';
import { CartService } from '../User/Services/cart.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {


  constructor(private _AuthService: AuthService, private _Router: Router , private Toastr:ToastrService ,private PrdServ:ProductService , private cartServ:CartService) {

  }

  role:string= "Customer";
  registerForm: FormGroup = new FormGroup({
    UserName: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
    PhoneNumber: new FormControl(null, [Validators.required, Validators.min(3)]),
    NationalId: new FormControl(null, [Validators.required, Validators.min(14)]),
    Gender: new FormControl(null, [Validators.required]),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, [Validators.minLength(8), Validators.required]),
    ConfirmPassword: new FormControl(null, [Validators.minLength(8), Validators.required]),
    Role: new FormControl("Customer"),
    Name :new FormControl()
  });

  error: string = '';
  SubmitRegisterForm() {
    this.registerForm.controls["Name"].setValue(this.registerForm.controls["UserName"].value)
    console.log(this.registerForm.value);

    this._AuthService.SignUp(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);

        if (response.success == true) {
          this.Toastr.success("Sign In Successed")
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('pic', response.data.userPicture);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('userName', response.data.userName);
          localStorage.setItem('phoneNo', response.data.phoneNumber);
          localStorage.setItem('email', response.data.email);
          this._AuthService.objective.next(true);
          this.cartServ.setCartCount()
          this.PrdServ.setWishlistCount()
          this._AuthService.saveUserData()
          if (response.data.role == "Customer")
            this._Router.navigate(['/']);
          if (response.data.role == "Vendor")
            this._Router.navigate(['/vendor']);
          if (response.data.role == "Admin")
            this._Router.navigate(['/admin']);

        }
        else {
          this.Toastr.error(response.message)
          this.error = response.message;
        }
      }
    });
  }

  addrole(rolebtn:any){
    console.log(rolebtn);
    this.registerForm.controls["Role"].setValue(this.role=="Customer"?"Vendor":"Customer")
    this.role = "Vendor";
    rolebtn.classList.toggle("btn-sec")
    // rolebtn.classlist.toggle("btn-sec")
  }

}
