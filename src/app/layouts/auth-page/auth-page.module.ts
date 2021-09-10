import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RegisterComponent } from "src/app/auth/register/register.component";
import { LoginComponent } from "src/app/auth/login/login.component";
import { ResetPasswordComponent } from "src/app/auth/reset-password/reset-password.component";
import { authRoutes } from "./auth-page.routing";
import { AuthService } from "src/app/services/auth.service";
import { VerifyEmailComponent } from "src/app/auth/verify-email/verify-email.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { VerifyNowComponent } from "src/app/auth/verify-email/verify-now/verify-now.component";
import { SendSuccessComponent } from "src/app/auth/verify-email/send-success/send-success.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    VerifyEmailComponent ,
    VerifyNowComponent,
    SendSuccessComponent
  ],
  providers:[
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AuthPageLayoutModule {}
