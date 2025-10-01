import { Pipe, PipeTransform } from '@angular/core';
import { BOXES } from '../enums/BOXES';

@Pipe({
  name: 'boxNames'
})
export class BoxNamesPipe implements PipeTransform {
  BOXES = BOXES;
  
  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
      case BOXES.TEXT:
        return "Tekst/Liczba";
      case BOXES.IMAGES:
        return "Obraz";
      case BOXES.DATE:
        return "Data";
      case BOXES.TEXT_AREA:
        return "Obszar tekstowy";
      case BOXES.FILE:
        return "Plik";
      default:
        return value;
    }
  }
}
