import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../@core/services/projects.service';
import { saveAs } from 'file-saver'
import { LogsService } from '../../../@core/services/logs.service';


@Component({
  selector: 'ngx-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  projects ;
  customColumn = 'project';
  defaultColumns = [ 'project','departement', 'createdAt', 'action' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  allNotification;
  logsList
  constructor( private projectService : ProjectService , private logsService : LogsService) { }

  ngOnInit(): void {
    this.logsService.getAllLogs().subscribe((res : any)=>{
      this.logsList=res.data.getAllLogs
    })
    this.projectService.getAllProjects().subscribe((res : any)=>{
      this.projects = res.data.getAllProjects; 

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


