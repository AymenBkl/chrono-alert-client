import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sent-subscribe',
  templateUrl: './sent-subscribe.component.html',
  styleUrls: ['./sent-subscribe.component.scss']
})
export class SentSubscribeComponent implements OnInit {

  @Output('closeModal') closeModalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.closeModalEmitter.emit(true);
  }

}
