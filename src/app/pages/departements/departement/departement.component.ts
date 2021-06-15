import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbThemeService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { UserService } from '../../../@core/services/user.service';
import { DepartementService } from '../../../@core/services/departements.service';
import { RoleService } from '../../../@core/services/role.service';
import { ProjectService } from '../../../@core/services/projects.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@core/auth/ngrx-auth/appState';
import { GetUserAction, SelectDepartementAction } from '../../../@core/auth/ngrx-auth/auth.actions';
import { currentUserSelector } from '../../../@core/auth/ngrx-auth/auth.reducers';

@Component({
  selector: 'ngx-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  departements = [] ;
  themeSubscription: any;
  currentTheme: string;
  projects ;
  users ;
  userDepartements = []
  modifyCRsandDRsWindow : NbWindowRef
  modifyDRsWindow : NbWindowRef

  @ViewChild('modifyCRsandDRs') modifyCRsandDRs: TemplateRef<any>;
  @ViewChild('modifyDRs') modifyDRs: TemplateRef<any>;

  constructor( private departementService: DepartementService ,
    private roleService : RoleService ,
    private userService:UserService,
    private themeService : NbThemeService ,
    private projectService : ProjectService,
    private windowService: NbWindowService ,
    private store : Store<AppState>,

    ) { 
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name; 
  })
  }
  ngOnInit(): void {
    this.departements=[]
    this.userDepartements=[]
    this.store.dispatch(new GetUserAction)
  this.store.select(currentUserSelector).subscribe((userdata : any)=>{
    this.projectService.getAllProjects().subscribe((res : any)=>{
      this.projects= res.data.getAllProjects;
    })
    this.departementService.getAllDepartements().subscribe((data:any)=> {
    for (let d of data.data.getAllDepartements){
      let progress =0
      let score = 0
      let nbprojects =0
      let inProgressionProjects = 0
      for(let p of this.projects){
        if(p.departements[0].name==d.name){
          progress+=p.progress
          score +=p.score
          nbprojects+=1 
          if(p.status =='active'){
            inProgressionProjects+=1
          }
        }    
      }
    if(userdata.user.departement.findIndex((x)=>x.id==d.id)!=-1){
      this.userDepartements.push({data : d , CR : [{name:""}] , DR : [{name:""}], score : Math.round(score/nbprojects) , progress: Math.round(progress/nbprojects) , inProgressionProjects: inProgressionProjects});
    }
    this.departements.push({data : d , CR : [{name:""}] , DR : [{name:""}], score : Math.round(score/nbprojects) , progress: Math.round(progress/nbprojects) , inProgressionProjects: inProgressionProjects});
  }
});
  })

}

openModifyCRs(dep){
 this.departementService.getCRapprovers(dep.id).subscribe((res: any)=>{
  this.users= []
  res.data.getCRapprovers.forEach(element => {
  const index =dep.CRapprovers.findIndex((x)=>x.id==element.id)
  if(index!=-1){
    this.users.push({user : element , checked : true})
  }
  else{
    this.users.push({user : element , checked : false})
  }
  });

  this.modifyCRsandDRsWindow=  this.windowService.open(this.modifyCRsandDRs, { title: `modify CR approvers` , context : {users: this.users , dep : dep}  });

  })
}
openModifyDRs(dep){
  this.departementService.getDRapprovers(dep.id).subscribe((res: any)=>{
   this.users= []
   res.data.getDRapprovers.forEach(element => {
    const index =dep.DRapprovers.findIndex((x)=>x.id==element.id)
    if(index!=-1){
      console.log("true")
      this.users.push({user : element , checked : true})
    }
    else{
      this.users.push({user : element , checked : false})
    }
    });
   this.modifyDRsWindow=  this.windowService.open(this.modifyDRs, { title: `modify DR approvers ` , context : {users: this.users , dep : dep}  });
   })
 }

 addDRapprover(dep , userid){
   this.departementService.addDRapprover(dep,userid).subscribe()
   this.ngOnInit();
}
addCRapprover(dep , userid){
   this.departementService.addCRapprover(dep,userid).subscribe()
   this.ngOnInit()
}
showProjects(idDep){
  this.store.dispatch(new SelectDepartementAction(idDep));
}

}



  
