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

  omit_special_char(event)
  {   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
 }

}
