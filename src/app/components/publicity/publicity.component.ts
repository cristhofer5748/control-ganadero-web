import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicity',
  templateUrl: './publicity.component.html',
  styleUrls: ['./publicity.component.css']
})
export class PublicityComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  routerLogin(){
    this.route.navigate(['login'])
  }

  routerRegistro(){
    this.route.navigate(['registro'])
  }


}
