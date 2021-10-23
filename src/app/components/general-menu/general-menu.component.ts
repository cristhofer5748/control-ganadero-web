import { Component, OnInit } from '@angular/core';
import { RestService } from '../../shared/services/rests.service';
import { Animal } from '../../shared/models/animaRegister';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaAnimales } from '../../shared/models/Respuestas';

@Component({
  selector: 'app-general-menu',
  templateUrl: './general-menu.component.html',
  styleUrls: ['./general-menu.component.css']
})
export class GeneralMenuComponent implements OnInit {
  cow:Animal
  idAnimal:number
  isLoadingResults ;
  img:any

  constructor(private http:RestService,
              private router:Router,
              private activateRouter:ActivatedRoute) { }

   ngOnInit(): void {
    this.isLoadingResults = true;
    this.idAnimal = this.activateRouter.snapshot.params.id
    this.http.getCow(this.idAnimal).subscribe(data=>{


        if( data.state!=200){
          this.cow=new Animal
        }else{
          this.cow= data.data[0]
        }
        this.isLoadingResults = false;
        this.img=data.data[0].fotoAnimal
      })

  }



  listado(){
    this.router.navigate(['ganado/listado'])
  }

  listadoHoja(){
    this.router.navigate(['ganado/listado/hoja'])
  }

  agregaranimal(){
    this.router.navigate(['ganado/registrar'])
  }
}
