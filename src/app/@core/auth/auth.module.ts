import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule, NbIconModule,
  NbInputModule
} from '@nebular/theme';
import {NgxLoginComponent} from "./login/login.component";
import {HttpClientModule} from "@angular/common/http";
import {LoginService} from "./login/login.service";
import { Apollo } from 'apollo-angular';
import { AuthGuard } from '../guards/auth.guard';
import { NoAuthGuard } from '../guards/no-auth.guard';
import { Action, ActionReducer, MetaReducer, State, StoreModule } from '@ngrx/store';
import { AuthReducer , initialState } from './ngrx-auth/auth.reducers';
import { localStorageSync } from 'ngrx-store-localstorage';
import merge from 'lodash.merge';
import { stringify } from '@angular/compiler/src/util';
import { AppState } from './ngrx-auth/appState';


export function persistStateReducer(reducer: ActionReducer<any>) {
  const localStorageKey = '__storage'
  return (state: any | undefined, action: Action) => {
    // on state initialization the state is undefined
    // we want to retrieve the state from local storage now
    if (state.User === undefined) {

      const persisted = localStorage.getItem(localStorageKey)
      return persisted ? JSON.parse(persisted) : reducer(state, action)
    }
    const newState = reducer(state, action)
    localStorage.setItem(localStorageKey, JSON.stringify(newState))
    return newState
  }
}

const metaReducers: Array<MetaReducer<any, any>> = [persistStateReducer];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    BrowserModule,
    NbAuthModule,
    NbIconModule,
    NbAlertModule,
    HttpClientModule,
    StoreModule.forFeature('auth',AuthReducer , {initialState,metaReducers})
  ],
  declarations: [
    NgxLoginComponent,
  ],
  providers: [LoginService,NoAuthGuard]
})
export class NgxAuthModule {
}
