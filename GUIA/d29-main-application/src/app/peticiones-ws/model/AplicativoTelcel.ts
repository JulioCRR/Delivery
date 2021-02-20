import { Response } from "@angular/http";
import { Area, toArea } from "app/core/model/Area";
import { StringUtils } from "../utils/StringUtils";

export class AplicativoTelcel {
  constructor(
    public id: Number,
    public nombre: string,
    public descripcion: string,
    public areaResponsable: Area,
    public nombreCompuesto?: string
  ) { }

  public static readonly MAX_NOMBRE: number = 255;
  public static readonly MAX_DESCRIPCION: number = 500;

  static getNewInstance(id?: Number): AplicativoTelcel {
    return new AplicativoTelcel(id, '', '', null, '');
  }

  static getAreaNombre(aplicativo: AplicativoTelcel): string {
    if (aplicativo && aplicativo.areaResponsable) {
      return aplicativo.areaResponsable.nombre;
    }
    return '';
  }
}

export function toAplicativoTelcel(r: any): AplicativoTelcel {
  let output: AplicativoTelcel = null;
  if (r) {
    const area: Area = toArea(r.areaResponsable);
    const name: string = StringUtils.trimToEmpty(r.nombre);
    output = <AplicativoTelcel>({
      id: r.id,
      nombre: name,
      descripcion: r.descripcion,
      areaResponsable: area,
      nombreCompuesto: `${name} (${area ? StringUtils.toUpperCase(area.nombre, true) : 'SIN AREA'})`
    });
  }
  return output;
}

export function toAplicativoTelcelList(r: any): AplicativoTelcel[] {
  let output: AplicativoTelcel[] = [];
  if (r) {
    output = r.map(toAplicativoTelcel);
  }
  return output;
}

export function mapAplicativoTelcel(response: Response): AplicativoTelcel {
  let output: AplicativoTelcel = null;
  let responseJson = response.json();
  if (responseJson) {
    output = toAplicativoTelcel(responseJson);
  }
  return output;
}

export function mapAplicativoTelcelList(response: Response): AplicativoTelcel[] {
  let output: AplicativoTelcel[] = [];
  let responseJson = response.json();
  if (responseJson) {
    output = toAplicativoTelcelList(responseJson);
  }
  return output;
}
