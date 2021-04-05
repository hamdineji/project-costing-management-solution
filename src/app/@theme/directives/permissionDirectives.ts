
import { Input, OnInit, Directive, ViewContainerRef, TemplateRef, OnDestroy } from "@angular/core";
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
export class IfPermissionDirective implements OnInit {
  // the role the user must have
  @Input() public ifPermission: Array<string>;

  /**
   * @param {ViewContainerRef} viewContainerRef -- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private roleService: RoleService,
    private permissionService : PermissionService,
    private store : Store<AppState>
  ) {}

  public ngOnInit(): void {
        this.store.dispatch(new GetUserAction)
        this.store.select(currentUserSelector).subscribe((data : any)=>{

         let permissions=data.permissions ;
         console.log("permisssssion",permissions)
          permissions.forEach(val => {this.permissionService.getPermissionById(val).subscribe((data:any)=>{
            console.log("data.name",data.data.getPermissionById.name);
            console.log(this.ifPermission[0])
            if(data.data.getPermissionById.name===this.ifPermission[0]){

              this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
          });
          
         
        

        }) 
        
       
        })

}

  /**
   * on destroy cancels the API if its fetching.
   */
}
