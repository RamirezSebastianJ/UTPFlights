import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { convertCompilerOptionsFromJson } from 'typescript';
import { Vuelo } from '../admin/core/model/vuelo.model';
import { RegisterFlightService } from '../admin/core/services/register-flight.service';
import { FlightsService } from './core/services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  form = new FormGroup({
    destino : new FormControl('', [Validators.required]),
    origen : new FormControl('', [Validators.required]),
    fechaVuelo: new FormControl('', [Validators.required]),
  });
  origenNacionales: string[] = [];
  destinoNacionales: string[] = [];
  destinoInternacionales: string[] = [];
  destinos: string[] = [""];
  vuelos: Vuelo[]=[];
  constructor(private flightsService: FlightsService, private registerFlightService: RegisterFlightService) { }

  ngOnInit(): void {
    this.getCities();
  }

  filtrar(){
    console.log("Datos, ", this.form.get('origen')!.value,
    this.form.get('destino')!.value,
    this.form.get('fechaVuelo')!.value);


    this.flightsService.filtrar(
      this.form.get('origen')!.value,
      this.form.get('destino')!.value,
      this.form.get('fechaVuelo')!.value
    ).subscribe((result: any) => {
      this.vuelos = result['vuelos'];
    })
  }

  getCities() {
    this.registerFlightService.getCities().subscribe(
    (result: any) => {
      console.log("Rrepsonse: ", result);
        this.origenNacionales = result['nacionales'];
        this.destinoNacionales = result['nacionales'];
        this.destinoInternacionales = result['internacionales'];
        console.log("Nacionales", this.origenNacionales);
        this.destinos = this.destinos.concat(this.destinoNacionales.concat(this.destinoInternacionales));
      }
    );
  }
}
