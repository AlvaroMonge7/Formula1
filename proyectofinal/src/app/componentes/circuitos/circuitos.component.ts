import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-circuitos',
  templateUrl: './circuitos.component.html',
  styleUrls: ['./circuitos.component.css'],
})
export class CircuitosComponent {
  circuitos: any[] | undefined;
  circuito:any;
  bsModalRef: any;

  constructor(
    private http: HttpClient,
    ) {}

  ngOnInit() {
    this.http
      .get<any[]>('http://localhost:3000/circuitos')
      .subscribe((datos: any[] | undefined) => {
        this.circuitos = datos;
      });
  }

  minusculaSinEspacios(params:string) {
    let cadena='';
    cadena=params.replace(/\s+/g, '');
    cadena=cadena[0].toLowerCase() + cadena.slice(1);
    return cadena;
  }



}
