import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordDirective,
    multi: true
  }]
})
export class MatchPasswordDirective {
  @Input('appMatchPassword') passwordToMatch: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    const repeatPassword = control.value;
    
    if (!repeatPassword || !this.passwordToMatch) {
      return null;
    }

    return repeatPassword === this.passwordToMatch ? null : { passwordMismatch: true };
  }
}
