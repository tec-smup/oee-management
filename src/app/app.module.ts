import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user/user.service';
import { AuthGuard } from './guards/auth.guard';
import { Routing } from './app.routes';
import { UserComponent } from './components/user/user.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { IconsModule } from './icons.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    UserComponent,    
  ],
  imports: [
    Routing,
    BrowserModule,
    LoginModule,
    IconsModule
  ],
  providers: [UserService, AuthGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
