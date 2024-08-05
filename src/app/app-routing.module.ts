import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authguardGuard } from './guards/authguard.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[authguardGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },

 
  {
    path: 'selecttosend',
    loadChildren: () => import('./selecttosend/selecttosend.module').then( m => m.SelecttosendPageModule),
     canActivate:[authguardGuard]
  },
  {
    path: 'tester',
    loadChildren: () => import('./tester/tester.module').then( m => m.TesterPageModule)
  },
  {
    path: '**',
    component:NotfoundComponent,//always declared at the end
       
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
