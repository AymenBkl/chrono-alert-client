import { Routes } from "@angular/router";
import { LoginComponent } from "src/app/auth/login/login.component";
import { LogoutComponent } from "src/app/auth/logout/logout.component";
import { NotAllowedComponent } from "src/app/auth/not-allowed/not-allowed.component";
import { RegisterComponent } from "src/app/auth/register/register.component";
import { ResetPasswordComponent } from "src/app/auth/reset-password/reset-password.component";
import { VerifyChangeEmailComponent } from "src/app/auth/verify-change-email/verify-change-email.component";
import { VerifyEmailComponent } from "src/app/auth/verify-email/verify-email.component";
import { AuthGuardVerifyEmailService as AuthGuardVerifyEmail } from '../../services/auth-guard.service';
import { UnLoggedGuardService as UnLogged } from '../../services/auth-guard.service';
import { AuthGuardBlockedService as BlockedGaurd } from '../../services/auth-guard.service';

export const authRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component:LoginComponent,canActivate:[UnLogged] },
    { path: 'register', component:RegisterComponent,canActivate:[UnLogged] },
    { path: 'reset-password', component:ResetPasswordComponent,canActivate:[UnLogged] },
    { path: 'verify-change-email', component:VerifyChangeEmailComponent},
    { path: 'logout', component:LogoutComponent, },
    { path: 'not-allowed', component:NotAllowedComponent,canActivate:[BlockedGaurd] },
    { path: 'verify-email', component:VerifyEmailComponent,canActivate:[AuthGuardVerifyEmail] },
  ];