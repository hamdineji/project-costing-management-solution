import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getUsers = gql `
query {
    getUsers{
    id
    name
    role {name}
    email
    projects{
        id
        name 
    progress} 
    image
    absences
    salary 
    tasks{
        startDate
        endDate
    }
    vacation{
        startDate 
        endDate
    }
    availabilityDate
    departement{
        name
    }
  }
}
`
const getUserById = gql `
query 
getUserById ($id : ID ){
    getUserById(id : $id){
    id
    name
    email 
    projects{id name}
    image
   
    
  }
}
`
const getApprover = gql `
query 
getApprover ($role : ID , $departement : ID ){
    getApprover(role : $role , departement :$departement){
    id
    name
    email 
    
  }
}
`

const getUsersByRole = gql `
query 
getUsersByRole ($id : ID ){
    getUsersByRole(id : $id){
    id
    name
    departement{
        id
        name
    }
  }
}
`
const sendMail=  gql `
mutation 
sendMail($to : String,$data : String  , $object : String ){
    sendMail(to : $to , data : $data ,object : $object ) 
}
`
const getUserProjects = gql `
query
getUserWithProjects($id : ID ){
    getUserWithProjects(id : $id ){
        projects { 
            id
            name
            projectManager{name} 
            departements{name} 
            client{representiveName}
            forcast 
            status 
            progress 
            priority 
            score 
            budget 
            baselineDate
            report{
                id
                name 
                createdAt
            }
        }
    }
}
`
const userData = gql `
query
getUserWithProjects($id : ID ){
    getUserWithProjects(id : $id ){
        absences
        vacation{
            startDate
            endDate
        }
        projects { 
            id
            status 
            priority 
            issues {
            status
            }
            assumption{
            status
            } 
            risks {
            RiskStatus
            }  
            deps{
            status
            }
        }
    }
}
`

const updateRole = gql `
mutation 
addRole($role : RoleInput , $userID : ID ){
    addRole(role : $role , userID : $userID) 
}
`
const addAbsence = gql `
mutation 
addAbsence($user: ID ,$absence : DateTime){
    addAbsence(user: $user , absence : $absence){
    name
  }
}
`
const assignProject = gql `
mutation 
assignProject($projectid: ID ,$userid : ID){
    assignProject(projectid: $projectid , userid : $userid){
    name
  }
}
`


@Injectable({ providedIn: "root" })
export class UserService {

  constructor( private apollo : Apollo) {}

getUsers(){
    return  this.apollo.query({
        query : getUsers 
      })
}
getApprover(role,departement){
    return  this.apollo.query({
        query : getApprover,
        variables:{role,departement} 
      })
}
usersData
getUserById(id){
    return this.apollo.query({
        query : getUserById ,
        variables : { id}
    })
}
getUsersByRole(id){
    return this.apollo.query({
        query : getUsersByRole ,
        variables : { id}
    })
}
getUserProjects(id){
    return this.apollo.query({
        query : getUserProjects ,
        variables : {id}
    })
}
getData(id){
    return this.apollo.query({
        query :userData ,
        variables : {
            id
        }
    })
}
addRole(role , userID){
    return this.apollo.mutate({
        mutation: updateRole ,
        variables : {
            role , userID
        }
    })
}
addAbsence(user, absence){
    return  this.apollo.mutate({
        mutation :  addAbsence , 
        variables:{user, absence}
      })
  }
  assignProject(projectid , userid){
    return this.apollo.mutate({
        mutation : assignProject, 
        variables : {projectid, userid}
    })
  }
  sendMail(to , data , object){
      return this.apollo.mutate({
          mutation : sendMail ,
          variables : {to , data , object}
      })
  }

}