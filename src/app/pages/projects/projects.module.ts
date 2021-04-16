import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectComponent } from './project/project.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NbButtonModule, NbCardModule,   NbCheckboxModule,   NbIconModule, NbInputModule, NbListModule, NbSelectModule, NbTooltipModule,} from '@nebular/theme'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectComponent],
  imports: [
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
    FormsModule
  ]
})
export class ProjectsModule { }
