import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { slideInOut } from '../../animations/slideIn';

@Component({
  selector: 'app-good-job',
  templateUrl: './good-job.component.html',
  styleUrls: ['./good-job.component.scss'],
  animations: [
    slideInOut
  ]
})
export class GoodJobComponent implements OnInit {

  @Input('alerts') alerts;
  @Input('appliedFilter') appliedFilters;
  @Input('urlEmail') urlEmail;
  @Input('notificationFilter') notificationFilters;
  @Input('minPriceValue') minPriceValue;
  @Input('maxPriceValue') maxPriceValue;
  @Input('user') user;
  constructor() { }

  ngOnInit(): void {
    this.constructUrl();
  }

  constructUrlV1(){
    console.log(this.alerts);
    console.log(this.appliedFilters);
    console.log(this.urlEmail);
    console.log(this.notificationFilters);
    console.log(this.user);
  }

  constructUrl() {
    let params = new HttpParams();
    params = params.set('sortorder','5');
    params = params.set('dosearch','true');
    params = params.set('redirectToSearchIndex',"true");
    params = params.set('resultview','block');
    params = params.set('pageSize','120');
    params = params.set('maxAgeInDays','0');
    params = params.set('currencyId',this.notificationFilters.currency.name);
    params = params.set('priceFrom',this.minPriceValue.toString());
    params = params.set('priceTo',this.maxPriceValue.toString());
    params = params.set('showpage','1');   
    this.appliedFilters.map(filter => {
      params = params.append(`${filter.type}`,`${filter.id}`);
    })
    if (this.appliedFilters.length > 0){
      console.log('https://www.chrono24.com/search/index.htm?' + params.toString())
      //this.closeDialog({url:'https://www.chrono24.com/search/index.htm?' + params.toString(),filterData:this.constructNotificationFilters(), email:'aymenxyz6@gmail.com',user:'6115d35deb40681b395131b4'})
    }
    else {
    }
  }

}
