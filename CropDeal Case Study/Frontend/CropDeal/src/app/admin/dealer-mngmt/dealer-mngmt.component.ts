import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CropService } from 'src/app/services/crop.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dealer-mngmt',
  templateUrl: './dealer-mngmt.component.html',
  styleUrls: ['./dealer-mngmt.component.css']
})
export class DealerMngmtComponent implements OnInit {

  public dealersList: any[] = [];
  public purchasedCropsList: any[] = [];
  public dealerReportArray: any[] = [];
  public dealerRatingsArray: any[] = [];


  generateReport()
  {
     for(let obj1 of this.dealersList)
    {
      let obj = {
        objectId : obj1._id,
        dealerName: obj1.firstName +" "+ obj1.lastName,
        dealerEmail: obj1.email,
        phoneNumber: obj1.phoneNumber,
        purchasedCropsCount : 0,
        userType: obj1.userType,
        rating:0,
        purchasedDateArray:[]
      };
      for(let obj2 of this.purchasedCropsList)
      {
        if(obj2.dealerEmail == obj1.email)
        {
          obj.purchasedCropsCount = obj.purchasedCropsCount + 1;
          obj.purchasedDateArray.push(obj2.purchasedDate);
        }
      }
      this.dealerReportArray.push(obj);
    }
    this.sortDates()
    //console.log(this.dealerReportArray);
  }

  sortDates()
  {
    for(let obj of this.dealerReportArray)
    {
      if(obj.purchasedDateArray.length > 1)
      {
        obj.purchasedDateArray.sort(function(a,b){
          return (+new Date(b)) - (+new Date(a));
        });
      }
    }
    //console.log(this.dealerReportArray);
    //add ratings to dealerReportArray
    this.calcRatings();
    
  }

  calcRatings()
  {
    for(let obj1 of this.dealerReportArray)
    {
      var count=0;
      var rating=0;
      for(let obj2 of this.dealerRatingsArray)
      {
        if(obj1.dealerEmail == obj2.dealerEmail)
        {
          count++;
          rating = rating + obj2.rating;
        }
      }
      obj1.rating = (rating/count).toFixed(2);
    }
    console.log(this.dealerReportArray);
  }


  public deleteUserId = "";

  public userObj = {
    userType :""
  }

    onDelete(user){
      this.deleteUserId = user.dealerEmail;
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

 
  

  constructor(private _router: Router, private _userService: UserService, private _cropService: CropService) { }

  ngOnInit(): void {
    this.dealerReportArray = [];
    this._userService.getDealersList()
      .subscribe(
        res => {
          //console.log(res)
          if (res.success) {
            this.dealersList = res.message;
            // get all purchased crops

            this._cropService.getAllPurchasedCropsByAllDealers()
              .subscribe(
                res => {
                  //console.log(res)
                  if (res.success) {
                    this.purchasedCropsList = res.message;
                    //get ratings 
                    this._userService.getDealerRatings()
                    .subscribe(
                    res => 
                    {
                      //console.log(res)
                      if(res.success)
                      {
                        this.dealerRatingsArray=res.message;
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
                  else {
                    console.log(res.message)
                  }
                },
                err => {
                  if (err instanceof HttpErrorResponse) {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                      this._router.navigate(['/login']);
                    }
                  }
                }
              )
          }
          else {
            console.log(res.message)
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            if (err.status == 401 || err.status == 403) {
              this._router.navigate(['/login']);
            }
          }
        }
      )
  }

}
