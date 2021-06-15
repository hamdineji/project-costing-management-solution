import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { RessourcesRoutingModule } from './ressources-routing.module';
import { ResourcesComponent } from './resources/resources.component';
import { NbBadgeModule, NbButtonModule, NbCalendarModule, NbCalendarRangeModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbIconModule, NbInputModule, NbPopoverModule, NbProgressBarModule, NbSelectModule, NbTabsetModule, NbTooltipModule, NbUserModule, NbWindowModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../../@theme/theme.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ResourcesComponent],
  imports: [
    CommonModule,
    RessourcesRoutingModule,
    NbCardModule ,
    NbEvaIconsModule,
    NbIconModule,
    ThemeModule,
    FlexLayoutModule,
    NbDialogModule,
    FormsModule,
    NbPopoverModule,
    NbSelectModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbUserModule,
    NbCalendarModule,
    HighchartsChartModule,
    NbCalendarRangeModule,
    NbProgressBarModule,
    NbBadgeModule
  ]
})
export class RessourcesModule { }
