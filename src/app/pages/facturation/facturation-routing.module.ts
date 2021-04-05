import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturationComponent } from './facturation/facturation.component';

const routes: Routes = [
  {
    path: 'facturation',
    component: FacturationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturationRoutingModule { }
