import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/models/Usuarios';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  open: boolean = false;
  menu: boolean = false;
  sidebar: boolean = false;
  public usuario:Usuario
  constructor(private jwt:JwtHelperService,private router:Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    this.usuario= this.jwt.decodeToken(token)
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  clickOutsideMenu(event: boolean) {
    this.menu = event;
    this.checkCloseNav();
  }

  clickOutsideSide(event: boolean) {
    this.sidebar = event;
    this.checkCloseNav();
  }

  checkCloseNav() {
    if (this.sidebar && this.menu && this.open) {
      this.sidebar = false;
      this.menu = false;
      this.closeNav();
    } else if (!this.menu && this.sidebar) {
      this.sidebar = false;
    }
  }

  openNav() {
    if (this.open) {
      document.getElementById("mySidenav").style.width = "0";
    } else {
      document.getElementById("mySidenav").style.width = "250px";
    }
    this.open = !this.open;
  }

  closeNav() {
    this.open = false;
    document.getElementById("mySidenav").style.width = "0";
  }

    logout() {
      localStorage.removeItem('token')
      this.router.navigate(['publicidad'])
  }

}
