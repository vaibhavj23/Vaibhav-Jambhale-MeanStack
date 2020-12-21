import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropService } from 'src/app/services/crop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subscribed-crops',
  templateUrl: './subscribed-crops.component.html',
  styleUrls: ['./subscribed-crops.component.css']
})
export class SubscribedCropsComponent implements OnInit {

  public userNameAndEmailObj ={
    userType : "",
    userEmail : ""
  };
  
  public subscribedCropsArray = [];

  constructor(private _cropService :CropService, private _router : Router,
     private _auth: AuthService, private _userService : UserService) { }

     subscribedCropObj ={
      cropType : "",
      cropName : "",
    };
  
  public cropTypeArray = ["grain","fruit","vegetable","nut"]  ;

  public grainsArray = ["wheat", "rice","corn","barley"];
  public fruitsArray = ["apple","mango","oranges","banana"];
  public vegetablesArray = ["potato","onion","tomato","carrot"];
  public nutsArray = ["peanut","almond","walnut","cashew"];

  cropsObj = {
    "grain": this.grainsArray,
    "fruit": this.fruitsArray,
    "vegetable": this.vegetablesArray,
    "nut": this.nutsArray
  };
     
    subscribeCropForm=new FormGroup({
      cropType : new FormControl('',[Validators.required]),
      cropName : new FormControl('',[Validators.required]),
       
    });

    get subscribeFormControl() {
      return this.subscribeCropForm.controls;
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
 
  public alreadySubscribed = "";
  public showModal = false;
    onSubmit()
    {
      //console.log(this.subscribeCropForm.value);
       this._userService.addSubscribedCrop(this.userNameAndEmailObj.userEmail,this.subscribeCropForm.value)
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
            ///console.log(res.message)
            this.alreadySubscribed = res.message;
            this.showModal = true;
            //alert("You have already subscribed to this crop");
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
  
       this._userService.deleteSubscribedCrop(this.deleteCropId)
      .subscribe(
        res => 
        {
          //console.log(res)
          if(res.success)
          {
            //console.log("deleted");
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

    this._userService.getSubscribedCrops(this.userNameAndEmailObj.userEmail)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.subscribedCropsArray=res.message.subscribedCrops;
        }
        else
        {
          console.log(res.message);
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
