import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getClientsByProject = gql `
query 
    getClientsByProject($projectId : ID){
        getClientsByProject(projectId : $projectId){
            representiveName
        } }

`
const getAllClients = gql `
query {
getAllClients{
            id
            representiveName
        } }
`
const addProjectToClient = gql `
mutation 
addProjectToClient($clientId : ID , $projectId: ID){
  addProjectToClient(clientId:$clientId , projectId : $projectId){
    id
    name 
  }
}
`
@Injectable({ providedIn: "root" })
export class ClientService {

  constructor( private apollo : Apollo) {}
  getClientsByProject(projectId){
    return  this.apollo.query({
        query : getClientsByProject ,
        variables : {projectId} 
      })
}
getAllClients(){
  return  this.apollo.query({
      query : getAllClients
    })
}
addProjectToClient(clientId,projectId){
  return this.apollo.mutate({
    mutation:addProjectToClient,
    variables : {clientId,projectId}
  })
}


}