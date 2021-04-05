import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NbAuthComponent} from "@nebular/auth";
import { AuthGuard } from '../guards/auth.guard';
import { NoAuthGuard } from '../guards/no-auth.guard';
import {NgxLoginComponent} from "./login/login.component";

export const routes: Routes = [
  {
    path: '', canActivate:[NoAuthGuard],
    component: NbAuthComponent,
    children: [
      { path: '', redirectTo:'login', pathMatch: 'full'},
      {path:'**',redirectTo:'login', pathMatch: 'full'},
      {
        path: 'login' ,
        component: NgxLoginComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}
