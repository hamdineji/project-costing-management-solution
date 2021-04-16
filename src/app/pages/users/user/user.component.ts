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
@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  allPermissions;
  currentTheme: string;
  themeSubscription: any;
  users ;
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
  addRoledata;
  categoryRolePermissions = [];
  categoryUserPermissions=[];
  categoryDepPermissions;
  categoryProjectPermissions=[];

  currentUserPermission=[];
  @ViewChild('updateRoleTemplate') updateRoleTemplate: TemplateRef<any>;
  @ViewChild('updateUserTemplate') updateUserTemplate: TemplateRef<any>;
  @ViewChild('addRoleTemplate') addRoleTemplate: TemplateRef<any>;

  constructor(private themeService: NbThemeService , 
     private windowService: NbWindowService ,
     private userService : UserService ,
     private roleService : RoleService ,
     private departementService : DepartementService,
     private permissionService : PermissionService ,
     private store : Store<AppState>
     ) { 
       this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
          this.currentTheme = theme.name;  });
   }
    ngOnInit(){
      this.store.dispatch(new GetUserAction)
      this.store.select(currentUserSelector).subscribe((data : any)=>{
      this.roleService.getRoleByID(data.role).subscribe((data:any)=>{

     data.data.getRoleById.permissions.forEach(value => {
       this.permissionService.getPermissionById(value).subscribe((data:any)=>
       {this.currentUserPermission.push(data.data.getPermissionById.name)})
     
    })})});
   this.getData();
  }
  getData() {
    this.userService.getUsers().subscribe((data:any )=>{  
      this.users=data.data.getUsers
      this.users.forEach(element => {

          const index = this.users.indexOf(element) ;
          if(element.role==null){
            this.users[index].role="not yet Defined"
          }
          else{
          this.roleService.getRoleByID(element.role).subscribe((data:any)=>
          
          this.users[index].role=data.data.getRoleById.name
          )}
          console.log("element.departement", element.departement)
        if(element.departement ==null){
          this.users[index].departement="not yet Defined"
        }
        else{
          this.departementService.getDepartementById(element.departement).subscribe((res : any)=>{
            console.log("departement",res.data.getDepartementById)
            this.users[index].departement=res.data.getDepartementById.name;
          })
        }
      });
    });
    this.roleService.getRoles().subscribe((data : any)=>{this.roles=data.data.getAllRoles ;
      var rolesData =[];
    this.roles.forEach((value) => {
      var rolesManagementPermissions ;
        rolesManagementPermissions=[] ;
      var usersManagementPermissions ;
      usersManagementPermissions=[]
      var projectManagementPermissions=[] ;
      var DepartementManagementPermissions=[] ;

      value.permissions.forEach((permissionId)=>{
        var permission 
        this.permissionService.getPermissionById(permissionId).subscribe((data:any)=> {permission = data.data.getPermissionById.name ;
          switch(data.data.getPermissionById.category){ 
            case "Roles management" : {
              rolesManagementPermissions.push(permission) ; 
              break ;
            }
            case "user management" : {
              usersManagementPermissions.push(permission);
              break ;
            }
            case "project management" : {
              projectManagementPermissions.push(permission);
              break ;
            }
            case "Departement management" : {
              DepartementManagementPermissions.push(permission);
              break ;
            }
          }
        
        })
      })
      rolesData.push({role : value.name , rolesManagementPermissions : rolesManagementPermissions,
        usersManagementPermissions : usersManagementPermissions ,
        projectManagementPermissions:projectManagementPermissions,
        DepartementManagementPermissions:DepartementManagementPermissions,
        id : value.id});      
    }
    );
    this.rolesData =rolesData
  })
  }

  openAddRoleForm() {
      this.permissionService.getPermissions().subscribe((data : any)=> {this.allPermissions=data.data.getAllPermission;
      this.addRoledata=[];
      this.categoryRolePermissions=[] ; 
      this.categoryUserPermissions=[]
      this.allPermissions.forEach((value)=>{this.addRoledata.push({permission: value , checked: false})
    switch(value.category){
      case "Roles management" :{
        this.categoryRolePermissions.push(value);
      break;
      } 
      case "user management" : {
        this.categoryUserPermissions.push(value);
      } 
    }
    })
    });
    this.addRoleWindow=this.windowService.open(this.addRoleTemplate, { title: `Add Role` , context : {data :this.addRoledata} });
  }
  openUpdateRoleForm(id) {
    this.permissionService.getPermissions().subscribe((data : any)=> { this.permission=data.data.getAllPermission;
      this.data={id : id ,permission : []};
      this.categoryRolePermissions=[];
      this.categoryUserPermissions=[];
      this.categoryDepPermissions=[];
      this.categoryProjectPermissions=[];


      this.roleService.getRoleByID(id).subscribe((data: any)=>{this.rolePermissions=data.data.getRoleById.permissions; this.roleName=data.data.getRoleById.name ;  
      this.permission.forEach((value)=>{
        if (this.rolePermissions.indexOf(value.id.toString())!=-1){
          this.data.permission.push({permission: value , checked: true, id : id})
          switch(value.category){
            case "Roles management" :{
              this.categoryRolePermissions.push({permission: value , checked: true, id : id});
            break;
            } 
            case "user management" : {
              this.categoryUserPermissions.push({permission: value , checked: true, id : id});
              break;
            } 
            case "Departement management" :{
              this.categoryDepPermissions.push({permission: value , checked: true, id : id});
            break;
            } 
            case "project management" :{
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
          case "user management" : {
            this.categoryUserPermissions.push({permission: value , checked: false, id : id});
            break;
          } 
          case "Departement management" : {
            this.categoryDepPermissions.push({permission: value , checked: false, id : id});
            break;
          } 
          case "project management" : {
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
        newRolePermissions.push(parseInt(p.permission.id) );
      }
    }
    this.roleService.createRole(this.roleName,newRolePermissions).subscribe(()=> this.getData())
    this.addRoleWindow.close();
  }
  updateRole(){
    var rolePermissions = []
    for(let p of this.data.permission){
      if (p.checked){
        rolePermissions.push(parseInt(p.permission.id) );
      }
    }
    this.roleService.updateRole(this.data.id,this.roleName,rolePermissions).subscribe(()=>this.getData())
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
    this.userService.addRole(role[0],id).subscribe(()=> this.getData())
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
  ngOnDestroy(){
    this.themeSubscription.unsubscribe();
  }
}
