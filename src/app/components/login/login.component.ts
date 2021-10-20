import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AuthUser } from '../../shared/models/AuthUsuario';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../../shared/models/Usuarios';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private usuario:Usuario
  constructor(private authService:AuthService,
              private router:Router,
              private jwt:JwtHelperService,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }

  logIn(correo:string,contrasena:string){
    let usuario:AuthUser={
      correo:correo,
      contrasena:contrasena
    };

    this.authService.singin(usuario).subscribe(res=>{
       console.log(res)
       localStorage.setItem('token',res.data)
       localStorage.setItem('responseLogin',JSON.stringify(res))
       this.router.navigate(['main'])
       this.usuario = this.jwt.decodeToken(res.data)
       Swal.fire({
        title: 'Bienvenido a su APP ganadera!',
        text: this.usuario.nombre +" "+this.usuario.apellido,
        icon: 'success',
        confirmButtonText: 'Aceptar'
       }
      )
    })
  }

  routerRegistro(){
    this.router.navigate(['registro'])
  }
}
