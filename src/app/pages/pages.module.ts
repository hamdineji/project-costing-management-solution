import { NgModule } from '@angular/core';
import { NbMenuModule, NB_TIME_PICKER_CONFIG } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
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
