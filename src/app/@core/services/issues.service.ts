import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getIssuesByProject = gql `
query 
getIssuesByProject($projectId : ID){
    getIssuesByProject(projectId : $projectId){
    id
    description 
    user{id name image}
    impact
    actionPlan
    dateRaised
  }
}
`
const getIssueById = gql `
query 
getIssueById($id : ID){
    getIssueById(id : $id){
    id
    description 
    status
    impact
    actionPlan
  }
}
`
const createIssue = gql `
mutation 
createIssue($user : ID , $projectId : ID , $description : String ,$status: String , $impact : String , $actionPlan : String){
  createIssue(user : $user,projectId : $projectId ,description : $description , status : $status , impact : $impact , actionPlan : $actionPlan){
    id
    description 
  }
}
`

@Injectable({ providedIn: "root" })
export class IssueService {

  constructor( private apollo : Apollo) {}

  getIssuesByProject(projectId){
    return  this.apollo.query({
        query :  getIssuesByProject , 
        variables:{projectId }
      })
  }
  createIssue(user,projectId , description , status, impact , actionPlan){
    
    return  this.apollo.mutate({
        mutation :  createIssue , 
        variables:{user,projectId,description , status,impact,actionPlan }
      })
  }
}