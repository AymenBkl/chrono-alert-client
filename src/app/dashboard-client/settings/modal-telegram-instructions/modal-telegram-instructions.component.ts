import { Component, ElementRef, OnInit, Output, ViewChild,EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-modal-telegram-instructions',
  templateUrl: './modal-telegram-instructions.component.html',
  styleUrls: ['./modal-telegram-instructions.component.scss']
})
export class ModalTelegramInstructionsComponent implements OnInit,AfterViewInit {

  @ViewChild('telegramInstructionModelButton') telegramInstructionModelButton:ElementRef;
  @Output('modalClosed') modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }
  

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.showModal();
  }

  showModal(){
    this.telegramInstructionModelButton.nativeElement.click();
  }

  closeModal(){
    this.modalClosed.emit(true);
  }

}
