import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PilotosService } from 'src/app/servicios/pilotos.service';

@Component({
  selector: 'app-ganadores',
  templateUrl: './ganadores.component.html',
  styleUrls: ['./ganadores.component.css'],
})
export class GanadoresComponent {
  ganadores: any[] | undefined;
  mundialess:any;

  constructor(private pilotosServicio:PilotosService) {}

  ngOnInit() {
    this.pilotosServicio.ganadores().subscribe((datos)=>{
      this.ganadores=datos;
    })
  }

  minusculaSinEspacios(params: string) {
    let cadena = '';
    cadena = params.replace(/\s+/g, '');
    cadena = cadena[0].toLowerCase() + cadena.slice(1);
    return cadena;
  }

  mundiales(params: string) {
    this.mundialess=params.split(',');
  }
}
