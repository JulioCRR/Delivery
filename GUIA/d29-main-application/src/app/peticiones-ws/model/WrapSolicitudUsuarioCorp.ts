import { Response } from "@angular/http";
import { ResponsableUsuarioCorp, toResponsableUsuarioCorp } from "./ResponsableUsuarioCorp";
import { SolicitudUsuarioCorp, toSolicitudUsuarioCorp, toSolicitudUsuarioCorpList } from "./SolicitudUsuarioCorp";

export class WrapSolicitudUsuarioCorp {
  constructor(
    public respUsuCorp: ResponsableUsuarioCorp,
    public solicitud: SolicitudUsuarioCorp,
    public reporte?: number
  ) { }

  static getNewInstance(): WrapSolicitudUsuarioCorp {
    return new WrapSolicitudUsuarioCorp(null, null, 0);
  }
}

export function toWrapSolicitudUsuarioCorp(r: any): WrapSolicitudUsuarioCorp {
  let output: WrapSolicitudUsuarioCorp = null;
  if (r) {
    output = <WrapSolicitudUsuarioCorp>({
      respUsuCorp: toResponsableUsuarioCorp(r.respUsuCorp),
      solicitud: toSolicitudUsuarioCorp(r.solicitud)
    });
  }
  return output;
}

export function mapWrapSolicitudUsuarioCorp(response: Response): WrapSolicitudUsuarioCorp {
  let output: WrapSolicitudUsuarioCorp = null;
  let responseJson = response.json();
  if (responseJson) {
    output = toWrapSolicitudUsuarioCorp(responseJson);
  }
  return output;
}
