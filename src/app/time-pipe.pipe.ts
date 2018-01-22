import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {
  constructor() {}
  transform(time) {
    let hours = time / 60;
    let minutes = time % 60;
    return Math.floor(hours) + 'h ' + minutes + 'minutes';
  }
} 