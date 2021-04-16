import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getAllDepartements = gql `
query {
    getAllDepartements{
    id
    name 
    projectsInProgression
    doneProjects 
    users
    headOfDep
  }
}
`
const getDepartementById = gql `
query getDepartementById($id : ID){
    getDepartementById( id : $id){
        id
        name
    }
}


`
const createDepartement = gql `
mutation 
createDepartement($name : String ){
    createDepartement(name:$name){
        id
        name 
        projectsInProgression
        doneProjects 
        users
        headOfDep
  }
}
`
@Injectable({ providedIn: "root" })
export class DepartementService {

  constructor( private apollo : Apollo) {}
  getAllDepartements(){
    return  this.apollo.query({
        query : getAllDepartements 
      })
}
getDepartementById(id){
    return  this.apollo.query({
        query : getDepartementById ,
        variables : {id}
      })
}
createDepartement(name ,){
  return this.apollo.mutate({
    mutation : createDepartement , 
    variables:{name }
  })
}

}