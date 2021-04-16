import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbThemeService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { UserService } from '../../../@core/services/user.service';
import { ProjectService } from '../../../@core/services/projects.service';
import { ClientService } from '../../../@core/services/clients.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@core/auth/ngrx-auth/appState';
import { GetUserAction } from '../../../@core/auth/ngrx-auth/auth.actions';
import { currentUserSelector } from '../../../@core/auth/ngrx-auth/auth.reducers';
import { RoleService } from '../../../@core/services/role.service';
import { DepartementService } from '../../../@core/services/departements.service';

@Component({
  selector: 'ngx-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
addProjectWindow : NbWindowRef;
users = [1,2,3,4]
themeSubscription: any;
currentTheme : any
allProjects : any ;
userProjects ;
Managers;
clients;
projectData={name : null,  projectManager : 1 , duration : null, budget: null , priority : true , score : 10 , client : null , description : null}
@ViewChild('addProjectTemplate') addProjectTemplate: TemplateRef<any>;
@ViewChild('testTemplate') testTemplate: TemplateRef<any>;

  constructor(private themeService : NbThemeService ,
     private projectService : ProjectService , 
     private userService : UserService ,
     private clientService : ClientService ,
     private windowService: NbWindowService ,
     private departementService : DepartementService,
     private store : Store<AppState>,
     private roleService : RoleService

     ) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;  });
   }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((data:any)=>{ 
      this.allProjects=[]
      data.data.getAllProjects.forEach(element => {
      this.userService.getUserById(element.projectManager).subscribe((data : any)=>{element.projectManager=data.data.getUserById.name
      this.clientService.getClientsByProject(element.id).subscribe((data : any)=>{element.client=data.data.getClientsByProject[0].representiveName
        this.departementService.getDepartementById(element.Departement).subscribe((res: any)=>{
          element.Departement=res.data.getDepartementById.name
          this.allProjects.push(element);

        })
      })
    })
    });

  })
  this.store.dispatch(new GetUserAction)
  this.store.select(currentUserSelector).subscribe((data : any)=>{
    this.userProjects=[]
  data.user.projects.forEach((element) =>  {
   this.projectService.getProjectById(element).subscribe((projectData : any)=>{
    this.userService.getUserById(projectData.data.getProjectById.projectManager).subscribe((data : any)=>
    {projectData.data.getProjectById.projectManager=data.data.getUserById.name; 
      this.clientService.getClientsByProject(element).subscribe((data : any)=>{
        console.log("clientdata",data)
        projectData.data.getProjectById.client=data.data.getClientsByProject[0].representiveName
      this.userProjects.push(projectData.data.getProjectById)

    })
    })
  })
}); })
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
  this.addProjectWindow=this.windowService.open(this.addProjectTemplate, { title: `Create New Project` , context:{managers:this.Managers, clients: this.clients} });
});
})
}
createNewProject(data){
console.log(data)
  this.projectService.createProject(data.name,data.projectManager,data.duration, data.budget,data.priority,data.score).subscribe((data: any)=>{
    // console.log("newProject",data)
    this.clientService.addProjectToClient(this.projectData.client,data.data.createProject.id).subscribe()
  });
  this.addProjectWindow.close()
}
truePrioritytoggle() {
      this.projectData.priority=true; 
 }
 falsePrioritytoggle() {
  this.projectData.priority=false; 
}
selectManager($event){
  this.projectData.projectManager=parseInt($event) ;
}

selectClient($event){
  this.projectData.client=parseInt($event) ;
}

}
