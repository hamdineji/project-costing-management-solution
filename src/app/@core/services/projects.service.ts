import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getAllProjects = gql `
query {
  getAllProjects{
    id
    name 
    projectManager
    duration 
    budget
    status
    priority 
    progress
    score 
    variance 
    forcast 
    actual 
    Departement
  }
}
`

const getProjectById = gql `
query 
getProjectById($id : ID){
    getProjectById(id:$id){
    id
    name 
    projectManager
    duration 
    budget
    status
    priority 
    progress
    score 
    variance 
    forcast 
    actual 
    Departement
  }
}
`
const createProject = gql `
mutation 
createProject($name : String , $projectManager: Int , $duration : Int , $budget : Int , $priority : Boolean , $score : Int){
  createProject(name:$name , projectManager : $projectManager,duration: $duration, budget : $budget , priority: $priority , score :$score){
    id
    name 
    projectManager
    duration 
    budget
    status
    priority 
    progress
    score 
    variance 
    forcast 
    actual 
    Departement
  }
}
`
@Injectable({ providedIn: "root" })
export class ProjectService {

  constructor( private apollo : Apollo) {}
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
createProject(name , projectManager , duration, budget, priority , score){
  return this.apollo.mutate({
    mutation : createProject , 
    variables:{name , projectManager , duration, budget, priority , score}
  })
}

}