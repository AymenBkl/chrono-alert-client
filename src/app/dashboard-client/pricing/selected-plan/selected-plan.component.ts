import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-plan',
  templateUrl: './selected-plan.component.html',
  styleUrls: ['./selected-plan.component.scss']
})
export class SelectedPlanComponent implements OnInit {

  @Input('plan') plan;
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
  constructor() { }

  ngOnInit(): void {
  }

  selectPayment(paymentToSelect){
    this.payments.map(payment => payment.selected = false);
    paymentToSelect.selected = true;
    this.selectedPayment = paymentToSelect;
  }

}
