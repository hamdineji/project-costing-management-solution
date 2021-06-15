import { Injectable } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import gql from 'graphql-tag';
import { NotificationService } from "./notification.service";

const getAllProjects = gql `
query {
  getAllProjects{
    id
    name 
    projectManager{ id name}
    budget
    status
    priority 
    progress
    score 
    variance 
    forcast 
    baselineDate
    actual 
    client{representiveName}
    departements{
      id
      name}
    report {
      id
      name 
      createdAt 
    }
    
  }
}
`
const download = gql`
mutation downloadReport($file : String){
    downloadReport(file:$file)
}
`

const getProjectById = gql `
query 
getProjectById($id : ID){
    getProjectById(id:$id){
      id
      name
      projectManager{name}
      client {representiveName}
      budget
      status 
      priority 
      progress 
      score 
      variance
      forcast
      baselineDate
      actual 
      departements{id name }
      requests{id}
      risks  {id }
      issues {id }
      highlights {id }
      assumption {id }
      deps {id }
      description
      report {
        name 
        createdAt 
      }
  }
}
`
const startProject = gql `
mutation 
startProject($id : ID){
  startProject(id:$id){
    id
    name 
    projectManager{name}
    budget
    status
    priority 
    progress
    score 
    variance 
    forcast
    baselineDate 
    actual 
    client{representiveName}
  }
}
`

const createProject = gql `
mutation 
createProject($name : String , $projectManager: Int , $forecasted : DateTime ,$baselineDate : DateTime $budget : Int , $priority : Boolean , $client : ID , $departement : ID){
  createProject(name:$name , projectManager : $projectManager,forecasted: $forecasted,baselineDate:$baselineDate budget : $budget , priority: $priority  ,client : $client , departement : $departement){
    id
    name 
    projectManager{name}
    budget
    status
    priority 
    progress
    score 
    variance 
    forcast
    baselineDate 
    actual 
    client{representiveName}
  }
}
`
const updateProject = gql `
mutation 
updateProject($projectId : ID ,$name : String ,$Duration : Int , $projectManager: Int  , $budget : Int , $priority : Boolean , $score : Int, $status : String){
  updateProject(projectId : $projectId, name:$name , Duration: $Duration,projectManager : $projectManager, budget : $budget , priority: $priority , score :$score , status : $status){
    id
    name 
    projectManager{name}
    duration 
    budget
    status
    priority 
    progress
    score 
    variance 
    forcast 
    actual 
  }
}
`
const changePriority = gql `
mutation 
changePriority($id : ID ){
  changePriority(id : $id){
    id
    name 
  }
}
`

const addReportToProject = gql `
mutation 
addReportToProject($projectID : ID  , $file : Upload){
  addReportToProject(projectID : $projectID , file : $file){
    id
    name 
  }
}
`
const notification = gql `
subscription 
notification($title : String){
  notification(title : $title){
  name 
  priority
}}
`
@Injectable({ providedIn: "root" })
export class ProjectService {
projects : QueryRef<any> ;
p
  constructor( private apollo : Apollo ) {}
  getAllProjects(){
    return  this.apollo.query({
        query : getAllProjects 
      })
}

getProjectById(id){
    return  this.apollo.query({
        query : getProjectById,
        variables : {id} 
      })
}
startProject(id){
  return this.apollo.mutate({
    mutation : startProject ,
    variables : {id}
  })
}
createProject(name , projectManager , forecasted,baselineDate, budget, priority  , client , departement ){
  return this.apollo.mutate({
    mutation : createProject , 
    variables:{name , projectManager , forecasted,baselineDate, budget, priority ,client , departement}
  })
}
updateProject(projectId , name ,Duration, projectManager , budget, priority , score,status){
  return this.apollo.mutate({
    mutation : updateProject , 
    variables:{projectId ,name , Duration,projectManager ,budget, priority , score , status}
  })
}
changePriority(id){
  const res = this.apollo.mutate({
    mutation : changePriority , 
    variables:{id}
  })
  return res
}
addReportToProject(projectID , file){
  return this.apollo.mutate({
    mutation : addReportToProject , 
    variables:{projectID , file}
  })
}
download(file){
  return this.apollo.mutate({
    mutation : download , 
    variables:{file}
  })
}
notification(title){
  return this.apollo.subscribe({
    query:notification ,
    variables : {title}
  })
}

}