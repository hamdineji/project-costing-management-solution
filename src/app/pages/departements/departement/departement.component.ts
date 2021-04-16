import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { UserService } from '../../../@core/services/user.service';
import { DepartementService } from '../../../@core/services/departements.service';
import { RoleService } from '../../../@core/services/role.service';

@Component({
  selector: 'ngx-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {
  departements ;
  themeSubscription: any;
  currentTheme: string;
  constructor( private departementService: DepartementService ,
    private roleService : RoleService ,
    private userService:UserService,
    private themeService : NbThemeService ) { 
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name; 
  })
  }
  ngOnInit(): void {
    this.departementService.getAllDepartements().subscribe((data:any)=> {
    this.departements=[]
      for (let d of data.data.getAllDepartements){
      this.departements.push({data : d , CR : [] , DR : []});}
    this.roleService.getRolesByPermission(7).subscribe((res:any)=>{
    res.data.getRolesByPermission.forEach(element => {
    this.userService.getUsersByRole(element.id).subscribe((data: any)=>{
      for (let p of this.departements){
        const index = this.departements.indexOf(p)
      for(let u of data.data.getUsersByRole){

          if(p.data.id==u.departement){
            this.departements[index].CR.push(u.name);
          }
      }}

  
  })
});
    })
    this.roleService.getRolesByPermission(8).subscribe((res:any)=>{
      res.data.getRolesByPermission.forEach(element => {
      this.userService.getUsersByRole(element.id).subscribe((data: any)=>{
        for (let p of this.departements){
          const index = this.departements.indexOf(p)
        for(let u of data.data.getUsersByRole){
            if(p.data.id==u.departement){
              this.departements[index].DR.push(u.name);
            }
        }}
    })
  });
      })
  }) 


}}



  
