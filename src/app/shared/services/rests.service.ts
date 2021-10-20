
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../models/AuthUsuario';
import { Respuesta, RespuestaAnimales } from '../models/Respuestas';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

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

}
