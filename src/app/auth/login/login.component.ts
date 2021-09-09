import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword:boolean = false;
  loginForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  hide = true;
  showForm:boolean = true;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  showHidePassword(show:boolean) {
    this.showPassword = show;
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email : [{value:'',disabled:this.submitted}, [Validators.required, Validators.email]],
      password:[{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
    });
    this.loginForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.loginForm);
      });
  }

  logIn(){
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    },3000)
  }

}
