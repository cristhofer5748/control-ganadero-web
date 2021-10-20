import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-milk',
  templateUrl: './registration-milk.component.html',
  styleUrls: ['./registration-milk.component.css']
})
export class RegistrationMilkComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }
}
