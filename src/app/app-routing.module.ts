import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PublicityComponent } from './components/publicity/publicity.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MainGuard } from './guards/main.guard';
import { ListCowComponent } from './components/list-cow/list-cow.component';
import { GeneralMenuComponent } from './components/general-menu/general-menu.component';
import { MainMilkComponent } from './components/main-milk/main-milk.component';
import { CowMenuComponent } from './components/cow-menu/cow-menu.component';
import { InseminationComponent } from './components/insemination/insemination.component';
import { HealthCheckComponent } from './components/health-check/health-check.component';
import { NatalityComponent } from './components/natality/natality.component';
import { RegistrationMilkComponent } from './components/registration-milk/registration-milk.component';
import { ListadohojaComponent } from './components/listadohoja/listadohoja.component';
import { NewCowComponent } from './components/new-cow/new-cow.component';
import { CurriculumCowComponent } from './components/curriculum-cow/curriculum-cow.component';
import { EditarAnimalComponent } from './components/editar-animal/editar-animal.component';

const routes: Routes = [
  {path:'publicidad',component:PublicityComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistrationComponent},
  {path:'main',component:MainComponent,canActivate:[MainGuard]},
  {path:'ganado',component:GeneralMenuComponent,canActivate:[MainGuard]},
  {path:'ganado/listado',component:ListCowComponent,canActivate:[MainGuard]},
  {path:'ganado/registrar',component:NewCowComponent,canActivate:[MainGuard]},
  {path:'ganado/listado/hoja',component:ListadohojaComponent,canActivate:[MainGuard]},
  {path:'ganado/listado/hoja/:id',component:CurriculumCowComponent,canActivate:[MainGuard]},
  {path: 'vaca/:id/editar',component:EditarAnimalComponent,canActivate:[MainGuard]},
  {path: 'vaca/:id', component: CowMenuComponent,canActivate:[MainGuard]},
  {path: 'vaca/:id/inseminacion', component: InseminationComponent,canActivate:[MainGuard]},
  {path: 'vaca/:id/control-salud', component: HealthCheckComponent,canActivate:[MainGuard]},
  {path: 'vaca/:id/natalidad', component: NatalityComponent,canActivate:[MainGuard]},
  {path: 'produccion',component:MainMilkComponent,canActivate:[MainGuard]},
  {path: 'produccion/registro',component:RegistrationMilkComponent,canActivate:[MainGuard]},
  {path:'**',pathMatch:'full',redirectTo:'publicidad'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
