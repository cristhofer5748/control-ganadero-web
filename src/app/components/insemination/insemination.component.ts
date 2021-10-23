
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../../shared/services/rests.service';
import { Animal } from '../../shared/models/animaRegister';
import { RegistroInseminacion } from '../../shared/models/insemination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insemination',
  templateUrl: './insemination.component.html',
  styleUrls: ['./insemination.component.css']
})
export class InseminationComponent implements OnInit {
  idAnimal:number
  animal:Animal=new Animal()
  isLoadingResults:boolean=false
  constructor(private elementRef: ElementRef,private router:Router,private actiRout:ActivatedRoute
              ,private http:RestService) { }

  ngOnInit(): void {
    this.isLoadingResults=true
    this.idAnimal = this.actiRout.snapshot.params.id
    this.http.getCow(this.idAnimal).subscribe(result=>{
      if(result.state==200){
        this.animal=result.data[0]
      }
      this.isLoadingResults=false
    })

  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }


 guardar(fechaInse:string,sexado:boolean,sexoM:boolean,sexoF:boolean,fechaMonta:string,fechaEmbrion:string,raza:string){
    let newInseminacion:RegistroInseminacion
  if(sexoM==true){
    newInseminacion={
      idAnimal: this.idAnimal,
      fechaInseminacion: fechaInse,
      sexado :sexado,
      sexo: 'M',
      fechaMonta:fechaMonta,
      fechaEmbrion:fechaEmbrion,
      razaInseminacion:raza
    }
   }else if(sexoF==true){
    newInseminacion={
      idAnimal: this.idAnimal,
      fechaInseminacion: fechaInse,
      sexado :sexado,
      sexo: 'F',
      fechaMonta:fechaMonta,
      fechaEmbrion:fechaEmbrion,
      razaInseminacion:raza
    }
   }else{
    newInseminacion={
      idAnimal: this.idAnimal,
      fechaInseminacion: fechaInse,
      sexado :sexado,
      sexo: null,
      fechaMonta:fechaMonta,
      fechaEmbrion:fechaEmbrion,
      razaInseminacion:raza
    }
   }
   this.http.insertarInseminacion(newInseminacion).subscribe(result=>{
     if(result.state==200){
       Swal.fire({
         title: 'Registro Inseminacion',
         text: 'La inseminacion se registro con exito',
         icon:'success',
         confirmButtonText:'Aceptar'
       })
      this.router.navigate([`vaca/${this.idAnimal}`])
     }else{
      Swal.fire({
        title: 'Registro Inseminacion',
        text: 'La inseminacion no se pudo registrar intente de nuevo',
        icon:'error',
        confirmButtonText:'Aceptar'
      })
     this.router.navigate([`vaca/${this.idAnimal}`])
     }

   })

 }


 cancelar(){
      this.router.navigate([`vaca/${this.idAnimal}`])
 }

}
