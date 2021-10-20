import { Inseminacion } from './insemination';
import { Natalidad } from './Natalidad';
import { ControlSalud } from './healthControl';

export class HojaVida{
  inseminacion: Inseminacion[];
  natalidad: Natalidad[];
  controlSalud: ControlSalud[]
}
