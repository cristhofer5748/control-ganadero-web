import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animal } from '../../shared/models/animaRegister';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,SortDirection} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../../shared/services/rests.service';
import { Usuario } from '../../shared/models/Usuarios';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listadohoja',
  templateUrl: './listadohoja.component.html',
  styleUrls: ['./listadohoja.component.css']
})
export class ListadohojaComponent implements OnInit {

  ganado: Animal[] = [];

displayedColumns: string[] = [ 'fotoAnimal','nombreAnimal', 'numAnimal'];
dataSource: MatTableDataSource<Animal>;
search
resultsLength = 0;
isLoadingResults = true;
usuario:Usuario
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private http:RestService,
              private jwt:JwtHelperService,
              private router:Router,
              private elementRef: ElementRef) { }

   ngOnInit(): void {
    let token = localStorage.getItem('token')
    this.usuario= this.jwt.decodeToken(token)

    console.log(this.usuario.idUsuario)
    this.isLoadingResults = true;

    ( this.http.getListCow(this.usuario.idUsuario)).subscribe(data => {
      console.log(data)
      if(data==null){
        this.ganado=[]
      }
      this.ganado=data.data
      this.resultsLength = data.data.length
      this.dataSource = new MatTableDataSource(this.ganado);
      this.isLoadingResults=false
    });
    console.log(this.ganado)


  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }


  filtrar(datoBuscar:string) {
    console.log(datoBuscar)
    this.dataSource  =  new MatTableDataSource(this.ganado.filter(vaca=> vaca.nombreAnimal.toLowerCase().indexOf(datoBuscar.toLowerCase())!==-1 ||
    vaca.numAnimal.toString().indexOf(datoBuscar) !==-1 ));
  }


  imagen(image:string){
        if(image){
          return image;
        }else{
          return "/assets/img/cow.png"
        }
  }

  navegar(id){
    this.router.navigate([`ganado/listado/hoja/${id}`])
  }

}
