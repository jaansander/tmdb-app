import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'language' })
export class LanguagePipe implements PipeTransform {
  constructor() {}
  transform(language) {
    if(language == 'en')
      return 'English';
    else if(language == 'ru')
      return 'Russian';
    else if(language == 'hi')
      return 'Hindi';
    else if(language == 'ja')
      return 'Japanese';
    else if(language == 'it')
      return 'Italian'
    else if(language == 'de')
      return 'German'
    return language;
  }
} 