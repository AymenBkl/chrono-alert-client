import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RegisterComponent } from "src/app/auth/register/register.component";
import { LoginComponent } from "src/app/auth/login/login.component";
import { ResetPasswordComponent } from "src/app/auth/reset-password/reset-password.component";
import { authRoutes } from "./auth-page.routing";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AuthPageLayoutModule {}
