import { Response } from "@angular/http";
import { SolicitudPeticion, toSolicitudPeticion } from "./SolicitudPeticion";
import { Peticion, toPeticionList } from "./Peticion";

export class WrapSolicitudPeticion {
  constructor(
    public solicitudPeticion: SolicitudPeticion,
    public listPeticion: Peticion[]
  ) { }

  static getNewInstance(): WrapSolicitudPeticion {
    return new WrapSolicitudPeticion(null, []);
  }
}

export function toWrapSolicitudPeticion(r: any): WrapSolicitudPeticion {
  let output: WrapSolicitudPeticion = null;
  if (r) {
    output = <WrapSolicitudPeticion>({
      solicitudPeticion: toSolicitudPeticion(r.solicitudPeticion),
      listPeticion: toPeticionList(r.listPeticion)
    });
  }
  return output;
}

export function mapWrapSolicitudPeticion(response: Response): WrapSolicitudPeticion {
  let responseJson = response.json();
  let output: WrapSolicitudPeticion = null;
  if (responseJson) {
    output = toWrapSolicitudPeticion(responseJson);
  }
  return output;
}

export function mapWrapSolicitudPeticionList(response: Response): WrapSolicitudPeticion[] {
  let responseJson = response.json();
  let output: WrapSolicitudPeticion[] = [];
  if (responseJson) {
    output = responseJson.map(toWrapSolicitudPeticion);
  }
  return output;
}
