import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-health-check',
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css']
})
export class HealthCheckComponent implements OnInit {

  constructor(private elementRef: ElementRef,private router:Router,private actiRout:ActivatedRoute) { }
  idAnimal:number
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
