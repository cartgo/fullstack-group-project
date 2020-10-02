import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { ProjectComponent } from './project/project.component';
//import {PickListModule} from 'primeng/picklist';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { FormsModule } from '@angular/forms';
import { RouterModule , Routes} from "@angular/router";
import { ProfileComponent } from './auth/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ResourceComponent } from './resource/resource.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormulaComponent } from './formula/formula.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProjectComponent,
    ProfileComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    ResourceComponent,
    HeaderComponent,
    SidenavListComponent,
    FormulaComponent
  ],
 imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularDualListBoxModule ,
    BrowserAnimationsModule,
    MaterialModule,
    // PickListModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: './app.component', component: AppComponent },
      ])
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
