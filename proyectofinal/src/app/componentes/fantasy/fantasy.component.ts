import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarerasService } from 'src/app/servicios/careras.service';
import { EscuderiasService } from 'src/app/servicios/escuderias.service';
import { PilotosService } from 'src/app/servicios/pilotos.service';

@Component({
  selector: 'app-fantasy',
  templateUrl: './fantasy.component.html',
  styleUrls: ['./fantasy.component.css'],
})
export class FantasyComponent implements OnInit {
  puntosFantasy: any;
  resultados: any;
  pilotosFantasy: any[] = [];
  pilotosActivos: any[] = [];
  escuderiasActivas: any[] = [];
  escuderiasFantasy: any[] = [];
  idUsuario = localStorage.getItem('idUsuario') ?? '';

  constructor(
    private fantasyService: CarerasService,
    private pilotos: PilotosService,
    private escuderias: EscuderiasService,
    private router: Router
  ) {}

  ngOnInit() {
    const idUsuario = localStorage.getItem('username');
    if (!idUsuario) {
      this.router.navigateByUrl('/');
    } else {
      this.initializeFantasy();
    }
  }

  initializeFantasy() {
    this.fantasyService
      .puntosFantasy(parseInt(this.idUsuario))
      .subscribe(
        (data: any) => {
          this.puntosFantasy = data.puntos;
        },
        (error) => {
          console.log(error);
        }
      );

    this.fantasyService.obtenerResultados().subscribe((data) => {
      this.resultados = data;
    });

    this.fantasyService
      .pilotosFantasy(parseInt(this.idUsuario))
      .subscribe((data) => {
        this.pilotosFantasy = data;
      });

    this.fantasyService
      .escuderiasFantasy(parseInt(this.idUsuario))
      .subscribe((data) => {
        this.escuderiasFantasy = data;
      });

    this.pilotos.pilotosActivos().subscribe((data) => {
      this.pilotosActivos = data;
    });

    this.escuderias.escuderiasActivas().subscribe((data) => {
      this.escuderiasActivas = data;
    });
  }

  comprobarPiloto(apellido: string) {
    return this.pilotosFantasy.some((element: any) => {
      return element && apellido === element.apellido;
    });
  }

  comprobarEscuderia(Nombre_escuderia: string) {
    return this.escuderiasFantasy.some((element: any) => {
      return element && Nombre_escuderia === element.Nombre_escuderia;
    });
  }

  comprobarString(cadena: string) {
    return typeof cadena === 'string' && cadena.length <= 50;
  }

  mostrarPilotosFantasy(): any[] {
    let pilotos: any[] = [];
    this.pilotosActivos.forEach((piloto: { apellido?: string }) => {
      if (piloto.apellido && this.comprobarPiloto(piloto.apellido)) {
        pilotos.push(piloto);
      }
    });
    return pilotos;
  }

  anadirPiloto(apellido: string) {
    if (this.pilotosFantasy.length < 5) {
      this.pilotosFantasy.push({ apellido: apellido });
    }
  }

  eliminarPiloto(apellido: string) {
    const indice = this.pilotosFantasy.findIndex(
      (piloto: any) => piloto.apellido === apellido
    );
    if (indice !== -1) {
      this.pilotosFantasy.splice(indice, 1);
    }
  }

  anadirEscuderia(Nombre_escuderia: string) {
    if (this.escuderiasFantasy.length < 2) {
      this.escuderiasFantasy.push({ Nombre_escuderia: Nombre_escuderia });
    }
  }

  eliminarEscuderia(Nombre_escuderia: string) {
    const indice = this.escuderiasFantasy.findIndex(
      (escuderia: any) => escuderia.Nombre_escuderia === Nombre_escuderia
    );
    if (indice !== -1) {
      this.escuderiasFantasy.splice(indice, 1);
    }
  }

  actualizar() {
     this.fantasyService.insertarFantasy(
      this.pilotosFantasy,
      this.escuderiasFantasy,
      parseInt(this.idUsuario)
    ).subscribe((result) => {
      console.log(result);

    })
  }

  minusculaSinEspacios(params: string) {
    let cadena = '';
    cadena = params.replace(/\s+/g, '');
    cadena = cadena[0].toLowerCase() + cadena.slice(1);
    return cadena;
  }
}
