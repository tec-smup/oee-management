import { NgModule } from '@angular/core';
import { 
  IconPlusCircle, 
  IconEye, 
  IconTrash2, 
  IconDatabase, 
  IconHelpCircle,
  IconPauseCircle,
  IconHome,
  IconCrosshair } from 'angular-feather';

const icons = [
    IconPlusCircle, 
    IconEye, 
    IconTrash2, 
    IconDatabase, 
    IconHelpCircle,
    IconPauseCircle,
    IconHome,
    IconCrosshair
  ];

  @NgModule({
    exports: icons
  })
  export class IconsModule { }