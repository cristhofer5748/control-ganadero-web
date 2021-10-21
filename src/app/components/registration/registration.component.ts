import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../shared/services/rests.service';
import { Paises } from '../../shared/models/Paises';
import Swal from 'sweetalert2';
import { Usuario } from '../../shared/models/Usuarios';
import { RegistrarUsuario } from 'src/app/shared/models/RegistrarUsuario';
import { AuthService } from '../../shared/services/auth.service';
import { AuthUser } from 'src/app/shared/models/AuthUsuario';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  paises:Paises[]=[]
  usuarios:Usuario[]=[]
  constructor(private route:Router, private elementRef: ElementRef,private http:RestService,private login:AuthService) { }

  ngOnInit(): void {
    this.http.obtenerPaises().subscribe(result=>{
      if(result.state==200){
        this.paises=result.data.sort()
      }
    })
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }




  routerLogin(){
    this.route.navigate(['login'])
  }

  registrarse(nombre:string,apellido:string,fechaNacimiento:string,sexoF:boolean,sexoM:boolean,correo:string,contrasena:string,contra2:string,pais:number,numero:number,propietario:boolean,nombrefinca:string){
    console.log(nombre,apellido,fechaNacimiento,sexoF,sexoM,correo,contrasena,contra2,pais,numero,propietario,nombrefinca)
    if(contrasena.toUpperCase()==contra2.toUpperCase()){
     this.http.obtenerUsuarios().subscribe(result=>{
       if(result.state==200){
        this.usuarios = result.data.filter(usuario=>usuario.correo==correo)
        if(this.usuarios.length==0){
         let newUsuario:RegistrarUsuario = {
          nombre:nombre,
          apellido:apellido,
          correo :correo,
          contrasena :contrasena,
          pais:pais,
          telefono :numero,
          tieneFinca : propietario,
          nombreFinca:nombrefinca,
          fechaNacimiento: fechaNacimiento,
          sexo: sexoM==true ?'M': sexoF==true ?'F' : 'N/A'
          };

          this.http.registrarUsuario(newUsuario).subscribe(result=>{
          if(result.state==200){
            let usuario:AuthUser={
              correo:correo,
              contrasena:contrasena
            };
            this.login.singin(usuario).subscribe(res=>{
              console.log(res)
              localStorage.setItem('token',res.data)
              localStorage.setItem('responseLogin',JSON.stringify(res))
              Swal.fire({
                title: 'Usuario Registrado Correctamente',
                text:`Bienvenido a su APP ganadera ${nombre +" "+apellido}` ,
                icon: 'success',
                confirmButtonText:'Aceptar'
              })
              this.route.navigate(['main'])
            })
          }else{
            Swal.fire({
              title: 'Error al registrar',
              text:'No se pudo registrar su perfil por favor intentelo mas tarde',
              icon: 'error',
              confirmButtonText:'Aceptar'
            })
          }
          })

        }else{
          Swal.fire({
            title: 'Error en correo',
            text:'El correo con el que desea entrar ya existe intente con otro.',
            icon: 'error',
            confirmButtonText:'Aceptar'
          })
        }
       }
     })
    }else{
Swal.fire({
  title: 'Error en contraseña',
  text:'Las contraseñas no coinciden intente de nuevo',
  icon: 'error',
  confirmButtonText:'Aceptar'
})
    }
  }
}
