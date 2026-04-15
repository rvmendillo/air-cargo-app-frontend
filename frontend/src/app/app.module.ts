import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DgrComplianceComponent } from './components/dgr-compliance/dgr-compliance.component';
import { UldTrackingComponent } from './components/uld-tracking/uld-tracking.component';
import { CargoIqMilestonesComponent } from './components/cargo-iq-milestones/cargo-iq-milestones.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DgrComplianceComponent,
    UldTrackingComponent,
    CargoIqMilestonesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
