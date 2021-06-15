import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import { Apollo, gql } from 'apollo-angular';
import jwt_decode from 'jwt-decode';

@Injectable()
export class LoginService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.getToken()
  });
   Login = gql`
  mutation login($username: String!,$password:String!) {
    login(username: $username,password:$password) 
    
  }
`;
permission:any ; 
  constructor(private apollo : Apollo ) { }
  connectUser(username: string , password :string) {
    return this.apollo.mutate({mutation : this.Login , variables : {username ,password}})
  }

  LoggedIn(){
    return ((localStorage.getItem('token') != null) && true)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  getPermissions(token : string){
     this.permission=(jwt_decode(token)) ;
     return this.permission.user.permissions  
  }
  getUser(token:string ){

    this.permission= (jwt_decode(token));
    console.log("user", this.permission)
    return this.permission;
  }
  // getId(){
  //   return localStorage.getItem('userid')
  // }


}
