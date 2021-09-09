import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-contactusform',
  templateUrl: './contactusform.component.html',
  styleUrls: ['./contactusform.component.scss']
})
export class ContactusformComponent implements OnInit {

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
  }
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.buildContactUsForm();
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
  }

}
