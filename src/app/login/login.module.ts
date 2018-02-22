import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [ HttpModule ],
    declarations: [ LoginComponent ],
    exports: [ LoginComponent ]
})
export class LoginModule { }