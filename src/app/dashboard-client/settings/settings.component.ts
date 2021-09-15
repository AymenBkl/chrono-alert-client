import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { slideInOut } from '../animations/slideIn';
import { Plan } from '../interfaces';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    slideInOut
  ]
})
export class SettingsComponent implements OnInit {

  user:User;
  modalToShow:string = '';
  userPlan:string = 'Free';
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.checkUserPlan();
  }

  goToPricing(){
    this.router.navigate(['/dashboard-client/pricing']);
  }

  showModal(modalToShow:string){
    this.modalToShow = modalToShow;
  }

  modalClosed(){
    this.modalToShow = '';
  }

  getUser(){
    this.user = this.authService.user;
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
    this.userPlan = 'Standard'
  }



}
