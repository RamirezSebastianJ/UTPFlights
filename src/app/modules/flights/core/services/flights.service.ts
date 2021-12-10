import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private readonly url = 'https://airportutp.herokuapp.com';

  constructor(private http: HttpClient) { }

  filtrar(
    origen: string,
    destino: string,
    f_vuelo: string
    ){
    return this.http.post(`${this.url}/auth/buscarvuelo`,
      {
        origen,
        destino,
        f_vuelo
      }
      );
  }
}
