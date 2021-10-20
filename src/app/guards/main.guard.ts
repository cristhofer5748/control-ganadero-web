import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import Swal from 'sweetalert2'
import { Respuesta } from '../shared/models/Respuestas';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(private authService:AuthService,
              private router:Router ){

  }

  canActivate():boolean{
    let infoToken:Respuesta =JSON.parse(localStorage.getItem('responseLogin'));
    if(!this.authService.isAuth()){
      Swal.fire({
        title: 'Error!',
        text: infoToken.data,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      console.log('Token Invalido o ya expiro')
      this.router.navigate(['login'])
      return false
    }
        return true;
  }

}
