import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCardCode',
  standalone: true
})
export class MaskCardCodePipe implements PipeTransform {
  transform(cardNumber: string): string {
    return cardNumber.replace(/.(?=.{4})/g, '*');
  }
}