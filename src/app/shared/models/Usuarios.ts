import { Paises } from "./Paises";
export class Usuario{
  idUsuario:number;
  nombre:string;
  apellido:string;
  correo :string;
  contrasena :string;
  pais:Paises;
  telefono :number;
  tieneFinca : boolean;
  nombreFinca:string;
  fechaNacimiento: string;
  sexo:string;
}
