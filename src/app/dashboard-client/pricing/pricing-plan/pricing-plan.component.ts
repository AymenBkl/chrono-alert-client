import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.scss']
})
export class PricingPlanComponent implements OnInit {

  pricingPlans = [{
    name:'Free',
    price:0,
    currency:'€',
    period:'month'
  },{
    name:'Standard',
    price:9.99,
    currency:'€',
    period:'month'
  },{
    name:'Pro',
    price:19.99,
    currency:'€',
    period:'month'
  }];
  selectedPlan:any;
  constructor() { }

  ngOnInit(): void {
  }

  selectPlan(plan){
    console.log(plan);
    this.selectedPlan = plan;
  }


}
