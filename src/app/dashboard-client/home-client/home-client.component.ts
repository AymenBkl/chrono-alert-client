import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit {

  step:number = 1;
  appliedFiters= [];
  minPriceValue: number = 0;
  maxPriceValue: number = 150000;
  notificationFilters = [];
  minTrustedValue: number = 0;
  maxTrustedValue: number = 150000;
  constructor() { }

  ngOnInit(): void {
  }

  filtersApplied() {
    this.step = 2;
    console.log(this.appliedFiters,this.notificationFilters);
  }

}
