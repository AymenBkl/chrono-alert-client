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
import { LogoutComponent } from "src/app/auth/logout/logout.component";
import { NewPasswordComponent } from "src/app/auth/reset-password/new-password/new-password.component";
import { VerifyChangeEmailComponent } from "src/app/auth/verify-change-email/verify-change-email.component";
import { NotAllowedComponent } from "src/app/auth/not-allowed/not-allowed.component";
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
    SendSuccessComponent,
    LogoutComponent,
    NewPasswordComponent,
    VerifyChangeEmailComponent,
    NotAllowedComponent,
  ],
  providers:[
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AuthPageLayoutModule {}
