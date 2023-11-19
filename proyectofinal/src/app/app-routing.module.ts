import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscuderiasComponent } from './componentes/escuderias/escuderias.component';
import { GanadoresComponent } from './componentes/ganadores/ganadores.component';
import { LoginComponent } from './componentes/login/login.component';
import { PilotosComponent } from './componentes/pilotos/pilotos.component';
import { FantasyComponent } from './componentes/fantasy/fantasy.component';
import { EscuderiaComponent } from './componentes/escuderia/escuderia.component';
import { PilotoComponent } from './componentes/piloto/piloto.component';
import { CircuitosComponent } from './componentes/circuitos/circuitos.component';

const routes: Routes = [
  { path: 'escuderias', component: EscuderiasComponent },
  { path: 'ganadores', component: GanadoresComponent },
  { path: '', component: PilotosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'circuitos', component: CircuitosComponent },
  { path: 'fantasy', component: FantasyComponent },
  { path: 'escuderia/:nombre', component: EscuderiaComponent },
  { path: 'piloto/:nombre', component: PilotoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
