import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  usuario:any;

  constructor(private router: Router){

  }

  getUsuario(){
    if(localStorage.getItem('username')){
      this.usuario=localStorage.getItem('username');
      return false;
    }else{
      return true;
    }
  }

  cerrarSesion(){
    localStorage.removeItem('username');
    this.router.navigateByUrl('/');

  }

}
