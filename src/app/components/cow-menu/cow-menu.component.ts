import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/shared/models/animaRegister';
import { RestService } from 'src/app/shared/services/rests.service';

@Component({
  selector: 'app-cow-menu',
  templateUrl: './cow-menu.component.html',
  styleUrls: ['./cow-menu.component.css']
})
export class CowMenuComponent implements OnInit {
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

        if(data.state!=200){
          this.cow=new Animal
        }else{
          this.cow= data.data[0]
        }
        this.isLoadingResults = false;
        this.img=data.data[0].fotoAnimal
      })
  }

  imagen(){
    if(this.img){
      return this.img;
    }else{
      return "/assets/img/Vaca.png"
    }
}


inseminacion(){

  this.router.navigate([`vaca/${this.idAnimal}/inseminacion`])
}

natalidad(){

  this.router.navigate([`vaca/${this.idAnimal}/natalidad`])
}


controlsalud(){

  this.router.navigate([`vaca/${this.idAnimal}/control-salud`])
}


}
