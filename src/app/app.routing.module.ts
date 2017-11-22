import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ListComponent } from './modules/shared/list/list.component';

const Routes: Routes = [
  {
    path: '',
    redirectTo: 'top',
    pathMatch: 'full'
  },
  {
    path: ':type',
    component: ListComponent
  }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(
  Routes
);
