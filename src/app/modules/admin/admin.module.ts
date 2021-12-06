import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RootRoutingModule } from '../root/root-routing.module';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RootRoutingModule,
  ]
})
export class AdminModule { }
