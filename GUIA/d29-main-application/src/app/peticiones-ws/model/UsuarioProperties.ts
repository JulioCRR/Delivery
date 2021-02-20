import { ResponsableUsuarioCorp, toResponsableUsuarioCorp } from "./ResponsableUsuarioCorp";
import { PeticionAutorizador, toPeticionAutorizador } from "./PeticionAutorizador";
import { Response } from "@angular/http";

export class UsuarioProperties {
  constructor(
    public respUsuCorp: ResponsableUsuarioCorp,
    public autorizador: PeticionAutorizador,
    public administrador: boolean
  ) { }

  static getNewInstance(): UsuarioProperties {
    return new UsuarioProperties(null, null, false);
  }

  static isAdminOrAutorizador(props: UsuarioProperties): boolean {
    return (props.administrador || props.autorizador != null);
  }
}

export function toUsuarioProperties(r: any): UsuarioProperties {
  let output: UsuarioProperties = null;
  if (r) {
    output = <UsuarioProperties>({
      respUsuCorp: toResponsableUsuarioCorp(r.respUsuCorp),
      autorizador: toPeticionAutorizador(r.autorizador),
      administrador: r.administrador
    });
  }
  return output;
}

export function toUsuarioPropertiesList(r: any): UsuarioProperties[] {
  let output: UsuarioProperties[] = [];
  if (r) {
    output = r.map(toUsuarioProperties);
  }
  return output;
}

export function mapUsuarioProperties(response: Response): UsuarioProperties {
  let output: UsuarioProperties = null;
  let responseJson = response.json();
  if (responseJson) {
    output = toUsuarioProperties(responseJson);
  }
  return output;
}

export function mapUsuarioPropertiesList(response: Response): UsuarioProperties[] {
  let output: UsuarioProperties[] = [];
  let responseJson = response.json();
  if (responseJson) {
    output = responseJson.map(toUsuarioProperties);
  }
  return output;
}
