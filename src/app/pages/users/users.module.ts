import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbButtonModule, NbCardModule,   NbCheckboxModule,   NbIconModule, NbInputModule, NbListModule, NbUserModule,} from '@nebular/theme'
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import {
  NbDialogModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
} from '@nebular/theme';
@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
export class UsersModule { }
