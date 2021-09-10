import { Routes } from "@angular/router";
import { HomeClientComponent } from "src/app/dashboard-client/home-client/home-client.component";
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';

export const clientDashboardRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component:HomeClientComponent,canActivate:[AuthGuard] },
  ];