import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropService } from 'src/app/services/crop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-farmer-mngmt',
  templateUrl: './farmer-mngmt.component.html',
  styleUrls: ['./farmer-mngmt.component.css']
})
export class FarmerMngmtComponent implements OnInit {

  public farmerList: any[] = [];
  public publishedCropsList: any[] = [];
  public farmerRatingsArray: any[] = [];
  public farmerReportArray : any[] = [];

   generateReport(){
    for(let obj1 of this.farmerList)
    {
      let obj = {
        objectId : obj1._id,
        farmerName: obj1.firstName +" "+ obj1.lastName,
        farmerEmail: obj1.email,
        phoneNumber: obj1.phoneNumber,
        publishedCropsCount : 0,
        userType: obj1.userType,
        rating:0,
        publishedDateArray:[]
      };
      for(let obj2 of this.publishedCropsList)
      {
        if(obj2.publishedBy == obj1.email)
        {
          obj.publishedCropsCount = obj.publishedCropsCount + 1;
          obj.publishedDateArray.push(obj2.publishedDate);
        }
      }
      this.farmerReportArray.push(obj);
    }
    this.sortDates()
    //console.log(this.farmerReportArray);
  }

  sortDates()
  {
    for(let obj of this.farmerReportArray)
    {
      if(obj.publishedDateArray.length > 1)
      {
        obj.publishedDateArray.sort(function(a,b){
          return (+new Date(b)) - (+new Date(a));
        });
      }
    }
    //console.log(this.farmerReportArray);
    //add ratings to farmerReportArray
    this.calcRatings()
  }

  calcRatings()
  {
    for(let obj1 of this.farmerReportArray)
    {
      var count=0;
      var rating=0;
      for(let obj2 of this.farmerRatingsArray)
      {
        if(obj1.farmerEmail == obj2.farmerEmail)
        {
          count++;
          rating = rating + obj2.rating;
        }
      }
      obj1.rating = (rating/count).toFixed(2);
    }
    //console.log(this.farmerReportArray);
  }

  public deleteUserId = "";

  public userObj = {
    userType :""
  }

    onDelete(user){
      this.deleteUserId = user.farmerEmail;
      this.userObj.userType = user.userType;
    }
  
    deleteRecord(){
      //console.log("record deleted");
  
        this._userService.deleteUser(this.deleteUserId,this.userObj)
      .subscribe(
        res => 
        {
          //console.log(res)
          if(res.success)
          {
            //console.log("deleted");
            //console.log(res.message);
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

 
  constructor(private _auth: AuthService,private _router : Router, 
    private _userService :UserService , private _cropService : CropService) { }

  ngOnInit(): void {
    this.farmerReportArray = [];
    this._userService.getFarmersList()
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.farmerList=res.message;

          //get published crops list
          this._cropService.getAllPublishedCropsByAllFarmers()
          .subscribe(
            res => 
            {
              //console.log(res)
              if(res.success)
              {
                this.publishedCropsList=res.message;
                    //get ratings 
                    this._userService.getFarmerRatings()
                    .subscribe(
                    res => 
                    {
                      //console.log(res)
                      if(res.success)
                      {
                        this.farmerRatingsArray=res.message;
                        this.generateReport();
                
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
    );


  }

}
