import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routing } from '../../app.routes';
import { IconsModule } from '../../utils/icons.module';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    Routing,
    IconsModule,
  ],
  declarations: [ 
    MenuComponent,
    NavComponent,    
  ],
  exports: [
    MenuComponent,
    NavComponent,
  ]
})
export class SharedModule { }
