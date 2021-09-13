import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
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
  @Output('emailSet') emailSet: EventEmitter<string> = new EventEmitter;
  @Input('alerts') alerts;
  @Input('urlEmail') urlEmail;
  userPlan:string = 'free';
  valid:boolean = false;
  user:User;
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

  nextStep(step:number){
    this.stepProgress.emit(step);
  }

  nextStepNotification(data:any){
    console.log(data,this.step);
    if (data.step > 0){
      if (this.valid && data.step < 5){
        if (data.step == 1 && this.alerts[0].selected){
          this.step = 2;
        }
        else if (data.step == 2 && this.alerts[1].selected){
          
          this.step = 3;
        }
        else if (data.step == 3 && this.alerts[2].selected){
          if (data && data.email){
            this.emailSet.emit(data.email);
            this.urlEmail = data.email;
          }
          this.step = 4;
        }
        else if (data.step == 4 && this.alerts[3].selected){
          this.step = 5;
        }
        else {
          this.nextStepNotification({step:data.step + 1});
        }
      }
      else if (data.step == 0){
        this.step = 1;
      }
      else if (data.step == 5){
        this.nextStep(4);
      }
    }
  }

  prevouisStepNotification(data:any){
    console.log(data,this.step);
    if (this.valid && data.step >= 0){
      if (data.step == 3 && this.alerts[2].selected){
        this.step = 4;
      }
      else if (data.step == 2 && this.alerts[1].selected){
        if (data && data.email){
          this.emailSet.emit(data.email);
          this.urlEmail = data.email;
        }
        this.step = 3;
      }
      else if (data.step == 1 && this.alerts[0].selected){
        if (data && data.email){
          this.urlEmail = data.email;
        }
        this.step = 2;
      }
      else if (data.step == 0){
        this.step = 1;
      }
      else {
        this.prevouisStepNotification({step:data.step -1});
      }
    }
  }


}  

