import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { ListFlightsComponent } from './components/list-flights/list-flights.component';



@NgModule({
  declarations: [
    FlightsComponent,
    ListFlightsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FlightsComponent
  ]
})
export class FlightsModule { }
