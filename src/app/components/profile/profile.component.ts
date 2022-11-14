import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { HomeService } from 'src/app/services/home.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  img: any;
  constructor(private _HomeService: HomeService) {}
  ngOnInit(): void {
    this.getImg();
    this.getToken();
  }
  happyToken: any = '';
  userId: any;
  getToken() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let decode = jwtDecode(token);
    this.happyToken = decode;
    this.userId = this.happyToken.user._id;
    console.log(this.happyToken);
    
  }
  info: any = [];
  notFoundImg:string=''
  getImg() {
    this._HomeService.getImgUserApi().subscribe((res) => {
      if (res.message == 'success') {
        this.info = res.photo;
      }else{
        this.notFoundImg = res.message
      }
    });
  }
  formImg: FormGroup = new FormGroup({
    path: new FormControl(''),
    title: new FormControl(''),
    createdBy: new FormControl(''),
  });
  choosePhoto(event: any) {
    this.img = event.target.files[0];
  }
  errSendImg: String = '';
  sendImg() {
    let title = (<HTMLInputElement>document.getElementById('title')).value;
    const fileMe = new FormData();
    fileMe.append('path', this.img);
    fileMe.append('createdBy', this.userId);
    fileMe.append('title', title);
    this._HomeService.sendImgForApi(fileMe).subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
        this.getImg();
      } else {
        this.errSendImg = res.message;
      }
    });
  }
  deleteImg(id: string) {
    let data = {
      post_id: id,
      createdBy: this.userId,
    };
    console.log(data);
    
    this._HomeService.deleteImgForApi(data).subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
        this.getImg();
      }
    });
  }
  formSettingImg: FormGroup = new FormGroup({
    profile_Pic: new FormControl(''),
    createdBy: new FormControl(''),
  });
  imgSrc: string = 'http://localhost:3000';
  changeProfilePic() {
    const fileMe = new FormData();
    fileMe.append('profile_Pic', this.img);
    fileMe.append('createdBy', this.userId);
    console.log(fileMe);
    this._HomeService.proFilePic(fileMe).subscribe((res) => {
      console.log(res);
      if (res.message == 'success') {
        this.getToken();
        this.getImg();
      }
    });
  }
}
