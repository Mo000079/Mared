import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class VendorGuard implements CanActivate {

  constructor(private authService: AuthService , private _router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userData = this.authService.GetLoggedInUser();
    if (userData?.role == "Vendor") {
      return true;
    } else {
      this._router.navigate(['login']);
      return false;
    }
  }
}
