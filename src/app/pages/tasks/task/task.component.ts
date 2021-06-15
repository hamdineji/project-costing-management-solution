import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@core/auth/ngrx-auth/appState';
import { GetUserAction } from '../../../@core/auth/ngrx-auth/auth.actions';
import { currentUserSelector, projectSelector } from '../../../@core/auth/ngrx-auth/auth.reducers';
import { PhaseService } from '../../../@core/services/phases.service';
import { ProjectService } from '../../../@core/services/projects.service';
import { TaskService } from '../../../@core/services/tasks.service';
import { UserService } from '../../../@core/services/user.service';

@Component({
  selector: 'ngx-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
tasks 
taskDetails
allTasks
allProjects
allUsers
connectedUser
userProjects
  constructor(
    private store : Store<AppState>,
    private taskService :  TaskService ,
    private projectService : ProjectService ,
    private userService : UserService

  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetUserAction)
    this.store.select(currentUserSelector).subscribe((data : any)=>{
    this.connectedUser=data
    this.taskService.getTasksByUser(data.user.id).subscribe((res: any)=>{
    this.tasks=res.data.getTasksByUser
    })  
    this.userService.getUserProjects(data.user.id).subscribe((res: any)=>{
      this.userProjects=res.data.getUserWithProjects.projects;
    })
 })
this.taskService.getAllTasks().subscribe((res: any)=>{
  this.allTasks = res.data.getAllTasks
})
this.projectService.getAllProjects().subscribe((res: any)=>{
this.allProjects = res.data.getAllProjects
})
this.userService.getUsers().subscribe((res: any)=>{
  this.allUsers= res.data.getUsers
})
  }
  setTaskStatus(item){
    const idx=this.tasks.indexOf(item)
    this.taskService.setTaskStatus(item.id).subscribe((res:any)=>{
      this.tasks[idx].status=res.data.setTaskStatus.status
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

  showTaskDetails(item){
    this.taskDetails=item
  }
  selectProjectFilter($event){
    if($event==0){
      this.taskService.getAllTasks().subscribe((res:any)=>{
        this.allTasks=res.data.getAllTasks;
      })
    }
    else{
      this.taskService.getTasksByProject($event).subscribe((res: any)=>{
        this.allTasks=res.data.getTasksByProject;})
    }
  }
  selectUserFilter($event){
    if($event==0){
      this.taskService.getAllTasks().subscribe((res:any)=>{
        this.allTasks=res.data.getAllTasks;
      })
    }
    else{
      this.taskService.getTasksByUser($event).subscribe((res: any)=>{
        this.allTasks=res.data.getTasksByUser;})
    }
  }
  selectUserProjectFilter($event){
    if($event==0){
      this.taskService.getTasksByUser(this.connectedUser.user.id).subscribe((res:any)=>{
        this.tasks=res.data.getTasksByUser;
      })
    }
    else{
      this.taskService.getUserTasksByProject(this.connectedUser.user.id, $event).subscribe((res : any)=>{
        this.tasks=res.data.getUserTaskByProject;
        console.log('res', res.data.getUserTaskByProject)
      })
    }
  }

}
