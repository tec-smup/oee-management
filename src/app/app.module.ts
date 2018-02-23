import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { AuthGuardGuard } from './auth-guard.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardGuard],
    component: DashboardComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,    
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,  
    LoginModule      
  ],
  providers: [UserService, AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
