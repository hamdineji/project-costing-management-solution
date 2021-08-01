import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDateService , NbCalendarRange } from '@nebular/theme';
import { UserService } from '../../../@core/services/user.service';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { VacationService } from '../../../@core/services/vacation.service';
import { NbDialogService } from '@nebular/theme';
import { SelectProjectAction } from '../../../@core/auth/ngrx-auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@core/auth/ngrx-auth/appState';
import { TaskService } from '../../../@core/services/tasks.service';

@Component({
  selector: 'ngx-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  users;
  date;
  tasks =[];
  username="" ;
  chartData = [] ;
  highcharts = Highcharts;
  dateRange : NbCalendarRange<Date>; 
  selectedUser ;
  absenceDate
  userProjects;
  userTasks;
  chartOptions
  @ViewChild('ProjectList') ProjectList: TemplateRef<any>;
  @ViewChild('TasksList') TasksList: TemplateRef<any>;

  constructor( private userService : UserService , 
   private dateService: NbDateService<Date> , 
   private vacationService : VacationService,
   private TaskService :TaskService, 
   private dialogService : NbDialogService,
   private store : Store<AppState>,
   ) { }

  ngOnInit(): void {
    this.getUsersDetails()
    
  }
  addAbsence(user){
    this.selectedUser=user;
  }
  addUserAbsence(){
    this.userService.addAbsence(this.selectedUser , this.date).subscribe(()=>{
      this.date= null;
      this.getUsersDetails()
    })
  }
  showUserChart(name,usertasks,userVacations , userAbsences){
this.username=name ;
this.chartData=[]
if(usertasks!=null){
usertasks.forEach(element => {
 const date = new Date(element.startDate)
 const endDate = new Date(element.endDate);
  this.chartData.push({  
    start :Date.UTC( date.getFullYear() ,date.getMonth(),date.getDate()),
    end :  Date.UTC( endDate.getFullYear() ,endDate.getMonth(),endDate.getDate()),
    name : 'Tasks'
  })
});}
if(userVacations!=null){
userVacations.forEach(element => {
  const date = new Date(element.startDate)
  const endDate = new Date(element.endDate);
  this.chartData.push({
    name : 'Vacations',
    start :Date.UTC( date.getFullYear() ,date.getMonth(),date.getDate()),
    end :  Date.UTC( endDate.getFullYear() ,endDate.getMonth(),endDate.getDate()),
  })
});}
if(userAbsences!=null){
userAbsences.forEach(element => {
  const date = new Date(element);
  const endDate = this.dateService.addDay(date,1);
  this.chartData.push({
    name : 'Absences' ,
   start :Date.UTC( date.getFullYear() ,date.getMonth(),date.getDate()),
    end :  Date.UTC( endDate.getFullYear() ,endDate.getMonth(),endDate.getDate())
  })
});
}
this.chartOptions = {
  title: {
      text: 'availibilty diagram'
  },
  navigator :{
    liveRedraw: true,
  },
  yAxis: {
    uniqueNames: true
  },
  series: [{
      name: this.username,
      data: this.chartData
  }]
};  }
  selectUser(user){
    this.selectedUser=user;
  }
filter=date=>{
   var display=true ;
   for (let task of this.tasks){
     if(((Date.parse(task.startDate)-86400000)<= (Date.parse(date)))&&((Date.parse(task.endDate)-86400000)>= (Date.parse(date)))){
        display= false
 }
   }
   return display
}
setTasks(tasks){
  this.tasks=tasks
}
  getUsersDetails(){
    this.userService.getUsers().subscribe((res : any)=>{
      this.users = res.data.getUsers ; 
    })
  }
  addVacation(){
    this.vacationService.createVacation(this.selectedUser,this.dateRange.start,this.dateRange.end).subscribe(()=>{
      this.dateRange=null;
this.getUsersDetails()    })
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
  openProjectList(projects){
    this.userProjects = projects ;
    this.dialogService.open(this.ProjectList);
  }
  openTaskList(user){
this.TaskService.getTasksByUser(user).subscribe(( res : any)=>{
this.userTasks=res.data.getTasksByUser;
this.dialogService.open(this.TasksList)
})
  }
  openProjectDetails(id){
    this.store.dispatch(new SelectProjectAction(id));
  }
  showBadge(tasks,vacations,absences){
    const date = Date.now();
    var show = true ;
    tasks.forEach(element => {
      if(new Date(date)>new Date(element.startDate) && new Date(date)<new Date(element.endDate))
      show=false
    });
return show
  }
}
