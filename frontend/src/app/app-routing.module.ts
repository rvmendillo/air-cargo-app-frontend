import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DgrComplianceComponent } from './components/dgr-compliance/dgr-compliance.component';
import { UldTrackingComponent } from './components/uld-tracking/uld-tracking.component';
import { CargoIqMilestonesComponent } from './components/cargo-iq-milestones/cargo-iq-milestones.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dgr-compliance', component: DgrComplianceComponent },
  { path: 'uld-tracking', component: UldTrackingComponent },
  { path: 'cargo-iq-milestones', component: CargoIqMilestonesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
