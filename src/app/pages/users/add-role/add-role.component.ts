import { Component , OnInit, Optional, Output} from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { EventEmitter } from 'events';
import { Permission } from '../../../@core/models/permission';
import { PermissionService } from '../../../@core/services/permissions.service';
import { RoleService } from '../../../@core/services/role.service';

@Component({
  selector : 'add-role',
  template: `
  <form (ngSubmit)="createRole()">
  <div class="mb-3">
  <label for="RoleName" class="form-label">Role name</label>
  <input type="text" class="form-control" id="RoleName" name="RoleName" placeholder="enter the role name" [(ngModel)]="roleName">
  </div>
  <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">permissions</label>
  <div fxLayout="row wrap"  > 
            <div fxFlex="50%" >
              <h6>roles Management</h6>
  <div *ngFor="let p of userPermissions">
  <nb-checkbox (checkedChange)="toggle($event,p.id)" >{{p.name}}</nb-checkbox>
  </div>
  </div>
  </div>
  <div fxLayout="row wrap"  > 
  <div fxFlex="50%" >
  <div *ngFor="let p of rolePermissions">
  <nb-checkbox (checkedChange)="toggle($event,p.id)" >{{p.name}}</nb-checkbox>
  </div>
  </div>
  </div>
  </div>
  <button type="submit" status ="primary" nbButton >SUBMIT</button>
  </form>
  `,
  styleUrls: ['add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {
  checked = false;
  roleName : string 
  permission : Array<any>
  data :Array<any>
  userPermissions = [];
  rolePermissions = [];
  @Output() refresh = new EventEmitter();
  constructor(@Optional() public windowRef: NbWindowRef , private permissionService : PermissionService , private roleService: RoleService) {}
  ngOnInit(){
  this.permissionService.getPermissions().subscribe((data : any)=> {this.permission=data.data.getAllPermission;
    this.data=[];
    
    this.permission.forEach((value)=>{this.data.push({permission: value , checked: false})
  switch(value.category){
    case "Roles management" :{
      this.rolePermissions.push(value);
    break;
    } 
    case "user management" : {
      this.userPermissions.push(value);
    } 
  }
  })
  });
  }

  toggle(checked: boolean, id : number) {
   for(let p of this.data){
     if (p.permission.id == id){
       p.checked=checked;
     }
   }
  }
  createRole(){ 
    var rolePermissions = [] 
    for(let p of this.data){
      if (p.checked){
        rolePermissions.push(parseInt(p.permission.id) );
      }
    }
    this.roleService.createRole(this.roleName,rolePermissions).subscribe((data)=> console.log(data))
    this.windowRef.close();
    this.refresh.emit(!this.refresh+"");
  }

  close() {
    this.windowRef.close();
  }
}
