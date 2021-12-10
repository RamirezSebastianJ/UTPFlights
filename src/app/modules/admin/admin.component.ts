import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vuelo } from './core/model/vuelo.model';
import { RegisterFlightService } from './core/services/register-flight.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  [x: string]: any;
  formattedAmount = "";
  amount = "";
  selected = 1;
  classFlight = ["dropdown-item"];
  classEditFlight = ["dropdown-item"];
  classCancelFlight = ["dropdown-item"];
  classEditPerfil = ["dropdown-item"];
  origenNacionales: string[] = [];
  destinoNacionales: string[] = [];
  destinoInternacionales: string[] = [];
  internacional = "no";
  origenSeleccionado = "";
  destinoSeleccionado = "";
  destinos: string[] = [];
  listaVuelos: Vuelo[] = [];
  form = new FormGroup({
    id : new FormControl('', []),
    internacional : new FormControl('', [Validators.required]),
    destino : new FormControl('', [Validators.required]),
    origen : new FormControl('', [Validators.required]),
    fechaVuelo: new FormControl('', [Validators.required]),
    horaVuelo: new FormControl('', [Validators.required]),
    tiempoDeVuelo: new FormControl('', [Validators.required]),
    valorTicket: new FormControl('', [Validators.required]),

  });
  closeResult = '';


  constructor(private registerFlightService: RegisterFlightService, private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.menuSelected(1);
    this.getCities();
    this.listar();
  }


  transformAmount(element: any){
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '$');
    element.target.value = this.formattedAmount;
  }

  menuSelected(selected: number){
    console.log('menuSelected', selected);
    this.selected = selected;
    this.form.reset();
    this.listar();
    switch(selected){
      case 1:
        this.classFlight = ["dropdown-item", "active"];
        this.classEditFlight = ["dropdown-item"];
        this.classCancelFlight = ["dropdown-item"];
        this.classEditPerfil = ["dropdown-item"];
        break;
      case 2:
        this.classFlight = ["dropdown-item"];
        this.classEditFlight = ["dropdown-item", "active"];
        this.classCancelFlight = ["dropdown-item"];
        this.classEditPerfil = ["dropdown-item"];
        break;
      case 3:
        this.classFlight = ["dropdown-item"];
        this.classEditFlight = ["dropdown-item"];
        this.classCancelFlight = ["dropdown-item", "active"];
        this.classEditPerfil = ["dropdown-item"];
        break;
      case 4:
          this.classFlight = ["dropdown-item"];
          this.classEditFlight = ["dropdown-item"];
          this.classCancelFlight = ["dropdown-item"];
          this.classEditPerfil = ["dropdown-item", "active"];
        break;
    }

  }

  getCities() {
    this.registerFlightService.getCities().subscribe(
    (result: any) => {
      console.log("Rrepsonse: ", result);
        this.origenNacionales = result['nacionales'];
        this.destinoNacionales = result['nacionales'];
        this.destinoInternacionales = result['internacionales'];
        console.log("Nacionales", this.origenNacionales);
      }
    );
  }

  setDestinosNacionales(){
    this.internacional = this.form.get('internacional')!.value;
    console.log("Internacional,", this.internacional);
    if(this.internacional === "No"){
      this.destinos = [];
      this.origenNacionales.forEach(city => {
        if(city!==this.form.get('origen')!.value){
          this.destinos.push(city);
        }
      })
    }else{
      this.destinos = this.destinoInternacionales;
    }

    console.log("Destinos", this.destinos);
  }


  setInternacional(internacional: string){
    console.log("Internacional", internacional);
    this.internacional = internacional;
    this.destinos = [];

  }

  registrarVuelo(){
    console.log("FORMULARIOP", this.form);
    if(this.form.valid){
      let vuelo: Vuelo = new Vuelo();
      vuelo.origen = this.form.get('origen')!.value;
      vuelo.destino = this.form.get('destino')!.value;
      vuelo.f_vuelo = this.form.get('fechaVuelo')!.value;
      vuelo.h_vuelo = this.form.get('horaVuelo')!.value;
      vuelo.t_vuelo = this.form.get('tiempoDeVuelo')!.value;
      vuelo.tipo_vuelo = this.form.get('internacional')!.value=="Si"?"1":"0" ;
      vuelo.valor_tiquete = this.form.get('valorTicket')!.value;
      vuelo.img_vuelo ="JUDA nO FUE CAPAZ";
      console.log("VIUELO A CREAR", vuelo);
      this.registerFlightService.programarVuelo(vuelo).subscribe((result: any) => {
        if(result["status"]==200){
          alert("Vuelo guardado con exito");
          this.form.reset();
        }else{
          alert("El vuelo no pudo ser creado");
        }
      })
    }else{
      alert("LLENE EL PUTO FORMULARIO");
    }
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

  cancelarVuelo(id: string){
    this.registerFlightService.cancelarVuelo(id).subscribe(
      (result: any) => {
        alert(result['message']);
        this.listar();
      }
    );
  }

  open(content: any, vuelo: Vuelo) {
    this.setFormEdit(vuelo);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  setFormEdit(vuelo: Vuelo){
    console.log("Vuelo", vuelo );
    this.form.controls['internacional'].setValue(vuelo.tipo_vuelo=="1"?"Si":"No");
    this.form.controls['id'].setValue(vuelo.id_vuelo);
    this.form.controls['origen'].setValue(vuelo.origen);
    this.form.controls['destino'].setValue(vuelo.destino);
    this.form.controls['fechaVuelo'].setValue(vuelo.f_vuelo);
    this.form.controls['horaVuelo'].setValue(vuelo.h_vuelo);
    this.form.controls['tiempoDeVuelo'].setValue(vuelo.t_vuelo);
    this.form.controls['valorTicket'].setValue(vuelo.valor_tiquete);
  }

  ediatrVuelo(){
    console.log("FORMULARIOP", this.form);
    if(this.form.valid){
      let vuelo: Vuelo = new Vuelo();
      vuelo.id_vuelo = this.form.get('id')!.value;
      vuelo.origen = this.form.get('origen')!.value;
      vuelo.destino = this.form.get('destino')!.value;
      vuelo.f_vuelo = this.form.get('fechaVuelo')!.value;
      vuelo.h_vuelo = this.form.get('horaVuelo')!.value;
      vuelo.t_vuelo = this.form.get('tiempoDeVuelo')!.value;
      vuelo.tipo_vuelo = this.form.get('internacional')!.value=="Si"?"1":"0" ;
      vuelo.valor_tiquete = this.form.get('valorTicket')!.value;
      vuelo.img_vuelo ="JUDA nO FUE CAPAZ";
      console.log("VIUELO A CREAR", vuelo);
      this.registerFlightService.editarVuelo(vuelo).subscribe((result: any) => {
        if(result["status"]==200){
          alert("Vuelo guardado con exito");
          this.form.reset();
        }else{
          alert("El vuelo no pudo ser creado");
        }
        this.listar();
      })
    }else{
      alert("LLENE EL FORMULARIO");
    }

  }

}
