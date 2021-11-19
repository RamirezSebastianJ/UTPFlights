import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { response } from "../models/response.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  private readonly url = 'https://airportutp.herokuapp.com/auth';

  constructor(private http: HttpClient){}

  login(email: String, password: String): Observable<response> {
    console.log("Entra");


    return this.http.post<any>(
      `${this.url}/login`, {email: email, password: password}
    );
  }

  register(
    dni: number,
    name: String,
    apellidos: String,
    f_nacimiento: String,
    l_nacimiento: String,
    dir_facturacion: String,
    gener: String,
    email: String,
    password: String,
    password_confirm: String)
    {
    return this.http.post<any>(
      `${this.url}/register`, {
        dni: dni,
        name: name,
        apellidos: apellidos,
        f_nacimiento: f_nacimiento,
        l_nacimiento: l_nacimiento,
        dir_facturacion: dir_facturacion,
        gener: gener,
        email: email,
        password: password,
      }
    );
  }

  registerAdmin(
      dni: number,
      email: String,
      password: String,
  ){
    return this.http.post<any>(
      `${this.url}/regisadmin`, {
        dni: dni,
        email: email,
        password: password,
      }
    );

  }


  completarAdmin(
    dni: String,
    name: String,
    apellidos: String,
    f_nacimiento: String,
    l_nacimiento: String,
    dir_facturacion: String,
    genero: String,
    email: String,
    password: String
  ){
    return this.http.post<any>(
      `${this.url}/completaradmin`, {
        dni: dni,
        name: name,
        apellidos: apellidos,
        f_nacimiento: f_nacimiento,
        l_nacimiento: l_nacimiento,
        dir_facturacion: dir_facturacion,
        genero: genero,
        email: email,
        password: password,
      }
    );
  }

}

