import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';

const createFacture = gql `
mutation 
createFacture($details : String , $revenue : Int, $deadline : DateTime , $phase : ID ,$file : Upload){
    createFacture(details : $details ,revenue:$revenue ,deadline : $deadline,phase : $phase, file : $file){
    id
  }
}
`
const downloadFacture = gql `
mutation 
downloadFacture($id : ID ){
  downloadFacture(id : $id )
    
}
`
const setFacture = gql `
mutation 
setFacture($factureId : ID,$file : Upload){
    setFacture(factureId : $factureId , file : $file){
    id
  }
}
`
const getAllFactures = gql `
query {
  getAllFactures{
    id 
    status
    revenue 
    date 
    deadline
    phase{
      name
    }
    project{
      name
    }
  }
}

`

@Injectable({ providedIn: "root" })
export class FactureService {

  constructor( private apollo : Apollo) {}


  createFacture(details , revenue , deadline , phase , file){
    return this.apollo.mutate({
        mutation: createFacture ,
        variables : {details , revenue , deadline , phase , file}
    })
}
setFacture(factureId ,file){
  return this.apollo.mutate({
      mutation: setFacture ,
      variables : {factureId ,file}
  })
}
downloadFacture(id ){
  return this.apollo.mutate({
      mutation: downloadFacture ,
      variables : {id}
  })
}
getAllFactures(){
  return this.apollo.query({
    query : getAllFactures
  })
}
}