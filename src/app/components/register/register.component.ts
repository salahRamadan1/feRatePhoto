import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  // form register
  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(16),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(16),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(16),
      Validators.max(60),
    ]),
  });
  ngOnInit(): void {}
  err: string = '';
  messageActive: string = '';
  // function register 
  registerForms() {
    this._AuthService.register(this.registerForm.value).subscribe((res) => {
      if (res.message == 'success') {
        this.messageActive =
          'Please activate your e-mail through the message in the gmail';
        setTimeout(() => {
          this._Router.navigate(['login']);
        }, 3000);
      } else {
        this.err = res.message;
      }
    });
  }
}
