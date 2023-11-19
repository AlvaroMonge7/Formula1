import { Component } from '@angular/core';
import { PilotosService } from 'src/app/servicios/pilotos.service';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.css']
})
export class PilotosComponent {

  pilotos: any[] | undefined;

  constructor(private pilotosService:PilotosService) {}

  ngOnInit() {
    this.pilotosService.pilotosActivos()
    .subscribe((datos)=>{
      this.pilotos = datos;
    })
  }

  minusculaSinEspacios(params: string) {
    let cadena = '';
    cadena = params.replace(/\s+/g, '');
    cadena = cadena[0].toLowerCase() + cadena.slice(1);
    return cadena;
  }

}
