import { Component, ElementRef, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-animal',
  templateUrl: './editar-animal.component.html',
  styleUrls: ['./editar-animal.component.css']
})
export class EditarAnimalComponent implements OnInit {
  public archivos:any[] = []
  constructor(private elementRef: ElementRef,private sanitizer:DomSanitizer,private router:Router) { }
  img: string
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#64AC3F';
 }

 capturarFile(event):any{
  const archivoCapturado = event.target.files[0]
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
    this.img = imagen.base;
    console.log(imagen)
  })
  this.archivos.push(archivoCapturado)


 }


 extraerBase64 = async ($event:any)=> new Promise((resolve,reject)=>{
   try {
     const unsafeImage = window.URL.createObjectURL($event)
     const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImage)
     const reader = new FileReader();

     reader.readAsDataURL($event);
     reader.onload = ()=>{
       resolve({
         base:reader.result
       });
     };
   } catch (error) {

   }
 })


 guardar(){
   this.router.navigate(['ganado/listado'])
 }

 cancelar(){
  this.router.navigate(['ganado/listado'])
 }
}
