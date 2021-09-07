import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutes} from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { CoverComponent } from './pages/home/cover/cover.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoComponent } from './pages/home/info/info.component';
import { ApplicationComponent } from './pages/home/application/application.component';
import { HowItWorksComponent } from './pages/home/how-it-works/how-it-works.component';
import { PlansComponent } from './components/plans/plans.component';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MostFollowedModelsComponent } from './pages/home/most-followed-models/most-followed-models.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AffiliatesComponent } from './pages/affiliates/affiliates.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { HomePageComponent } from './layouts/home-page/home-page.component';

import { NavbarModule } from 'src/app/components/nav/nav.module';
import { FooterModule } from './components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: false
    }),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NavbarModule,
    FooterModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
