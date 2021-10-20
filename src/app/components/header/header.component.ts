import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/models/Usuarios';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario
  constructor(private jwt:JwtHelperService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    this.usuario= this.jwt.decodeToken(token)
  }

}
