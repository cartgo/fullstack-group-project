import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProjectComponent } from './project/project.component';
//import {PickListModule} from 'primeng/picklist';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './auth/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
//import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ResourceComponent } from './resource/resource.component';
import { AppRoutingModule } from './app-routing.module';
import { AddresourceComponent } from './addresource/addresource.component';

// import {PickListModule} from 'primeng/picklist';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,

    NavBarComponent,
    SideBarComponent,
    ProjectComponent,
    ProfileComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    ResourceComponent,
    AddresourceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularDualListBoxModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    // PickListModule,
    MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatInput,

    RouterModule.forRoot([
      { path: './app.component', component: AppComponent },
    ]),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
