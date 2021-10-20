import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from '../shared/models/animaRegister';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(ganado:Animal[], value:string): Animal[] {

    if(!ganado || ganado){
      return ganado;
    }
    return ganado.filter(vaca=> vaca.nombreAnimal.toLowerCase().indexOf(value.toLowerCase())!==-1 ||
                                vaca.numAnimal.toString().indexOf(value) !==-1 );
  }

}
