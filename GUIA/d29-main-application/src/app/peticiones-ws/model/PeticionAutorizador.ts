import { Response } from "@angular/http";
import { User, toUsuario } from "app/admin/admin.service";

export enum NivelPeticionAutorizador {
  GERENTE = 1,
  JEFE = 2,
  SUPERVISOR = 3
}

export class PeticionAutorizador {
  constructor(
    public id: Number,
    public usuario: User,
    public nivel: number
  ) { }

  static getNewInstance(): PeticionAutorizador {
    return new PeticionAutorizador(null, null, 0);
  }

  static isAutorizadorDev(autorizador: PeticionAutorizador): boolean {
    return (autorizador.nivel === NivelPeticionAutorizador.GERENTE);
  }
}

export function toPeticionAutorizador(r: any): PeticionAutorizador {
  let output: PeticionAutorizador = null;
  if (r) {
    output = <PeticionAutorizador>({
      id: r.id,
      usuario: toUsuario(r.idUsuario),
      nivel: r.nivel
    });
  }
  return output;
}

export function toPeticionAutorizadorList(r: any): PeticionAutorizador[] {
  let output: PeticionAutorizador[] = [];
  if (r) {
    output = r.map(toPeticionAutorizador);
  }
  return output;
}

export function mapPeticionAutorizador(response: Response): PeticionAutorizador {
  let responseJson = response.json();
  let output: PeticionAutorizador = PeticionAutorizador.getNewInstance();
  if (responseJson) {
    output = toPeticionAutorizador(responseJson);
  }
  return output;
}

export function mapPeticionAutorizadorList(response: Response): PeticionAutorizador[] {
  let responseJson = response.json();
  let output: PeticionAutorizador[] = [];
  if (responseJson) {
    output = responseJson.map(toPeticionAutorizador);
  }
  return output;
}
