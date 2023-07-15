import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoria'
})
export class AutoriaPipe implements PipeTransform {

  transform(autoria: string[]): string {
    return autoria ? autoria[0] : ''
  }

}
