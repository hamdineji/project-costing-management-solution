import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PermissionGuardService } from '../@core/guards/permission.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'users',
      // canActivate:[PermissionGuardService],
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
        data: { 
          expectedRole: 'getUser'
        } 
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    // {
    //   path: 'users',
    //   // canActivate:[PermissionGuardService],
    //   loadChildren: () => import('./users/users.module')
    //     .then(m => m.UsersModule),
    //     data: { 
    //       expectedRole: 'getUser'
    //     } 
    // },
    {
      path: 'facturation',
      loadChildren: () => import('./facturation/facturation.module')
        .then(m => m.FacturationModule),
    },
    {
      path: 'mailing',
      loadChildren: () => import('./mailing/mailing.module')
        .then(m => m.MailingModule),
    },
    {
      path: 'departements',
      loadChildren: () => import('./departements/departements.module')
        .then(m => m.DepartementsModule),
    },
    {
      path: 'projects',
      loadChildren: () => import('./projects/projects.module')
        .then(m => m.ProjectsModule),
    },
    {
      path: 'logs',
      loadChildren: () => import('./logs/logs.module')
        .then(m => m.LogsModule),
    },
    {
      path: 'reports',
      loadChildren: () => import('./reports/reports.module')
        .then(m => m.ReportsModule),
    },
    {
      path: 'tasks',
      loadChildren: () => import('./tasks/tasks.module')
        .then(m => m.TasksModule),
    },
    {
      path: 'notification',
      loadChildren: () => import('./notification/notification.module')
        .then(m => m.NotificationModule),
    },
    {
      path: 'ressources',
      loadChildren: () => import('./ressources/ressources.module')
        .then(m => m.RessourcesModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
