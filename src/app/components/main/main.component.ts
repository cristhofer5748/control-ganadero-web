import { Component, ElementRef, OnInit } from '@angular/core';
import { ReporteInventario } from '../../shared/models/ReporteInventario';
import { RestService } from '../../shared/services/rests.service';
import { Usuario } from '../../shared/models/Usuarios';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isLoadingResults:boolean=false
  reporteInventario:ReporteInventario
  usuario:Usuario
  constructor(private elementRef: ElementRef,private http:RestService,private jwt:JwtHelperService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    this.usuario= this.jwt.decodeToken(token)
    this.isLoadingResults=true
    this.http.reporteAnimales(this.usuario.idUsuario).subscribe(result=>{
      if(result.state==200){
        this.reporteInventario = result.data
        this.isLoadingResults=false
      }else{
        this.reporteInventario= {
          totalAnimales: 0,
          totalH: 0,
          totalM: 0,
          totalProd: 0,
          totalVacas: 0,
          totalToros: 0,
          totalForras: 0,
          novillas: 0,
          novillos: 0,
          ternerosH: 0,
          ternerosM: 0
        }
        this.isLoadingResults=false
      }
    })
  }

  ngAfterViewInit(){

 }

}
