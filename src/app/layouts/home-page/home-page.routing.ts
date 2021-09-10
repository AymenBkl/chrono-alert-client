import { Routes } from "@angular/router";
import { AboutusComponent } from "src/app/pages/aboutus/aboutus.component";
import { AffiliatesComponent } from "src/app/pages/affiliates/affiliates.component";
import { ContactusComponent } from "src/app/pages/contactus/contactus.component";
import { FaqComponent } from "src/app/pages/faq/faq.component";
import { HomeComponent } from "src/app/pages/home/home.component";
import { UnLoggedGuardService as UnLogged } from '../../services/auth-guard.service';

export const clientRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component:HomeComponent,canActivate:[UnLogged] },
    { path: 'affiliates', component:AffiliatesComponent,canActivate:[UnLogged]  },
    { path: 'aboutus', component:AboutusComponent,canActivate:[UnLogged]  },
    { path: 'faq', component:FaqComponent,canActivate:[UnLogged]  },
    { path: 'contactus', component:ContactusComponent,canActivate:[UnLogged] },
  ];