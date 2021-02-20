import { IPermisosIp } from "./IPermisosIp";
import { IPermisosTrans } from "./IPermisosTrans";

export interface ISolicitud {
  nomProyect: string;
  fechaInicio: Date;
  fechaFinal: Date;
  permisosIp: IPermisosIp[];
  permisosTrans: IPermisosTrans[];
  comentarios:string;
  usuario:string;
  turno:any
}
