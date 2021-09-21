import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingPageResponse } from 'src/app/layouts/home-page/interfaces/response';
import { LandingPageService } from 'src/app/layouts/home-page/services/landing-page.service';
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
  showForm:boolean = true;
  constructor(private formBuilder: FormBuilder,
              private landingPageService: LandingPageService) { }

  ngOnInit(): void {
    this.getSubmitSubscriber();
  }

  buildSubscriberForm() {
    this.subscriberForm = this.formBuilder.group({
      email : [{value:'',disabled:this.submitted}, [Validators.required, Validators.email]],
    });
    this.subscriberForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.subscriberForm);
    });
  }

  subscribe(){
    if (this.checkValidSubscriber()){
      this.submitted = true;
      this.landingPageService.addSubscriber(this.subscriberForm.value.email)
        .then((result: LandingPageResponse) => {
          this.submitted = false;
          if (result && result.status == 201){
            this.showForm = false;
            this.submitSentSubscriber();
            this.openSuccessModal();
          }
          else {
            this.validationErrors = {errcode:0,errmsg:result.msg};
            this.landingPageService.showErrorMessage();
          }
        })
        .catch((err:LandingPageResponse) => {
          this.submitted = false;
          if (err.error.err.errCode == 11000){
            this.validationErrors = {errcode:0,errmsg:'Email Already Exists'};
          }
          else {
            this.validationErrors = {errcode:0,errmsg:err.error.msg};
            this.landingPageService.showErrorMessage();
          }
        })
    }
    
  }

  getSubmitSubscriber() {
    if (this.checkValidSubscriber()){
      localStorage.removeItem('subscriber');
      this.showForm = true;
      this.buildSubscriberForm();
    }
    else {
      this.showForm = true;
      this.buildSubscriberForm();
    }
  }

  checkValidSubscriber() {
    var subscriber = localStorage.getItem('subscriber');
    if (subscriber && subscriber != null){
      var parsedSubscriber = JSON.parse(subscriber);
      if ((new Date().getTime() - parsedSubscriber.date) < (1 * 24 * 60 * 60 * 1000)) {
        return true;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    }
  }

  submitSentSubscriber(){
    var subscriberSent = {
      subscriber:this.subscriberForm.value,
      date:new Date().getTime()
    }
    localStorage.setItem('subscriber',JSON.stringify(subscriberSent))
  }

  openSuccessModal(){
    this.sendSuccessModal.nativeElement.click();
  }

  closeSuccessModal(){
    this.closeButton.nativeElement.click();
  }

}
