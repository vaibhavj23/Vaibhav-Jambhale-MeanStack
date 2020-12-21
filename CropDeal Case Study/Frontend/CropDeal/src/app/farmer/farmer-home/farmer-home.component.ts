import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-farmer-home',
  templateUrl: './farmer-home.component.html',
  styleUrls: ['./farmer-home.component.css']
})


export class FarmerHomeComponent implements OnInit {

  public userNameAndEmailObj = {
    userType: "",
    userEmail : ""
  };

  public userEmail = "";
  public userType ="";
  public farmerName = "";
  public isHomePage = true;
  public isProfilePage = false;
  public isPublishCropPage = false;
  public isViewPublishedCropPage = false;
  public isViewSoldCropPage = false;
    
  
  constructor(private _auth: AuthService,private _router : Router, private _userService :UserService) { }

  viewProfile()
  {
    this.isHomePage = false;
    this.isPublishCropPage = false;
    this.isViewPublishedCropPage = false;
    this.isViewSoldCropPage = false;
    this.isProfilePage = true;
  }

  publishCrop(){
    this.isHomePage = false;
    this.isProfilePage = false;
    this.isViewPublishedCropPage = false;
    this.isViewSoldCropPage = false;
    this.isPublishCropPage = true;
  }

  viewPublishedCrop(){
    this.isHomePage = false;
    this.isProfilePage = false;
    this.isPublishCropPage = false;
    this.isViewSoldCropPage = false;
    this.isViewPublishedCropPage = true;
  }

  viewSoldCrops(){
    this.isHomePage = false;
    this.isProfilePage = false;
    this.isPublishCropPage = false;
    this.isViewPublishedCropPage = false;
    this.isViewSoldCropPage = true;
  }
  
  ngOnInit(): void {
    this.userNameAndEmailObj = this._auth.getUserEmailAndType(); 
    this.userType = this.userNameAndEmailObj.userType;
    this.userEmail = this.userNameAndEmailObj.userEmail;
    
    this._userService.getFarmerName()
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.farmerName=res.message.name;
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


