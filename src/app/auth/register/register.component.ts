import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder) { }

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
      city : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(4),Validators.maxLength(20)]],
      country : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(2),Validators.maxLength(20)]],
      address : [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
      postalCode: [{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(5),Validators.maxLength(20)]],

    },
    {
      validators : MustMatch('password', 'confirmPassword')
    });
    this.registerForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.registerForm);
      });
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
