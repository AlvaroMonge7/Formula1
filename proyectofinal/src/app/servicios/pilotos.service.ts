import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PilotosService {

  constructor( private http:HttpClient) {}

  //funcion para devolver los pilotos que han ganado algun minual de la Fórmula 1
  ganadores(){
    return this.http.get<any[]>('http://localhost:3000/ganadores');
  }

  //funcion para devolver los pilotos actuales de Fórmula 1
  pilotosActivos(){
    return this.http.get<any[]>('http://localhost:3000/pilotosActivos');
  }
}
