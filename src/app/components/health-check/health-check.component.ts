import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/shared/models/animaRegister';
import { RestService } from '../../shared/services/rests.service';
import { RegistroControlSalud } from '../../shared/models/healthControl';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css']
})
export class HealthCheckComponent implements OnInit {

  constructor(private elementRef: ElementRef,private router:Router,private actiRout:ActivatedRoute,private http:RestService) { }
  idAnimal:number
  animal:Animal=new Animal()
  isLoadingResults:boolean=false
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


 guardar(fechTuber:string,tuP:boolean,tuN:boolean,fechBru:string,bruP:boolean,bruN:boolean,fechMas:string,masP:boolean,masN:boolean,tetaA:boolean,tetaB:boolean,tetaC:boolean,tetaD:boolean,tratamiento:string){
  this.isLoadingResults=true
  let brucelosis:boolean
  let tubercolosis:boolean
  let mastitis
  if(tuP==true ){
    tubercolosis=true
  }else if(tuN==true){
    tubercolosis=false
  }else{
    tubercolosis=null
  }

  if(bruP==true ){
    brucelosis=true
  }else if(bruN==true){
    brucelosis=false
  }else{
    brucelosis=null
  }

  if(masP==true ){
    mastitis=true
  }else if(masN==true){
    mastitis=false
  }else{
    mastitis=null
  }

  let newControlSalud:RegistroControlSalud={
    idAnimal:this.animal.idAnimal,
    fechaPruebaBrucelosis:fechBru,
    brucelosis:brucelosis,
    fechaPruebaMastitis: fechMas,
    mastitis:mastitis,
    tetaA: tetaA,
    tetaB: tetaB,
    tetaC: tetaC,
    tetaD: tetaD,
    fechaPruebaTubercolosis: fechTuber,
    tubercolosis:tubercolosis,
    tratamiento: tratamiento
  }
  console.log(newControlSalud)
  this.http.insertarControlSalud(newControlSalud).subscribe(result=>{
    if(result.state==200){
      Swal.fire({
        title: 'Registro Control Salud',
        text: 'El registro de salud fue registrado con exito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      this.isLoadingResults=false
      this.router.navigate([`vaca/${this.idAnimal}`])
    }else{
      Swal.fire({
        title: 'Registro Control Salud',
        text: 'El registro no se pudo guardar intente de nuevo',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      this.isLoadingResults=false
     location.reload()
    }
  })

 }


 cancelar(){
      this.router.navigate([`vaca/${this.idAnimal}`])
 }
}
