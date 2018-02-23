import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@NgModule({
    imports: [ HttpModule ],
    declarations: [ LoginComponent ],
    exports: [ LoginComponent ]
})
export class LoginModule { }