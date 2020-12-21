import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  public loginResponse ="";

  loginForm=new FormGroup({
    email : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })

  onSubmit()
  {
    this._auth.loginUser(this.loginForm.value)
    .subscribe(
      res => 
      {
        //console.log(res)
        if(res.success)
        {
          this.loginResponse="Login Successful";
          localStorage.setItem('token',res.accessToken);
          //setting following data in token so on refresh the data still can be accessed.
          localStorage.setItem('userType',res.userData.userType);
          localStorage.setItem('userEmail',res.userData.email);
          this._auth.userType = res.userData.userType;
          this._auth.userEmail = res.userData.email;
          if(res.userData.userType=="farmer")
          {
            this._router.navigate(['/farmerHome'])
          }
          else if(res.userData.userType=="dealer")
          {
            this._router.navigate(['/dealerHome'])
          }
          else
          {
            this._router.navigate(['/adminHome'])
          }
          
        }
        else
        {
          this.loginResponse="Login Unsuccessful...Incorrect Username or Password";
        }
      },
      err => console.log(err)
    )

  }
  constructor(private _auth: AuthService,private _router : Router) { }

  ngOnInit(): void {
  }

}
