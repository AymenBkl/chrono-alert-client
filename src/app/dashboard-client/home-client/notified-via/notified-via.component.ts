import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Plan } from '../../interfaces';

@Component({
  selector: 'app-notified-via',
  templateUrl: './notified-via.component.html',
  styleUrls: ['./notified-via.component.scss']
})
export class NotifiedViaComponent implements OnInit {

  step:number = 1;
  @Output('stepProgress') stepProgress: EventEmitter<any> = new EventEmitter<any>(false);
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
  userPlan:string = 'free';
  valid:boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.checkUserPlan();
  }

  selectAlert(alertItem){
    if ((alertItem.plan == this.userPlan) || (alertItem.plan == "Free") || (this.userPlan == "Pro" && alertItem.plan == "Standard")){
      alertItem.selected = alertItem.selected ? false : true;
    }
    this.valid = this.alerts.filter(filter => filter.selected)[0] ? true : false;
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
  }

  nextStep(step:number){
    this.stepProgress.emit(step);
  }

  nextStepNotification(forward:boolean){
    if (this.valid){
      this.step += 1;
    }
  }


}
