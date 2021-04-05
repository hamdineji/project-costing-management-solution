import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RessourcesRoutingModule } from './ressources-routing.module';
import { ResourcesComponent } from './resources/resources.component';


@NgModule({
  declarations: [ResourcesComponent],
  imports: [
    CommonModule,
    RessourcesRoutingModule
  ]
})
export class RessourcesModule { }
