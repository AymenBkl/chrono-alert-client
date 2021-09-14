import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UrlNotification, UrlNotificationResponse } from 'src/app/interfaces/url';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-all-alerts',
  templateUrl: './all-alerts.component.html',
  styleUrls: ['./all-alerts.component.scss']
})
export class AllAlertsComponent implements OnInit {

  urls:UrlNotification[];
  apiResponse:{msg:string,code:number};
  urlActive:number = 0;
  constructor(private userService: UserService,
              private ngxSpinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getUrls();
  }


  getUrls() {
    this.ngxSpinner.show("mySpinner", {
      type: "line-scale-party",
      size: "large",
      bdColor: "rgba(0, 0, 0, 1)",
      color: "white",
      template: "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />"
    });
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
        this.apiResponse = {msg:'Oops something went wrong',code:500};
        console.log(err);
      })
  }

}
