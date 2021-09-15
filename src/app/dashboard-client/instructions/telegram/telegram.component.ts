import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
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
  @Output('telegramInstructionNext') telegramInstructionNext: EventEmitter<any> = new EventEmitter;
  @Output('telegramInstructionPrev') telegramInstructionPrev: EventEmitter<any> = new EventEmitter;
  @Input('modal') modal;
  viewInstructions:boolean = false;
  stepInstruction:number = 1;
  constructor() { }

  ngOnInit(): void {
  }


  viewInstructionsClick(show:boolean){
    this.stepInstruction = 1;
    this.viewInstructions = show;
  }


  emitTelegramInstructionNext(step:number){
    this.telegramInstructionNext.emit({step:step})
  }

  emitTelegramInstructionPrev(step:number){
    this.telegramInstructionPrev.emit({step:step})
  }

  nextInstruction(){
    if (this.stepInstruction < 4 && this.stepInstruction > 0){
      this.stepInstruction += 1
    }
  }

  prevInstruction(){
    if (this.stepInstruction < 4 && this.stepInstruction > 0){
      this.stepInstruction -= 1
    }
  }

}
