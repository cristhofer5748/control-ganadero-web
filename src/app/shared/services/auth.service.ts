import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../models/AuthUsuario';
import { Respuesta, RespuestaAnimales } from '../models/Respuestas';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private URL =environment.urlApi
  constructor(private http:HttpClient,
              private jwtHelper:JwtHelperService) { }


  singin(user:AuthUser){
    return this.http.post<Respuesta>(`${this.URL}/login/singin`,user)
  }

  getListCow(idUser){
    return this.http.get<RespuestaAnimales>(`${this.URL}/information/user/${idUser}/animals`)
  }

  isAuth():boolean{
    const token = localStorage.getItem('token')
    const infoToken:Respuesta = JSON.parse(localStorage.getItem('responseLogin'))
    if(infoToken.state!==200){
      return false
    }
      if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){

        return false
      }

    return true;
  }
}
