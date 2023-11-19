import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EscuderiasService } from 'src/app/servicios/escuderias.service';

@Component({
  selector: 'app-escuderias',
  templateUrl: './escuderias.component.html',
  styleUrls: ['./escuderias.component.css']
})
export class EscuderiasComponent {

  escuderias:any;

  constructor( private escuderiasService:EscuderiasService){
    this.escuderiasService.escuderiasActivas()
    .subscribe((data)=>{
      this.escuderias=data;
      console.log(this.escuderias)
    })
  }

  minusculaSinEspacios(params: string) {
    let cadena = '';
    cadena = params.replace(/\s+/g, '');
    cadena = cadena[0].toLowerCase() + cadena.slice(1);
    return cadena;
  }

}
