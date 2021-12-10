import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RootRoutingModule } from '../root/root-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RootRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
