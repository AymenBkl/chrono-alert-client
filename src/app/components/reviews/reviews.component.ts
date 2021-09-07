import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<img src="../../../assets/img/left-arrow.svg" class="left-arrow">','<img src="../../../assets/img/right-arrow.svg" class="right-arrow">'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      940: {
        items: 2
      },
      1160: {
        items: 3
      }
    },
    nav: true
  }
  constructor() { }

  ngOnInit() {
  }

}
