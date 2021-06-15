import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getIssuesByProject = gql `
query 
getIssuesByProject($projectId : ID){
    getIssuesByProject(projectId : $projectId){
    id
    description 
    status
    impact
    actionPlan

  }
}
`
const getMeetsByProject = gql `
query 
getMeetsByProject($projectId : ID){
    getMeetsByProject(projectId : $projectId){
        id
        location
        user{id name image}
        project{id name}
        subject
        duration 
        guests{name}
        date

  }
}
`
const createMeeting = gql `
mutation 
createMeeting($user : ID , $project : ID , $subject : String ,$duration: String , $location : String, $guests : [Int] ,$date : DateTime){
    createMeeting(user : $user,project : $project ,subject : $subject , duration : $duration , location : $location , guests : $guests , date : $date){
    id
    location
    user{name}
    project{name}
    subject
    duration 
    date
  }
}
`
const updateMeeting = gql `
mutation 
updateMeeting($id: ID , $subject : String ,$duration: String , $location : String, $guests : [Int] ,$date : DateTime){
  updateMeeting(id : $id ,subject : $subject , duration : $duration , location : $location , guests : $guests , date : $date){
    id
    location
    user
    project
    subject
    duration 
    date
  }
}
`

@Injectable({ providedIn: "root" })
export class MeetingService {

  constructor( private apollo : Apollo) {}

  getMeetsByProject(projectId){
    return  this.apollo.query({
        query :  getMeetsByProject , 
        variables:{projectId}
      })
  }
  createMeeting(user,project , subject , duration, location , guests, date){
    
    return  this.apollo.mutate({
        mutation :  createMeeting , 
        variables:{user,project , subject , duration, location , guests ,date }
      })
  }
  updateMeeting(id, subject , duration, location , guests, date){
    return  this.apollo.mutate({
        mutation :  updateMeeting , 
        variables:{id, subject , duration, location , guests ,date }
      })
  }
}