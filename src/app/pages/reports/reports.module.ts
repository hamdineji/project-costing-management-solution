import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbButtonModule, NbCardModule, NbIconModule, NbTooltipModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NbTreeGridModule ,
    NbCardModule,
    NbEvaIconsModule,
    ThemeModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule
  ]
})
export class ReportsModule { }
