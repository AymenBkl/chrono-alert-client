import { Routes } from "@angular/router";
import { AboutusComponent } from "src/app/pages/aboutus/aboutus.component";
import { AffiliatesComponent } from "src/app/pages/affiliates/affiliates.component";
import { ContactusComponent } from "src/app/pages/contactus/contactus.component";
import { FaqComponent } from "src/app/pages/faq/faq.component";
import { HomeComponent } from "src/app/pages/home/home.component";

export const clientRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component:HomeComponent },
    { path: 'affiliates', component:AffiliatesComponent },
    { path: 'aboutus', component:AboutusComponent },
    { path: 'faq', component:FaqComponent },
    { path: 'contactus', component:ContactusComponent},
  ];