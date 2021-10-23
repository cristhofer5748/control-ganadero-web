import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Animal } from 'src/app/shared/models/animaRegister';
import { RestService } from '../../shared/services/rests.service';
import { RegistroNatalidad } from '../../shared/models/Natalidad';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-natality',
  templateUrl: './natality.component.html',
  styleUrls: ['./natality.component.css']
})
export class NatalityComponent implements OnInit {
  idAnimal:number
  animal:Animal=new Animal()
  isLoadingResults:boolean=false
  constructor(private elementRef: ElementRef,
    private router:Router,
    private actRouter:ActivatedRoute,private http:RestService) { }

  ngOnInit(): void {
    this.isLoadingResults=true
    this.idAnimal = this.actRouter.snapshot.params.id
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

 cancelar(){
    this.router.navigate([`vaca/${this.idAnimal}`])
 }



 guardar(fechapalpa:string,fechaprem:string,fechaparir:string,numpart:string,produccion:number){
  this.isLoadingResults=true
   let newNatalidad:RegistroNatalidad={
    idAnimal:this.animal.idAnimal,
    fechaPalpacion:fechapalpa,
    fechaPremies: fechaprem,
    numeroParto:numpart,
    fechaAproximadaNacimiento:fechaparir,
    produccionDiaria:produccion
   }

   this.http.insertarNatalidad(newNatalidad).subscribe(result=>{
     if(result.state==200){
      this.isLoadingResults=false
  Swal.fire({
    title:'Registro de Natalidad',
    text:'El registro de natalidad fue exitoso',
    icon:'success',
    confirmButtonText:'Aceptar'
  })
  this.router.navigate([`vaca/${this.idAnimal}`])
     }else{
      Swal.fire({
        title:'Registro de Natalidad',
        text:'El registro no se pudo realizar intente de nuevo',
        icon:'error',
        confirmButtonText:'Aceptar'
      })
      location.reload()
     }
   })
   console.log(newNatalidad)
   //
 }
}
