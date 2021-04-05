import { User } from "../../../@core/models/user";
import { AuthAction , AuthActionTypes } from "./auth.actions";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";

export interface AuthState {
    User: User
  };

  export const initialState: AuthState = {
    User: undefined   };
  export function AuthReducer(state: AuthState = initialState, action: AuthAction) {
    switch (action.type) {
        case AuthActionTypes.SAVE_USER:
      console.log("action.payload",action.payload)
      return {
        ...state,
        User: action.payload,
      };
      case AuthActionTypes.GET_USER:
      return {
        ...state
      };
      
    default:
      return state;
  }}
 export let fsSelector = createFeatureSelector<AuthState>('auth');
 export let currentUserSelector = createSelector(fsSelector,state=>state.User) 
