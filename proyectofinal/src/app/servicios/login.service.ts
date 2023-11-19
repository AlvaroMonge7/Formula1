import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  //funcion para iniciar sesion en la página
  login(usuario: string, contrasena: string): Observable<any> {
    const loginUrl = 'http://localhost:3000/login';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const credentials = {
      usuario: usuario,
      contrasena: contrasena
    };
    return this.http.post<any>(loginUrl, credentials, httpOptions);
  }

  //funcion para registrarte en la página
  registroUsuario(usuario2:string, correo:string, contrasena2:string){
    const registrarUrl = 'http://localhost:3000/registrar';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const credentials = {
      usuario: usuario2,
      correo: correo,
      contrasena: contrasena2
    };
    return this.http.post<any>(registrarUrl, credentials, httpOptions);
  }
}
