import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturationRoutingModule } from './facturation-routing.module';
import { FacturationComponent } from './facturation/facturation.component';


@NgModule({
  declarations: [FacturationComponent],
  imports: [
    CommonModule,
    FacturationRoutingModule
  ]
})
export class FacturationModule { }
