import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dealer-profile',
  templateUrl: './dealer-profile.component.html',
  styleUrls: ['./dealer-profile.component.css']
})
export class DealerProfileComponent implements OnInit {

  public userNameAndEmailObj ={
    userType : "",
    userEmail : ""
  };
    
  
  public stateArray = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","Uttar Pradesh",
  "West Bengal"]
  //public userType= "";
  //public userEmail = "";

  public updateResponse = "";
  public displayEdit =false;
  updateForm: FormGroup;
  displayEditPage()
  {
    this.displayEdit= !this.displayEdit;
    //console.log(this.userObj);
    this.updateForm=new FormGroup({
      email : new  FormControl(this.userObj.email),
      firstName : new FormControl(this.userObj.firstName,[Validators.required]),
      lastName : new FormControl(this.userObj.lastName),
      phoneNumber : new FormControl(this.userObj.phoneNumber,[Validators.required,Validators.pattern("[789][0-9]{9}")]),
      address : new FormGroup({
        landmark : new FormControl(this.userObj.address.landmark),
        area : new FormControl(this.userObj.address.area,[Validators.required]),
        city : new FormControl(this.userObj.address.city,[Validators.required]),
        state : new FormControl(this.userObj.address.state,[Validators.required]),
        pinCode : new FormControl(this.userObj.address.pinCode,[Validators.required,Validators.pattern("[0-9]{6}")]),
      }),
      bankDetails : new FormGroup({
        bankAccNo : new FormControl(this.userObj.bankDetails.bankAccNo),
        bankIfscCode : new FormControl(this.userObj.bankDetails.bankIfscCode),
        bankName : new FormControl(this.userObj.bankDetails.bankName)
      })
  
    });
  
  }

  get updateFormControl() {
    return this.updateForm.controls;
  }

  get addressControl() {
    return this.updateForm.controls.address as FormGroup;
  }
  public userObj ={
    bankDetails:{
      bankAccNo:"",
      bankIfscCode:"",
      bankName:""
    },
    address:{
      landmark:"",
      area:"",
      city:"",
      state:"",
      pinCode:""
    },
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:""
  };
  constructor(private _auth: AuthService,private _router : Router, private _userService :UserService) { }

  onSubmit()
  {
    //console.log(this.updateForm.value);
    this._userService.updateUserProfile(this.updateForm.value,this.userObj.email)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.ngOnInit();
          this.displayEdit= !this.displayEdit;
        }
        else
        {
          this.updateResponse="Error Updating data";
        }
      },
      err => {
        if(err instanceof HttpErrorResponse)
        {
          //console.log(err);
          if(err.status == 401 || err.status == 403)
          {
            this._router.navigate(['/login']);
          }
        }
      }
    )

  }


  ngOnInit(): void {
    this.userNameAndEmailObj = this._auth.getUserEmailAndType();

    this._userService.getUserProfile(this.userNameAndEmailObj.userEmail)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.userObj=res.message;
        }
        else
        {
          console.log(res.message)
        }
      },
      err => {
        if(err instanceof HttpErrorResponse)
        {
          //console.log(err);
          if(err.status == 401 || err.status == 403)
          {
            this._router.navigate(['/login']);
          }
        }
      }
    );

  }

}
