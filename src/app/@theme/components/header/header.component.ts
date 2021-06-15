import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import * as io from 'socket.io-client'
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../../../@core/auth/ngrx-auth/appState';
import { Store } from '@ngrx/store';
import { currentUserSelector } from '../../../@core/auth/ngrx-auth/auth.reducers';
import { GetUserAction, SaveUserAction } from '../../../@core/auth/ngrx-auth/auth.actions';
import { NotificationService } from '../../../@core/services/notification.service';
import { LoginService } from '../../../@core/auth/login/login.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  newRole = true;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  newnotif : boolean = false
  png ;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ ];
  subject;
  notifications ; 
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router,
              private notificationService : NotificationService,
              private store : Store<AppState> ,
              private _router: Router,
              private _auth : LoginService) {
  }
 logout(){
  this.subject.emit('deconnect', this.user) 
  localStorage.clear();
  this.router.navigate(['/login'])   }
  ngOnInit() {

    this.currentTheme = this.themeService.currentTheme;
    this.store.dispatch(new GetUserAction)
    this.store.select(currentUserSelector).subscribe((data : any)=>{
      console.log("dataaaaaaa", data)
      this.user=data.user
      this.png="assets/images/"+data.user.image ;
      this.notificationService.getNotificationByUser(data.user.id).subscribe((notifications: any)=>{
      notifications.data.getNotificationByUser.forEach(element => {
        if(!element.seen){
          // this.newnotif=true
        }
      });
    })
    })
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

      this.subject = io("http://localhost:3001");
      this.subject.emit('conection', this.user)
      this.subject.on('notification', data=>{
        this.newnotif  = true
        console.log("bbbb")
        // this.notificationService.getNotificationByUser(this.user.id).subscribe((data: any)=>{
        //   this.notifications = data.data.getNotificationByUser;
        // })
      })
      this.subject.on('roleUpdated',(data)=>{
        this.store.dispatch(new SaveUserAction(this._auth.getUser(data)))
           this.store.select((state)=>state).subscribe((res)=>{
            this.newRole=!this.newRole;           
          });  
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  openNotifications(){
    this.newnotif=false
    this._router.navigate(['/pages/notification/notification' ])
  }
}
