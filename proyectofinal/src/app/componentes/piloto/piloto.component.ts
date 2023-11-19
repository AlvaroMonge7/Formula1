import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PilotosService } from 'src/app/servicios/pilotos.service';

@Component({
  selector: 'app-piloto',
  templateUrl: './piloto.component.html',
  styleUrls: ['./piloto.component.css']
})
export class PilotoComponent {

  piloto:any;

  constructor(
    private pilotosService:PilotosService,
    private router: ActivatedRoute
  ){}

  ngOnInit(): void {
    let apellido=this.router.snapshot.params['nombre'];
      this.pilotosService.pilotosActivos()
      .subscribe(
        (pilotos:any)=>{
          pilotos.forEach((piloto: any)=>{
            if(piloto.apellido==apellido){
              this.piloto=piloto;
            }
          })
        }
      )
  }

  minusculaSinEspacios(params: string): string {
    let cadena = params.replace(/\s+/g, '');
    cadena = cadena.charAt(0).toLowerCase() + cadena.slice(1);
    return cadena;
  }


}
