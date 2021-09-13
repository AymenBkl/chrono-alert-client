import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit {

  step:number = 1;
  appliedFiters= [];
  minPriceValue: number = 0;
  maxPriceValue: number = 150000;
  notificationFilters = [];
  minTrustedValue: number = 0;
  maxTrustedValue: number = 150000;
  notificationFilter:any;
  alerts = [{
    img:'../../../../assets/img/client-dashboard/app.svg',
    name:'ChronoAlerts App',
    plan:'Free',
    selected:false,
  },
  {
    img:'../../../../assets/img/client-dashboard/email.svg',
    name:'Email',
    plan:'Free',
    selected:false,
  },
  {
    img:'../../../../assets/img/client-dashboard/telegram.svg',
    name:'Telegram',
    plan:'Standard',
    selected:false,
  },
  {
    img:'../../../../assets/img/client-dashboard/whatsapp.svg',
    name:'Whatsapp',
    plan:'Pro',
    selected:false,
  }];
  urlEmail:string = '';
  constructor() { }

  ngOnInit(): void {
  }

  filtersApplied(event) {
    console.log(event);
    this.maxPriceValue = event.maxPrice;
    this.minPriceValue = event.minPrice;
    this.minTrustedValue = event.minTrustValue;
    this.maxTrustedValue = event.maxTrustValue;
    console.log(this.minPriceValue,this.maxPriceValue);
    this.notificationFilter = this.constructNotificationFilters();
    this.step = 2;
  }

  emailApplied(email:string){
    this.urlEmail = email;
  }

  nextStep(event){
    this.step = event;
  }

  constructNotificationFilters() {
    var sellerFilters = new Set();
    var availabilityArticleFilters = new Set();
    var shipingFilter = new Set();
    this.notificationFilters.map(notificationFilter => {
      if (notificationFilter.type == 'shipping'){
        shipingFilter.add(notificationFilter.value);
      }
      else if (notificationFilter.type == 'sellerType') {
        if (notificationFilter.name != 'Sold by Chrono24'){
          sellerFilters.add(notificationFilter.value.replace('"',"'"));
        }
        else {
          sellerFilters.add(notificationFilter.value);
        }
      }
      else if (notificationFilter.type == 'articleAvailability') {
        availabilityArticleFilters.add(notificationFilter.value);
      }
    })
    return {shippingFilter:Array.from(shipingFilter),sellterTypeFilter:Array.from(sellerFilters),availabilityArticleFilters:Array.from(availabilityArticleFilters),trustedMin:this.minTrustedValue,trustedMax:this.maxTrustedValue,currency:this.notificationFilters.filter(filter => filter.type == 'currency')[0]};
  }

}
