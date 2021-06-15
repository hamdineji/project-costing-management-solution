import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getAllDepartements = gql `
query {
    getAllDepartements{
    id
    name  
    users
    headOfDep
    CRapprovers{
      id
      name
    }
    DRapprovers{
      id
      name
    }
  }
}
`
const getDepartementById = gql `
query getDepartementById($id : ID){
    getDepartementById( id : $id){
        id
        name
        CRapprovers{
          id
          name
        }
        DRapprovers{
          id
          name
        }
    }
}


`
const createDepartement = gql `
mutation 
createDepartement($name : String ){
    createDepartement(name:$name){
        id
        name  
        users
        headOfDep
        
  }
}
`
const getCRapprovers = gql ` 
query 
getCRapprovers($dep : ID){
  getCRapprovers(dep : $dep){
    id 
    name
  }
}
`
const getDRapprovers = gql ` 
query 
getDRapprovers($dep : ID){
  getDRapprovers(dep : $dep){
    id 
    name
  }
}
`
const addDRapprover = gql `
mutation 
addDRapprover($depId : ID , $userid : ID ){
  addDRapprover (depId : $depId , userid : $userid){
    name
  }
} 

`

const addCRapprover = gql `
mutation 
addCRapprover($depId : ID , $userid : ID ){
  addCRapprover (depId : $depId , userid : $userid){
    name
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
createDepartement(name){
  return this.apollo.mutate({
    mutation : createDepartement , 
    variables:{name }
  })
}
getCRapprovers(dep ){
  return this.apollo.query({
    query : getCRapprovers ,
    variables : {dep}
  })
}
getDRapprovers(dep ){
  return this.apollo.query({
    query : getDRapprovers ,
    variables : {dep}
  })
}
addCRapprover(depId , userid){
  return this.apollo.mutate({
    mutation : addCRapprover, 
    variables : {depId , userid}
  })
}
addDRapprover(depId , userid){
  return this.apollo.mutate({
    mutation : addDRapprover, 
    variables : {depId , userid}
  })
}

}