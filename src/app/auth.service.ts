import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIResult } from './ViewModel/APIResult';
import api from '@fortawesome/fontawesome';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLogined:boolean=false;
  objective =new BehaviorSubject<boolean>(this.isLogined);
  
  userDataSubject: BehaviorSubject<LoggedUser|null>
  ApiUrl:string="https://localhost:7104"
  constructor(private _httpClient: HttpClient, _router: Router) {
    this.userDataSubject = new BehaviorSubject<LoggedUser|null>(this.GetLoggedInUser())
  }
  saveUserData() {
    this.userDataSubject.next(this.GetLoggedInUser());
  }
  GetLoggedInUser(): LoggedUser|null{
    if(localStorage.getItem('token') != null){
      let temp : LoggedUser = {
        name:localStorage.getItem('userName')??"",
        token:localStorage.getItem('token')??"",
        picture:localStorage.getItem('pic')??"",
        role:localStorage.getItem('role')??"Customer"
      }
      return temp
    }
    else{
      return null;
    }
  }
// Authorize():boolean
// {
//   return this.isLogined;
// }
  SignUp(userData : object):Observable<APIResult>
  {
    return this._httpClient.post<APIResult>(this.ApiUrl+'/Account/SignUp',userData);
  }

  SignIn(userData : object):Observable<APIResult>
  {
    return this._httpClient.post<APIResult>(this.ApiUrl+'/Account/SignIn',userData);
  }
  SignOut():Observable<APIResult>
  {
   
    return this._httpClient.get<APIResult>(this.ApiUrl+'/Account/SignOut');
  }
}




export interface LoggedUser{
  name:string;
  token :string;
  picture :string;
  role: string;
}
