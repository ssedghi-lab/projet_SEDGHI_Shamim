import { FormControlName } from '@angular/forms';
import { Directive, ElementRef, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDirectives]'
})
export class DirectivesDirective {

  constructor(
    private el: ElementRef,
    @Optional() @Self() private control: NgControl
  ) {}

  @HostListener('blur')
  onBlur() {
    if (this.control && this.control.invalid && this.control.touched) {
      this.el.nativeElement.style.borderColor = 'red';
    } else {
      this.el.nativeElement.style.borderColor = '';
    }
  }
}
