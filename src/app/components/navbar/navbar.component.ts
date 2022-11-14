import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {

  }

  ngOnInit(): void {
  this._AuthService.user.subscribe(()=>{
    if(this._AuthService.user.getValue()!= null){
     this.isLoggedIn = true
    }else{
      this.isLoggedIn = false
    }
  })
}
logOut(){
  this._AuthService.removeUserToken()
  this._Router.navigate(['/login']);

}
}
