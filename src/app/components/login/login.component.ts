import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  // form login 
 loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
 
  });
  ngOnInit(): void {}
  err: string = '';
  //  function login 
  loginForms() {
    this._AuthService.login(this.loginForm.value).subscribe((res) => {
      if (res.message == 'success') {
 
     localStorage.setItem('userToken' , res.token)
     this._AuthService.setUserToken()
       this._Router.navigate(['/home'])
      } else {
        this.err = res.message;
      }
    });
  }
}
