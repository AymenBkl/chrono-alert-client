import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.buildresetPasswordForm();
  }

  buildresetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email : [{value:'',disabled:this.submitted}, [Validators.required, Validators.email]],
    });
    this.resetPasswordForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.resetPasswordForm);
      });
  }

  sendResetPassword(){
    this.submitted = true;
    this.authService.sendResetPasswordEmail(this.resetPasswordForm.value.email)
      .then((result:AuthResponse) => {
        this.submitted = false;
        console.log(result);
      })
      .catch(err => {
        this.submitted = false;
        console.log(err);
      })
  }

}
