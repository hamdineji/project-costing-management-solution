import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Permission } from "../models/permission";
import gql from 'graphql-tag';

const getRoles = gql `
query {
  getAllRoles{
    id
    name 
    permissions
  }
}
`
const GetRoleById = gql `
query 
  getRoleById($id : ID){
    getRoleById(id : $id){
    name 
    permissions 
  }
}
`
const createRole = gql `
mutation 
  createRole($name : String , $permission : [ID]  ){
    createRole(name : $name , permission : $permission) {
        name
    }
}
`

const updateRole = gql `
mutation 
  updateRole($role : ID , $name : String , $permission : [ID]  ){
    updateRole(role : $role , name : $name , permission : $permission) {
        name
    }
}
`


@Injectable({ providedIn: "root" })
export class RoleService {

  constructor( private apollo : Apollo) {}

getRoles(){
    return  this.apollo.query({
        query : getRoles 
      })
}
getRoleByID(id){
  return  this.apollo.query({
      query :  GetRoleById ,
      variables : {id}
    })
}
createRole(name , permission){
    return this.apollo.mutate({
        mutation: createRole ,
        variables : {
            name , permission
        }
    })
}
updateRole(role , name , permission){
  return this.apollo.mutate({
    mutation: updateRole,
    variables: {
      role , name , permission
    }
  })
}
}