import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { Routing } from './app.routes';

import { AuthGuard } from './guards/auth.guard';

import { LoginModule } from './components/login/login.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { MachineModule } from './components/machine/machine.module';
import { ChannelModule } from './components/channel/channel.module';
import { GraphPauseModule } from './components/graph.pause/graph.pause.module';
import { UserModule } from './components/user/user.module';
import { MachineProductionModule } from './components/machine.production/machine.production.module';
import {ToastModule} from 'ng2-toastr';

import { BaseComponent } from './components/base.component';
import { AppComponent } from './app.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [
    BaseComponent,
    AppComponent,
  ],
  imports: [
    Routing,
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule, 
    DashboardModule,   
    ChannelModule,
    MachineModule,
    GraphPauseModule,
    UserModule,
    MachineProductionModule,
    ToastModule.forRoot()
  ],
  providers: [
    UserService, 
    AuthGuard, 
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
