import { Injectable } from "@angular/core";
import { Apollo , gql} from "apollo-angular";
import { Permission } from "../models/permission";

const getPhasesByProject = gql `
query 
    getPhasesByProject($projectId : ID ){
        getPhasesByProject(projectId : $projectId){
    id
    name 
    baselineDate
    forecastedDate
    status
    file
  }
}
`

const createProjectPhases = gql `
mutation 
createProjectPhases($projectId:ID , $initBaselinedate : DateTime  , $initForecasteddate:DateTime,
  $planificationBaselinedate : DateTime  , $planificationForecasteddate:DateTime,
  $devBaselinedate : DateTime  , $devForecasteddate:DateTime,
  $depBaselinedate : DateTime  , $depForecasteddate:DateTime){
    createProjectPhases(projectId :$projectId ,initBaselinedate: $initBaselinedate ,initForecasteddate:$initForecasteddate,
      planificationBaselinedate:$planificationBaselinedate,planificationForecasteddate : $planificationForecasteddate,
      devBaselinedate: $devBaselinedate, devForecasteddate:$devForecasteddate ,
      depBaselinedate:$depBaselinedate , depForecasteddate:$depForecasteddate ){
        name
      }
}
`
const setPhaseStatus = gql `
mutation 
setPhaseStatus($id:ID){
  setPhaseStatus(id :$id){
        name
      }
}
`

@Injectable({ providedIn: "root" })
export class PhaseService {

  constructor( private apollo : Apollo) {}
getPhasesByProject(projectId){
  return  this.apollo.query({
      query :  getPhasesByProject , 
      variables:{projectId }
    })
}
createProjectPhases(projectId ,initBaselinedate   , initForecasteddate,
  planificationBaselinedate   , planificationForecasteddate,
  devBaselinedate   , devForecasteddate,
  depBaselinedate   , depForecasteddate){
  return  this.apollo.mutate({
      mutation :  createProjectPhases , 
      variables:{projectId , initBaselinedate   , initForecasteddate,
        planificationBaselinedate   , planificationForecasteddate,
        devBaselinedate   , devForecasteddate,
        depBaselinedate   , depForecasteddate}
    })
}
setPhaseStatus(id){
  return  this.apollo.mutate({
    mutation :  setPhaseStatus , 
    variables:{id}})
}

}