import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})

export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
}