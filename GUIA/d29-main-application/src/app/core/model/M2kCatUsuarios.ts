import { Response } from "@angular/http";

export class M2kCatUsuarios {
  constructor(
    public id: Number,
    public claveUsuario: string,
    public descUsuario: string
  ) { }

  static getNewInstance(): M2kCatUsuarios {
    return new M2kCatUsuarios(null, '', '');
  }
}

export function toM2kCatUsuarios(r: any): M2kCatUsuarios {
  let output: M2kCatUsuarios = null;
  if (r) {
    output = <M2kCatUsuarios>({
      id: r.id,
      claveUsuario: r.claveUsuario,
      descUsuario: r.descUsuario
    });
  }
  return output;
}

export function toM2kCatUsuariosList(r: any): M2kCatUsuarios[] {
  let output: M2kCatUsuarios[] = [];
  if (r) {
    output = r.map(toM2kCatUsuarios);
  }
  return output;
}

export function mapM2kCatUsuarios(response: Response): M2kCatUsuarios {
  let output: M2kCatUsuarios = null;
  let responseJson = response.json();
  if (responseJson) {
    output = toM2kCatUsuarios(responseJson);
  }
  return output;
}

export function mapM2kCatUsuariosList(response: Response): M2kCatUsuarios[] {
  let output: M2kCatUsuarios[] = [];
  let responseJson = response.json();
  if (responseJson) {
    output = responseJson.map(toM2kCatUsuarios);
  }
  return output;
}
