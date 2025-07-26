import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'HandleToDateComponent'
})
export class HandleToDateComponent implements PipeTransform {
  transform(value: any): Date {
    return new Date(value); 
  }
}
