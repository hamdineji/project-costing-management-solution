import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectComponent } from './project/project.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NbButtonModule, NbCardModule,   NbCheckboxModule,   NbDatepickerModule,   NbIconModule, NbInputModule, NbListModule, NbPopoverModule, NbProgressBarModule, NbSelectModule, NbSidebarModule, NbTabsetModule, NbTooltipModule, NbUserModule,} from '@nebular/theme'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProjectDetailsComponent}from './project-details/projectDetails.component'
@NgModule({
  declarations: [ProjectComponent , ProjectDetailsComponent],
  imports: [ReactiveFormsModule,
    CommonModule,
    ProjectsRoutingModule , 
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
    FormsModule,
    NbUserModule,
    NbPopoverModule,
    NbDatepickerModule ,
    NbProgressBarModule,
    NbTabsetModule,
    NbSidebarModule
  ]
})
export class ProjectsModule { }
