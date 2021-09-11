import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('300ms ease-in', style({transform: 'translateY(0%)'}))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({transform: 'translateX(-100%)'}))
    ])
  ]);