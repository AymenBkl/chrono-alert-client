import { Routes, RouterModule } from '@angular/router';
import { AffiliatesComponent } from './pages/affiliates/affiliates.component';
import { HomeComponent } from './pages/home/home.component';


export const clientRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
  { path: 'affiliates', component:AffiliatesComponent },
];


