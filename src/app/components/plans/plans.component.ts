import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  selectedPlan = 1;
  constructor() { }

  ngOnInit() {
  }

  selectPlan(index) {
    this.selectedPlan = index;
  }

}
