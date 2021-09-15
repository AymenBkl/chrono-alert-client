import { Component, ElementRef, OnInit, ViewChild,EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { onValueChanged } from './valueChanges';

@Component({
  selector: 'app-updateemail',
  templateUrl: './updateemail.component.html',
  styleUrls: ['./updateemail.component.scss']
})
export class UpdateemailComponent implements OnInit {

  @ViewChild('updateEmailModelButton') updateEmailModelButton:ElementRef;
  @Output('modalClosed') modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  showPassword:boolean = false;
  updateEmailForm: FormGroup;
  formErrors: any;
  submitted = false;
  validationErrors: {errmsg , errcode};
  hide = true;
  constructor(private formBuilder:FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.buildUpdateEmailForm();
  }

  buildUpdateEmailForm() {
    this.updateEmailForm = this.formBuilder.group({
      email:[{value:'',disabled:this.submitted}, [Validators.required, Validators.email]],
    });
    this.updateEmailForm.valueChanges
      .subscribe(user => {
        this.formErrors = onValueChanged(user, this.updateEmailForm);
      });
  }

  ngAfterViewInit(): void {
    this.showModal();
  }

  showModal(){
    this.updateEmailModelButton.nativeElement.click();
  }

  closeModal(){
    this.modalClosed.emit(true);
  }

  updateEmail(){
    if (!this.submitted && this.updateEmailForm.value.email){
      this.submitted = true;
      this.authService.updateEmail(this.updateEmailForm.value.email)
        .then((result:AuthResponse) => {
          this.submitted = false;
          if (result && result.status == 200){
            this.validationErrors = {errmsg:'Email updated check your inbox to verify the new email',errcode:4200};
          }
          else {
            this.validationErrors = {errmsg:'Something Went Wrong !',errcode:4001};
          }
          console.log(result);
        })
        .catch(err => {
          this.submitted = false;

          if (err && err.error && err.error.status == 400){
            this.validationErrors = {errmsg:err.error.err,errcode:4400};
          }
          else {
            this.validationErrors = {errmsg:'Something Went Wrong !',errcode:4001};
          }
          console.log(err,err && err.error && err.error.status == 400);
        })
    }
  }

}
