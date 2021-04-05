import { Component , OnInit , Input, Optional, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { AnyARecord } from 'dns';
import { UserService } from '../../../@core/services/user.service';
import { Permission } from '../../../@core/models/permission';
import { PermissionService } from '../../../@core/services/permissions.service';
import { RoleService } from '../../../@core/services/role.service';


@Component({
  selector: 'update-user',
  template: `
  <form (ngSubmit)="updateRole()">
  <div class="mb-3">
  <label for="RoleName" class="form-label">User name</label>
  <input type="text" class="form-control" id="userName" name="userName" value="userName" [(ngModel)]="userName">
  </div>
  <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Roles</label>
  <div *ngFor="let p of data">
  <nb-checkbox (checkedChange)="toggle($event,p.role.id)" [checked]="p.checked" >{{p.role.name}}</nb-checkbox>
  </div>
  </div>
  <button type="submit" status ="primary" nbButton>SUBMIT</button>
  </form>
  `,
  styleUrls: ['update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user ;
  checked = false;
  roleName : string 
  roles : Array<any>
  rolePermissions : Array<any>
  data ;
  userName ;
  id : Number

  constructor(@Optional() public windowRef: NbWindowRef , 
              private permissionService : PermissionService ,
              private userService : UserService,
              private roleService: RoleService,
              ) {}
  ngOnInit(){
  }
  toggle(checked: boolean, id : number) {
   for(let p of this.data){
     console.log(p.role)
     console.log(id);
     if (p.role.id == id){
         p.checked=checked;
     }
   }
  }
  updateUser(){
    var role = []
    
    for(let p of this.data){
      if (p.checked){
        role.push(parseInt(p.role.id) );
      }
    }
    if (role.length==1)
    this.userService.addRole(role[0],this.id).subscribe((data)=> console.log(data))
  }

  close() {
    this.windowRef.close();
  }
}
