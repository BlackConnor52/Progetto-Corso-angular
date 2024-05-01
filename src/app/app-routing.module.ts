import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUtentiComponent } from './form-utenti/form-utenti.component';
import { RouteGuardService } from './can-load.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'form',component:FormUtentiComponent},
  {path:'lista', loadChildren: () => import('../app/lista-utenti/lista-utenti.module').then(nomeModulo=>nomeModulo.ListUtentiModule),
  canLoad :[RouteGuardService],canActivate:[RouteGuardService]},
  {path:'login',component:LoginComponent},
  {path:'statistiche', loadChildren: () => import('../app/statistics/statistics.module').then(nomeModulo=>nomeModulo.StatisticsModule),
  canLoad :[RouteGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
