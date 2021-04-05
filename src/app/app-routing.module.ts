import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@core/guards/auth.guard';


export const routes: Routes = [
 
    {
      path: 'pages', canActivate:[AuthGuard],
      loadChildren: () => import('./pages/pages.module')
        .then(m => m.PagesModule),
    },
    
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
