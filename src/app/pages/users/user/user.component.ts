import { Component, OnInit , OnDestroy , TemplateRef, ViewChild} from '@angular/core';
import { NbThemeService, NbWindowRef, NbWindowService } from '@nebular/theme';

import { UserService } from '../../../@core/services/user.service';
import { RoleService } from '../../../@core/services/role.service';
import { PermissionService } from '../../../@core/services/permissions.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@core/auth/ngrx-auth/appState';
import { currentUserSelector } from '../../../@core/auth/ngrx-auth/auth.reducers';
import { GetUserAction } from '../../../@core/auth/ngrx-auth/auth.actions';
import { DepartementService } from '../../../@core/services/departements.service';
import { ProjectService } from '../../../@core/services/projects.service';
@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  allPermissions;
  currentTheme: string;
  themeSubscription: any;
  users = [] ;
  data ;
  updateUserData;
  rolesData ;
  role: String="hello decorator";
  rolePermissions = [] ;
  roleName;
  permission ;
  user
  roles 
  updateRoleWindow:NbWindowRef;
  updateUserWindow:NbWindowRef;
  addRoleWindow : NbWindowRef;
  assignProjectsWindow : NbWindowRef;
  addRoledata = [];
  categoryRolePermissions = [];
  categoryUserPermissions=[];
  categoryDepPermissions;
  categoryProjectPermissions=[];
  categoryRessourcesPermissions =[]
  categoryFacturesPermissions=[]
  projects
  currentUserPermission=[];
  backendProjects = [];
  frontendProjects = []
  mobileprojects = [];
  bankeriseProjects = [];
  currentUser
  @ViewChild('updateRoleTemplate') updateRoleTemplate: TemplateRef<any>;
  @ViewChild('updateUserTemplate') updateUserTemplate: TemplateRef<any>;
  @ViewChild('addRoleTemplate') addRoleTemplate: TemplateRef<any>;
  @ViewChild('assignProjectTemplate') assignProjectTemplate: TemplateRef<any>;

  constructor(private themeService: NbThemeService , 
     private windowService: NbWindowService ,
     private userService : UserService ,
     private roleService : RoleService ,
     private projectService :  ProjectService,
     private permissionService : PermissionService ,
     private store : Store<AppState>
     ) { 
       this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
          this.currentTheme = theme.name;  });
   }
    ngOnInit(){
      this.projectService.getAllProjects().subscribe((res :any )=>{
        this.projects = res.data.getAllProjects;
      })
      this.store.dispatch(new GetUserAction)
      this.store.select(currentUserSelector).subscribe((data : any)=>{
        this.currentUser = data
        this.getData();

  });
  }
  getData() {
    this.userService.getUsers().subscribe((data:any )=>{  
      this.users=data.data.getUsers
      if(this.users!=null){
      this.users.forEach(element => {
          const index = this.users.indexOf(element) ;
          if(element.role==null){
            this.users[index].role="not yet Defined"
          }
        if(element.departement ==null){
          this.users[index].departement="not yet Defined"
        }
      });}
    });
    this.roleService.getRoles().subscribe((data : any)=>{this.roles=data.data.getAllRoles ;
      var rolesData =[];
    this.roles.forEach((value) => {
      var rolesManagementPermissions=[] ;
      var usersManagementPermissions =[] ;
      var projectManagementPermissions=[] ;
      var DepartementManagementPermissions=[] ;
      var RessourcesManagementPermissions=[]
      var FacturesManagementPermissions =[]
      value.listOfPermissions.forEach((element)=>{
          switch(element.category){ 
            case "Roles management" : {
              rolesManagementPermissions.push(element) ; 
              break ;
            }
            case "Users management" : {
              usersManagementPermissions.push(element);
              break ;
            }
            case "Projects management" : {
              projectManagementPermissions.push(element);
              break ;
            }
            case "Departement management" : {
              DepartementManagementPermissions.push(element);
              break ;
            } 
            case "Ressources Management" : {
              RessourcesManagementPermissions.push(element);
              break ;
            }
            case "Factures Management" : {
              FacturesManagementPermissions.push(element);
              break ;
            }
          }
        })
        rolesData.push({role : value.name , rolesManagementPermissions : rolesManagementPermissions,
        usersManagementPermissions : usersManagementPermissions ,
        projectManagementPermissions:projectManagementPermissions,
        DepartementManagementPermissions:DepartementManagementPermissions,
        RessourcesManagementPermissions : RessourcesManagementPermissions,
        FacturesManagementPermissions : FacturesManagementPermissions,
        id : value.id});      
    }
    );
    this.rolesData =rolesData
  })
  }

  openAddRoleForm(){
    this.roleName=""
      this.permissionService.getPermissions().subscribe((data : any)=> {this.allPermissions=data.data.getAllPermission;
      this.addRoledata = [];
      this.categoryRolePermissions=[] ; 
      this.categoryUserPermissions=[] ; 
      this.categoryDepPermissions = [];
      this.categoryProjectPermissions=[];
      this.categoryRessourcesPermissions = []
      this.categoryFacturesPermissions = []
      this.allPermissions.forEach((value)=>{
        this.addRoledata.push({permission: value , checked: false})
    switch(value.category){
      case "Roles management" :{
        this.categoryRolePermissions.push(value);
      break;
      } 
      case "Users management" : {
        this.categoryUserPermissions.push(value);
        break;
      } 
      case "Departement management" : {
        this.categoryDepPermissions.push(value);
        break;
      } 
      case "Projects management" : {
        this.categoryProjectPermissions.push(value);
        break;
      }
      case "Ressources Management" : {
        this.categoryRessourcesPermissions.push(value);
        break;
      } 
      case "Factures Management" : {
        this.categoryFacturesPermissions.push(value);
        break;
      }  
    }
    })
    });
    this.addRoleWindow=this.windowService.open(this.addRoleTemplate, { title: `Add Role` , context : {data :this.addRoledata} });
  }
  openUpdateRoleForm(id){
    this.permissionService.getPermissions().subscribe((data : any)=> { this.permission=data.data.getAllPermission;
      this.data={id : id ,permission : []};
      this.categoryRolePermissions=[];
      this.categoryUserPermissions=[];
      this.categoryDepPermissions=[];
      this.categoryProjectPermissions=[];
      this.roleService.getRoleByID(id).subscribe((data: any)=>{this.rolePermissions=data.data.getRoleById.listOfPermissions; this.roleName=data.data.getRoleById.name ;  
      this.permission.forEach((value)=>{
        if (this.rolePermissions.findIndex(x=>x.id==value.id)!=-1){
          this.data.permission.push({permission: value , checked: true, id : id})
          switch(value.category){
            case "Roles management" :{
              this.categoryRolePermissions.push({permission: value , checked: true, id : id});
            break;
            } 
            case "Users management" : {
              this.categoryUserPermissions.push({permission: value , checked: true, id : id});
              break;
            } 
            case "Departement management" :{
              this.categoryDepPermissions.push({permission: value , checked: true, id : id});
            break;
            } 
            case "Request Management" :{
              this.categoryProjectPermissions.push({permission: value , checked: true, id : id});
            break;
            } 
          }
        }
      else {
        this.data.permission.push({permission : value , checked : false  , id : id})
        switch(value.category){
          case "Roles management" :{
            this.categoryRolePermissions.push({permission: value , checked: false, id : id});
          break;
          } 
          case "Users management" : {
            this.categoryUserPermissions.push({permission: value , checked: false, id : id});
            break;
          } 
          case "Departement management" : {
            this.categoryDepPermissions.push({permission: value , checked: false, id : id});
            break;
          } 
          case "Request Management" : {
            this.categoryProjectPermissions.push({permission: value , checked: false, id : id});
            break;
          } 
        }
      }})
      this.updateRoleWindow=this.windowService.open(this.updateRoleTemplate, { title: `Update Role` , context : {data :this.data} });})})
  }
  toggleUpdateRoleForm(checked: boolean, id : number) {
   for(let p of this.data.permission){

     if (p.permission.id == id){
       p.checked=checked;
     }
   }
  }
  toggle(checked: boolean, id : number) {
    for(let p of this.updateUserData){
      if (p.role.id == id){
          p.checked=checked;
      }
    }
   }
   addRoletoggle(checked: boolean, id : number) {
    for(let p of this.addRoledata){
      if (p.permission.id == id){
        p.checked=checked;
      }
    }
   }
   createRole(){ 
    var newRolePermissions = [] 
    for(let p of this.addRoledata){
      if (p.checked){
        newRolePermissions.push({id :parseInt(p.permission.id) });
      }
    }
    this.roleService.createRole(this.roleName,newRolePermissions).subscribe(()=> this.getData())
    this.addRoleWindow.close();
  }
  updateRole(){
    var rolePermissions = []
    for(let p of this.data.permission){
      if (p.checked){
        rolePermissions.push({id :parseInt(p.permission.id) });
      }
    }
    this.roleService.updateRole(parseInt(this.data.id),this.roleName,rolePermissions).subscribe(()=>this.getData()
    ,(err)=>{

    })
    this.updateRoleWindow.close()
  }
  updateUser(id){
    var role = []
    for(let p of this.updateUserData){
      if (p.checked){
        role.push(parseInt(p.role.id) );
      }
    }
    if (role.length==1)
    this.userService.addRole({role:role[0]},id).subscribe(()=> this.getData())
    this.updateUserWindow.close()
  }
  openUpdateUserForm(id) {
    var user ,username ;
    this.updateUserData = []
    this.userService.getUserById(id).subscribe((data : any)=> {
       user=data.data.getUserById ;  
       username= data.data.getUserById.name ;
       this.roleService.getRoles().subscribe((data : any)=> { const roles=data.data.getAllRoles;
        roles.forEach((value)=>{
            this.updateUserData.push({role: value , checked: false})
        })
      this.updateUserWindow=  this.windowService.open(this.updateUserTemplate, { title: `Update User` , context : {data: this.updateUserData , userName : username , id : id}  });
      })
       })
  }
  openAssignProject(id){
    let suggestedProjects = [] ;

    this.userService.getUserById(id).subscribe((res : any )=>{
      this.projects.forEach(element => {
        let founded = false 
        for(let p of res.data.getUserById.projects){
          if(p.id==element.id){
             founded = true 
             if(element.departements[0].id==1){this.backendProjects.push({project : element , checked : true})}
             else{
               if(element.departements[0].id==2){
                 this.bankeriseProjects.push({project : element , checked : true})
               }
               else{
                 if(element.departements[0].id==3){
                   this.frontendProjects.push({project : element , checked : true})
                 }
                 else{
                   this.mobileprojects.push({project : element , checked : true})
                 }
               }
             }
            suggestedProjects.push({project : element , checked : true})
          }
        }
        if(!founded){
          suggestedProjects.push({project : element , checked : false})
          if(element.departements[0].id==1){this.backendProjects.push({project : element , checked : false})}
          else{
            if(element.departements[0].id==2){
              this.bankeriseProjects.push({project : element , checked : false})
            }
            else{
              if(element.departements[0].id==3){
                this.frontendProjects.push({project : element , checked : false})
              }
              else{
                this.mobileprojects.push({project : element , checked : false})
              }
            }
          }
        }
      });
      this.assignProjectsWindow = this.windowService.open(this.assignProjectTemplate , {title : "assign Project" , context :{data : suggestedProjects , user : id}})
    })
  }
  ProjectToggle(projectid , userid){
    this.userService.assignProject(projectid,userid).subscribe()}
  ngOnDestroy(){
    this.themeSubscription.unsubscribe();
  }
}
