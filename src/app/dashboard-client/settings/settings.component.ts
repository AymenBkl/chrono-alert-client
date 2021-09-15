import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthResponse } from 'src/app/interfaces/response';
import { SocialResponse } from 'src/app/interfaces/telegram';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { slideInOut } from '../animations/slideIn';
import { Plan } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    slideInOut
  ]
})
export class SettingsComponent implements OnInit {

  @ViewChild('confirmButton') confirmButton: ElementRef;
  user:User;
  modalToShow:string = '';
  userPlan:string = 'Free';
  userAction:string = '';
  socialPath:string = '';
  canShowToast:boolean = false;
  apiResponse:{msg:string,code:number};
  userMethod:string = '';
  emailSent:boolean = false;
  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private ngxSpinnerService: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.getUser();
    this.checkUserPlan();
  }

  goToPricing(){
    this.router.navigate(['/dashboard-client/pricing']);
  }

  showModal(modalToShow:string){
    this.modalToShow = modalToShow;
  }

  modalClosed(){
    this.modalToShow = '';
  }

  getUser(){
    this.user = this.authService.user;
  }

  dissmissModal(){
    this.socialPath = '';
  }

  openModal(social:string) {
    if (social == 'telegram'){
      if (this.user.telegram && this.user.telegram.length > 0 && this.user.telegram[0]){
        this.socialPath = 'telegram';
        this.userMethod = 'block';
        if (this.user.telegram[0].status == 'active'){
          this.userAction = 'Do you want to block notification from telegram';
        }
        else {
          this.userAction = 'Do you want to activate notification from telegram';
        }
        this.confirmButton.nativeElement.click();
      }
    }
  }

  openModalDelete(social:string){
    if (social == 'telegram'){
      if (this.user.telegram && this.user.telegram.length > 0 && this.user.telegram[0]){
        this.socialPath = 'telegram';
        this.userMethod = 'delete';
        this.userAction = 'Do you want to delete telegram ?';
        this.confirmButton.nativeElement.click();
      }
    }
  }

  resendVerificationEmail(){
    if (!this.emailSent){
      this.emailSent = true;
      this.ngxSpinnerService.show('settingSpinner');
      this.authService.sendVerificationUpdateEmail()
          .then((result:AuthResponse) => {
            this.emailSent = false;
            this.ngxSpinnerService.hide('settingSpinner');
            if (result && result.status == 200){
              this.apiResponse = {msg:"Email sent successfully",code:1200};
            }
            else {
              this.apiResponse = {msg:"Error Sending Email",code:1001};
            }
            this.showToast();
          })
          .catch(err => {
            this.ngxSpinnerService.hide('settingSpinner');
            if (err && err.error && err.error.status == 409){
              this.apiResponse = {msg:err.error.err,code:1000};
            }
            else {
              this.apiResponse = {msg:"Error Sending Email",code:1001};
            }
            this.emailSent = false;
            this.showToast();
          })
    }
  }

  do(){
    if (this.userMethod == 'block'){
      this.updateSocial();
    }
    else if (this.userMethod == 'delete'){
      this.deleteSocial();
    }
  }
  updateSocial(){
    if (this.socialPath == 'telegram' || this.socialPath == 'whatsapp'){
      this.ngxSpinnerService.show('settingSpinner');
      var socialPath = this.socialPath;
      this.userService.socialUpdate(this.socialPath)
        .then((result:SocialResponse) => {
          this.ngxSpinnerService.hide('settingSpinner');
          this.showToast();
          if (result && result.status == 200 ) {
            this.apiResponse = {msg:result.msg,code:1200};
            if (this.socialPath == 'telegram'){
              console.log('true',result.social)
              this.user.telegram[0] = result.social;
            }
          }
          else {
            this.apiResponse = {msg:'Something Went Wrong !',code:1001};
          }
          console.log(result);
        })
        .catch(err => {
          this.showToast();
          this.ngxSpinnerService.hide('settingSpinner');
          if (err && err.error.status == 401){
            this.apiResponse = {msg:err.error.msg,code:1000};
          }
          else {
            this.apiResponse = {msg:'Something Went Wrong',code:1001};
          }
          console.log(err)
        })
    }
    
  }

  deleteSocial(){
    if (this.socialPath == 'telegram' || this.socialPath == 'whatsapp'){
      this.ngxSpinnerService.show('settingSpinner');
      this.userService.socialDelete(this.socialPath)
        .then((result:SocialResponse) => {
          this.ngxSpinnerService.hide('settingSpinner');
          this.showToast();
          if (result && result.status == 200 ) {
            this.apiResponse = {msg:result.msg,code:1200};
            if (this.socialPath == 'telegram'){
              this.user.telegram[0] = result.social;
              console.log(this.user.telegram[0])
            }
          }
          else {
            this.apiResponse = {msg:'Something Went Wrong !',code:1001};
          }
          console.log(result);
        })
        .catch(err => {
          this.showToast();
          this.ngxSpinnerService.hide('settingSpinner');
          if (err && err.error.status == 401){
            this.apiResponse = {msg:err.error.msg,code:1000};
          }
          else {
            this.apiResponse = {msg:'Something Went Wrong',code:1001};
          }
          console.log(err)
        })
    }
    
  }

  checkUserPlan(){
    if (this.authService.user.plan && this.authService.user.plan != null){
      var userPlan:Plan = this.authService.user.plan;
      var date = new Date().getTime();
      var monthDate = new Date(userPlan.expires).getTime();
      if ((userPlan && userPlan.name == 'Pro' && monthDate - date < 30*24*60*60*1000)){
        this.userPlan = 'Pro';
      }
      else if (userPlan && userPlan.name == 'Standard' && monthDate - date < 30*24*60*60*1000){
        this.userPlan = 'Standard';
      }
      else {
        this.userPlan = 'Free';
      }
    }
    else {
      this.userPlan = 'Free';
    }
    this.userPlan = 'Standard'
  }

  showToast(){
    this.canShowToast = true;
    setTimeout(() => {
      this.canShowToast = false;
    },3000)
  }



}
