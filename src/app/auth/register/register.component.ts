import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from 'src/app/interfaces/response';
import { LandingPageService } from 'src/app/layouts/home-page/services/landing-page.service';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from './must-matchValdiator';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  showPassword:boolean = false;
  registerForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  hide = true;
  constructor(private formBuilder: FormBuilder,
              private authService:AuthService,
              private landingPageService: LandingPageService) { }

  ngOnInit(): void {
    this.buildregisterForm();
  }

  buildregisterForm() {
    this.registerForm = this.formBuilder.group({
      email : [{value:'',disabled:this.submitted}, [Validators.required, Validators.email]],
      password:[{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
      confirmPassword:[{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
      firstName : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      lastName : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      username : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(5),Validators.maxLength(20)]],
    },
    {
      validators : MustMatch('password', 'confirmPassword')
    });
    this.registerForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.registerForm);
      });
  }

  register(){
    if (this.registerForm.valid){
      this.submitted = true;
      this.authService.registerUser(this.registerForm.value)
        .then((result:AuthResponse) => {
          this.submitted = false;
          if (result && result.status == 201){

          }
          else if (result && result.err && result.err.error.err){
            this.validationErrors = {errcode:result.err.error.err.errCode,errmsg:result.err.error.err.msg}
          }
          else {
            this.landingPageService.showErrorMessage();
          }
        })
        .catch((err) => {
          this.submitted = false;
          if (err.error.err.errCode == 11000 || err.error.err.errCode == 11001){
            this.validationErrors = {errcode:err.error.err.errCode,errmsg:err.error.err.msg};
          }
          else {
            this.landingPageService.showErrorMessage();
          }
          console.log(this.validationErrors)
        })
    }
  }

  showHidePassword(show:boolean) {
    this.showPassword = show;
  }

  strOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
    
  }

  omit_special_char(event)
  {   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
 }

}
