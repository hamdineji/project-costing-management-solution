import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getAllLogs = gql `
query{
getAllLogs{
    user{name 
    image}
    project{
      id
      name 
    }
    task{
      id
      description
    }
    description
    createdAt}}
`
const getLogsByproject = gql `
query
  getLogsByproject($projectId : ID){
    getLogsByproject(projectId : $projectId){
    user{
    id
    name 
    image}
    project{
      id
      name 
    }
    task{
      description
    }
    description
    createdAt}}
`
const getLogsByUsers = gql `
query
  getLogsByUsers($userID : ID){
    getLogsByUsers(userID : $userID){
    user{
    id
    name 
    image}
    project{
      id
      name 
    }
    task{
      id
      description
    }
    description
    createdAt}}
`

@Injectable({ providedIn: "root" })
export class LogsService {

  constructor( private apollo : Apollo) {}

  getAllLogs(){
    return  this.apollo.query({
        query :  getAllLogs 
      })
  }
  getLogsByproject(projectId){
    return  this.apollo.query({
      query :  getLogsByproject ,
      variables : {projectId}

    })
  }
  getLogsByUsers(userID){
    return  this.apollo.query({
      query :  getLogsByUsers ,
      variables : {userID}
    })
  }
}