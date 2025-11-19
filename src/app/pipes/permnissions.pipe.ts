import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permnissions'
})
export class PermnissionsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
      case 1:
        return 'Dodawanie';
      case 2:
        return 'Przeglądanie';
      case 0: 
        return 'Superuser';
      default:
        return 'Nieznane uprawnienia';
    }
  }
}
