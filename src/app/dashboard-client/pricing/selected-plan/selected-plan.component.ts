import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-plan',
  templateUrl: './selected-plan.component.html',
  styleUrls: ['./selected-plan.component.scss']
})
export class SelectedPlanComponent implements OnInit {

  @Input('plan') plan;
  constructor() { }

  ngOnInit(): void {
  }

}
