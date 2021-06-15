import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs/logs.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbTooltipModule, NbTreeGridModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    LogsRoutingModule ,
    NbTreeGridModule ,
    NbCardModule,
    NbEvaIconsModule,
    ThemeModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule
  ]
})
export class LogsModule { }
