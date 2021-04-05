import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementsRoutingModule } from './departements-routing.module';
import { DepartementComponent } from './departement/departement.component';


@NgModule({
  declarations: [DepartementComponent],
  imports: [
    CommonModule,
    DepartementsRoutingModule
  ]
})
export class DepartementsModule { }
