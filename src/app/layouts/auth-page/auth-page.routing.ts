import { Routes } from "@angular/router";
import { LoginComponent } from "src/app/auth/login/login.component";
import { RegisterComponent } from "src/app/auth/register/register.component";
import { ResetPasswordComponent } from "src/app/auth/reset-password/reset-password.component";
import { VerifyEmailComponent } from "src/app/auth/verify-email/verify-email.component";
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';
import { AuthGuardVerifyEmailService as AuthGuardVerifyEmail } from '../../services/auth-guard.service';

export const authRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component:LoginComponent },
    { path: 'register', component:RegisterComponent },
    { path: 'reset-password', component:ResetPasswordComponent },
    { path: 'verify-email', component:VerifyEmailComponent,canActivate:[AuthGuardVerifyEmail] },
  ];