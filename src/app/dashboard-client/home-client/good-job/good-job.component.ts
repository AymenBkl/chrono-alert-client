import { Component, Input, OnInit } from '@angular/core';
import { slideInOut } from '../../animations/slideIn';

@Component({
  selector: 'app-good-job',
  templateUrl: './good-job.component.html',
  styleUrls: ['./good-job.component.scss'],
  animations: [
    slideInOut
  ]
})
export class GoodJobComponent implements OnInit {

  @Input('alerts') alerts;
  @Input('appliedFilter') appliedFilters;
  @Input('urlEmail') urlEmail;
  @Input('notificationFilter') notificationFilters;
  @Input('user') user;
  constructor() { }

  ngOnInit(): void {
    this.constructUrl();
  }

  constructUrl(){
    console.log(this.alerts);
    console.log(this.appliedFilters);
    console.log(this.urlEmail);
    console.log(this.notificationFilters);
    console.log(this.user);
  }

}
