import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { slideInOut } from '../../animations/slideIn';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
  styleUrls: ['./telegram.component.scss'],
  animations: [
    slideInOut
  ]
})
export class TelegramComponent implements OnInit {
  @Output('telegramInstruction') telegramInstruction: EventEmitter<any> = new EventEmitter;
  viewInstructions:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }


  viewInstructionsClick(show:boolean){
    this.viewInstructions = show;
  }


  emitTelegramInstruction(step:number){
    this.telegramInstruction.emit({step:step})
  }

}
