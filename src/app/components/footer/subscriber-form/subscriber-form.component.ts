import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.scss']
})
export class SubscriberFormComponent implements OnInit {
  
  @ViewChild('sendSuccessModalSubscriber') sendSuccessModal:ElementRef;
  @ViewChild('closeButtonSubscriber') closeButton:ElementRef;
  subscriberForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildSubscriberForm()
  }

  buildSubscriberForm() {
    this.subscriberForm = this.formBuilder.group({
      email : [{value:'',disabled:this.submitted}, [Validators.required, Validators.email]],
    });
    this.subscriberForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.subscriberForm);
        console.log(this.formErrors);
    });
  }

  subscribe(){
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
      this.openSuccessModal();
    },3000)
  }

  openSuccessModal(){
    this.sendSuccessModal.nativeElement.click();
  }

  closeSuccessModal(){
    this.closeButton.nativeElement.click();
  }

}
