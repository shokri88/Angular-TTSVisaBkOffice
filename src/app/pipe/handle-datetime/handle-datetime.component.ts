import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'HandleDatetimeComponent'
})
export class HandleDatetimeComponent implements PipeTransform {

  pipe = new DatePipe('en-US');

  async transform(DateValue: Date): Promise<string> {
    return this.pipe.transform(DateValue, 'yyyy/MM/dd (HH:mm)')!;
  }

}
