import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getVacationsByUser = gql `
query 
getVacationsByUser($user : ID){
    getVacationsByUser(user : $user){
    startDate
    endDate
  }
}
`


const createVacation = gql `
mutation 
createVacation($user: ID ,$startDate : DateTime , $endDate:DateTime){
    createVacation(user: $user , startDate : $startDate , endDate : $endDate){
    user{
        name
    }
    startDate
    endDate
  }
}
`


@Injectable({ providedIn: "root" })
export class VacationService {
  constructor( private apollo : Apollo) {}
  getVacationsByUser(user){
    return  this.apollo.query({
        query :  getVacationsByUser , 
        variables:{user }
      })
  }
  createVacation(user, startDate , endDate){
    return  this.apollo.mutate({
        mutation :  createVacation , 
        variables:{user, startDate,endDate}
      })
  }
  
 
  
}