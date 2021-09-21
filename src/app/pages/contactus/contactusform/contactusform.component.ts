import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingPageResponse } from 'src/app/layouts/home-page/interfaces/response';
import { LandingPageService } from 'src/app/layouts/home-page/services/landing-page.service';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-contactusform',
  templateUrl: './contactusform.component.html',
  styleUrls: ['./contactusform.component.scss']
})
export class ContactusformComponent implements OnInit {

  @ViewChild('sendSuccessModal') sendSuccessModal:ElementRef;
  @ViewChild('closeButton') closeButton:ElementRef;
  contactUsForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  hide = true;
  showForm:boolean = true;
  constructor(private formBuilder: FormBuilder,
              private landingPageService: LandingPageService) { }


  ngOnInit(): void {
    this.getSubmitContact();
  }

  buildContactUsForm() {
    this.contactUsForm = this.formBuilder.group({
      name : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email : [{value:'',disabled:this.submitted}, [Validators.required, Validators.email]],
      subject:[{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      message:[{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    });
    this.contactUsForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.contactUsForm);
      });
  }

  sendContactUs(){
    if (this.checkValidSentContact()){
      this.submitted = true;
      this.landingPageService.addContact(this.contactUsForm.value)
        .then((result: LandingPageResponse) => {
          console.log(result);
          this.submitted = false;
          if (result && result.status == 201){
            this.showForm = false;
            this.openSuccessModal();
            this.submitSentContact();
          }
          else {
            this.validationErrors = {errcode:0,errmsg:result.msg};
            this.landingPageService.showErrorMessage();
          }
        })
        .catch((err:LandingPageResponse) => {
          console.log(err);
          this.validationErrors = {errcode:0,errmsg:err.msg};
          this.submitted = false;
          this.landingPageService.showErrorMessage();
        })
    }
    
  }

  getSubmitContact() {
    if (this.checkValidSentContact()){
      localStorage.removeItem('contact');
      this.showForm = true;
      this.buildContactUsForm();
    }
    else {
      this.showForm = true;
      this.buildContactUsForm();
    }
  }

  checkValidSentContact(){
    var contact = localStorage.getItem('contact');
    if (contact && contact != null){
      var parsedContact = JSON.parse(contact);
      if ((new Date().getTime() - parsedContact.date) < (1 * 24 * 60 * 60 * 1000)) {
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

  submitSentContact(){
    var contactSent = {
      contact:this.contactUsForm.value,
      date:new Date().getTime()
    }
    localStorage.setItem('contact',JSON.stringify(contactSent))
  }


  openSuccessModal(){
    this.sendSuccessModal.nativeElement.click();
  }

  closeSuccessModal(){
    this.closeButton.nativeElement.click();
  }


  


}
