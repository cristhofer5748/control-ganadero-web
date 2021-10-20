import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-natality',
  templateUrl: './natality.component.html',
  styleUrls: ['./natality.component.css']
})
export class NatalityComponent implements OnInit {
  idAnimal
  constructor(private elementRef: ElementRef,
    private router:Router,
    private actRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.idAnimal= this.actRouter.snapshot.params.id
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }

 cancelar(){
    this.router.navigate([`vaca/${this.idAnimal}`])
 }

 guardar(fechapalpa:string,fechaprem:string,fechaparir:string,numpart:string,produccion:string){
    this.router.navigate([`vaca/${this.idAnimal}`])
 }
}
