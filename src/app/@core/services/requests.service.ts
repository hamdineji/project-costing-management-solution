import { Injectable } from "@angular/core";
import { Apollo , gql} from "apollo-angular";

const getRequestsByProject = gql `
query 
getRequestsByProject($projectId : ID ){
    getRequestsByProject(projectId : $projectId){
        id
        project {name}
        phase{name}
        user{id name image}
        note1 
        note2 
        dateRaised 
        approvers 
        Status1  
        status2 
        type 
        approvingDate1 
        approvingDate2 
        currentDate 
        newDate 
        file
  }
}
`
const createRequest =gql `
mutation createRequest($projectId : ID , $user : ID ,  $phaseId : ID , $type : String , $currentDate : DateTime , $newDate : DateTime , , $file : String ) {
    createRequest(projectId : $projectId, user:$user , phaseId : $phaseId , type :$type , currentDate : $currentDate ,newDate : $newDate ,file:$file) {
        id
        project {name}
        phase{name}
        user {name}
        note1 
        note2 
        dateRaised 
        approvers 
        Status1  
        status2 
        type 
        approvingDate1 
        approvingDate2 
        currentDate 
        newDate 
  }
}
`
const updateRequest = gql`
mutation updateRequest($id : ID , $reqApprover : ID , $note : String , $status : String ){
    updateRequest(id : $id , reqApprover : $reqApprover ,note : $note , status : $status ){
        
        project{name}
        phase{name}
        user {name}
        note1 
        note2 
        dateRaised 
        approvers 
        Status1  
        status2 
        type 
        approvingDate1 
        approvingDate2 
        currentDate 
        newDate 
    }
}
`
const uploadFile = gql`
mutation uploadFile($file : Upload!){
    uploadFile(file : $file)
}
`

const download = gql`
mutation download($file : String){
    download(file:$file)
}
`

@Injectable({ providedIn: "root" })
export class RequestService {

  constructor( private apollo : Apollo) {}

// getPermissions(){
//     return  this.apollo.query({
//         query : getPermissions 
//       })
// }
getRequestsByProject(projectId){
  return  this.apollo.query({
      query :  getRequestsByProject , 
      variables:{projectId }
    })
}
createRequest(projectId  , user  ,  phaseId , type  , currentDate  , newDate , file  ){
console.log("user",user)
    return this.apollo.mutate({
        mutation : createRequest ,
        variables:{projectId  , user  ,  phaseId , type  , currentDate  , newDate , file}
    })
}
updateRequest ( id  , reqApprover  , note  , status ){
    return this.apollo.mutate({
        mutation : updateRequest , 
        variables : {id  , reqApprover  , note  , status}
    })
}
uploadFile ( file  ){
    return this.apollo.mutate({
        mutation : uploadFile , 
        variables : {file} ,
        
    })


}
download ( file){
    return this.apollo.mutate({
        mutation : download ,
        variables: {file}
        
    })


}


}