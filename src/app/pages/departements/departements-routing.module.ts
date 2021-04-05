import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartementComponent } from './departement/departement.component';

const routes: Routes = [
  {
    path: 'departement',
    component: DepartementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartementsRoutingModule { }
