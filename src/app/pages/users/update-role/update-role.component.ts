import { Component , OnInit , Input, Optional } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Store } from '@ngrx/store';

import { PermissionService } from '../../../@core/services/permissions.service';
import { RoleService } from '../../../@core/services/role.service';


@Component({
  selector: 'update-role',
  template: `
  <form (ngSubmit)="updateRole()">
  <div class="mb-3">
  <label for="RoleName" class="form-label">Role name</label>
  <input type="text" class="form-control" id="RoleName" name="RoleName" value="this.roleName" [(ngModel)]="roleName">
  </div>
  <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">permissions</label>
  <div *ngFor="let p of data">
  <nb-checkbox (checkedChange)="toggle($event,p.permission.id)" [checked]="p.checked" >{{p.permission.name}}</nb-checkbox>
  </div>
  </div>
  <button type="submit" status ="primary" nbButton>SUBMIT</button>

  </form>
  `,
  styleUrls: ['update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  checked = false;
  roleName : string 
  permission : Array<any>
  rolePermissions : Array<any>
  data :Array<any>
  id : Number
  @Input('role') 
  role : String  

  constructor(@Optional() public windowRef: NbWindowRef , 
              private permissionService : PermissionService ,
              private roleService: RoleService,
               ) {}
  ngOnInit(){
  this.roleService.getRoleByID(this.id).subscribe((data: any)=>{this.rolePermissions=data.data.getRoleById.permissions; this.roleName=data.data.getRoleById.name });
  this.permissionService.getPermissions().subscribe((data : any)=> { this.permission=data.data.getAllPermission;
    this.data=[];
    this.permission.forEach((value)=>{
      if (this.rolePermissions.indexOf(value.id.toString())!=-1){
        this.data.push({permission: value , checked: true})
      }
    else {
      this.data.push({permission : value , checked : false })
    }})
  })
  }
  toggle(checked: boolean, id : number) {
    console.log(checked)
   for(let p of this.data){
     if (p.permission.id == id){
       p.checked=checked;
     }
   }
  }
  updateRole(){
    var rolePermissions = []
    for(let p of this.data){
      if (p.checked){
        rolePermissions.push(parseInt(p.permission.id) );
      }
    }
    this.roleService.updateRole(1,this.roleName,rolePermissions).subscribe((data)=> console.log(data))
  }

  close() {
    this.windowRef.close();
  }
}
