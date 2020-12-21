import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.css']
})
export class UserRatingComponent implements OnInit {

  public isDealerRating = false;
  public isFarmerRating = true;
  public farmerRatingsList: any[] = [];
  public dealerRatingsList: any[] = [];

  constructor(private _router: Router, private _userService: UserService) { }

  viewFarmerRating()
  {
    this.isDealerRating =false;
    this.isFarmerRating = true;
  }

  
  viewDealerRating()
  {
    this.isFarmerRating = false;
    this.isDealerRating =true;
  }

  public searchText = "";
  sortBasedOnFarmerEmail()
  {
    if(this.farmerRatingsList.length > 1)
    {
      this.farmerRatingsList.sort( this.compare );

    }
  }

  compare( a, b ) {
    if ( a.farmerEmail < b.farmerEmail ){
      return -1;
    }
    if ( a.farmerEmail > b.farmerEmail ){
      return 1;
    }
    return 0;
  }

  //dealer part
  sortBasedOnDealerEmail()
  {
    if(this.dealerRatingsList.length > 1)
    {
      this.dealerRatingsList.sort( this.compareDealerEamil );

    }
  }

  compareDealerEamil( a, b ) {
    if ( a.dealerEmail < b.dealerEmail ){
      return -1;
    }
    if ( a.dealerEmail > b.dealerEmail ){
      return 1;
    }
    return 0;
  }
 
  

  ngOnInit(): void {
    this._userService.getFarmerRatings()
              .subscribe(
                res => {
                  //console.log(res)
                  if (res.success) {
                    this.farmerRatingsList = res.message;
                    this.sortBasedOnFarmerEmail();
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
              );
              //get Dealers ratings
              this._userService.getDealerRatings()
              .subscribe(
                res => {
                  //console.log(res)
                  if (res.success) {
                    this.dealerRatingsList = res.message;
                    this.sortBasedOnDealerEmail();
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
