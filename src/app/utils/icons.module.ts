import { NgModule } from '@angular/core';
import { 
  IconPlusCircle, 
  IconEye, 
  IconTrash2, 
  IconDatabase, 
  IconHelpCircle,
  IconPauseCircle,
  IconHome } from 'angular-feather';

const icons = [
    IconPlusCircle, 
    IconEye, 
    IconTrash2, 
    IconDatabase, 
    IconHelpCircle,
    IconPauseCircle,
    IconHome
  ];

  @NgModule({
    exports: icons
  })
  export class IconsModule { }