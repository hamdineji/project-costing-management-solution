import { Injectable } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import gql from 'graphql-tag';

const getNotificationByUser = gql `
query 
getNotificationByUser($user : ID){
    getNotificationByUser(user : $user){
    description 
    createdAt
    seen
    createdby{name
    image}
  }
}
`
const openNotif = gql
`
mutation 
setNotif($user : ID){
  setNotif(user : $user){
    id
  }
}
`

@Injectable({ providedIn: "root" })
export class NotificationService {
notification : QueryRef<any>
allnotifications
  constructor( private apollo : Apollo) {}

  getNotificationByUser(user){
    return   this.apollo.query({
        query :  getNotificationByUser , 
        variables:{user }
      })
  }
 
 setNotif(user){
   return this.apollo.mutate({
     mutation : openNotif ,
     variables : {user}
   })
 }
}