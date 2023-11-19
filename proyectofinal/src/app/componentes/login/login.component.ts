import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
declare const swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  comprobador = /^.{3,}@.{3,}\.(com|es)$/;
  usuario:any ='' ;
  contrasena:any='';

  usuario2:any ='';
  correo:any ='';
  contrasena2:any ='';


  message='';

  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.router.navigateByUrl('/');
    }
  }

  constructor(
    private logInService: LoginService,
    private router: Router
    ){}

  loginUsuario(){
    this.logInService.login(this.usuario, this.contrasena).subscribe(
      data => {
        if(data.success){
          localStorage.setItem('username', data.usuario);
          localStorage.setItem('administrador', data.administrador);
          localStorage.setItem('idUsuario', data.idUsuario);
          this.router.navigateByUrl('/');
        }else{
          swal('',data.message,'error')
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  registroUsuario(){
    if (!this.comprobador.test(this.correo)) {
      swal('','El correo no es valido','error')
    }else{
      this.logInService.registroUsuario(this.usuario2, this.correo, this.contrasena2)
      .subscribe(data=>{

      })
    }


  }

}

