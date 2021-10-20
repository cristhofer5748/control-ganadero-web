import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/shared/models/animaRegister';
import { RestService } from 'src/app/shared/services/rests.service';
@Component({
  selector: 'app-main-milk',
  templateUrl: './main-milk.component.html',
  styleUrls: ['./main-milk.component.css']
})
export class MainMilkComponent implements OnInit {
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
    this.http.getCow(this.idAnimal).then(data=>{
      data.subscribe(result=>{

        if(data==null || result.state!=200){
          this.cow=new Animal
        }else{
          this.cow= result.data[0]
        }
        this.isLoadingResults = false;
        this.img=result.data[0].fotoAnimal
      })
    })

  }

  imagen(image:string){
    if(image){
      return image;
    }else{
      return "/assets/img/Vaca.png"
    }
}

registrarLeche(){
  this.router.navigate(['produccion/registro'])
}

}
