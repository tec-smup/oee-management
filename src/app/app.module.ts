import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Routing } from './app.routes';

import { AuthGuard } from './guards/auth.guard';

import { LoginModule } from './components/login/login.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { MachineModule } from './components/machine/machine.module';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
  ],
  imports: [
    Routing,
    BrowserModule,
    LoginModule, 
    DashboardModule,   
    MachineModule
  ],
  providers: [
    UserService, 
    AuthGuard, 
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
