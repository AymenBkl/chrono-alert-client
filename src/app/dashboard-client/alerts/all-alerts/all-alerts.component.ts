import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UrlNotification, UrlNotificationResponse, UrlResponse } from 'src/app/interfaces/url';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-all-alerts',
  templateUrl: './all-alerts.component.html',
  styleUrls: ['./all-alerts.component.scss']
})
export class AllAlertsComponent implements OnInit,AfterViewInit {

  @ViewChild('confirmBlockUrlButton') confirmBlockUrlButton: ElementRef;
  urls:UrlNotification[];
  apiResponse:{msg:string,code:number};
  urlActive:number = 0;
  userAction:string = '';
  urlUpdate : {urlId:string,type:string,status:any};
  constructor(private userService: UserService,
              private ngxSpinner: NgxSpinnerService,
              ) { }
  ngAfterViewInit(): void {
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
    this.confirmBlockUrlButton.nativeElement.click();
  }

  dissmissModal(){
    this.urlUpdate = null;
  }




  updateUrl(){
    if (this.urlUpdate){
      this.ngxSpinner.show('alertReqSpinner');
      this.userService.blockUrl(this.urlUpdate.status,this.urlUpdate.urlId,this.urlUpdate.type)
        .then((result:UrlResponse) => {
          if (result && result.status) {
            if (this.urlUpdate.type == 'blockUrl'){
              this.urls.filter(url => url._id == result.url._id)[0].status = result.url.status;
            }
            else if (this.urlUpdate.type == 'blockEmail'){
              this.urls.filter(url => url._id == result.url._id)[0].emailActive = result.url.emailActive;
            }
            else if (this.urlUpdate.type == 'blockTelegram'){
              this.urls.filter(url => url._id == result.url._id)[0].telegramActive = result.url.telegramActive;
            }
            else if (this.urlUpdate.type == 'blockWhatsapp'){
              this.urls.filter(url => url._id == result.url._id)[0].whatsappActive = result.url.whatsappActive;
            }
          }
          this.ngxSpinner.hide('alertReqSpinner');
          console.log(result);
        })
        .catch(err => {
          this.ngxSpinner.hide('alertReqSpinner');
          console.log(err);
        })
    }
    
  }

}
