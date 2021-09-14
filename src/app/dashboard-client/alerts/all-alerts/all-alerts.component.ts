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
  constructor(private userService: UserService,
              private ngxSpinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getUrls();
  }


  getUrls() {
    this.ngxSpinner.show('alertsSpinner');
    this.userService.getUrls()
      .then((result:UrlNotificationResponse) => {
        this.ngxSpinner.hide('alertsSpinner');
        if (result && result.status == 200){
          this.urls = result.url;
          console.log(this.urls);
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
