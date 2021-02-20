import { Response } from "@angular/http";

export class Area {
  constructor(
    public id: Number,
    public nombre: string,
    public clave: string,
    public areaPadre: Area
  ) { }

  static getNewInstance(): Area {
    return new Area(null, '', '', null);
  }
}

export function toArea(r: any): Area {
  let output: Area = null;
  if (r) {
    output = <Area>({
      id: r.id,
      nombre: r.nombre,
      clave: r.clave,
      areaPadre: toArea(r.areaPadre)
    });
  }
  return output;
}

export function toAreaList(r: any): Area[] {
  let output: Area[] = [];
  if (r) {
    output = r.map(toArea);
  }
  return output;
}

export function mapArea(response: Response): Area {
  let output: Area = null;
  let responseJson = response.json();
  if (responseJson) {
    output = toArea(responseJson);
  }
  return output;
}

export function mapAreaList(response: Response): Area[] {
  let output: Area[] = [];
  let responseJson = response.json();
  if (responseJson) {
    output = toAreaList(responseJson);
  }
  return output;
}
