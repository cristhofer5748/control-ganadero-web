import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ActualizarAnimal, Animal } from '../../shared/models/animaRegister';
import { RestService } from '../../shared/services/rests.service';
import { Usuario } from '../../shared/models/Usuarios';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-editar-animal',
  templateUrl: './editar-animal.component.html',
  styleUrls: ['./editar-animal.component.css']
})
export class EditarAnimalComponent implements OnInit {
  public archivos:any[] = []
  constructor(private elementRef: ElementRef,private sanitizer:DomSanitizer,private router:Router,private actRouter:ActivatedRoute,
              private http:RestService,private jwt:JwtHelperService) { }
  img: string
  idAnimal:number
  animal:Animal
  usuario:Usuario
  isLoadingResults:boolean=false
  ngOnInit(): void {

    this.isLoadingResults=true
    let token = localStorage.getItem('token')
    this.usuario =this.jwt.decodeToken(token)

    this.idAnimal = this.actRouter.snapshot.params.id
    this.http.getCow(this.idAnimal).subscribe(result=>{
      if(result.state==200){
        this.animal=result.data[0]
        this.img= this.animal.fotoAnimal
        console.log(this.animal)
      }
      this.isLoadingResults=false
    })
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


 guardar(nombre:string,numero:number,fechaNaci:string,raza:string,peso:number,procedencia:string,numPapa:number,numMama:number,produccion:boolean,desarrollo:string){
  this.isLoadingResults=true
  let newAnimal:ActualizarAnimal={
      idAnimal: +this.idAnimal,
      idUsuario: this.usuario.idUsuario,
      pesoAnimal:peso,
      numPadre:numPapa,
      numMadre:numMama,
      fotoAnimal: this.img,
      numAnimal:numero,
      nombreAnimal:nombre,
      fechaNacimiento: fechaNaci,
      origen:procedencia,
      razaAnimal: raza,
      enproduccion: produccion,
      etapaVida: desarrollo
    }
console.log(newAnimal)

  this.http.updateAnimal(newAnimal).subscribe(result=>{

    if(result.state==200){
      this.isLoadingResults=false
        Swal.fire({
          title:'Actualizacion de Animal',
          text: 'El animal fue actualizado Correctamente',
          icon:'success',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigate(['ganado/listado'])
    }else{
      this.isLoadingResults=false
      Swal.fire({
        title:'Actualizacion de Animal',
        text: 'El animal no se pudo actualizar intente de nuevo',
        icon:'error',
        confirmButtonText: 'Aceptar'
      })
      location.reload()
    }
  })


 }

 cancelar(){
  this.router.navigate(['ganado/listado'])
 }
}
