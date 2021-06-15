import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/projectDetails.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: 'project',
    component: ProjectComponent,
  }, 
  {
    path: 'project-details',
    component: ProjectDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
