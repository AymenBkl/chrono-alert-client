import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-filters',
  templateUrl: './confirm-filters.component.html',
  styleUrls: ['./confirm-filters.component.scss']
})
export class ConfirmFiltersComponent implements OnInit {

  @Input('appliedFiters') appliedFiters = [];
  @Input('minPriceValue') minPriceValue: number;
  @Input('maxPriceValue') maxPriceValue: number;
  @Input('notificationFilter') notificationFilters;
  constructor() { }

  ngOnInit(): void {
    console.log(this.minPriceValue,this.maxPriceValue,this.notificationFilters);
  }

  removeAppliedFilterPrice(){
    this.minPriceValue = 0;
    this.maxPriceValue = 150000;
  }

  removeFilter(event,item) {
    var indexOfItem = this.appliedFiters.indexOf(item);
    if (indexOfItem == -1) {
      this.appliedFiters.push(item);
    }
    else {
      this.appliedFiters.splice(indexOfItem,1);
    }
    console.log(this.appliedFiters);
  }

}
