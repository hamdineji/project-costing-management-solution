import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementsRoutingModule } from './departements-routing.module';
import { DepartementComponent } from './departement/departement.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NbButtonModule, NbCardModule,   NbCheckboxModule,   NbIconModule, NbInputModule, NbListModule, NbSelectModule, NbTooltipModule,} from '@nebular/theme'
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [DepartementComponent],
  imports: [
    CommonModule,
    DepartementsRoutingModule,
    FlexLayoutModule,
    NbEvaIconsModule, 
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    NbTooltipModule,
    ThemeModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    FormsModule
  ]
})
export class DepartementsModule { }
