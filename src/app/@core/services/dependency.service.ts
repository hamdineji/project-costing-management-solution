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
const getDependencyByProject = gql `
query 
getDependencyByProject($projectId : ID){
    getDependencyByProject(projectId : $projectId){
  id
  project{id name}
  description
  status 
  dateRaised
  inOutBound 
  user{id name image}
  }
}
`

const createDependency = gql `
mutation 
createDependency($project : ID , $user : ID ,$description : String , $status : String , $bound : String  ){
  createDependency(project : $project , user : $user , description : $description , status : $status , bound : $bound) {
        id 
        description 
    }
}
`




@Injectable({ providedIn: "root" })
export class DependencyService {

  constructor( private apollo : Apollo) {}

//   getDependencyByProject(){
//     return  this.apollo.query({
//         query : getDependencyByProject 
//       })
// }
getDependencyByProject(projectId){
  return  this.apollo.query({
      query :  getDependencyByProject ,
      variables : {projectId}
    })
}
// getRolesByPermission(id){
//   return  this.apollo.query({
//       query :  getRolesByPermission ,
//       variables : {id}
//     })
// }
createDependency(project , user ,description , status,bound){
    return this.apollo.mutate({
        mutation: createDependency ,
        variables : {project , user, description , status,bound}
    })
}

}