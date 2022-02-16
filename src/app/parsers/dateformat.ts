import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 1 && typeof dateParts[0] === 'number') {
        return {day: Number(dateParts[0]), month: null as any, year: null as any};
      } else if (dateParts.length === 2 && typeof dateParts[0] === 'number' && typeof dateParts[1] === 'number') {
        return {day: Number(dateParts[0]), month: Number(dateParts[1]), year: null as any};
      } else if (dateParts.length === 3 && typeof dateParts[0] === 'number' && typeof dateParts[1] === 'number' && typeof dateParts[2] === 'number') {
        return {day: Number(dateParts[0]), month: Number(dateParts[1]), year: Number(dateParts[2])};
      }
    }
    return null as any;
  }

  format(date: NgbDateStruct): string {
    return date ? 
        `${typeof date.day === 'number' ? String(date.day).padStart(2,"0") : ''}-${ typeof date.month === 'number' ? String(date.month).padStart(2,"0") : ''}-${date.year}` :
       '';
  }
}