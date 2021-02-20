export class Constants {
  constructor() { }

  static readonly usuarioCorp: string = 'usuarioCorp';
  static readonly ip: string = 'ip';
  static readonly region: string = 'region';
  static readonly transaccion: string = 'transaccion';
  static readonly ppm: string = 'ppm';
  static readonly ambiente: string = 'ambiente';
  static readonly estatus: string = 'estatus';
  static readonly solicitudPeticion: string = 'solicitudPeticion';

  static readonly urgente: string = 'urgente';
  static readonly folioSISAP: string = 'folioSISAP';
  static readonly aplicativo: string = 'aplicativo';
  static readonly area: string = 'area';
  static readonly fechaCaducidad: string = 'fechaCaducidad';
  static readonly justificacion: string = 'justificacion';

  static readonly comentario: string = 'comentario';
  static readonly tipoSolicitud: string = 'tipoSolicitud';
  static readonly estatusSolicitud: string = 'estatusSolicitud';

  static readonly solicitudData: string = 'solicitudData';
  static readonly peticionData: string = 'peticionData';

  static readonly AUTORIZAR: string = 'AUTORIZAR';
  static readonly RECHAZAR: string = 'RECHAZAR';
  static readonly CANCELAR: string = 'CANCELAR';
  static readonly REVOCAR: string = 'REVOCAR';

  static getKeysSolUsuCorp(): string[] {
    return [this.usuarioCorp, this.justificacion];
  }

  static getKeysSolPeticion(): string[] {
    return [this.aplicativo, this.ambiente, this.fechaCaducidad, this.justificacion];
  }

  static getKeysPeticion(): string[] {
    return [this.usuarioCorp, this.ip, this.region, this.transaccion, this.ppm, this.ambiente, this.estatus];
  }
}
