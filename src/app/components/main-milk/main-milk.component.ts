import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/shared/models/animaRegister';
import { RestService } from 'src/app/shared/services/rests.service';
import { Usuario } from '../../shared/models/Usuarios';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReporteProduccion } from '../../shared/models/ReporteProduccion';
@Component({
  selector: 'app-main-milk',
  templateUrl: './main-milk.component.html',
  styleUrls: ['./main-milk.component.css']
})
export class MainMilkComponent implements OnInit {

  isLoadingResults:boolean=false ;
  usuario:Usuario
  reporte:ReporteProduccion

  constructor(private http:RestService,
              private router:Router,
              private activateRouter:ActivatedRoute,
              private jwt:JwtHelperService) { }

   ngOnInit(): void {

     this.isLoadingResults=true
     let token = localStorage.getItem('token')
     this.usuario= this.jwt.decodeToken(token)
    this.http.reporteProduccion(this.usuario.idUsuario,this.formatDate(new Date()),null).subscribe(result=>{
      if(result.state==200){
        this.reporte=result.data
        this.isLoadingResults=false
      }else{
        this.reporte={
          totalDiario: 0,
          totalDiaAnt: 0,
          totalMes: 0,
          quincena: 0,
          consuCasa: 0,
          consuTernero: 0,
          enProduccion: 0,
          promedio: 0
        }
        this.isLoadingResults=false
      }
    })



  }

 generarReporte(initDate:string,endDate:string){

   if(initDate || endDate){
    this.isLoadingResults=true
    this.http.reporteProduccion(this.usuario.idUsuario,initDate,endDate).subscribe(result=>{
      if(result.state==200){
        this.reporte=result.data
        this.isLoadingResults=false
      }else{
        this.reporte={
          totalDiario: 0,
          totalDiaAnt: 0,
          totalMes: 0,
          quincena: 0,
          consuCasa: 0,
          consuTernero: 0,
          enProduccion: 0,
          promedio: 0
        }
        this.isLoadingResults=false
      }

    })
   }

  }
  formatDate(date) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate())

    return formatted_date;
}

 formatDate2(date) {
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1)

    return formatted_date;
}

registrarLeche(){
  this.router.navigate(['produccion/registro'])
}

}
