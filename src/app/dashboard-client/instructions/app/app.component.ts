import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { slideInOut } from '../../animations/slideIn';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInOut
  ]
})
export class AppComponent implements OnInit {

  @Output('appInstructionNext') appInstructionNext: EventEmitter<any> = new EventEmitter;
  @Output('appInstructionPrev') appInstructionPrev: EventEmitter<any> = new EventEmitter;
  viewInstructions:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  viewInstructionsClick(view:boolean){
    this.viewInstructions = view;
  }

  emmitappInstructionNext(step:number) {
    this.appInstructionNext.emit({step:step});
  }
  emmitappInstructionPrev(step:number) {
    console.log(step);
    this.appInstructionPrev.emit({step:step});
  }

}
