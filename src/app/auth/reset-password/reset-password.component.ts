import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @ViewChild('sendSuccessModal') sendSuccessModal:ElementRef;
  @ViewChild('closeButton') closeButton:ElementRef;
  resetPasswordForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  hash:string = '';
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildresetPasswordForm();
    this.getHash();
  }

  getHash(){
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.hash = params['verify'];
      })
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
        if (result && result.status == 200){
          this.openSuccessModal();
        }
        else {
          this.validationErrors = {errcode:15000,errmsg:"Email don't exists"}
        }
        console.log(result);
      })
      .catch(err => {
        this.submitted = false;
        this.validationErrors = {errcode:15000,errmsg:"Email don't exists"}
      })
  }

  openSuccessModal(){
    this.sendSuccessModal.nativeElement.click();
  }

  closeSuccessModal(){
    this.closeButton.nativeElement.click();
  }



}
