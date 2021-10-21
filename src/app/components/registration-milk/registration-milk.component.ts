import { Component, ElementRef, OnInit } from '@angular/core';
import { Usuario } from '../../shared/models/Usuarios';
import { RestService } from '../../shared/services/rests.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Produccion } from '../../shared/models/ProduccionLeche';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registration-milk',
  templateUrl: './registration-milk.component.html',
  styleUrls: ['./registration-milk.component.css']
})
export class RegistrationMilkComponent implements OnInit {
  isLoadingResults:boolean=false
  usuario:Usuario

  hola=2
  constructor(private elementRef:ElementRef,private http:RestService,private router:Router,private jwt:JwtHelperService) { }

  ngOnInit(): void {
     let token = localStorage.getItem('token')
     this.usuario= this.jwt.decodeToken(token)
  }

  guardarRegistro(produccion:number,consumoCasa:number,consumoTernero:number){
    this.isLoadingResults=true
    let registro:Produccion ={
      idUsuario:this.usuario.idUsuario,
  fechaProduccion: this.formatDate(new Date()),
  totalProduccion:produccion,
  totalConsumidoCasa:consumoCasa,
  totalConsumidoCrias:consumoTernero,
    }
    this.http.insertarProduccion(registro).subscribe(result=>{
      if(result.state==200){
        this.isLoadingResults=false
        Swal.fire({
          title: 'Registro de Produccion',
          text: `El registro del dia ${this.formatDate(new Date())} fue exitoso`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigate(['produccion'])
      }else{
        this.isLoadingResults=false
        Swal.fire({
          title: 'Registro de Produccion',
          text: `El registro del dia ${this.formatDate(new Date())} no se pudo registrar intente mas tarde`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigate(['produccion'])
      }
    })
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }

 formatDate(date):string {
  let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate())

  return formatted_date;
}
}
