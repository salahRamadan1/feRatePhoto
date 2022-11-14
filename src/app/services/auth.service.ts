import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient  ) {
    if (localStorage.getItem('userToken') != null) {
      this.setUserToken();
    } else {
      this.removeUserToken();
    }
  }
  user: any = new BehaviorSubject(null);

  setUserToken() {
    let token = localStorage.getItem('userToken');
    this.user.next(jwtDecode(<string>token));
  }
  removeUserToken() {
    localStorage.removeItem('userToken');
    this.user.next(null);
 
  }

  register(obj: any): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/user/signup', obj);
  }

  login(obj: any): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/user/signin', obj);
  }
}
