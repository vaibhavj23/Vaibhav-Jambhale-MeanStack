import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropService } from 'src/app/services/crop.service';

@Component({
  selector: 'app-view-published-crops',
  templateUrl: './view-published-crops.component.html',
  styleUrls: ['./view-published-crops.component.css']
})
export class ViewPublishedCropsComponent implements OnInit {

  public userNameAndEmailObj = {
    userType: "",
    userEmail : ""
  };

  public userEmail = "";
  public userType ="";

  public stateArray = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","Uttar Pradesh",
  "West Bengal"]

  

  public publishedCropsArray = [];

  sortArray()
  {
    if(this.publishedCropsArray.length > 1)
    {
      this.publishedCropsArray.sort(function(a,b){
        return (+new Date(b.publishedDate)) - (+new Date(a.publishedDate));
      });
    }
  }

  constructor(private _cropService :CropService, private _router : Router, private _auth: AuthService) { }

  cropObj ={
    cropType : "",
    cropName : "",
    quantityAvailable : "",
    pricePerKg : "",
    cropLocation : {
      landmark : "",
      area : "",
      city : "",
      state : "",
      pinCode : ""
    }
  };

  updatedCropId = "";
  

  onEdit(crop)
  {
    //console.log(crop);
    this.cropObj = crop;
    this.updatedCropId = crop._id;

    
  this.editCropForm=new FormGroup({
    cropType : new FormControl(this.cropObj.cropType,[Validators.required]),
     cropName : new FormControl(this.cropObj.cropName,[Validators.required]),
    quantityAvailable : new FormControl(this.cropObj.quantityAvailable,[Validators.required,Validators.min(1)]),
    pricePerKg : new FormControl(this.cropObj.pricePerKg,[Validators.required,Validators.min(1)]),
     cropLocation : new FormGroup({
      landmark : new FormControl(this.cropObj.cropLocation.landmark),
      area : new FormControl(this.cropObj.cropLocation.area,[Validators.required]),
      city : new FormControl(this.cropObj.cropLocation.city,[Validators.required]),
      state : new FormControl(this.cropObj.cropLocation.state,[Validators.required]),
      pinCode : new FormControl(this.cropObj.cropLocation.pinCode,[Validators.required]),
    })
 
  });
  }

   
  editCropForm=new FormGroup({
    cropType : new FormControl(this.cropObj.cropType,[Validators.required]),
     cropName : new FormControl(this.cropObj.cropName,[Validators.required]),
    quantityAvailable : new FormControl(this.cropObj.quantityAvailable,[Validators.required,Validators.min(1)]),
    pricePerKg : new FormControl(this.cropObj.pricePerKg,[Validators.required,Validators.min(1)]),
     cropLocation : new FormGroup({
      landmark : new FormControl(this.cropObj.cropLocation.landmark),
      area : new FormControl(this.cropObj.cropLocation.area,[Validators.required]),
      city : new FormControl(this.cropObj.cropLocation.city,[Validators.required]),
      state : new FormControl(this.cropObj.cropLocation.state,[Validators.required]),
      pinCode : new FormControl(this.cropObj.cropLocation.pinCode,[Validators.required,Validators.pattern("[0-9]{6}")]),
    })
 
  });

  get editFormControl() {
    return this.editCropForm.controls;
  }

  get cropLocationControl() {
    return this.editCropForm.controls.cropLocation as FormGroup;
  }

  onSubmit()
  {
    //console.log(this.editCropForm.value);
    this._cropService.updatePublishedCrop(this.updatedCropId,this.editCropForm.value)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          //console.log("updated");
          this.ngOnInit();
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
    )
 
  }

  public deleteCropId = "";
  onDelete(crop){
    this.deleteCropId = crop._id;
  }

  deleteRecord(){
    //console.log("record deleted");

    this._cropService.deletePublishedCrop(this.deleteCropId)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          console.log("deleted");
          this.ngOnInit();
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
    )
 
  }


  ngOnInit(): void {
    this.userNameAndEmailObj = this._auth.getUserEmailAndType(); 
    this.userType = this.userNameAndEmailObj.userType;
    this.userEmail = this.userNameAndEmailObj.userEmail;
    
    this._cropService.getPublishedCrops(this.userEmail)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.publishedCropsArray=res.message;
          this.sortArray();
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
    )
 
  }

}
