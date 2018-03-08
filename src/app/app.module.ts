import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginModule } from './components/login/login.module';
import { MachineModule } from './components/machine/machine.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './guards/auth.guard';
import { Routing } from './app.routes';
import { UserComponent } from './components/user/user.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { IconsModule } from './utils/icons.module';
import { MenuComponent } from './components/menu/menu.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    MenuComponent,
    NavComponent,    
  ],
  imports: [
    Routing,
    BrowserModule,
    LoginModule,
    IconsModule,
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
