import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'HandleDateComponent'
})
export class HandleDateComponent implements PipeTransform {

  pipe = new DatePipe('en-US');

  async transform(DateValue: Date): Promise<string> {
    return this.pipe.transform(DateValue, 'yyyy/MM/dd')!;
  }

}