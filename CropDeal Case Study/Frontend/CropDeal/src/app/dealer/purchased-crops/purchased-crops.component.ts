import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropService } from 'src/app/services/crop.service';

import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-purchased-crops',
  templateUrl: './purchased-crops.component.html',
  styleUrls: ['./purchased-crops.component.css']
})
export class PurchasedCropsComponent implements OnInit {

  public userNameAndEmailObj = {
    userType: "",
    userEmail : ""
  };

  public receiptObj = {};
  public purchasedCropsArray:any[] = [];
  public purchasedStatus: boolean =true;
  public purchasedMessage = "";

  public purchasedId = "";
  public displayReceipt = false;

  constructor(private _auth: AuthService, private _router : Router, private _cropService : CropService) { }

  sortArray()
  {
    if(this.purchasedCropsArray.length > 1)
    {
      this.purchasedCropsArray.sort(function(a,b){
        return (+new Date(b.purchasedDate)) - (+new Date(a.purchasedDate));
      });
    }
  }

  getReceipt(crop)
  {
    this.displayReceipt = true;
    this.purchasedId = crop._id;
    this._cropService.getReceipt(this.purchasedId)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.receiptObj=res.message;
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


  ngOnInit(): void {
    this.userNameAndEmailObj = this._auth.getUserEmailAndType();

    this._cropService.getAllPurchasedCrops(this.userNameAndEmailObj.userEmail)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.purchasedCropsArray=res.message;
          if(this.purchasedCropsArray.length==0)
          {
            this.purchasedStatus =false;
            this.purchasedMessage="You have not purchased any crop";
          }
          else
          {
            this.sortArray();
          }
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
          else if(err.status == 500)
          {
            console.log(err);
          }
        }
      }
    )
  }

}
