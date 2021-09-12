import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-selected-plan',
  templateUrl: './selected-plan.component.html',
  styleUrls: ['./selected-plan.component.scss']
})
export class SelectedPlanComponent implements OnInit {

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
  constructor(private userService: UserService) { }

  ngOnInit(): void {
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
      .then((result) => {
        this.submitted = false;
      })
      .catch(err => {
        this.submitted = false;
      })
  }

}
