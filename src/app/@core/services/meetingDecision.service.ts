import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getDecisionsByMeeting = gql `
query 
getDecisionsByMeeting($meetingId : ID) {
    getDecisionsByMeeting(meetingId : $meetingId){
    name
    file{id name }
    }
}
`
const upload = gql`
mutation createMeetingDecision( $name:String , $file: [Upload] , $meeting : ID) {
    createMeetingDecision( name : $name, file: $file , meeting : $meeting){
      name 
    }
  }
`

const download = gql`
mutation downloadDecision($file : String){
    downloadDecision(file:$file)
}
`
@Injectable({ providedIn: "root" })
export class DecisionService {
  constructor( private apollo : Apollo) {}
  getDecisionsByMeeting(meetingId){
    return  this.apollo.query({
        query :  getDecisionsByMeeting , 
        variables:{meetingId}
      })
  }
  upload ( name , file , meeting){
    return this.apollo.mutate({
        mutation : upload ,
        variables: {name,file,meeting},
        context: {
            useMultipart: true          }
    })
}
  download ( file){
    return this.apollo.mutate({
        mutation : download ,
        variables: {file}
        
    })
}
}