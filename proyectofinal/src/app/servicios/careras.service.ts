import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarerasService {

  private apiUrl = 'http://ergast.com/api/f1/current/last/results';

  constructor(private http: HttpClient) { }

  //hace la peticion a la api de los resultados de la ultima carrera
  public obtenerResultados() {
    return this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
      map((res: string) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(res, 'text/xml');
        const resultados = xml.querySelectorAll('Result');

        return resultados;
      })
    );
  }

  //devuelve pilotos del fantasy del usuario
  public pilotosFantasy(id:number){
    return this.http.get<any>(`http://localhost:3000/pilotosFantasy/${id}`);
  }

  //devuelve escuderias del fantasy del usuario
  public escuderiasFantasy(id:number){
    return this.http.get<any>(`http://localhost:3000/escuderiasFantasy/${id}`);
  }

  //devuelve los puntos del fantasy del usuario
  puntosFantasy(id: number) {
    const url = `http://localhost:3000/puntosFantasy/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(url, httpOptions);
  }

  //funcion para cambiar los pilotos y escuderias del fantasy
  insertarFantasy(pilotos: any[], escuderias: any[], id:number): Observable<any> {
    const url = `http://localhost:3000/fantasy/${id}`;
    const credentials = { pilotos: pilotos, escuderias: escuderias };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, credentials, httpOptions);
  }


}
