import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FacturationRoutingModule } from './facturation-routing.module';
import { FacturationComponent } from './facturation/facturation.component';
import {NbButtonModule, NbCardModule,   NbCheckboxModule,   NbDatepickerModule,   NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbPopoverModule, NbProgressBarModule, NbSelectModule, NbSidebarModule, NbTabsetModule, NbTooltipModule, NbUserModule,} from '@nebular/theme'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [FacturationComponent],
  imports: [
    CommonModule,
    FacturationRoutingModule,
    NbCardModule ,
    ThemeModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    FlexLayoutModule,
    HttpClientModule,
    NbSelectModule
  ]
})
export class FacturationModule { }
