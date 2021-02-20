

export class SolicitudModel {
    constructor(
      public folio:number,
      public user:number,
      public userMail:string,
      public nomProyect: string,
      public fechaInicio: Date,
      public fechaFinal: Date,
      public permisosIp:any []=[],
      public permisosTrans:any []=[],
      public dias:number,
      public comentarios:string,
      public usuario:string,
      public turno:any,
      public  nomUser?:string,
      public  periodoPrueba?:any,
    ) {}
}




