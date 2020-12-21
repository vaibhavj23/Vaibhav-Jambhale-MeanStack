import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dealer-home',
  templateUrl: './dealer-home.component.html',
  styleUrls: ['./dealer-home.component.css']
})
export class DealerHomeComponent implements OnInit {

  public dealerName = "";
  public userEmail = "";
  public userType ="";
  public farmerName = "";
  public isHomePage = true;
  public isProfilePage = false;
  public isSubscribedCropsPage = false;
  public isViewCropsPage = false;
  public isPurchasedCropsPage = false;
  public isViewNotificationsPage = false;
  public userNameAndEmailObj = {
    userType: "",
    userEmail : ""
  };

  constructor(private _auth: AuthService,private _router : Router, private _userService :UserService) { }

  viewProfile(){
    this.isHomePage =false;
    this.isSubscribedCropsPage = false;
    this.isViewCropsPage = false;
    this.isPurchasedCropsPage = false;
    this.isViewNotificationsPage = false;
    this.isProfilePage = true;
  }

  viewSubscribedCrops(){
    this.isHomePage =false;
    this.isProfilePage = false;
    this.isViewCropsPage = false;
    this.isPurchasedCropsPage = false;
    this.isViewNotificationsPage = false;
    this.isSubscribedCropsPage = true;
  }

  viewCrops()
  {
    this.isHomePage =false;
    this.isSubscribedCropsPage = false;
    this.isProfilePage = false;
    this.isPurchasedCropsPage = false;
    this.isViewNotificationsPage = false;
    this.isViewCropsPage = true;
  }
  
  viewPurchasedCrops()
  {
    this.isHomePage =false;
    this.isSubscribedCropsPage = false;
    this.isProfilePage = false;
    this.isViewCropsPage = false;
    this.isViewNotificationsPage = false;
    this.isPurchasedCropsPage = true;
  }

  viewNotificationsPage()
  {
    this.isHomePage =false;
    this.isSubscribedCropsPage = false;
    this.isProfilePage = false;
    this.isViewCropsPage = false;
    this.isPurchasedCropsPage = false;
    this.isViewNotificationsPage = true;
  }

  ngOnInit(): void {
    //this.userType = this._auth.userType ;
    this.userNameAndEmailObj = this._auth.getUserEmailAndType(); 
    this.userType = this.userNameAndEmailObj.userType;
    this.userEmail = this.userNameAndEmailObj.userEmail;
    this._userService.getUserProfile(this.userEmail)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.dealerName=res.message.firstName+" "+res.message.lastName;
        }
        else
        {
          console.log(res.message)
        }
      },
      err => {
        if(err instanceof HttpErrorResponse)
        {
          console.log(err);
          if(err.status == 401 || err.status == 403)
          {
            this._router.navigate(['/login']);
          }
        }
      }
    )

  }

}
