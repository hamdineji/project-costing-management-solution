import { NgModule } from '@angular/core';
import { NbMenuModule, NB_TIME_PICKER_CONFIG } from '@nebular/theme';
import{UsersModule} from './users/users.module'
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {DepartementsModule} from './departements/departements.module'
import {ProjectsModule} from './projects/projects.module'

import {TasksModule} from './tasks/tasks.module'
import { RessourcesModule } from './ressources/ressources.module';
import { LogsModule } from './logs/logs.module';
import { NotificationModule } from './notification/notification.module';
import { MailingModule } from './mailing/mailing.module';
import { FacturationModule } from './facturation/facturation.module';
import { EditorsModule } from './editors/editors.module';
import { ReportsModule } from './reports/reports.module';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    UsersModule,
    DepartementsModule,
    ProjectsModule,
    TasksModule,
    RessourcesModule,
    LogsModule,
    NotificationModule,
    MailingModule,
    FacturationModule,
    ReportsModule 
    // EditorsModule
  ],
  declarations: [
    PagesComponent,
  ],
  providers :[{
    provide:NB_TIME_PICKER_CONFIG,
    useValue:{}
    }]
 
})
export class PagesModule {
}
