import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getTasksByProject = gql `
query 
getTasksByProject($projectId : ID){
    getTasksByProject(projectId : $projectId){
      id
      project{name}
      user{id name image}
      description 
      budget
      startDate
      endDate
      dateRaised
      status
  }
}
`
const getUserTaskByProject = gql `
query 
getUserTaskByProject($projectId : ID , $userId : ID){
  getUserTaskByProject(projectId : $projectId , userId : $userId){
      id
      project{name}
      user{id name image}
      description 
      budget
      startDate
      endDate
      dateRaised
      status
  }
}
`
const createTask = gql `
mutation 
createTask($user : ID , $project : ID , $description : String ,$budget : Int, $status : String , $startDate : DateTime , $endDate : DateTime){
    createTask(user : $user,project : $project ,description : $description , budget : $budget , status : $status , startDate : $startDate ,endDate : $endDate){
    id
    description 
    budget
    startDate
    endDate
    status
  }
}
`
const setTaskStatus = gql `
mutation 
setTaskStatus($taskId : ID ){
  setTaskStatus(taskId: $taskId){
    description 
    budget
    startDate
    endDate
    status
  }
}
`
const getTasksByUser = gql `
query 
getTasksByUser($user : ID ){
  getTasksByUser(user: $user){
    id
    project{name}
    description 
    budget
    startDate
    dateRaised
    endDate
    status
  }
}
`
const getAllTasks = gql `
query {
getAllTasks{
    id
    project{name}
    user{id name image}
    description 
    budget
    startDate
    endDate
    dateRaised
    status}
}
`
@Injectable({ providedIn: "root" })
export class TaskService {
  constructor( private apollo : Apollo) {}
  getTasksByProject(projectId){
    return  this.apollo.query({
        query :  getTasksByProject , 
        variables:{projectId }
      })
  }
  getAllTasks(){
    return  this.apollo.query({
        query :  getAllTasks 
        
      })
  }
  getUserTasksByProject(projectId , userId){
    return  this.apollo.query({
        query :  getUserTaskByProject , 
        variables:{projectId , userId }
      })
  }
  getTasksByUser(user){
    return  this.apollo.query({
        query :  getTasksByUser , 
        variables:{user }
      })
  }
  setTaskStatus(taskId){
    return  this.apollo.mutate({
        mutation :  setTaskStatus , 
        variables:{taskId}
      })
  }
  createTask(user,project , description , budget , status , startDate, endDate){
    return  this.apollo.mutate({
        mutation :  createTask , 
        variables:{user,project,description , budget,status, startDate,endDate}
      })
  }
}