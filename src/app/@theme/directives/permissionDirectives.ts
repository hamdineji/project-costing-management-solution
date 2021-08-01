
import { Input, OnInit, Directive, ViewContainerRef, TemplateRef, OnDestroy, OnChanges, AfterContentInit, DoCheck, SimpleChanges } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import{RoleService} from "../../@core/services/role.service";
import{PermissionService} from "../../@core/services/permissions.service";
import { AppState } from "../../@core/auth/ngrx-auth/appState";
import { Store } from "@ngrx/store";
import { currentUserSelector } from "../../@core/auth/ngrx-auth/auth.reducers";
import { GetUserAction } from "../../@core/auth/ngrx-auth/auth.actions";
@Directive({
  selector: '[ifPermission]'
})
export class IfPermissionDirective implements OnInit ,OnChanges {
  // the role the user must have
  @Input() public ifPermission: Array<string>;
  @Input() 
  newRoleEvent : boolean
  /**
   * @param {ViewContainerRef} viewContainerRef -- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private permissionService : PermissionService,
    private store : Store<AppState>
  ) {}

  public ngOnInit(): void {      
      }
    
      ngOnChanges(){
      this.store.dispatch(new GetUserAction)
      this.store.select(currentUserSelector).subscribe((data : any)=>{
        var permissions   = data.permissions
          if(permissions.findIndex(x=>x.name==this.ifPermission[0])!=-1){
            console.log("founded")
            this.viewContainerRef.createEmbeddedView(this.templateRef);
          }
          else{
            console.log("not Founded")
            this.viewContainerRef.clear()
          }
        });  
    }
    }


