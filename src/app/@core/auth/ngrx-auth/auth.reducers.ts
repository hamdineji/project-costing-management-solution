import { User } from "../../../@core/models/user";
import { AuthAction , AuthActionTypes } from "./auth.actions";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";

export interface AuthState {
    User: User ,
    projectSelected : number ,
    departementSelected : number[]
  };

  export const initialState: AuthState = {
    User: undefined ,
    projectSelected : undefined ,
    departementSelected : []  };
  export function AuthReducer(state: AuthState = initialState, action: AuthAction) {
    switch (action.type) {
        case AuthActionTypes.SAVE_USER:
      return {
        ...state,
        User: action.payload,
      };
      case AuthActionTypes.GET_USER:
      return {
        ...state
      };
      case AuthActionTypes.SELECT_PROJECT:
      return {
        ...state, 
        projectSelected : action.payload
      };
      case AuthActionTypes.SELECT_DEPARTEMENT:
      return {
        ...state, 
        departementSelected : [action.payload]
      };
      case AuthActionTypes.DESTROY_DEPARTEMENT:
      return {
        ...state, 
        departementSelected : []
      };
      
    default:
      return state;
  }}
 export let fsSelector = createFeatureSelector<AuthState>('auth');
 export let currentUserSelector = createSelector(fsSelector,state=>state.User) 
 export let projectSelector = createSelector(fsSelector,state=>state.projectSelected) 
 export let departementSelector = createSelector(fsSelector,state=>state.departementSelected) 

 