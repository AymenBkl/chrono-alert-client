import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Output('appFilter') appFilter: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  viewInstructions:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  viewInstructionsClick(view:boolean){
    this.viewInstructions = view;
  }

  emmitAppFilter(forward:boolean) {
    this.appFilter.emit(forward)
  }

}
