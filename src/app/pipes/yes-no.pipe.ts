import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo',
  standalone: true
})
export class YesNoPipe implements PipeTransform {
  
  transform(value: boolean | null | undefined): string {
    if (value === null || value === undefined) {
      return '❓ No especificado';
    }
    
    return value ? 'Disponible' : ' No disponible';
  }

}
