import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { CircuitosComponent } from './componentes/circuitos/circuitos.component';
import { PilotosComponent } from './componentes/pilotos/pilotos.component';
import { EscuderiasComponent } from './componentes/escuderias/escuderias.component';
import { GanadoresComponent } from './componentes/ganadores/ganadores.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { FantasyComponent } from './componentes/fantasy/fantasy.component';
import { PilotoComponent } from './componentes/piloto/piloto.component';
import { EscuderiaComponent } from './componentes/escuderia/escuderia.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CircuitosComponent,
    PilotosComponent,
    EscuderiasComponent,
    GanadoresComponent,
    CabeceraComponent,
    FantasyComponent,
    PilotoComponent,
    EscuderiaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
