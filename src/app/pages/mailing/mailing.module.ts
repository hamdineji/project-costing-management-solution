import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailingRoutingModule } from './mailing-routing.module';
import { MailingComponent } from './mailing/mailing.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MailingComponent],
  imports: [
    CommonModule,
    NbCardModule,
    MailingRoutingModule,
    CKEditorModule,
    FormsModule,
    NbInputModule,
    NbButtonModule
  ]
})
export class MailingModule { }
