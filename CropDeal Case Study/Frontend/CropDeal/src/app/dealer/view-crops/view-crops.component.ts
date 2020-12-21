import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CropService } from 'src/app/services/crop.service';
import { UserService } from 'src/app/services/user.service';
import { WindowRefService } from 'src/app/services/window-ref.service';

@Component({
  selector: 'app-view-crops',
  templateUrl: './view-crops.component.html',
  styleUrls: ['./view-crops.component.css']
})
export class ViewCropsComponent implements OnInit {

  static Crop_Service : CropService;
  


  public userNameAndEmailObj = {
    userType: "",
    userEmail: ""
  };

  public cropsObjArray: any[] = [];
  public grainsArray: any[] = [];
  public fruitsArray: any[] = [];
  public vegetablesArray: any[] = [];
  public nutsArray: any[] = [];

  public farmerRatingsArray : any[] = [];
  dealerName: string;
  dealerContact: any;

  public static showModalR ;
  
  constructor(private _auth: AuthService, private _router: Router, private _cropService: CropService
    , public winRef: WindowRefService,private _userService :UserService)
    {
      ViewCropsComponent.Crop_Service = this._cropService;
      ViewCropsComponent.showModalR = false;
    }


    calcRatings()
    {
      for(let obj1 of this.cropsObjArray)
      {
        var count=0;
        var rating=0;
        for(let obj2 of this.farmerRatingsArray)
        {
          if(obj1.publishedBy == obj2.farmerEmail)
          {
            count++;
            rating = rating + obj2.rating;
          }
        }
        obj1.rating = (rating/count).toFixed(2);
      }
      //console.log(this.cropsObjArray);
    }
  

  async sortBasedOnCropType() {

    //add rating to crop obj array
    await this.calcRatings();
  

    if (this.cropsObjArray.length > 0) {
      this.cropsObjArray.sort(function (a, b) {
        return (+new Date(b.publishedDate)) - (+new Date(a.publishedDate));
      });
    }

    if (this.cropsObjArray.length > 0) {
      for (let crop of this.cropsObjArray) {
        if (crop.cropType == "grain") {
          this.grainsArray.push(crop);
        }
        else if (crop.cropType == "fruit") {
          this.fruitsArray.push(crop);
        }
        else if (crop.cropType == "vegetable") {
          this.vegetablesArray.push(crop);
        }
        else {
          this.nutsArray.push(crop);
        }
      }
    }

  }

  public isViewGrains = true;
  public isViewFruits = true;
  public isViewVegetables = true;
  public isViewNuts = true;
  viewGrains() {
    this.isViewFruits = false;
    this.isViewVegetables = false;
    this.isViewNuts = false;
    this.isViewGrains = true;
  }

  viewFruits() {
    this.isViewVegetables = false;
    this.isViewNuts = false;
    this.isViewGrains = false;
    this.isViewFruits = true;
  }

  viewVegetables() {
    this.isViewNuts = false;
    this.isViewGrains = false;
    this.isViewFruits = false;
    this.isViewVegetables = true;
  }

  viewNuts() {
    this.isViewGrains = false;
    this.isViewFruits = false;
    this.isViewVegetables = false;
    this.isViewNuts = true;
  }

  viewAll() {
    this.isViewGrains = true;
    this.isViewFruits = true;
    this.isViewVegetables = true;
    this.isViewNuts = true;
  }

  cropObj = {
    cropType: "",
    cropName: "",
    quantityPurchased: 0,
    quantityAvailable: 0,
    pricePerKg: 0,
    totalPrice: 0,
    purchasedMethod: "",
    publishedCropId: "",
  };

  farmerEmail = "";
  purchasedCropId = "";
  maxQuantity = "";
  totalAmount = 0;

  calculateAmount(value) {
    this.totalAmount = Number(value) * this.cropObj.pricePerKg;
    this.cropObj.totalPrice = this.totalAmount;
  }

  onCheckout(crop) {
    //console.log(crop);
    this.cropObj = crop;
    this.maxQuantity = crop.quantityAvailable;
    this.purchasedCropId = crop._id;
    this.farmerEmail = crop.publishedBy;


    this.purchaseCropForm = new FormGroup({
      cropType: new FormControl({value:this.cropObj.cropType,disabled:true}, [Validators.required]),
      cropName: new FormControl({value:this.cropObj.cropName,disabled:true}, [Validators.required]),
      quantityPurchased: new FormControl(this.cropObj.quantityPurchased,
         [Validators.required, Validators.max(this.cropObj.quantityAvailable),Validators.min(1)]),
      pricePerKg: new FormControl({value:this.cropObj.pricePerKg,disabled:true}, [Validators.required]),
      totalPrice: new FormControl({value:this.cropObj.totalPrice,disabled:true}, [Validators.required]),
      publishedCropId: new FormControl(this.purchasedCropId)

    });
  }


