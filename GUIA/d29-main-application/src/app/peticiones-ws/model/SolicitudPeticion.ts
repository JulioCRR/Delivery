import { Response } from "@angular/http";
import { User, toUsuario } from "app/admin/admin.service";
import { Area, toArea } from "../../core/model/Area";
import { AplicativoTelcel, toAplicativoTelcel } from "./AplicativoTelcel";

export class SolicitudPeticion {
  constructor(
    public id: Number,
    public fechaRegistro: Date,
    public estatus: number,
    public aplicativo: AplicativoTelcel,
    public ambiente: number,
    public fechaCaducidad: Date,
    public solicitante: User,
    public justificacion: string,
    public autorizador: User,
    public fechaAutorizacion: Date,
    public comentarioAutorizador: string,
  ) { }

  static readonly MIN_CHARS: number = 10;
  static readonly MAX_CHARS: number = 500;

  static getNewInstance(id?: Number): SolicitudPeticion {
    return new SolicitudPeticion(id, null, -1, null, -1, null, null, '', null, null, '');
  }
}

export function toSolicitudPeticion(r: any): SolicitudPeticion {
  let output: SolicitudPeticion = null;
  if (r) {
    output = <SolicitudPeticion>({
      id: r.id,
      fechaRegistro: r.fechaRegistro,
      estatus: r.estatus,
      aplicativo: toAplicativoTelcel(r.aplicativo),
      ambiente: r.ambiente,
      fechaCaducidad: r.fechaCaducidad,
      solicitante: toUsuario(r.solicitante),
      justificacion: r.justificacion,
      autorizador: toUsuario(r.autorizador),
      fechaAutorizacion: r.fechaAutorizacion,
      comentarioAutorizador: r.comentarioAutorizador,
    });
  }
  return output;
}

export function toSolicitudPeticionList(r: any): SolicitudPeticion[] {
  let output: SolicitudPeticion[] = [];
  if (r) {
    output = r.map(toSolicitudPeticion);
  }
  return output;
}

export function mapSolicitudPeticion(response: Response): SolicitudPeticion {
  let responseJson = response.json();
  let output: SolicitudPeticion = null;
  if (responseJson) {
    output = toSolicitudPeticion(responseJson);
  }
  return output;
}

export function mapSolicitudPeticionList(response: Response): SolicitudPeticion[] {
  let responseJson = response.json();
  let output: SolicitudPeticion[] = [];
  if (responseJson) {
    output = toSolicitudPeticionList(responseJson);
  }
  return output;
}
