import { Injectable } from "@angular/core";
import { Apollo , gql} from "apollo-angular";

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
    return  this.apollo.query({
        query : getPermissions 
      })
}
// getPermissionById(id){
//   return  this.apollo.query<Array<Permission>>({
//       query :  getPermissionById , 
//       variables:{id }
//     })
// }
}