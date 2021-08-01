import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbSidebarService, NbThemeService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { UserService } from '../../../@core/services/user.service';
import { ProjectService } from '../../../@core/services/projects.service';
import { ClientService } from '../../../@core/services/clients.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@core/auth/ngrx-auth/appState';
import { DestroyDepartementAction, GetUserAction, SelectProjectAction } from '../../../@core/auth/ngrx-auth/auth.actions';
import { currentUserSelector, departementSelector } from '../../../@core/auth/ngrx-auth/auth.reducers';
import { RoleService } from '../../../@core/services/role.service';
import { PhaseService } from '../../../@core/services/phases.service';
import { NotificationService } from '../../../@core/services/notification.service';
import { DepartementService } from '../../../@core/services/departements.service';
@Component({
  selector: 'ngx-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit , OnDestroy {
addProjectWindow : NbWindowRef;
updateProjectWindow : NbWindowRef;
users = [1,2,3,4]
themeSubscription: any;
currentTheme : any
allProjects : any ;
userProjects ;
projectToUpdate;
Managers;
clients;
status ;
client ;
priority;
notifications ;
subject;
projects;
connectedUser : {id:""};
departements ;
projectData={name : null,  projectManager : 1 , duration : null, budget: null , priority : true , score : 10 , client : null , description : null , departement : null}
@ViewChild('addProjectTemplate') addProjectTemplate: TemplateRef<any>;
@ViewChild('updateProjectTemplate') updateProjectTemplate: TemplateRef<any>;

  constructor(private themeService : NbThemeService ,
     private projectService : ProjectService , 
     private userService : UserService ,
     private clientService : ClientService ,
     private windowService: NbWindowService ,
     private store : Store<AppState>,
     private roleService : RoleService,
     private phaseService : PhaseService,
     private departementservice : DepartementService ,
     private sidebarService: NbSidebarService
     ) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;  });

   }
  ngOnInit(): void {
    this.store.dispatch(new GetUserAction)
    this.store.select(currentUserSelector).subscribe((data : any)=>{

  this.getAllproject();
    })
}

getAllproject(){

  this.projectService.getAllProjects().subscribe((dataproject:any)=>{ 
    console.log("dataProject", dataproject)
    this.projects=dataproject.data.getAllProjects
    this.store.dispatch(new GetUserAction)
  this.store.select(departementSelector).subscribe((data : any)=>{
    if(data.length==0){
    this.allProjects=dataproject.data.getAllProjects
    }
    else{
this.allProjects=[]
      switch (parseInt(data[0])){
        case 1 : {
          for(let p of this.projects){
            if(p.departements[0].name=="backendDep"){
              this.allProjects.push(p)
            }
          }
        break ;
        }
        case 3 : {
          for(let p of this.projects){
            if(p.departements[0].name=="frontendDep"){
              this.allProjects.push(p)
            }
          }
        break ;
        }
        case 4 : {
          for(let p of this.projects){
            if(p.departements[0].name=="mobile"){
              this.allProjects.push(p)
            }
          }
        break ;
      
        }
        case 2 : {
          for(let p of this.projects){
            if(p.departements[0].name=="bankerise"){
              this.allProjects.push(p)
            }
          }
        break ;
      
        }
      }
    }
    })
    this.getUserProjects();

}) }


getUserProjects(){
  this.store.dispatch(new GetUserAction)
  this.store.select(departementSelector).subscribe((data : any)=>{
    if(data.length==0){

  this.store.dispatch(new GetUserAction)
  this.store.select(currentUserSelector).subscribe((data : any)=>{
    this.userProjects=[]
    this.connectedUser=data.user
  this.userService.getUserProjects(data.user.id).subscribe((res: any)=>{
    this.userProjects=res.data.getUserWithProjects.projects;
  })
}); 
}
else{
  this.userProjects=[]
  for(let d of data){
    switch (parseInt(d)){
      case 1 : {
        for(let p of this.projects){
          if(p.departements[0].name=="backendDep"){
            this.userProjects.push(p)
          }
        }
      break ;
      }
      case 3 : {
        for(let p of this.projects){
          if(p.departements[0].name=="frontendDep"){
            this.userProjects.push(p)
          }
        }
      break ;
      }
      case 4 : {
        for(let p of this.projects){
          if(p.departements[0].name=="mobile"){
            this.userProjects.push(p)
          }
        }
      break ;
    
      }
      case 2 : {
        for(let p of this.projects){
          if(p.departements[0].name=="bankerise"){
            this.userProjects.push(p)
          }
        }
      break ;
    
      }
    }
  }
}
})

}

