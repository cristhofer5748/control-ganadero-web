import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MainComponent } from './components/main/main.component';
import { GeneralMenuComponent } from './components/general-menu/general-menu.component';
import { CowMenuComponent } from './components/cow-menu/cow-menu.component';
import { NewCowComponent } from './components/new-cow/new-cow.component';
import { ListCowComponent } from './components/list-cow/list-cow.component';
import { MainMilkComponent } from './components/main-milk/main-milk.component';
import { RegistrationMilkComponent } from './components/registration-milk/registration-milk.component';
import { CurriculumCowComponent } from './components/curriculum-cow/curriculum-cow.component';
import { NatalityComponent } from './components/natality/natality.component';
import { InseminationComponent } from './components/insemination/insemination.component';
import { HealthCheckComponent } from './components/health-check/health-check.component';
import { PublicityComponent } from './components/publicity/publicity.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

//PROVIDERS
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FilterPipe } from './pipes/filter.pipe';
import { ListadohojaComponent } from './components/listadohoja/listadohoja.component';
import { DialogImgComponent } from './components/curriculum-cow/dialog-img/dialog-img.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    GeneralMenuComponent,
    CowMenuComponent,
    NewCowComponent,
    ListCowComponent,
    MainMilkComponent,
    RegistrationMilkComponent,
    CurriculumCowComponent,
    NatalityComponent,
    InseminationComponent,
    HealthCheckComponent,
    PublicityComponent,
    HeaderComponent,
    FooterComponent,
    FilterPipe,
    ListadohojaComponent,
    DialogImgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [
    {provide: JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
