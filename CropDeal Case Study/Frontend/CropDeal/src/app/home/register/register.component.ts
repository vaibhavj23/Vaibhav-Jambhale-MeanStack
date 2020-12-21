import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registrationResponse = "";
  public usersEmailIds = [];
  public emailArray=[];

  public stateArray = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "Uttar Pradesh",
    "West Bengal"]

  constructor(private _auth: AuthService, private _router: Router) { }

  emailDuplicateValidator=(control: FormControl)=> {
    let email = control.value;
    //console.log(email);
      if(this.emailArray.includes(email))
    {
      return {emailPresent:true};
    }  
    return null;
  }
  

  registrationForm = new FormGroup({
    userType: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email, this.emailDuplicateValidator]),
    password: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, , Validators.pattern("[789][0-9]{9}")]),
    address: new FormGroup({
      landmark: new FormControl(''),
      area: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      pinCode: new FormControl('', [Validators.required, Validators.pattern("[0-9]{6}")]),
    }),
    bankDetails: new FormGroup({
      bankAccNo: new FormControl(''),
      bankIfscCode: new FormControl(''),
      bankName: new FormControl('')
    }),

  });

  get registerFormControl() {
    return this.registrationForm.controls;
  }

  get addressControl() {
    return this.registrationForm.controls.address as FormGroup;
  }


  createEmailArray() {
    for (let obj of this.usersEmailIds) {
      this.emailArray.push(obj.email);
    }
    //console.log(this.emailArray);
  }

  onSubmit() {
    //console.log(this.registrationForm.value);
    this._auth.registerUser(this.registrationForm.value)
      .subscribe(
        res => {
          //console.log(res)
          if (res.success) {
            //this.registrationResponse = "Registration Successful";
            this._router.navigate(['/login']);
          }
          else {
            this.registrationResponse = res.message;
          }
        },
        err => console.log(err)
      )

  }

  ngOnInit(): void {
    //get users email ids
    this._auth.getUsersEmailIds()
      .subscribe(
        res => {
          //console.log(res)
          if (res.success) {
            this.usersEmailIds = res.message;
            //console.log(this.usersEmailIds);
            this.createEmailArray();
          }
          else {
            console.log(res.message);
          }
        },
        err => console.log(err)
      )

  }

}
