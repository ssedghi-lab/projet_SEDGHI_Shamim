import { ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DirectivesDirective } from './directives.directive';

describe('DirectivesDirective', () => {
  let elementRefMock: ElementRef;
  let ngControlMock: NgControl;

  beforeEach(() => {
    elementRefMock = new ElementRef(document.createElement('input'));
    ngControlMock = {
      invalid: false,
      touched: false,
    } as NgControl;
  });

  it('should create an instance', () => {
    const directive = new DirectivesDirective(elementRefMock, ngControlMock);
    expect(directive).toBeTruthy();
  });
});