  purchaseCropForm = new FormGroup({
    cropType: new FormControl({value:this.cropObj.cropType,disabled:true}, [Validators.required]),
    cropName: new FormControl({value:this.cropObj.cropName,disabled:true}, [Validators.required]),
    quantityPurchased: new FormControl(this.cropObj.quantityPurchased,
       [Validators.required, Validators.max(this.cropObj.quantityAvailable),Validators.min(1)]),
    pricePerKg: new FormControl({value:this.cropObj.pricePerKg,disabled:true}, [Validators.required]),
    totalPrice: new FormControl({value:this.cropObj.quantityPurchased * this.cropObj.pricePerKg,disabled:true}
      , [Validators.required]),
    publishedCropId: new FormControl(this.purchasedCropId)

  });

  get purchaseFormControl() {
    return this.purchaseCropForm.controls;
  }


  //modal data

  purchaseResponse = "";
  public showModal  = false;

  get showModalValue()
  {
    return ViewCropsComponent.showModalR;
  }

  closeStaticModal()
  {
    ViewCropsComponent.showModalR =false;
  }
  
  onSubmit() {
    this.purchaseCropForm.value.totalPrice = this.totalAmount;
    this.purchaseCropForm.value.purchasedMethod = "COD";
    this.purchaseCropForm.value.pricePerKg = this.cropObj.pricePerKg;
    //console.log(this.purchaseCropForm.value)
    this._cropService.purchaseCrop(this.purchaseCropForm.value.publishedCropId, this.purchaseCropForm.value)
      .subscribe(
        res => {
          //console.log(res)
          if (res.success) {
            console.log(res.message);
            //alert("Crop Purchased");
            this.purchaseResponse = "Payment Successful...Crop Purchased";
            this.showModal = true;
            //this.showRatingModal = true;
            this.ngOnInit();
            //this._router.navigate(['/viewPurchasedCrops']);
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

  public transactionSuccessfull = true;

  //razor pay code
  public Razorpay: any;

  static formValues : any;


  OpenRazorPay() {
    this.purchaseCropForm.value.totalPrice = this.totalAmount;
    this.purchaseCropForm.value.purchasedMethod = "RazorPay";
    this.purchaseCropForm.value.pricePerKg = this.cropObj.pricePerKg;
    ViewCropsComponent.formValues = this.purchaseCropForm.value;
    //console.log(this.purchaseCropForm.value);
      
    //razorPay
    //console.log("in razor pay");
    var options = {
      "key": "rzp_test_08Q3nuI5Px3myI", // Enter the Key ID generated from the Dashboard
      "amount": this.purchaseCropForm.value.totalPrice*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "CropDeal",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      //"order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": (response) =>{
        //alert("payment Successfull");
        this.transactionSuccessfull = true;
        //on payment success post data in db
        ViewCropsComponent.Crop_Service.purchaseCrop(ViewCropsComponent.formValues.publishedCropId,ViewCropsComponent.formValues)
      .subscribe(
        res => {
          //console.log(res)
          if (res.success) {
            //console.log(res.message);
            this.purchaseResponse = "Payment Successful...Crop Purchased";
            this.showModal = true;
            //ViewCropsComponent.showModalR =true;
            //alert("Crop Purchased");
            this.showRatingModal = true;
            //this._router.navigate(['/viewPurchasedCrops']);
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

        
        /*alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)*/
      },
      "prefill": {
        "name": this.dealerName,
        "email": this.userNameAndEmailObj.userEmail,
        "contact": this.dealerContact
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    this.Razorpay = new this.winRef.nativeWindow.Razorpay(options);
    this.Razorpay.on('payment.failed', function (response){
      this.purchaseResponse = "payment unsuccessful";
      this.showModal = true;
      alert("payment unsuccessful")
          /*alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);*/
  });

    this.Razorpay.open();

  }

  //rating part
  public ratingObj = {
    farmerEmail :"",
    rating : 0
  }
  public showRatingModal = false;

  ctrl = new FormControl(null, Validators.required);

  onRatingSubmit()
  {
    //console.log(this.ctrl.value);

    this.ratingObj.farmerEmail = this.farmerEmail;
    this.ratingObj.rating = this.ctrl.value;
    this.ctrl.reset();
    this.showRatingModal = false;
    this._userService.addRating(this.ratingObj)
              .subscribe(
                res => {
                  //console.log(res)
                  if (res.success) {
                    console.log(res.message);
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
    this.cropsObjArray = [];
    this.grainsArray = [];
    this.fruitsArray = [];
    this.vegetablesArray = [];
    this.nutsArray = [];


    this.userNameAndEmailObj = this._auth.getUserEmailAndType();
    this._cropService.getAllPublishedCrops()
      .subscribe(
        res => {
          //console.log(res)
          if (res.success) {
            this.cropsObjArray = res.message;

            //get farmers rating
            this._userService.getFarmerRatings()
                    .subscribe(
                    res => 
                    {
                      //console.log(res)
                      if(res.success)
                      {
                        this.farmerRatingsArray=res.message;
                        //console.log(this.farmerRatingsArray);
                        //sort published crop array based on crop type
                        this.sortBasedOnCropType();
                
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

            // get user name and contact
            this._userService.getUserProfile(this.userNameAndEmailObj.userEmail)
              .subscribe(
                res => {
                  //console.log(res)
                  if (res.success) {
                    this.dealerName = res.message.firstName + " " + res.message.lastName;
                    this.dealerContact = res.message.phoneNumber;
                    //console.log(this.dealerContact);
                    
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
      );


  }

}
