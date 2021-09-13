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

  @Output('appInstruction') appInstruction: EventEmitter<any> = new EventEmitter;
  viewInstructions:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  viewInstructionsClick(view:boolean){
    this.viewInstructions = view;
  }

  emmitappInstruction(step:number) {
    this.appInstruction.emit({step:step});
  }

}
