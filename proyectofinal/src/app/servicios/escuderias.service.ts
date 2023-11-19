import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EscuderiasService {

  constructor(private http:HttpClient) { }

  //devuelve las escuderias actuales de la Fórmula 1
  escuderiasActivas(){
    return this.http.get<any[]>('http://localhost:3000/escuderias')
  }

}
