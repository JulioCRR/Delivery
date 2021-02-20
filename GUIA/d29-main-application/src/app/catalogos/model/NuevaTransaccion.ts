
export class NuevaTransaccion {
  constructor(
      public accion: string,
      public transaccion: string,
      public request: string,
      public responseExitoso: string,
      public responseErrorEM2k: string,
      public responseErrorEMOB: string,
      public fechaCreacion: string,
      public fechaModificacion: string,
      public pantalla: string
  ) {}
}
