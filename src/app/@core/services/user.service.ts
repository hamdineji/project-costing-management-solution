import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Permission } from "../models/permission";
import gql from 'graphql-tag';

const getUsers = gql `
query {
    getUsers{
    id
    name
    role 
    email
    projects 
    image
    departement
  }
}
`
const getUserById = gql `
query 
getUserById ($id : ID ){
    getUserById(id : $id){
    id
    name
    role 
    email 
    projects
    departement
  }
}
`
const getUsersByRole = gql `
query 
getUsersByRole ($id : ID ){
    getUsersByRole(id : $id){
    id
    name
    departement
  }
}
`

const updateRole = gql `
mutation 
addRole($role : ID , $userID : ID ){
    addRole(role : $role , userID : $userID) {
        name
        role
    }
}
`


@Injectable({ providedIn: "root" })
export class UserService {

  constructor( private apollo : Apollo) {}

getUsers(){
    return  this.apollo.query({
        query : getUsers 
      })
}
getUserById(id){
    return this.apollo.query({
        query : getUserById ,
        variables : { id}
    })
}
getUsersByRole(id){
    return this.apollo.query({
        query : getUsersByRole ,
        variables : { id}
    })
}
addRole(role , userID){
    return this.apollo.mutate({
        mutation: updateRole ,
        variables : {
            role , userID
        }
    })
}

}