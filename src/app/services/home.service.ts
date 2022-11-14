import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService
  ) {
    this.getToken();
  }
  happyToken: any = '';
  userId: any;
  getToken() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let decode = jwtDecode(token);
    this.happyToken = decode;
    this.userId = this.happyToken.user._id;
  }
  // get all img for users
  getAllImg(numberPage: Number): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:3000/photo?page=${numberPage}`
    );
  }
  // send img from user to api 
  sendImgForApi(obj: any): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/photo/addPhoto', obj);
  }
  // up img
  upImg(obj: any): Observable<any> {
    return this._HttpClient.patch('http://localhost:3000/photo/up', obj);
  }
  // down img
  downImg(obj: any): Observable<any> {
    return this._HttpClient.patch('http://localhost:3000/photo/down', obj);
  }
  // get img for user
  getImgUserApi(): Observable<any> {
    return this._HttpClient.get('http://localhost:3000/photo/getImgUser', {
      headers: { createdBy: this.userId },
    });
  }
  // delete img 
  deleteImgForApi(obj: any): Observable<any> {
    return this._HttpClient.delete(
      'http://localhost:3000/photo/deletePhoto',
      obj
    );
  }
  //  change profile picture
  proFilePic(obj: any): Observable<any> {
    return this._HttpClient.patch('http://localhost:3000/user/profilePic', obj);
  }
}
