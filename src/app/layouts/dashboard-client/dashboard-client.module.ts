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
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientDashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule
  ],
  declarations: [
      HomeClientComponent,
      FilterUrlComponent,
      ConfirmFiltersComponent,
      KeysPipe,
      SearchFilterPipe,
      KeysCasePipe
  ],
  providers:[
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class DashboarClientPageLayoutModule {}
