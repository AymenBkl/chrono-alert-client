import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/response';
import { LandingPageService } from 'src/app/layouts/home-page/services/landing-page.service';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private landingPageService: LandingPageService,
              private router: Router) { }

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
    this.authService.login(this.loginForm.value.password,this.loginForm.value.email)
      .then((result:AuthResponse) => {
        this.submitted = false;
        if (result && result.status == 200){
          this.router.navigate(['/dashboard-client/'])
        }
        else if (result && result.status == 401){
          if (result.err && (result.err.error.err.name == 'IncorrectPasswordError' || result.err.error.err.name == 'IncorrectUsernameError')){
            this.validationErrors = {errcode:11002,errmsg:result.err.error.err.message};
          }
          else if (result.err && (result.err.error.err.name == 'AttemptTooSoonError' || result.err.error.err.name == 'TooManyAttemptsError') ){
            this.validationErrors = {errcode:11003,errmsg:result.err.error.err.message};
          }
        }
        else {
          this.landingPageService.showErrorMessage();
        }
      })
      .catch((err) => {
        this.submitted = false;
        if (err && (err.error && err.error.err && (err.error.err.name == 'IncorrectPasswordError' || err.error.err.name == 'IncorrectUsernameError'))){
          this.validationErrors = {errcode:11002,errmsg:err.error.err.message};
        }
        else if (err && (err.error && err.error.err && (err.error.err.name == 'AttemptTooSoonError' || err.error.err.name == 'TooManyAttemptsError')) ){
          this.validationErrors = {errcode:11003,errmsg:err.error.err.message};
        }
        else {
          this.landingPageService.showErrorMessage();
        }
      })
  }

  omit_special_char(event)
  {   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
 }

}
