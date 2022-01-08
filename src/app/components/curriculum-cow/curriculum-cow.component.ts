import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogImgComponent } from './dialog-img/dialog-img.component';
import { RestService } from '../../shared/services/rests.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../shared/models/Usuarios';
import { Inseminacion } from '../../shared/models/insemination';
import { Natalidad } from '../../shared/models/Natalidad';
import { ControlSalud } from '../../shared/models/healthControl';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Animal } from '../../shared/models/animaRegister';
import * as html2pdf from 'html2pdf.js'
@Component({
  selector: 'app-curriculum-cow',
  templateUrl: './curriculum-cow.component.html',
  styleUrls: ['./curriculum-cow.component.css'],
})
export class CurriculumCowComponent implements OnInit {
  img: string;
  idAnimal: number;
  inseminacion: Inseminacion[] = [];
  natalidad: Natalidad[] = [];
  salud: ControlSalud[] = [];
  usuario: Usuario = new Usuario();
  animal: Animal = new Animal();
  isLoadingResults: boolean = false;

  constructor(
    private elementRef: ElementRef,
    public dialog: MatDialog,
    private http: RestService,
    private router: Router,
    private routerActive: ActivatedRoute,
    private jwt: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.idAnimal = this.routerActive.snapshot.params.id;
    let token = localStorage.getItem('token');
    this.usuario = this.jwt.decodeToken(token);
    this.http
      .obtenerInformeAnimal(this.usuario.idUsuario, this.idAnimal, 1)
      .subscribe((result) => {
        if (result.state == 200) {
          console.log(result);
          this.inseminacion = result.data.inseminacion;
          this.natalidad = result.data.natalidad;
          this.salud = result.data.controlSalud;
        }
        this.http.getCow(this.idAnimal).subscribe((result) => {
          if ((result.state = 200)) {
            this.animal = result.data[0];
            console.log(this.animal);
            this.img = this.animal.fotoAnimal;
          }
          this.isLoadingResults = false;
        });
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogImgComponent, {
      width: '100%',
      data: this.img,
    });
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#64AC3F';
  }

  generarReporte(limite: number) {
    console.log(limite);
    this.isLoadingResults = true;
    this.http
      .obtenerInformeAnimal(this.usuario.idUsuario, this.idAnimal, limite)
      .subscribe((result) => {
        if (result.state == 200) {
          this.inseminacion = result.data.inseminacion;
          this.natalidad = result.data.natalidad;
          this.salud = result.data.controlSalud;
        }
        this.isLoadingResults = false;
      });
  }

  calcularFecha(date: string) {
    let timeDiff = Math.abs(
      Date.now() - new Date(this.formatDate(new Date(date))).getTime()
    );
    let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return age;
  }

  valorSiNo(value: number) {
    if (value == 1) {
      return 'SI';
    } else {
      return 'NO';
    }
  }

  resultadoEnfermedad(value: number) {
    if (value == 1) {
      return 'POSITIVO';
    } else {
      return 'NEGATIVO';
    }
  }

  formatDate(date) {
    let formatted_date =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    console.log(formatted_date);
    return formatted_date;
  }

  public generarPdf(){
this.isLoadingResults= true
  const options = {
    filename: `${this.animal.nombreAnimal}.pdf`,
    image: {type: 'jpeg'},
    html2canvas: {},
    jsPDF: {orientacion: 'landscape'}
  }

  const content:Element = document.getElementById('contenedor')
 this.pdf(content,options)
}

async pdf(content:any,options:any){
  await html2pdf().from(content).set(options).save();
  this.isLoadingResults=false
}

regresar(){
  this.router.navigate(['ganado/listado/hoja'])
}
}
