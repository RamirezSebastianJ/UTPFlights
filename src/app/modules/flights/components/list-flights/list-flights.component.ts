import { Component, Input, OnInit } from '@angular/core';
import { Vuelo } from 'src/app/modules/admin/core/model/vuelo.model';
import { RegisterFlightService } from 'src/app/modules/admin/core/services/register-flight.service';

@Component({
  selector: 'app-list-flights',
  templateUrl: './list-flights.component.html',
  styleUrls: ['./list-flights.component.scss']
})
export class ListFlightsComponent implements OnInit {
  @Input () listaVuelos: Vuelo[] = [];

  constructor(private registerFlightService: RegisterFlightService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.registerFlightService.listarVuelo().subscribe(
      (result: any)=>{
        this.listaVuelos = result['vuelos'];
        console.log("Vuelos:  ",this.listaVuelos);
      }
    )
  }

  setImage(city: string):string{
    console.log("Ciudad", city);
    if(city==="Pereira"){
      return "../../../../../assets/pereira.jpeg";
    }
    if(city==="Bogotá"){
      return "../../../../../assets/bogota.jpeg";
    }
    if(city==="Medellín"){
      return "../../../../../assets/medellin.jpeg";
    }
    if(city==="Cali"){
      return "../../../../../assets/cali.jpeg";
    }
    if(city==="Cartagena"){
      return "../../../../../assets/cartagena.jpeg";
    }
    if(city==="Madrid"){
      return "../../../../../assets/madrid.jpeg";
    }
    if(city==="Londres"){
      return "../../../../../assets/londres.jpeg";
    }
    if(city==="New York"){
      return "../../../../../assets/new_york.jpeg";
    }
    if(city==="Buenos Aires"){
      return "../../../../../assets/buenos_aires.jpeg";
    }
    return "";
  }
}
