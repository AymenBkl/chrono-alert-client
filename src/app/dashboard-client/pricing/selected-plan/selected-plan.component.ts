import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Plan } from '../../interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-selected-plan',
  templateUrl: './selected-plan.component.html',
  styleUrls: ['./selected-plan.component.scss']
})
export class SelectedPlanComponent implements OnInit {

  @ViewChild('confirmButton') confirmButton: ElementRef;
  @ViewChild('toastRequestBtn') toastRequestBtn:ElementRef;
  @Input('plan') plan;
  @Output('back') backEmitter:EventEmitter<boolean> = new EventEmitter<boolean>(false);
  payments = [{
    paymentType:'Paypal',
    img:'../../../../assets/img/client-dashboard/paypal.svg',
    selected:true
  },
  {
    paymentType:'Credit Card',
    img:'../../../../assets/img/client-dashboard/credit-card.svg',
    selected:false
  },
  {
    paymentType:'Lorem Ipsum',
    img:'../../../../assets/img/client-dashboard/coin-stack.svg',
    selected:false
  },{
    paymentType:'Lorem Ipsum',
    img:'../../../../assets/img/client-dashboard/coin-stack.svg',
    selected:false
  }];
  selectedPayment:any = this.payments[0];
  submitted:boolean = false;
  apiResponse:{msg:string,code:number};
  userPlan:string = 'Free';
  canShowToast:boolean = false;
  userAction:string = '';
  constructor(private userService: UserService,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.checkUserPlan();
  }

  selectPayment(paymentToSelect){
    this.payments.map(payment => payment.selected = false);
    paymentToSelect.selected = true;
    this.selectedPayment = paymentToSelect;
  }

  back(){
    if (!this.submitted){
      this.backEmitter.emit(true);
    }
  }

  addPlan(){
    this.plan.paymentType = this.selectedPayment.paymentType;
    this.submitted = true;
    this.userService.addPlan(this.plan)
      .then((result:any) => {
        this.submitted = false;
        if (result && result.status == 200){
          this.apiResponse = {msg:'Plan Addedd Successfully',code:1200};
        }
        else {
          this.apiResponse = {msg:'Error While Adding Your Plan',code:1001};
        }
        this.showToast();
      })
      .catch(err => {
        this.apiResponse = {msg:'Error While Adding Your Plan',code:1001};
        this.submitted = false;
        this.showToast();
      })
  }

  


  showToast(){
    this.canShowToast = true;
    setTimeout(() => {
      this.canShowToast = false;
    },3000)
  }

  showModal(){
    if (this.authService.user && this.authService.user.plan){
      var date = new Date();
      var monthDate = new Date(this.authService.user.plan.expires);
      var days = Math.floor((-Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) + Date.UTC(monthDate.getFullYear(), monthDate.getMonth(), monthDate.getDate()) ) /(1000 * 60 * 60 * 24));
      if (this.selectedPayment.paymentType == this.authService.user.plan && this.plan.name == this.userPlan){
        this.userAction = 'You already have this plan and ' + days + ' days remaining. Do you want to create new plan?';
        this.confirmButton.nativeElement.click();
      }
      else if (this.authService.user.plan.name != 'Free'){
        this.userAction = 'You already have the ' + this.authService.user.plan.name +  ' plan and ' + days + ' days remaining. Do you want to create new plan?';
        this.confirmButton.nativeElement.click();
      }
      else {
        this.addPlan();
      }
    }
    else {
      this.addPlan();
    }
    
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

}
