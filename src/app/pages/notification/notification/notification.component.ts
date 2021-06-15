import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@core/auth/ngrx-auth/appState';
import { GetUserAction } from '../../../@core/auth/ngrx-auth/auth.actions';
import { currentUserSelector } from '../../../@core/auth/ngrx-auth/auth.reducers';
import { LogsService } from '../../../@core/services/logs.service';
import { NotificationService } from '../../../@core/services/notification.service';

@Component({
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  allNotification;
  logsList
  constructor( private notificationService : NotificationService ,
    private store : Store<AppState>, private logsService : LogsService
    ) { }

  ngOnInit(): void {
    this.logsService.getAllLogs().subscribe((res : any)=>{
      this.logsList=res.data.getAllLogs
    })
    this.store.dispatch(new GetUserAction) ;
    this.store.select(currentUserSelector).subscribe((data : any)=>{
this.notificationService.getNotificationByUser(data.user.id).subscribe((notifications: any)=>{
  this.allNotification=notifications.data.getNotificationByUser
})  })
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
}
