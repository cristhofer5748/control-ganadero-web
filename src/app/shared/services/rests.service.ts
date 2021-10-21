
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../models/AuthUsuario';
import { Respuesta, RespuestaAnimales, RespuestaPaises, RespuestaUsuarios, RespuestaReporteInventario, RespuestaReportLeche } from '../models/Respuestas';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { RegistrarUsuario } from '../models/RegistrarUsuario';
import { Produccion } from '../models/ProduccionLeche';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  URL = environment.urlApi;
  constructor(private http:HttpClient) { }


  getListCow(idUser): Observable<RespuestaAnimales>{
    return  this.http.get<RespuestaAnimales>(`${this.URL}/information/user/${idUser}/animals`)
  }

   async getCow(idAnimal):Promise<Observable<RespuestaAnimales>>{
     console.log(this.URL)
    return await this.http.get<RespuestaAnimales>(`${this.URL}/animal/${idAnimal}`);
  }

  obtenerPaises():Observable<RespuestaPaises>{
    return this.http.get<RespuestaPaises>(`${this.URL}/information/paises`);
  }

  obtenerUsuarios():Observable<RespuestaUsuarios>{
    return this.http.get<RespuestaUsuarios>(`${this.URL}/login/usuarios`)
  }

  registrarUsuario(newUsuario:RegistrarUsuario):Observable<Respuesta>{
    return this.http.post<Respuesta>(`${this.URL}/insert/user`,newUsuario);
  }
  reporteAnimales(idUsuario:number):Observable<RespuestaReporteInventario>{
    return this.http.get<RespuestaReporteInventario>(`${this.URL}/information/user/${idUsuario}/reporte-animales`)
  }

  eliminarAnimal(idAnimal:number):Observable<Respuesta>{
    return this.http.delete<Respuesta>(`${this.URL}/animal/${idAnimal}`);
  }

  reporteProduccion(idUsuario:number,initDate:string,endDate:string):Observable<RespuestaReportLeche>{
    if(!endDate){
      return this.http.get<RespuestaReportLeche>(`${this.URL}/information/user/${idUsuario}/report-milk?initDate=${initDate}`)
    }else{
      return this.http.get<RespuestaReportLeche>(`${this.URL}/information/user/${idUsuario}/report-milk?initDate=${initDate}&endDate=${endDate}`)
    }

  }
  insertarProduccion(newProduction:Produccion):Observable<Respuesta>{
    return this.http.post<Respuesta>(`${this.URL}/insert/milkProduction`,newProduction);
  }

}
