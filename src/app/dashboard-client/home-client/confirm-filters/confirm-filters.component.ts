import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

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
  @Output('stepProgress') stepProgress: EventEmitter<any> = new EventEmitter<any>(false);
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

  nextStep(step:number){
    if (step == 3 && !(this.appliedFiters && ((this.appliedFiters.length < 5 && this.minPriceValue == 0 && this.maxPriceValue== 150000) || (this.appliedFiters.length < 4 && (this.minPriceValue != 0 || this.maxPriceValue != 150000))))){
      this.stepProgress.emit(step);
    }
    else if (step == 1){
      this.stepProgress.emit(step);
    }
  }

}
