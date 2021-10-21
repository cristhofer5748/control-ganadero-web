import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animal } from '../../shared/models/animaRegister';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort,SortDirection} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../../shared/services/rests.service';
import { Usuario } from '../../shared/models/Usuarios';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-cow',
  templateUrl: './list-cow.component.html',
  styleUrls: ['./list-cow.component.css']
})
export class ListCowComponent implements OnInit {

  ganado: Animal[] = [];

displayedColumns: string[] = [ 'fotoAnimal','nombreAnimal', 'numAnimal','opciones'];
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
    this.router.navigate([`vaca/${id}`])
  }

  editar(idAnimal:number){
    this.router.navigate([`vaca/${idAnimal}/editar`])
  }

  async eliminar(idAnimal:number){
    const { value: accept } = await Swal.fire({
      title: 'Eliminar Animal',
      input: 'checkbox',
      icon:'warning',
      inputValue: 0,
      inputPlaceholder:'Dese eliminar el animal ',
      confirmButtonText: 'Continue',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'

    })
    if(accept==1){
  this.http.eliminarAnimal(idAnimal).subscribe(result=>{
    if(result.state==200){
      Swal.fire({
        title: 'Animal Eliminado',
        text: 'El animal fue eliminado correctamente',
        icon:'success',
        confirmButtonText: 'Aceptar'
      })
      location.reload()
    }
  })
    }

  }

}




