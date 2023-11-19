import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EscuderiasService } from 'src/app/servicios/escuderias.service';
import { PilotosService } from 'src/app/servicios/pilotos.service';

@Component({
  selector: 'app-escuderia',
  templateUrl: './escuderia.component.html',
  styleUrls: ['./escuderia.component.css']
})
export class EscuderiaComponent {

  pilotosAll: any;
  pilotos: any[] = [];
  escuderia: any;
  escuderiaNombre = this.router.snapshot.params['nombre'];
  constructor(
    private pilotosService: PilotosService,
    private router: ActivatedRoute,
    private escuderiaService: EscuderiasService,
  ) {

    this.pilotosService.pilotosActivos().subscribe((data: any) => {
      this.pilotosAll = data;
      this.pilotosAll.forEach((element: any) => {
        if (element.Nombre_escuderia == this.escuderiaNombre) {
          this.pilotos.push(element);
        }
      });
    });

    this.escuderiaService.escuderiasActivas().subscribe(data => {
      let escuderias = data;
      escuderias.forEach(escuderia => {
        if (escuderia.Nombre_escuderia == this.escuderiaNombre) {
          this.escuderia = escuderia;
        }
      });
    });
  }

  minusculaSinEspacios(params: string) {
    let cadena = '';
    cadena = params.replace(/\s+/g, '');
    cadena = cadena[0].toLowerCase() + cadena.slice(1);
    return cadena;
  }
}
