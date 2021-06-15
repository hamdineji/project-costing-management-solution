import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getHighlightsByProject = gql `
query 
getHighlightsByProject($projectId : ID){
    getHighlightsByProject(projectId : $projectId){
    id
    description 
    dateRaised
    user{id name image}
  }
}
`
const createHighlight = gql `
mutation 
createHighlight($user : ID , $projectId : ID , $description : String ){
  createHighlight(user : $user,projectId : $projectId ,description : $description){
    id
    description 
  }
}
`


@Injectable({ providedIn: "root" })
export class HighlightService {
  constructor( private apollo : Apollo) {}
  getHighlightsByProject(projectId){
    return  this.apollo.query({
        query :  getHighlightsByProject , 
        variables:{projectId }
      })
  }
  createHighlight(user,projectId , description){
    return  this.apollo.mutate({
        mutation :  createHighlight , 
        variables:{user,projectId,description }
      })
  }
}