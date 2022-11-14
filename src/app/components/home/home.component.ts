import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

import { AuthService } from 'src/app/services/auth.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _HomeService: HomeService,
    private _AuthService: AuthService
  ) {}
  user: any;
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.getImg();
    this.getToken();
    this._AuthService.user.subscribe(() => {
      if (this._AuthService.user.getValue() != null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  happyToken: any = '';
  userId: any;
  imgSrc: string = 'http://localhost:3000/';

  getToken() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let decode = jwtDecode(token);
    this.happyToken = decode;
    this.userId = this.happyToken.user._id;
  }
  info: any = [];
  lengthPhoto: number = 0;
  notFoundImg: string = '';
  // get img users
  getImg() {
    this._HomeService.getAllImg(0).subscribe((res) => {
      console.log(res);

      if (res.message == 'success') {
        this.lengthPhoto = res.photo.length;
        this.info = res.photo;
      }
      if (res.message != 'success') {
        this.notFoundImg = res.message;
      }
    });
  }
  likeLove: string = '';
  //  up img
  loveImg(id: string) {
    let data = {
      post_id: id,
      createdBy: this.userId,
    };

    this._HomeService.upImg(data).subscribe((res) => {
      if (res.message == 'success') {
        this.getImg();
      }
    });
  }
  hateLove: string = '';
  // down img
  hateImg(id: string) {
    let data = {
      post_id: id,
      createdBy: this.userId,
    };

    this._HomeService.downImg(data).subscribe((res) => {
      console.log(res);

      if (res.message == 'success') {
        this.getImg();
      }
    });
  }
}
