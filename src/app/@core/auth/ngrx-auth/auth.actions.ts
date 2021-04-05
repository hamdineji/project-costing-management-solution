import { Action } from '@ngrx/store'; 
import {User} from '../../models/user';
export enum AuthActionTypes { 
    SAVE_USER = '[AUTH] Save User',
    GET_USER = '[AUTH] GET User',

}
export class SaveUserAction implements Action {
    readonly type = AuthActionTypes.SAVE_USER
  
    constructor(public payload: User) {}
  
  }
  export class GetUserAction implements Action {
    readonly type = AuthActionTypes.GET_USER  
  }
  export type AuthAction = SaveUserAction | GetUserAction 
