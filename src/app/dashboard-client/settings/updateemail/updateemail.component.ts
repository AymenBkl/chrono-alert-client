import { Component, ElementRef, OnInit, ViewChild,EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-updateemail',
  templateUrl: './updateemail.component.html',
  styleUrls: ['./updateemail.component.scss']
})
export class UpdateemailComponent implements OnInit {

  @ViewChild('updateEmailModelButton') updateEmailModelButton:ElementRef;
  @Output('modalClosed') modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  showPassword:boolean = false;
  updateEmailForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  hide = true;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.buildUpdateEmailForm();
  }

  buildUpdateEmailForm() {
    this.updateEmailForm = this.formBuilder.group({
      email:[{value:'',disabled:this.submitted}, [Validators.required, Validators.email]],
    });
    this.updateEmailForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.updateEmailForm);
      });
  }

  ngAfterViewInit(): void {
    this.showModal();
  }

  showModal(){
    this.updateEmailModelButton.nativeElement.click();
  }

  closeModal(){
    this.modalClosed.emit(true);
  }

}
