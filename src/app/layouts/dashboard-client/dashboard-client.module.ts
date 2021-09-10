import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { AuthGuardService } from "src/app/services/auth-guard.service";
import { clientDashboardRoutes } from "./dashboard-client.routing";
import { HomeClientComponent } from "src/app/dashboard-client/home-client/home-client.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientDashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations: [
      HomeClientComponent
  ],
  providers:[
    AuthService,
    AuthGuardService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class DashboarClientPageLayoutModule {}
