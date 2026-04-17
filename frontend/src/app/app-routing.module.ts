import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DgrComplianceComponent } from './components/dgr-compliance/dgr-compliance.component';
import { DgConverterComponent } from './components/dg-converter/dg-converter.component';

const routes: Routes = [
  { path: '', redirectTo: '/dgr-compliance', pathMatch: 'full' },
  { path: 'dgr-compliance', component: DgrComplianceComponent },
  { path: 'dg-converter', component: DgConverterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
