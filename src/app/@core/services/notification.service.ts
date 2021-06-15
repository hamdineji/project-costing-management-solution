import { Injectable } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import gql from 'graphql-tag';

const getNotificationByUser = gql `
query 
getNotificationByUser($user : ID){
    getNotificationByUser(user : $user){
    description 
    createdAt
    createdby{name
    image}
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
 
 
}