import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getRisksByProject = gql `
query 
getRisksByProject($projectId : ID){
    getRisksByProject(projectId : $projectId){
      id
      user{id name image}
      project{id name}
      description
      probability
      impact 
      targetMitigationDate 
      MitigationPlan 
      RiskStatus
      dateRaised
  }
}
`
const createRisk = gql `
mutation 
createRisk($user: ID , $project : ID , $description: String ,$probability : String ,$impact : String ,$targetMitigationDate : DateTime ,$MitigationPlan : String ,$RiskStatus : String){
  createRisk(user : $user,project : $project ,description : $description ,probability : $probability, targetMitigationDate : $targetMitigationDate , impact : $impact , MitigationPlan : $MitigationPlan , RiskStatus :$RiskStatus){
    id
    description 
  }
}
`

@Injectable({ providedIn: "root" })
export class RiskService {

  constructor( private apollo : Apollo) {}

  getRisksByProject(projectId){
    return  this.apollo.query({
        query :  getRisksByProject , 
        variables:{projectId }
      })
  }
  createRisk(user,project , description ,probability, impact , targetMitigationDate,MitigationPlan, RiskStatus){
    
    return  this.apollo.mutate({
        mutation :  createRisk , 
        variables:{user,project,description,probability,impact,targetMitigationDate,MitigationPlan, RiskStatus}
      })
  }
}