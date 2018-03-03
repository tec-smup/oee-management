import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [ HttpModule, FormsModule ],
    declarations: [ LoginComponent ],
    exports: [ LoginComponent ]
})
export class LoginModule { }