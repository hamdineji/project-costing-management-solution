import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
      component: DashboardComponent,
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
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
 
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
