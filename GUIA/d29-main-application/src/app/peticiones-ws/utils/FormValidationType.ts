export class FormValidationType {
  constructor() { }
  static REQUIRED: string = 'required';
  static MIN_LENGTH: string = 'minlength';
  static MAX_LENGTH: string = 'maxlength';
  static FORMAT: string = 'format';
  static RANGE: string = 'range';

  static getValidationTypes(): string[] {
    return [this.REQUIRED, this.MIN_LENGTH, this.MAX_LENGTH, this.FORMAT];
  }

  static getDefaultMessage(msgType: string): string {
    switch (msgType) {
      case this.REQUIRED: return 'Campo requerido';
      case this.MIN_LENGTH: return 'Longitud mínima requerdia';
      case this.MAX_LENGTH: return 'Longitud máxima excedida';
      case this.FORMAT: return 'Formato incorrecto';
      case this.RANGE: return 'Valor fuera del rango';
    }
    return '';
  }
}
