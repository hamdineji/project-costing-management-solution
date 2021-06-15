import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getAssumptionsByProject = gql `
query 
getAssumptionsByProject($projectId : ID){
  getAssumptionsByProject(projectId : $projectId){
    id
    project{id name}

    user{id name image}
    description
    status
    dateRaised 
  }
}
`
const createAssumption = gql `
mutation 
createAssumption($project : ID , $user : ID ,$description : String , $status : String ){
  createAssumption(project : $project , user : $user , description : $description , status : $status ) {
        id 
        project{name}
        user{name}
        description
        status
        dateRaised 
    }
}
`


@Injectable({ providedIn: "root" })
export class AssumptionService {

  constructor( private apollo : Apollo) {}

  getAssumptionsByProject(projectId){
    return  this.apollo.query({
        query :  getAssumptionsByProject , 
        variables:{projectId }
      })
  }
  createAssumption(project , user ,description , status){
    return this.apollo.mutate({
        mutation: createAssumption ,
        variables : {project , user, description , status}
    })
}
}