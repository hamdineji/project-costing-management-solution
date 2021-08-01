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
tasks =[]
taskDetails;
allTasks
allnewTasks=[]
usernewTasks=[]
allInprogressTasks=[]
userInprogressTasks=[]
alldoneTasks=[]
userdoneTasks=[]
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
    res.data.getTasksByUser.forEach(element => {
      if(element.status=="new"){
        this.usernewTasks.push(element)
      }
      else{
        if(element.status=="in progress"){
          this.userInprogressTasks.push(element)
        }
        else{
          this.userdoneTasks.push(element)
        }
      }
    });
    })
    this.userService.getUserProjects(data.user.id).subscribe((res: any)=>{
      this.userProjects=res.data.getUserWithProjects.projects;
    })
 })
this.taskService.getAllTasks().subscribe((res: any)=>{
  this.allTasks= res.data.getAllTasks
  res.data.getAllTasks.forEach(element => {
    if(element.status=="new"){
      this.allnewTasks.push(element)
    }
    else{
      if(element.status=="in progress"){
        this.allInprogressTasks.push(element)
      }
      else{
        this.alldoneTasks.push(element)
      }
    }
  });
  
})
this.projectService.getAllProjects().subscribe((res: any)=>{
this.allProjects = res.data.getAllProjects
})
this.userService.getUsers().subscribe((res: any)=>{
  this.allUsers= res.data.getUsers
})
  }
  filterStatus(tasks){
    this.allnewTasks=[]
    this.allInprogressTasks=[]
    this.alldoneTasks=[]
    tasks.forEach(element => {
      if(element.status=="new"){
        this.allnewTasks.push(element)
      }
      else{
        if(element.status=="in progress"){
          this.allInprogressTasks.push(element)
        }
        else{
          this.alldoneTasks.push(element)
        }
      }
    });
  }
userFilterStatus(tasks){
  this.usernewTasks=[]
  this.userInprogressTasks=[]
  this.userdoneTasks=[]
  tasks.forEach(element => {
    if(element.status=="new"){
      this.usernewTasks.push(element)
    }
    else{
      if(element.status=="in progress"){
        this.userInprogressTasks.push(element)
      }
      else{
        this.userdoneTasks.push(element)
      }
    }
  });
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
        this.filterStatus(res.data.getAllTasks)
      })
    }
    else{
      this.taskService.getTasksByProject($event).subscribe((res: any)=>{
        this.filterStatus(res.data.getTasksByProject);})
    }
  }
  selectUserFilter($event){
    if($event==0){
      this.taskService.getAllTasks().subscribe((res:any)=>{
        this.filterStatus(res.data.getAllTasks)

      })
    }
    else{
      this.taskService.getTasksByUser($event).subscribe((res: any)=>{
        this.filterStatus(res.data.getTasksByUser)
      })
    }
  }
  selectUserProjectFilter($event){
    if($event==0){
      this.taskService.getTasksByUser(this.connectedUser.user.id).subscribe((res:any)=>{
        this.userFilterStatus(res.data.getTasksByUser)
      })
    }
    else{
      this.taskService.getUserTasksByProject( $event,this.connectedUser.user.id).subscribe((res : any)=>{
        console.log("hahahaha" , res.data.getUserTaskByProject)
        this.userFilterStatus(res.data.getUserTaskByProject)
      })
    }
  }
}
