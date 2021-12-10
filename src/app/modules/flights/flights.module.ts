import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { ListFlightsComponent } from './components/list-flights/list-flights.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { RootRoutingModule } from '../root/root-routing.module';



@NgModule({
  declarations: [
    FlightsComponent,
    ListFlightsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RootRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FlightsComponent
  ]
})
export class FlightsModule { }
