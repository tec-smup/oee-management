import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routing } from '../../app.routes';
import { IconsModule } from '../../utils/icons.module';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { OEEBadgeComponent } from './oeeBadge/oee.badge.component';

@NgModule({
  imports: [
    CommonModule,
    Routing,
    IconsModule,
  ],
  declarations: [ 
    MenuComponent,
    NavComponent,    
    OEEBadgeComponent
  ],
  exports: [
    MenuComponent,
    NavComponent,
    OEEBadgeComponent
  ]
})
export class SharedModule { }
