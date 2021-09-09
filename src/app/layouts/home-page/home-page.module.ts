import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CarouselModule } from "ngx-owl-carousel-o";
import { PlansComponent } from "src/app/components/plans/plans.component";
import { ReviewsComponent } from "src/app/components/reviews/reviews.component";
import { AboutusComponent } from "src/app/pages/aboutus/aboutus.component";
import { AffiliatesComponent } from "src/app/pages/affiliates/affiliates.component";
import { ContactusComponent } from "src/app/pages/contactus/contactus.component";
import { FaqComponent } from "src/app/pages/faq/faq.component";
import { ApplicationComponent } from "src/app/pages/home/application/application.component";
import { CoverComponent } from "src/app/pages/home/cover/cover.component";
import { HomeComponent } from "src/app/pages/home/home.component";
import { HowItWorksComponent } from "src/app/pages/home/how-it-works/how-it-works.component";
import { InfoComponent } from "src/app/pages/home/info/info.component";
import { MostFollowedModelsComponent } from "src/app/pages/home/most-followed-models/most-followed-models.component";
import { clientRoutes } from "./home-page.routing";
import { WhoWeAreComponent } from '../../pages/aboutus/who-we-are/who-we-are.component';
import { OurMemembersComponent } from "src/app/pages/aboutus/our-memembers/our-memembers.component";
import { ProgramComponent } from "src/app/pages/affiliates/program/program.component";
import { StartComponent } from "src/app/pages/affiliates/start/start.component";
import { ContactusformComponent } from "src/app/pages/contactus/contactusform/contactusform.component";
import { FaqHolderComponent } from 'src/app/pages/faq/faq-holder/faq-holder.component';
import { SearchFaqPipe } from './pipes/search-faq.pipe';
import { SendsuccessComponent } from "src/app/pages/contactus/sendsuccess/sendsuccess.component";
import { LandingPageService } from "./services/landing-page.service";
import { HttpClientModule } from '@angular/common/http'
import { ErrorModalLandingPageComponent } from "src/app/components/error-modal-landing-page/error-modal-landing-page.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientRoutes),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    HttpClientModule
  ],
  declarations: [
    HomeComponent,
    CoverComponent,
    InfoComponent,
    ApplicationComponent,
    HowItWorksComponent,
    PlansComponent,
    MostFollowedModelsComponent,
    ReviewsComponent,
    AffiliatesComponent,
    AboutusComponent,
    FaqComponent,
    ContactusComponent,
    WhoWeAreComponent,
    OurMemembersComponent,
    ProgramComponent,
    StartComponent,
    ContactusformComponent,
    FaqHolderComponent,
    SearchFaqPipe,
    SendsuccessComponent,
  ],
  providers:[
    LandingPageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class HomePageLayoutModule {}
