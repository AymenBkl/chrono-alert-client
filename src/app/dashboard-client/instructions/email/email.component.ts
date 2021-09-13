import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { slideInOut } from '../../animations/slideIn';
import { Plan } from '../../interfaces';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [
    slideInOut
  ]
})
export class EmailComponent implements OnInit {

  @Input('user') user:User;
  @Output('emailInstructionNext') emailInstructionNext: EventEmitter<any> = new EventEmitter;
  @Output('emailInstructionPrev') emailInstructionPrev: EventEmitter<any> = new EventEmitter;
  userEmail:string;
  disabledUserInput:boolean = true;
  plan:string='Standard Or Pro';
  constructor() { }

  ngOnInit(): void {
    this.disabledAddEmail();
  }

  disabledAddEmail(){
    if (this.user && this.user.plan){
      var userPlan:Plan = this.user.plan;
      var date = new Date().getTime();
      var monthDate = new Date(userPlan.expires).getTime(); 
      var urlsLength = this.user.urls ? this.user.urls.length : 0;
    if (this.user && this.user.plan.name == 'Free'){
      this.disabledUserInput = true;
      this.plan = 'Standard Or Pro';
    }
    else if (userPlan && userPlan.name == 'Pro' && monthDate - date < 30*24*60*60*1000){
      this.disabledUserInput = false;
      this.plan = '';
    }
    else if (userPlan && userPlan.name == 'Standard' && monthDate - date < 30*24*60*60*1000 && urlsLength < 5){
      this.disabledUserInput = false;
      this.plan = 'Pro'
    }
  }
  else {
    this.plan = 'Standard Or Pro';
    this.disabledUserInput = true;
  }
  }

  emitEmailInstructionNext(step:number){
    if (this.user && this.user.plan){
      var userPlan:Plan = this.user.plan;
      var date = new Date().getTime();
      var monthDate = new Date(userPlan.expires).getTime(); 
      var urlsLength = this.user.urls ? this.user.urls.length : 0;
    if (this.user && this.user.plan.name == 'Free'){
      this.emailInstructionNext.emit({step:step,email:this.user.email});
    }
    else if (userPlan && userPlan.name == 'Pro' && monthDate - date < 30*24*60*60*1000){
      this.emailInstructionNext.emit({step:step,email:this.userEmail});

    }
    else if (userPlan && userPlan.name == 'Standard' && monthDate - date < 30*24*60*60*1000 && urlsLength < 5){
      this.emailInstructionNext.emit({step:step,email:this.userEmail});
    }
    else {
      this.emailInstructionNext.emit({step:step,email:this.user.email});
    }
  }
  else {
    this.emailInstructionNext.emit({step:step,email:this.user.email});
  }
  }

  emitEmailInstructionPrev(step:number){
    if (this.user && this.user.plan){
      var userPlan:Plan = this.user.plan;
      var date = new Date().getTime();
      var monthDate = new Date(userPlan.expires).getTime(); 
      var urlsLength = this.user.urls ? this.user.urls.length : 0;
    if (this.user && this.user.plan.name == 'Free'){
      this.emailInstructionPrev.emit({step:step,email:this.user.email});
    }
    else if (userPlan && userPlan.name == 'Pro' && monthDate - date < 30*24*60*60*1000){
      this.emailInstructionPrev.emit({step:step,email:this.userEmail});

    }
    else if (userPlan && userPlan.name == 'Standard' && monthDate - date < 30*24*60*60*1000 && urlsLength < 5){
      this.emailInstructionPrev.emit({step:step,email:this.userEmail});
    }
    else {
      this.emailInstructionPrev.emit({step:step,email:this.user.email});
    }
  }
  else {
    this.emailInstructionPrev.emit({step:step,email:this.user.email});
  }
  }

}
