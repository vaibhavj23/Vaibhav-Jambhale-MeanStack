import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  public userNameAndEmailObj = {
    userType: "",
    userEmail : ""
  };
  public userEmail = "";
  public userType ="";
  public isHomePage = true;
  public isFarmerMngmtPage = false;
  public isDealerMngmtPage = false;
  public isUserRatingPage = false;
  

  constructor(private _auth: AuthService,private _router : Router, private _userService :UserService) { }

  viewFarmerMngmtPage()
  {
    this.isHomePage = false;
    this.isUserRatingPage = false;
    this.isDealerMngmtPage = false;
    this.isFarmerMngmtPage = true;
  }

  viewDealerMngmtPage()
  {
    this.isHomePage = false;
    this.isUserRatingPage = false;
    this.isFarmerMngmtPage = false;
    this.isDealerMngmtPage = true;
  }

  viewUserRatingPage()
  {
    this.isHomePage = false;
    this.isFarmerMngmtPage = false;
    this.isDealerMngmtPage = false;
    this.isUserRatingPage = true;
  }

  ngOnInit(): void {
    this.userNameAndEmailObj = this._auth.getUserEmailAndType(); 
    this.userType = this.userNameAndEmailObj.userType;
    this.userEmail = this.userNameAndEmailObj.userEmail;
    
  }

}
