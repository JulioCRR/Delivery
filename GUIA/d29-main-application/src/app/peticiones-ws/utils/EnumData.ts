export class EnumEstatus {
  constructor() { }
  static readonly REVISION: number = 0;
  static readonly AUTORIZADA: number = 1;
  static readonly RECHAZADA: number = 2;
  static readonly CANCELADA: number = 3;
  static readonly EXPIRADA: number = 4;
  static readonly URGENTE: number = 5;
  static readonly ELIMINADA: number = 6;

  static readonly N_REVISION: string = 'REVISIÓN';
  static readonly N_AUTORIZADA: string = 'AUTORIZADA';
  static readonly N_RECHAZADA: string = 'RECHAZADA';
  static readonly N_CANCELADA: string = 'CANCELADA';
  static readonly N_EXPIRADA: string = 'EXPIRADA';
  static readonly N_URGENTE: string = 'URGENTE';
  static readonly N_ELIMINADA: string = 'ELIMINADA';

  static getValues(): number[] {
    return [this.REVISION, this.AUTORIZADA, this.RECHAZADA, this.CANCELADA, this.EXPIRADA, this.URGENTE];
  }

  static getNames(): string[] {
    return [this.N_REVISION, this.N_AUTORIZADA, this.N_RECHAZADA, this.N_CANCELADA, this.N_EXPIRADA, this.N_URGENTE];
  }

  static getNameValuePairs(): any[] {
    return [
      { name: this.N_REVISION, value: this.REVISION },
      { name: this.N_AUTORIZADA, value: this.AUTORIZADA },
      { name: this.N_RECHAZADA, value: this.RECHAZADA },
      { name: this.N_CANCELADA, value: this.CANCELADA },
      { name: this.N_EXPIRADA, value: this.EXPIRADA },
      { name: this.N_URGENTE, value: this.URGENTE }
    ];
  }

  static getName(value: number): string {
    switch (value) {
      case this.REVISION: return this.N_REVISION;
      case this.AUTORIZADA: return this.N_AUTORIZADA;
      case this.RECHAZADA: return this.N_RECHAZADA;
      case this.CANCELADA: return this.N_CANCELADA;
      case this.EXPIRADA: return this.N_EXPIRADA;
      case this.URGENTE: return this.N_URGENTE;
      case this.ELIMINADA: return this.N_ELIMINADA;
    }
    return '';
  }

  static getValue(name: string): number {
    switch (name) {
      case this.N_REVISION: return this.REVISION;
      case this.N_AUTORIZADA: return this.AUTORIZADA;
      case this.N_RECHAZADA: return this.RECHAZADA;
      case this.N_CANCELADA: return this.CANCELADA;
      case this.N_EXPIRADA: return this.EXPIRADA;
      case this.N_URGENTE: return this.URGENTE;
      case this.N_ELIMINADA: return this.ELIMINADA;
    }
    return -1;
  }
}

export class EnumAmbiente {
  constructor() { }

  static readonly PROD: number = 0;
  static readonly DEV: number = 1;
  static readonly SICATEL: number = 2;

  static readonly N_PROD: string = 'PRODUCCIÓN';
  static readonly N_DEV: string = 'DESARROLLO';
  static readonly N_SICATEL: string = 'SICATEL';

  static getValues(): number[] {
    return [this.PROD, this.DEV];
  }

  static getNames(): string[] {
    return [this.N_PROD, this.N_DEV];
  }

  static getNameValuePairs(): any[] {
    return [
      { name: this.N_PROD, value: this.PROD },
      { name: this.N_DEV, value: this.DEV }
    ];
  }

  static getName(value: number): string {
    switch (value) {
      case this.PROD: return this.N_PROD;
      case this.DEV: return this.N_DEV;
      case this.SICATEL: return this.N_SICATEL;
    }
    return '';
  }

  static getValue(name: string): number {
    switch (name) {
      case this.N_PROD: return this.PROD;
      case this.N_DEV: return this.DEV;
      case this.N_SICATEL: return this.SICATEL;
    }
    return -1;
  }
}

export class EnumTipoSolicitud {
  constructor() { }
  static readonly PROPIAS: number = 0;
  static readonly EXTERNAS: number = 1;
  static readonly TODAS: number = 2;

  static readonly N_PROPIAS: string = 'PROPIAS';
  static readonly N_EXTERNAS: string = 'EXTERNAS';
  static readonly N_TODAS: string = 'TODAS';

  static getValues(): number[] {
    return [this.PROPIAS, this.EXTERNAS];
  }

  static getNames(): string[] {
    return [this.N_PROPIAS, this.N_EXTERNAS];
  }

  static getNameValuePairs(): any[] {
    return [
      { name: this.N_PROPIAS, value: this.PROPIAS },
      { name: this.N_EXTERNAS, value: this.EXTERNAS }
    ];
  }

  static getName(value: number): string {
    switch (value) {
      case this.PROPIAS: return this.N_PROPIAS;
      case this.EXTERNAS: return this.N_EXTERNAS;
    }
    return '';
  }

  static getValue(name: string): number {
    switch (name) {
      case this.N_PROPIAS: return this.PROPIAS;
      case this.N_EXTERNAS: return this.EXTERNAS;
    }
    return -1;
  }
}
