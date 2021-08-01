import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../@core/services/projects.service';
import { saveAs } from 'file-saver'
import { UserService } from '../../../@core/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@core/auth/ngrx-auth/appState';
import { GetUserAction } from '../../../@core/auth/ngrx-auth/auth.actions';
import { currentUserSelector } from '../../../@core/auth/ngrx-auth/auth.reducers';


@Component({
    selector: 'ngx-reports',
    templateUrl: './reports.component.html'
  })
  export class ReportsComponent implements OnInit {
    projects ;
    userProjects
    customColumn = 'project';
    defaultColumns = [ 'project','departement', 'createdAt', 'action' ];
    allColumns = [ this.customColumn, ...this.defaultColumns ];

    constructor( private projectService : ProjectService ,
        private userService : UserService ,
        private store : Store<AppState>,

        ){}


    ngOnInit(){
        this.store.dispatch(new GetUserAction)
        this.store.select(currentUserSelector).subscribe((data : any)=>{
    
        this.projectService.getAllProjects().subscribe((res : any)=>{
            this.projects = res.data.getAllProjects; 
          })
          this.userService.getUserProjects(data.user.id).subscribe((res: any)=>{
            this.userProjects=res.data.getUserWithProjects.projects;
          })

        })
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
      savefile(file){
        this.projectService.download(file).subscribe((data:any)=>{
          var byteCharacters = atob(data.data.downloadReport)
          var byteNumbers = new Array(byteCharacters.length);
          for (var i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          const blob = 
          new Blob([byteArray], 
                   {type: "text/plain;charset=utf-8"});
                   saveAs(blob, file);
        })
      }

  }