
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-insemination',
  templateUrl: './insemination.component.html',
  styleUrls: ['./insemination.component.css']
})
export class InseminationComponent implements OnInit {
  idAnimal:number
  constructor(private elementRef: ElementRef,private router:Router,private actiRout:ActivatedRoute) { }

  ngOnInit(): void {
    this.idAnimal = this.actiRout.snapshot.params.id
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }


 guardar(){
  this.router.navigate([`vaca/${this.idAnimal}`])
 }


 cancelar(){
      this.router.navigate([`vaca/${this.idAnimal}`])
 }

}
