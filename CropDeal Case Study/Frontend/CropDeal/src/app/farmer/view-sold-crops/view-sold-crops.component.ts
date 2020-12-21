import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild, ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropService } from 'src/app/services/crop.service'; 

import * as html2pdf from 'html2pdf.js';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-sold-crops',
  templateUrl: './view-sold-crops.component.html',
  styleUrls: ['./view-sold-crops.component.css']
})
export class ViewSoldCropsComponent implements OnInit {

  public userNameAndEmailObj = {
    userType: "",
    userEmail: ""
  };

  public userEmail = "";
  public userType = "";


  public soldCropsArray = [];
  public purchasedId = "";
  public displayReceipt = false;
  public receiptObj = {};

  sortArray() {
    if (this.soldCropsArray.length > 1) {
      this.soldCropsArray.sort(function (a, b) {
        return (+new Date(b.purchasedDate)) - (+new Date(a.purchasedDate));
      });
    }
  }


  constructor(private _cropService: CropService, private _router: Router, private _auth: AuthService,
   private _userService: UserService) { }

  getReceipt(crop) {

    //initialize rating details
    this.dealerEmail = crop.dealerEmail;

    this.displayReceipt = true;

    this.showRatingModal = true;
    
    this.purchasedId = crop._id;
    this._cropService.getReceipt(this.purchasedId)
      .subscribe(
        res => {
          //console.log(res)
          if (res.success) {
            this.receiptObj = res.message;
          }
          else {
            console.log(res.message)
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            //console.log(err);
            if (err.status == 401 || err.status == 403) {
              this._router.navigate(['/login']);
            }
          }
        }
      )
  }

  //pdf download

  openPDF()
  {
    const options = {
      filename: 'receipt.pdf',
      image: {type: 'jpeg'},
      html2canvas: {},
      jsPDF : {orientation : 'landscape'},
    };

    const content : Element = document.getElementById('div1');

    html2pdf()
    .from(content)
    .set(options)
    .save()
  }

  //rating Part

  public dealerEmail="";

  public ratingObj = {
    dealerEmail :"",
    rating : 0
  }

  public showRatingModal =false;
  

  ctrl = new FormControl(null, Validators.required);

  onRatingSubmit()
  {
    //console.log(this.ctrl.value);

    this.ratingObj.dealerEmail = this.dealerEmail;
    this.ratingObj.rating = this.ctrl.value;
    this.showRatingModal = false;
    this.ctrl.reset();

    this._userService.addRating(this.ratingObj)
              .subscribe(
                res => {
                  //console.log(res)
                  if (res.success) {
                    //console.log(res.message);
                    this.ngOnInit();
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


  ngOnInit(): void {
    this.userNameAndEmailObj = this._auth.getUserEmailAndType();
    this.userType = this.userNameAndEmailObj.userType;
    this.userEmail = this.userNameAndEmailObj.userEmail;

    this._cropService.getSoldCrops(this.userEmail)
      .subscribe(
        res => {
          //console.log(res)
          if (res.success) {
            this.soldCropsArray = res.message;
            this.sortArray();
          }
          else {
            console.log(res.message)
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            //console.log(err);
            if (err.status == 401 || err.status == 403) {
              this._router.navigate(['/login']);
            }
          }
        }
      )
  }

}
