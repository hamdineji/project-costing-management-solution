import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbButtonModule, NbCardModule,   NbCheckboxModule,   NbDialogModule,   NbIconModule, NbInputModule, NbListModule, NbPopoverModule, NbSelectModule, NbTabsetModule, NbTooltipModule, NbUserModule, NbWindowModule,} from '@nebular/theme'

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ThemeModule } from '../../@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [TaskComponent],
 
  imports: [
    CommonModule,
    TasksRoutingModule,
    NbCardModule ,
    NbEvaIconsModule,
    NbListModule,
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
    NbUserModule
  ],
})
export class TasksModule { }
