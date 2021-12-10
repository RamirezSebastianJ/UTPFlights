import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vuelo } from '../model/vuelo.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterFlightService {

  private readonly url = 'https://airportutp.herokuapp.com';

  constructor(private http: HttpClient) { }

  getCities(){
    return this.http.get(`${this.url}/ciudades`);
  }

  programarVuelo(vuelo: Vuelo){
    return this.http.post(`${this.url}/auth/programarvuelo`,vuelo
    );
  }

  listarVuelo(){
    return this.http.get(`${this.url}/listarvuelo`);
  }

  cancelarVuelo(id: string){
    return this.http.post(`${this.url}/auth/eliminarvuelo`,
    {
      id_vuelo: id
    }
    );
  }

  editarVuelo(vuelo: Vuelo){
    return this.http.post(`${this.url}/auth/editarvuelo`,vuelo
    );
  }

}
