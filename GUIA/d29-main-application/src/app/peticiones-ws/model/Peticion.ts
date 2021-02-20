import { Response } from "@angular/http";
import { SolicitudPeticion } from "./SolicitudPeticion";
import { StringUtils } from "../utils/StringUtils";

export class Peticion {
  constructor(
    public id: Number,
    public usuarioCorp: string,
    public ip: string,
    public region: string,
    public transaccion: string,
    public peticionesPorMinuto: number,
    public solicitudPeticion: SolicitudPeticion,
    public ambiente: number,
    public estatus: number,
    public repetida?: boolean
  ) { }

  static MIN_PPM: number = 1;
  static MAX_PPM: number = 150;
  static WILDCARD: string = '*';
  static ALL_IP: string = '0.0.0.0';

  static getNewInstance(): Peticion {
    return new Peticion(null, '', '', '', '', 0, null, -1, -1, false);
  }

  static getClone(p: Peticion): Peticion {
    return new Peticion(p.id, p.usuarioCorp, p.ip, p.region, p.transaccion, p.peticionesPorMinuto, p.solicitudPeticion, p.ambiente, p.estatus, p.repetida);
  }
}

export function toPeticion(r: any): Peticion {
  let output: Peticion = null;
  if (r) {
    output = <Peticion>({
      id: r.id,
      usuarioCorp: r.usuarioCorp,
      ip: r.ip,
      region: r.region,
      transaccion: r.transaccion,
      peticionesPorMinuto: r.peticionesPorMinuto,
      solicitudPeticion: r.solicitudPeticion,
      ambiente: r.ambiente,
      estatus: r.estatus,
      repetida: r.repetida
    });
  }
  return output;
}

export function toPeticionList(r: any): Peticion[] {
  let output: Peticion[] = [];
  if (r) {
    output = r.map(toPeticion);
  }
  return output;
}

export function mapPeticion(response: Response): Peticion {
  let responseJson = response.json();
  let output: Peticion = null;
  if (responseJson) {
    output = toPeticion(responseJson);
  }
  return output;
}

export function mapPeticionList(response: Response): Peticion[] {
  let responseJson = response.json();
  let output: Peticion[] = [];
  if (responseJson) {
    output = responseJson.map(toPeticion);
  }
  return output;
}
