import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userType = "";
  public userEmail = "";
  private _loginUrl = "http://localhost:3000/login";
  private _registerUrl = "http://localhost:4000/register";
  private _getEmailIds = "http://localhost:3000/usersEmail";

  constructor(private http : HttpClient, private _router: Router) { }

  loginUser(user)
  {
    return this.http.post<any>(this._loginUrl,user);
  }

  logoutUser()
  {
    localStorage.removeItem('token');
    this._router.navigate(['./home'])
  }

  registerUser(user)
  {
    return this.http.post<any>(this._registerUrl,user);
  }

  getUsersEmailIds()
  {
    return this.http.get<any>(this._getEmailIds);
  }


  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUserEmailAndType()
  {
    var userNameAndTypeObj = {
      userType : localStorage.getItem('userType'),
      userEmail : localStorage.getItem('userEmail')
    }
    //console.log(userNameAndTypeObj);
    return userNameAndTypeObj;
  }

  displayUserPage()
  {
    if(this.userType=="farmer")
    {
      this._router.navigate(['./farmerHome']);
    }
    else if(this.userType=="dealer")
    {
      this._router.navigate(['./dealerHome']);
    }
    else
    {
      this._router.navigate(['./adminHome']);
    }
    
  }
}
