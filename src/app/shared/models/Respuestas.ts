import { Animal } from './animaRegister';
import { HojaVida } from './HojaVida';
import { ReporteInventario } from './ReporteInventario';
import { ReporteProduccion } from './ReporteProduccion';
import { Paises } from './Paises';
import { Usuario } from './Usuarios';
export class Respuesta{
  state:number;
  data:any;
  message:string;
}

export class RespuestaAnimales{
  state:number;
  data:Animal[];
  message:string;
}

export class RespuestaHojaVida{
  state:number;
  data:HojaVida;
  message:string;
}

export class RespuestaReportLeche{
  state:number;
  data:ReporteProduccion;
  message:string;
}

export class RespuestaReporteInventario{
  state:number;
  data:ReporteInventario;
  message:string;
}

export class RespuestaPaises{
  state:number;
  data:Paises[];
  message:string;
}

export class RespuestaUsuarios{
  state:number;
  data:Usuario[];
  message:string;
}



