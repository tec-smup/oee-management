import { NgModule } from '@angular/core';
import { 
  IconPlusCircle, 
  IconEye, 
  IconTrash2, 
  IconDatabase, 
  IconHelpCircle,
  IconPauseCircle,
  IconHome,
  IconCrosshair,
  IconTrendingUp,
  IconUser,
  IconAlertCircle } from 'angular-feather';

const icons = [
    IconPlusCircle, 
    IconEye, 
    IconTrash2, 
    IconDatabase, 
    IconHelpCircle,
    IconPauseCircle,
    IconHome,
    IconCrosshair,
    IconTrendingUp,
    IconUser,
    IconAlertCircle
  ];

  @NgModule({
    exports: icons
  })
  export class IconsModule { }