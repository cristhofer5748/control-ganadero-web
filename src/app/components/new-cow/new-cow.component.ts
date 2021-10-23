import { Component, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RegistroAnimal } from '../../shared/models/animaRegister';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../../shared/models/Usuarios';
import { RestService } from '../../shared/services/rests.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-cow',
  templateUrl: './new-cow.component.html',
  styleUrls: ['./new-cow.component.css']
})
export class NewCowComponent implements OnInit {
  public archivos:any[] = []
  isLoadingResults:boolean=false
  img: string=null
  usuario:Usuario

  constructor(private elementRef: ElementRef,private sanitizer:DomSanitizer,
              private router:Router,private jwt:JwtHelperService,
              private http:RestService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    this.usuario =this.jwt.decodeToken(token)

  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }

 capturarFile(event):any{
  const archivoCapturado = event.target.files[0]
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
    this.img = imagen.base;
    console.log(imagen)
  })
  this.archivos.push(archivoCapturado)
 }



extraerBase64 = async ($event:any)=> new Promise((resolve,reject)=>{
   try {
     const unsafeImage = window.URL.createObjectURL($event)
     const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImage)
     const reader = new FileReader();

     reader.readAsDataURL($event);
     reader.onload = ()=>{
       resolve({
         base:reader.result
       });
     };
   } catch (error) {

   }
 })


 guardar(nombre:string,numero:number,fechaNaci:string,raza:string,peso:number,procedencia:string,sexoM:boolean,sexoF:boolean,numPapa:number,numMama:number,produccion:boolean,desarrollo:string){
  this.isLoadingResults=true
  let newAnimal:RegistroAnimal
  if(sexoM==true){
    newAnimal={
      idUsuario:this.usuario.idUsuario,
  pesoAnimal: peso,
  sexo: 'M',
  numPadre: numPapa,
  numMadre: numMama,
  fotoAnimal: this.img,
  numAnimal: numero,
  nombreAnimal: nombre,
  fechaNacimiento: fechaNaci ,
  origen: procedencia,
  razaAnimal: raza ,
  enproduccion: produccion ,
  etapaVida: desarrollo
    }
  }else if(sexoF==true){
    newAnimal={
      idUsuario:this.usuario.idUsuario,
  pesoAnimal: peso,
  sexo: 'F',
  numPadre: numPapa,
  numMadre: numMama,
  fotoAnimal: this.img,
  numAnimal: numero,
  nombreAnimal: nombre,
  fechaNacimiento: fechaNaci ,
  origen: procedencia,
  razaAnimal: raza ,
  enproduccion: produccion ,
  etapaVida: desarrollo
    }
  }else{
    newAnimal={
      idUsuario:this.usuario.idUsuario,
  pesoAnimal: peso,
  sexo: null,
  numPadre: numPapa,
  numMadre: numMama,
  fotoAnimal: this.img,
  numAnimal: numero,
  nombreAnimal: nombre,
  fechaNacimiento: fechaNaci ,
  origen: procedencia,
  razaAnimal: raza ,
  enproduccion: produccion ,
  etapaVida: desarrollo
    }
  }

  this.http.insertarAnimal(newAnimal).subscribe(result=>{
    if(result.state==200){
      this.isLoadingResults=false
        Swal.fire({
          title:'Registro Animal',
          text: 'El animal fue registrado Correctamente',
          icon:'success',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigate(['ganado'])
    }else{
      this.isLoadingResults=false
      Swal.fire({
        title:'Registro Animal',
        text: 'El animal no se pudo registrar intente de nuevo',
        icon:'error',
        confirmButtonText: 'Aceptar'
      })
      this.router.navigate(['ganado'])
    }
  })


 }

 cancelar(){
  this.router.navigate(['ganado'])
 }

}
