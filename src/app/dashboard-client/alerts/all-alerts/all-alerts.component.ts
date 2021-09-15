import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UrlNotification, UrlNotificationResponse, UrlResponse } from 'src/app/interfaces/url';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Plan } from '../../interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-all-alerts',
  templateUrl: './all-alerts.component.html',
  styleUrls: ['./all-alerts.component.scss']
})
export class AllAlertsComponent implements OnInit,AfterViewInit {

  @ViewChild('confirmButton') confirmButton: ElementRef;
  @ViewChild('toastRequestBtn') toastRequestBtn:ElementRef;
  urls:UrlNotification[];
  apiResponse:{msg:string,code:number};
  urlActive:number = 0;
  userAction:string = '';
  urlUpdate : {urlId:string,type:string,status:any};
  userPlan:string = 'Free';
  user:User;
  canShowToast:boolean = false;
  constructor(private userService: UserService,
              private ngxSpinner: NgxSpinnerService,
              private authService: AuthService,
              ) { }
  ngAfterViewInit(): void {
    this.checkUserPlan();
    this.getUrls();
  }

  ngOnInit(): void {
  }


  getUrls() {
    this.ngxSpinner.show("alertsSpinner");
    this.userService.getUrls()
      .then((result:UrlNotificationResponse) => {
        this.ngxSpinner.hide('alertsSpinner');
        if (result && result.status == 200){
          this.urls = result.url;
          this.urlActive = this.urls.filter(url => url.status == 'active').length;
        }
        else if (result && result.status == 404){
          this.urls = [];
          this.apiResponse = {msg:'You have no url',code:404};
        }
        else {
          this.urls = [];
          this.apiResponse = {msg:'Oops something went wrong',code:500};
        }
        console.log(result);
      })
      .catch(err => {
        this.ngxSpinner.hide('alertsSpinner');
        this.urls = [];
        if (err && err.status == 404){
          this.apiResponse = {msg:'You have no url',code:404};
        }
        else {
          this.apiResponse = {msg:'Oops something went wrong',code:500};

        }
        
        console.log(err);
      })
  }

  urlCheckBoxCheck(values,urlId){
    if (!values.currentTarget.checked){
      this.userAction = 'Do you want to block this url ?'
    }
    else {
      this.userAction = 'Do you want to unlock this url ?'
    }
    this.urlUpdate = {urlId:urlId,status:values.currentTarget.checked,type:'blockUrl'};
    this.confirmButton.nativeElement.click();
  }

  updateApplicationActive(urlId:string,activeApplication:boolean){
    var activate:boolean;
    if (activeApplication == true){
      this.userAction = 'Do you want to block notification in your application ?';
      activate = false;
    }
    else {
      this.userAction = 'Do you want to activate notification in your application ?';
      activate = true;
    }
    this.urlUpdate = {urlId:urlId,status:activate,type:'blockApplication'};
    this.confirmButton.nativeElement.click();
  }

  updateEmailActive(urlId:string,activeEmail:boolean){
    var activate:boolean;
    console.log(activeEmail)
    if (activeEmail == true){
      this.userAction = 'Do you want to active notification in your email ?';
      activate = false;
    }
    else {
      this.userAction = 'Do you want to block notification in your email ?';
      activate = true;
    }
    this.urlUpdate = {urlId:urlId,status:activate,type:'blockEmail'};
    this.confirmButton.nativeElement.click();
  }

  updateTelegramActive(urlId:string,activeTelegram:boolean){
    console.log('here');
    var activate:boolean;
    if (this.userPlan == 'Standard' || this.userPlan == 'Pro'){
      if (activeTelegram == true){
        this.userAction = 'Do you want to block notification in your telegram ?';
        activate = false;
      }
      else {
        this.userAction = 'Do you want to activate notification in your telegram ?';
        activate = true;
      }
      this.urlUpdate = {urlId:urlId,status:activate,type:'blockTelegram'};
      this.confirmButton.nativeElement.click();
    }
  }

  updateWhatsappActive(urlId:string,activeWhatsapp:boolean){
    var activate:boolean;
    if (this.userPlan == 'Pro'){
      if (activeWhatsapp == true){
        this.userAction = 'Do you want to block notification in your whatsapp ?';
        activate = false;
      }
      else {
        this.userAction = 'Do you want to activate notification in your whatsapp ?';
        activate = true;
      }
      this.urlUpdate = {urlId:urlId,status:activate,type:'blockWhatsapp'};
      this.confirmButton.nativeElement.click();
    }
  }

  dissmissModal(){
    this.urlUpdate = null;
  }


  showToast(){
    this.canShowToast = true;
    setTimeout(() => {
      this.canShowToast = false;
    },3000)
  }


  updateUrl(){
    if (this.urlUpdate){
      this.ngxSpinner.show('alertReqSpinner');
      this.userService.blockUrl(this.urlUpdate.status,this.urlUpdate.urlId,this.urlUpdate.type)
        .then((result:UrlResponse) => {
          this.ngxSpinner.hide('alertReqSpinner');
          if (result && result.status) {
            if (this.urlUpdate.type == 'blockUrl'){
              if (result.url.status == 'active'){
                this.apiResponse = {msg:'Url activated successfully',code:1200};
              }
              else {
                this.apiResponse = {msg:'Url blocked successfully',code:1200};
              }
              this.urls.filter(url => url._id == result.url._id)[0].status = result.url.status;
            }
            else if (this.urlUpdate.type == 'blockEmail'){
              if (result.url.emailActive){
                this.apiResponse = {msg:'Email activated successfully',code:1200};
              }
              else {
                this.apiResponse = {msg:'Email blocked successfully',code:1200};
              }
              this.urls.filter(url => url._id == result.url._id)[0].emailActive = result.url.emailActive;
            }
            else if (this.urlUpdate.type == 'blockTelegram'){
              if (result.url.telegramActive){
                this.apiResponse = {msg:'Telegram activated successfully',code:1200};
              }
              else {
                this.apiResponse = {msg:'Telegram blocked successfully',code:1200};
              }
              this.urls.filter(url => url._id == result.url._id)[0].telegramActive = result.url.telegramActive;
            }
            else if (this.urlUpdate.type == 'blockWhatsapp'){
              if (result.url.whatsappActive){
                this.apiResponse = {msg:'Whatsapp activated successfully',code:1200};
              }
              else {
                this.apiResponse = {msg:'Whatsapp blocked successfully',code:1200};
              }
              this.urls.filter(url => url._id == result.url._id)[0].whatsappActive = result.url.whatsappActive;
            }
            else if (this.urlUpdate.type == 'blockApplication'){
              if (result.url.applicationActive){
                this.apiResponse = {msg:'Application activated successfully',code:1200};
              }
              else {
                this.apiResponse = {msg:'Application blocked successfully',code:1200};
              }
              this.urls.filter(url => url._id == result.url._id)[0].whatsappActive = result.url.whatsappActive;
            }
          }
          else {
            this.apiResponse = {msg:'Something Went Wrong',code:1001};
          }
          this.showToast();
        })
        .catch(err => {
          this.ngxSpinner.hide('alertReqSpinner');
          if (err && err.error.status == 401){
            this.apiResponse = {msg:err.error.msg,code:1000};
          }
          else {
            this.apiResponse = {msg:'Something Went Wrong',code:1001};
          }
          console.log(err);
          this.showToast();
        })
    }
    
  }

  checkUserPlan(){
    this.user = this.authService.user;
    console.log(this.user);
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
  }

}
