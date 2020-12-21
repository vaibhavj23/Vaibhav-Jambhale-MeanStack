import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropService } from 'src/app/services/crop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-publish-crop',
  templateUrl: './publish-crop.component.html',
  styleUrls: ['./publish-crop.component.css']
})
export class PublishCropComponent implements OnInit {

  public userNameAndEmailObj = {
    userType: "",
    userEmail : ""
  };

  public userEmail = "";
  public userType ="";
  
  public publishResponse = "";
  
  constructor(private _auth: AuthService,private _router : Router, private _userService :UserService,
    private _cropService :CropService) { }

  cropTypeArray = ['grain','fruit','vegetable','nut'];

  public grainsArray = ["wheat", "rice","corn","barley"];
  public fruitsArray = ["apple","mango","oranges","banana"];
  public vegetablesArray = ["potato","onion","tomato","carrot"];
  public nutsArray = ["peanut","almond","walnut","cashew"];

  public stateArray = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","Uttar Pradesh",
  "West Bengal"]

  cropsObj = {
    "grain": this.grainsArray,
    "fruit": this.fruitsArray,
    "vegetable": this.vegetablesArray,
    "nut": this.nutsArray
  };
  
   publishCropForm=new FormGroup({
    cropType : new FormControl('',[Validators.required]),
     cropName : new FormControl('',[Validators.required]),
    quantityAvailable : new FormControl('',[Validators.required,Validators.min(1)]),
    pricePerKg : new FormControl('',[Validators.required,Validators.min(1)]),
     cropLocation : new FormGroup({
      landmark : new FormControl(''),
      area : new FormControl('',[Validators.required]),
      city : new FormControl('',[Validators.required]),
      state : new FormControl('',[Validators.required]),
      pinCode : new FormControl('',[Validators.required,Validators.pattern("[0-9]{6}")]),
    })
 
  });

  get publishFormControl() {
    return this.publishCropForm.controls;
  }

  get cropLocationControl() {
    return this.publishCropForm.controls.cropLocation as FormGroup;
  }


 
  cropNameArray=[];

   assignCropName(cropTypeSelected)
  {
    //console.log(cropTypeSelected);
    for(let crop in this.cropsObj)
    {
      if( crop ==cropTypeSelected)
      {
        this.cropNameArray = this.cropsObj[crop];
      }
    }
  }
 
  public showModal = false;
  onSubmit()
  {
    //console.log(this.publishCropForm.value);
     
       this._cropService.publishCrop(this.publishCropForm.value)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.publishResponse="Crop Published Successfully";
          //alert("crop published successfully");
          this.showModal = true;
          this.publishCropForm.reset();
          this.ngOnInit();
        }
        else
        {
          this.publishResponse="Error Updating data";
          this.showModal = true;
          //alert("error publishing crop");
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
    this.userType = this.userNameAndEmailObj.userType;
    this.userEmail = this.userNameAndEmailObj.userEmail;
  }

}
