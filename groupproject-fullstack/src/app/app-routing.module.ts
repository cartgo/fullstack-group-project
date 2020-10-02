import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './auth/profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { ResourceComponent } from '../app/resource/resource.component';
import { SearchboxComponent } from './searchbox/searchbox.component';
import { FormulaComponent } from './formula/formula.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'resource', component: ResourceComponent },
  { path: 'search', component: SearchboxComponent ,children:[
    {path:'project',component:ProjectComponent,runGuardsAndResolvers: 'paramsChange'},
    { path:'formula', component: FormulaComponent }]}
  

]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),CommonModule

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
