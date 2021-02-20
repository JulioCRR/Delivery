import { Response } from "@angular/http";
import { M2kCatTransaccionesFront, toM2kCatTransaccionesFrontList } from "../../catalogos/model/M2kCatTransaccionesFront";
import { Area, toAreaList } from "../../core/model/Area";
import { M2kCatUsuarios, toM2kCatUsuariosList } from "../../core/model/M2kCatUsuarios";
import { AplicativoTelcel, toAplicativoTelcelList } from "./AplicativoTelcel";
import { UsuarioProperties, toUsuarioProperties } from "./UsuarioProperties";

export class PeticionProperties {
  constructor(
    public listM2kCatUsuarios: M2kCatUsuarios[],
    public listM2kCatTransaccionesFront: M2kCatTransaccionesFront[],
    public listArea: Area[],
    public usuarioProperties: UsuarioProperties,
    public listAplicativo: AplicativoTelcel[]
  ) { }

  static getNewInstance(): PeticionProperties {
    return new PeticionProperties([], [], [], null, []);
  }
}

export function toPeticionProperties(r: any): PeticionProperties {
  let output: PeticionProperties = null;
  if (r) {
    output = <PeticionProperties>({
      listM2kCatUsuarios: toM2kCatUsuariosList(r.listM2kCatUsuarios),
      listM2kCatTransaccionesFront: toM2kCatTransaccionesFrontList(r.listM2kCatTransaccionesFront),
      listArea: toAreaList(r.listArea),
      usuarioProperties: toUsuarioProperties(r.usuarioProperties),
      listAplicativo: toAplicativoTelcelList(r.listAplicativo)
    });
  }
  return output;
}

export function mapPeticionProperties(response: Response) {
  let responseJson = response.json();
  let output: PeticionProperties = PeticionProperties.getNewInstance();
  if (responseJson) {
    output = toPeticionProperties(responseJson);
  }
  return output;
}
