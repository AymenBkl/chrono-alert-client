import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit,AfterViewInit {

  selectedPlan = 1;
  innerWidth:any;
  constructor() { }
 

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  }

  selectPlan(index) {
    if (this.innerWidth > 481){
      this.selectedPlan = index;
    }
  }

  nextPlan(){
    if (this.innerWidth <= 481){
      console.log(this.selectedPlan)
      if (this.selectedPlan >= 1 && this.selectedPlan < 3) {
        this.selectedPlan += 1;
        console.log(this.selectedPlan)
      }
    }
    
  }

  prevPlan(){
    if (this.innerWidth < 481){
      if (this.selectedPlan > 1 && this.selectedPlan <= 3) {
        this.selectedPlan -= 1;
      }
    }
    
  }

}
