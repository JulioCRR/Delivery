import { Response } from '@angular/http';
import { User, toUsuario } from '../../admin/admin.service';

export class SolicitudUsuarioCorp {
  constructor(
    public id: Number,
    public fechaRegistro: Date,
    public estatus: number,
    public usuarioCorp: string,
    public solicitante: User,
    public justificacion: string,
    public comentarioResponsable: string,
  ) { }

  static MIN_CHARS: number = 10;
  static MAX_CHARS: number = 500;
  static getNewInstance(): SolicitudUsuarioCorp {
    return new SolicitudUsuarioCorp(null, null, -1, '', User.getNewInstance(), '', '');
  }
}

export function toSolicitudUsuarioCorp(r: any): SolicitudUsuarioCorp {
  let output: SolicitudUsuarioCorp = null;
  if (r) {
    output = <SolicitudUsuarioCorp>({
      id: r.id,
      fechaRegistro: r.fechaRegistro,
      estatus: r.estatus,
      usuarioCorp: r.usuarioCorp,
      solicitante: toUsuario(r.solicitante),
      justificacion: r.justificacion,
      comentarioResponsable: r.comentarioResponsable
    });
  }
  return output;
}

export function toSolicitudUsuarioCorpList(r: any): SolicitudUsuarioCorp[] {
  let output: SolicitudUsuarioCorp[] = [];
  if (r) {
    output = r.map(toSolicitudUsuarioCorp);
  }
  return output;
}

export function mapSolicitudUsuarioCorp(response: Response): SolicitudUsuarioCorp {
  let responseJson = response.json();
  let output: SolicitudUsuarioCorp = null;
  if (responseJson) {
    output = toSolicitudUsuarioCorp(responseJson);
  }
  return output;
}

export function mapSolicitudUsuarioCorpList(response: Response): SolicitudUsuarioCorp[] {
  let responseJson = response.json();
  let output: SolicitudUsuarioCorp[] = [];
  if (responseJson) {
    output = responseJson.map(toSolicitudUsuarioCorp);
  }
  return output;
}
