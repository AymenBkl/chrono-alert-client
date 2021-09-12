import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notified-via',
  templateUrl: './notified-via.component.html',
  styleUrls: ['./notified-via.component.scss']
})
export class NotifiedViaComponent implements OnInit {

  step:number = 0;
  alerts = [{
    img:'../../../../assets/img/client-dashboard/app.svg',
    name:'ChronoAlerts App',
    plan:'standard',
    selected:false,
  },
  {
    img:'../../../../assets/img/client-dashboard/email.svg',
    name:'Email',
    plan:'standard',
    selected:false,
  },
  {
    img:'../../../../assets/img/client-dashboard/telegram.svg',
    name:'Telegram',
    plan:'pro',
    selected:false,
  },
  {
    img:'../../../../assets/img/client-dashboard/whatsapp.svg',
    name:'Whatsapp',
    plan:'pro',
    selected:false,
  }]
  constructor() { }

  ngOnInit(): void {
  }

  selectAlert(alertItem){
    alertItem.selected = alertItem.selected ? false : true;
  }


}
