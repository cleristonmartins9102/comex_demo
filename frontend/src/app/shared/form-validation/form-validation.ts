import { AbstractControl } from '@angular/forms';

export function numberValidator(
    control: AbstractControl
): { [kes: string]: any } | null {
    return parseInt(control.value) >= 0
        ? null 
        : { invalidNumber: { valid: false, value: control.value } } ;
}