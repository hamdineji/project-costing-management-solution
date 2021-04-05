import { Component, OnInit} from '@angular/core';

import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import { Apollo, gql } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx-auth/appState';
import { SaveUserAction } from '../ngrx-auth/auth.actions';
import { currentUserSelector } from '../ngrx-auth/auth.reducers';
import { User } from '../../models/user';



@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent implements OnInit{
  user1 = {
    email: '',
    password: '',
  }
  alert : boolean =false ;
currentUser : User ;
  constructor( private _auth : LoginService, private _router: Router , private store : Store<AppState>){


  }
  ngOnInit(): void {
  }

  connectC(){
    this._auth.connectUser(this.user1.email,this.user1.password)
      .subscribe(
        (res:any) => {
           localStorage.setItem('token', res.data.login)
           this._router.navigate(['/pages/dashboard' ])
           this.store.dispatch(new SaveUserAction(this._auth.getUser(res.data.login)))
           this.store.select((state)=>state).subscribe((data)=>console.log("store",data));
           
        }, 
        err => {
          this.alert = true ;

        }
      )

  }
 onClose(){
   this.alert=false
 }



}
