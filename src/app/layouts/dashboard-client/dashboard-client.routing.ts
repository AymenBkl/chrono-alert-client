import { Routes } from "@angular/router";
import { AlertsComponent } from "src/app/dashboard-client/alerts/alerts.component";
import { HomeClientComponent } from "src/app/dashboard-client/home-client/home-client.component";
import { PricingComponent } from "src/app/dashboard-client/pricing/pricing.component";
import { SettingsComponent } from "src/app/dashboard-client/settings/settings.component";
import { AuthGuardService as AuthGuard } from '../../services/auth-guard.service';

export const clientDashboardRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component:HomeClientComponent,canActivate:[AuthGuard] },
    { path: 'alerts', component:AlertsComponent,canActivate:[AuthGuard] },
    { path: 'pricing', component:PricingComponent,canActivate:[AuthGuard] },
    { path: 'settings', component:SettingsComponent,canActivate:[AuthGuard] },
  ];