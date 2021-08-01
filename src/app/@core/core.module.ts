import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
} from './utils';

import {PermissionService} from './services/permissions.service'
import { FormsModule } from '@angular/forms';
import { NgxAuthModule } from './auth/auth.module';
import { AuthGuard } from './guards/auth.guard';
import{PermissionGuardService} from './guards/permission.guard'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../pages/token-interceptor.service';
import {RoleService} from './services/role.service'
import { ProjectService } from './services/projects.service';
import { ClientService } from './services/clients.service';
import { DepartementService } from './services/departements.service';
import { PhaseService } from './services/phases.service';
import { DependencyService } from './services/dependency.service';
import { IssueService } from './services/issues.service';
import { RiskService } from './services/risks.service';
import { AssumptionService } from './services/assumptions.service';
import { HighlightService } from './services/highlights.service';
import { TaskService } from './services/tasks.service';
import { MeetingService } from './services/meetings.service';
import { RequestService } from './services/requests.service';
import { VacationService } from './services/vacation.service';
import { NotificationService } from './services/notification.service';
import { LogsService } from './services/logs.service';
import { FactureService } from './services/facture.service';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];



export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'email',
        delay: 3000,
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
  AuthGuard,
  PermissionGuardService,
  PermissionService,
  RoleService,
  ProjectService,
  ClientService,
  DepartementService,
  PhaseService,
  DependencyService,
  IssueService,
  RiskService,
  AssumptionService,
  HighlightService,
  TaskService,
  MeetingService,
  LogsService,
  RequestService,
  VacationService,
  NotificationService,
  FactureService , 
  { provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,NgxAuthModule
  ],
  exports: [
    NbAuthModule,NgxAuthModule ],
  declarations: [],

})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
