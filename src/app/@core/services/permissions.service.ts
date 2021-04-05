import { Injectable } from "@angular/core";
import { Apollo , gql} from "apollo-angular";
import { Permission } from "../models/permission";

const getPermissions = gql `
query {
  getAllPermission{
    id
    name 
    category
  }
}
`
const getPermissionById =gql `
query getPermissionById($id : ID) {
  getPermissionById(id : $id) {
    name 
    category
  }
}

`


@Injectable({ providedIn: "root" })
export class PermissionService {

  constructor( private apollo : Apollo) {}

getPermissions(){
    return  this.apollo.query<Array<Permission>>({
        query : getPermissions 
      })
}
getPermissionById(id){
  return  this.apollo.query<Array<Permission>>({
      query :  getPermissionById , 
      variables:{id }
    })
}
}