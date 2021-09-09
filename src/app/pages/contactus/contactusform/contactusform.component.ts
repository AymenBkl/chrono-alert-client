import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  contact = {
    name: '',
    email: '',
    subject:'',
    message:''
  };
  showForm:boolean = true;
  constructor(private formBuilder: FormBuilder) { }


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
        console.log(this.formErrors);
      });
  }

  sendContactUs(){
    this.submitted = true;
    this.submitSentContact();
    setTimeout(() => {
      this.submitted = false;
      this.openSuccessModal();
    },3000)
  }

  getSubmitContact() {
    var contact = localStorage.getItem('contact');
    if (contact && contact != null){
      var parsedContact = JSON.parse(contact);
      if ((new Date().getTime() - parsedContact.date) < (1 * 24 * 60 * 60 * 1000)) {
        this.showForm = false;
      }
      else {
        localStorage.removeItem('contact');
        this.showForm = true;
        this.buildContactUsForm();
      }
    }
    else {
      localStorage.removeItem('contact');
      this.showForm = true;
      this.buildContactUsForm();
    }
  }

  submitSentContact(){
    var contactSent = {
      contact:this.contactUsForm.value,
      date:new Date().getTime()
    }
    console.log(contactSent)
    localStorage.setItem('contact',JSON.stringify(contactSent))
  }


  openSuccessModal(){
    this.sendSuccessModal.nativeElement.click();
  }

  closeSuccessModal(){
    this.closeButton.nativeElement.click();
  }


  


}
