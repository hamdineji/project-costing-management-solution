import { Action } from '@ngrx/store'; 
import { User } from "../../models/user";
export enum AuthActionTypes { 
    SAVE_USER = '[AUTH] Save User',
    GET_USER = '[AUTH] GET User',
    SELECT_PROJECT = '[PROJECT] Select Project',
    SELECT_DEPARTEMENT = '[DEPARTEMENT] Select Departement' ,
    DESTROY_DEPARTEMENT =  '[DEPARTEMENT] Destroy Departement'

}
export class SaveUserAction implements Action {
    readonly type = AuthActionTypes.SAVE_USER
  
    constructor(public payload: User) {}
  
  }
  export class GetUserAction implements Action {
    readonly type = AuthActionTypes.GET_USER  
  }

  export class SelectProjectAction implements Action {
    readonly type = AuthActionTypes.SELECT_PROJECT 
    constructor(public payload : number){}
  }
  export class SelectDepartementAction implements Action {
    readonly type = AuthActionTypes.SELECT_DEPARTEMENT
    constructor(public payload : number){}
  }
  export class DestroyDepartementAction implements Action {
    readonly type = AuthActionTypes.DESTROY_DEPARTEMENT
  }
  export type AuthAction = SaveUserAction | GetUserAction | SelectProjectAction | SelectDepartementAction | DestroyDepartementAction
