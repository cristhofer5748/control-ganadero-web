import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogImgComponent } from './dialog-img/dialog-img.component';

@Component({
  selector: 'app-curriculum-cow',
  templateUrl: './curriculum-cow.component.html',
  styleUrls: ['./curriculum-cow.component.css']
})
export class CurriculumCowComponent implements OnInit {
 img:string ='/assets/img/vaca-negra.png'
  constructor(private elementRef: ElementRef,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogImgComponent, {
      width: '100%',
      data: this.img
    });

  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }



}
