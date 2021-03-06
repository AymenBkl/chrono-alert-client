import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { AuthGuardService, AuthGuardVerifyEmailService } from "src/app/services/auth-guard.service";
import { clientDashboardRoutes } from "./dashboard-client.routing";
import { HomeClientComponent } from "src/app/dashboard-client/home-client/home-client.component";
import { FilterUrlComponent } from "src/app/dashboard-client/home-client/filter-url/filter-url.component";
import { KeysCasePipe, KeysPipe } from "src/app/dashboard-client/pipes/keys.pipe";
import { SearchFilterPipe } from "src/app/dashboard-client/pipes/search-filter.pipe";
import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { ConfirmFiltersComponent } from "src/app/dashboard-client/home-client/confirm-filters/confirm-filters.component";
import { NotifiedViaComponent } from "src/app/dashboard-client/home-client/notified-via/notified-via.component";
import { PricingComponent } from "src/app/dashboard-client/pricing/pricing.component";
import { SettingsComponent } from "src/app/dashboard-client/settings/settings.component";
import { AlertsComponent } from "src/app/dashboard-client/alerts/alerts.component";
import { PricingPlanComponent } from "src/app/dashboard-client/pricing/pricing-plan/pricing-plan.component";
import { SelectedPlanComponent } from "src/app/dashboard-client/pricing/selected-plan/selected-plan.component";
import { UserService } from "src/app/dashboard-client/services/user.service";
import { HttpClientModule } from "@angular/common/http";
import { EmailComponent } from "src/app/dashboard-client/instructions/email/email.component";
import { AppComponent } from "src/app/dashboard-client/instructions/app/app.component";
import { TelegramComponent } from "src/app/dashboard-client/instructions/telegram/telegram.component";
import { WhatsappComponent } from "src/app/dashboard-client/instructions/whatsapp/whatsapp.component";
import { GoodJobComponent } from "src/app/dashboard-client/home-client/good-job/good-job.component";
import { AllAlertsComponent } from "src/app/dashboard-client/alerts/all-alerts/all-alerts.component";
import { NumberPipePipe } from "src/app/dashboard-client/pipes/number-pipe.pipe";
import { FilterDataToStringPipe } from "src/app/dashboard-client/pipes/filter-data-to-string.pipe";
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalTelegramInstructionsComponent } from "src/app/dashboard-client/settings/modal-telegram-instructions/modal-telegram-instructions.component";
import { ModalWhatsappInstructionsComponent } from "src/app/dashboard-client/settings/modal-whatsapp-instructions/modal-whatsapp-instructions.component";
import { ModalResetPasswordComponent } from "src/app/dashboard-client/settings/modal-reset-password/modal-reset-password.component";
import { UpdateemailComponent } from "src/app/dashboard-client/settings/updateemail/updateemail.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientDashboardRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSliderModule,
    NgxSpinnerModule
  ],
  declarations: [
      HomeClientComponent,
      FilterUrlComponent,
      ConfirmFiltersComponent,
      NotifiedViaComponent,
      PricingComponent,
      SettingsComponent,
      AlertsComponent,
      PricingPlanComponent,
      SelectedPlanComponent,
      EmailComponent,
      AppComponent,
      TelegramComponent,
      WhatsappComponent,
      GoodJobComponent,
      AllAlertsComponent,
      ModalTelegramInstructionsComponent,
      ModalWhatsappInstructionsComponent,
      ModalResetPasswordComponent,
      UpdateemailComponent,
      KeysPipe,
      SearchFilterPipe,
      KeysCasePipe,
      NumberPipePipe,
      FilterDataToStringPipe
  ],
  providers:[
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class DashboarClientPageLayoutModule {}