openAddProjectForm(){
  this.Managers=[]
  this.roleService.getRolesByPermission(1).subscribe((res:any)=>{
  res.data.getRolesByPermission.forEach(element => {
  this.userService.getUsersByRole(element.id).subscribe((data: any)=>{
    for(let u of data.data.getUsersByRole){
    this.Managers.push(u)}
  })
});

this.clientService.getAllClients().subscribe((data: any)=>{
  this.clients = data.data.getAllClients
  this.departementservice.getAllDepartements().subscribe((res : any)=>{
    this.departements=res.data.getAllDepartements
    this.addProjectWindow=this.windowService.open(this.addProjectTemplate, { title: `Create New Project` , context:{managers:this.Managers, clients: this.clients , departements : this.departements} });
  })
});
})
}
createNewProject(data ,projectPhases){
  this.projectService.createProject(data.name,data.projectManager,projectPhases.depforecDare,projectPhases.depbaseDate,data.budget,data.priority,1 , data.departement ).subscribe((res:any)=>{
  this.phaseService.createProjectPhases(res.data.createProject.id,
  projectPhases.initbase,
  projectPhases.initforec,
  projectPhases.planificationbaseDate,
  projectPhases.planificationforecDare,
  projectPhases.devbaseDate,projectPhases.devforecDare,
  projectPhases.depbaseDate,projectPhases.depforecDare).subscribe(()=>{
    this.getAllproject()
  })
  });
  this.addProjectWindow.close()
}
Prioritytoggle(data) {
      data.priority=!data.priority; 
 }
 selectDepartementFilter($event){
   this.allProjects=[]
switch ($event){
  case 1 : {
    for(let p of this.projects){
      if(p.departements[0].name=="backendDep"){
        this.allProjects.push(p)
      }
    }
  break ;
  }
  case 2 : {
    for(let p of this.projects){
      if(p.departements[0].name=="frontendDep"){
        this.allProjects.push(p)
      }
    }
  break ;
  }
  case 3 : {
    for(let p of this.projects){
      if(p.departements[0].name=="mobile"){
        this.allProjects.push(p)
      }
    }
  break ;

  }
  case 4 : {
    for(let p of this.projects){
      if(p.departements[0].name=="bankerise"){
        this.allProjects.push(p)
      }
    }
  break ;

  }
  case 5 : {
   this.allProjects=this.projects;
  break ;

  }
  case 6 : {
this.allProjects= this.userProjects}
}
}
startProject(projectId){
  this.projectService.startProject(projectId).subscribe(()=>this.getAllproject())
}
selectManager($event){
  this.projectData.projectManager=parseInt($event) ;
}

selectClient($event){
  this.projectData.client=parseInt($event) ;
  }
selectDepartement($event){
    this.projectData.departement=parseInt($event) ;
    }
 
openUpdateProjectWindow(p){
  this.Managers=[]
  this.roleService.getRolesByPermission(1).subscribe((res:any)=>{
  res.data.getRolesByPermission.forEach(element => {
  this.userService.getUsersByRole(element.id).subscribe((data: any)=>{
    for(let u of data.data.getUsersByRole){
    this.Managers.push(u)}
  })
});
this.clientService.getAllClients().subscribe((data: any)=>{
  this.clients = data.data.getAllClients
  this.projectToUpdate = p

  this.status=p.status ;
  this.priority=p.priority;
  this.updateProjectWindow=this.windowService.open(this.updateProjectTemplate, {title:`update Project`,context:{managers:this.Managers, clients: this.clients , data :p , initbase:'',initforec :'' ,
  planificationbaseDate:'',planificationforecDare :'', devbaseDate:'',devforecDare :'',
 depbaseDate:'',depforecDare :''
} }); 
})
  })
}
openProjectDetails(id){
  console.log('projectID',id)
  this.store.dispatch(new SelectProjectAction(id));
}
updateManager($event,data){
  data.projectManager.id=parseInt($event);
}
updateClient($event){
  this.client=$event
}
activeStatustoggle(){
  if(this.status=="active"){
  this.status="inactive"}
  else{
this.status="active"
  }
}
inactiveStatustoggle(){
  this.status="inactive"
}
prioritytoggle(data){
  this.priority=!this.priority
}
updateProject(data){
this.projectService.updateProject(data.id,data.name,data.duration,parseInt(data.projectManager.id),data.budget,this.priority,data.score,this.status).subscribe() ;
data.status=this.status;
data.priority=this.priority;
this.userService.getUserById(parseInt(data.projectManager.id)).subscribe((res:any)=>{
  data.projectManager.name=res.data.getUserById.name
})
  this.updateProjectWindow.close()
}
changePriority(id){
this.projectService.changePriority(id).subscribe(()=>{
  this.getAllproject() ;
});

}
getDate(date){
  var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours=''+d.getHours(),
        mins=''+d.getMinutes()
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if(hours.length<2)
        hours='0'+hours
    if(mins.length<2)
    mins='0'+mins
    return year+'/'+month+'/'+day+' '+hours+':'+mins;
}
ngOnDestroy(){
  this.store.dispatch(new DestroyDepartementAction);

}

}
