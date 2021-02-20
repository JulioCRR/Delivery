import { AbstractControl, ValidatorFn } from "@angular/forms";
import { CommonUtils } from "./CommonUtils";

export function ValidatorRange(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean | null } => {
    if (control.value !== undefined && control.value != null && (isNaN(control.value) || control.value < min || control.value > max)) {
      return { 'range': true };
    }
    return null;
  };
}

export function ValidatorIP(control: AbstractControl): { [key: string]: boolean | null } {
  if (control.value !== undefined && control.value != null) {
    const ip = '' + control.value;
    if (CommonUtils.isValidIP(ip)) {
      return null;
    }
  }
  return { 'format': true };
}
