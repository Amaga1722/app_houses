import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo',
  standalone: true  // 👈 Importante: standalone pipe
})
export class YesNoPipe implements PipeTransform {

  /**
   * Transforma un valor booleano a texto legible con emojis
   * @param value - Valor booleano a transformar
   * @returns String formateado con ✅ o ❌
   */
  transform(value: boolean | null | undefined): string {
    if (value === null || value === undefined) {
      return '❓ No especificado';
    }
    
    return value ? '✅ Disponible' : '❌ No disponible';
  }

}
