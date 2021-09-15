import { Component, ElementRef, OnInit, Output, ViewChild ,EventEmitter, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from './must-matchValdiator';
import { onValueChanged } from '../updateemail/valueChanges';

@Component({
  selector: 'app-modal-reset-password',
  templateUrl: './modal-reset-password.component.html',
  styleUrls: ['./modal-reset-password.component.scss']
})
export class ModalResetPasswordComponent implements OnInit,AfterViewInit {

  @ViewChild('changepasswordInstructionModelButton') changepasswordInstructionModelButton:ElementRef;
  @Output('modalClosed') modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  showPassword:boolean = false;
  changePasswordForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  hide = true;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.buildChangePasswordForm();
  }

  ngAfterViewInit(): void {
    this.showModal();
  }

  showModal(){
    this.changepasswordInstructionModelButton.nativeElement.click();
  }

  closeModal(){
    this.modalClosed.emit(true);
  }

  buildChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldpassword:[{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
      password:[{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
      confirmPassword:[{value:'',disabled:this.submitted}, [Validators.required, Validators.minLength(6)]],
    },
    {
      validators : MustMatch('password', 'confirmPassword')
    });
    this.changePasswordForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.changePasswordForm);
      });
  }

  showHidePassword(show:boolean) {
    this.showPassword = show;
  }

  changePassword(){
    if (!this.submitted && this.changePasswordForm.valid){
      this.submitted = true;
      this.authService.changePassword(this.changePasswordForm.value.oldpassword,this.changePasswordForm.value.password)
        .then((result:AuthResponse) => {
          console.log(result);
          this.submitted = false;
          if (result && result.status == 200){
            this.validationErrors = {errcode:3200,errmsg:'Password changed successfully'};
          }
          else {
            this.validationErrors = {errcode:3001,errmsg:'Something Went Wrong'};
          }
        })
        .catch(err => {
          if (err && err.error && err.error.err){
            this.validationErrors = err.error.err;
          }
          else {
            this.validationErrors = {errcode:3001,errmsg:'Something Went Wrong'};
          }
          console.log(err);
          this.submitted = false;
        })
    }
    
  }
}
