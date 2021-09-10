import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from '../../register/must-matchValdiator';
import { onValueChangedNewPassword } from '../valueChanges';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  @Input('hash') hash:string = '';
  showPassword:boolean = false;
  constructor(private formBuilder:FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildnewPasswordForm();
  }

  buildnewPasswordForm() {
    this.newPasswordForm = this.formBuilder.group({
      password:[{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
      confirmPassword:[{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
    },
    {
      validators : MustMatch('password', 'confirmPassword')
    });
    this.newPasswordForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChangedNewPassword(user, this.newPasswordForm);
      });
  }

  resetPassword(){
    if (this.hash && this.hash != ''){
      this.submitted = true;
      this.authService.submitNewPassword(this.hash,this.newPasswordForm.value.password)
        .then((result:AuthResponse) => {
          this.submitted = false;
          if (result && result){
            this.router.navigate(['/auth']);
          }
        })
        .catch(err => {
          if (err && err.error.err == "HASH DOSN'T EXIST"){
            this.validationErrors = {errcode:15001,errmsg:"HASH DOSN'T EXIST"};
          }
          else {
            
          }
          this.submitted = false;
        })
    }
  }

  showHidePassword(show:boolean) {
    this.showPassword = show;
  }

}
