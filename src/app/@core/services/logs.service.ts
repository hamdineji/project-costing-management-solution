import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const getAllLogs = gql `
query{
getAllLogs{
    description
    createdAt}}
`

@Injectable({ providedIn: "root" })
export class LogsService {

  constructor( private apollo : Apollo) {}

  getAllLogs(){
    return  this.apollo.query({
        query :  getAllLogs 
      })
  }
}