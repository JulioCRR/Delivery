import { User } from "app/admin/admin.service";
import { Peticion } from "./Peticion";

export class WrapPeticion {
  constructor(
    public usuario: User,
    public urgente: boolean,
    public accion: number,
    public listPeticion: Peticion[],
    public filterQuery: string
  ) { }

  static getNewInstance(): WrapPeticion {
    return new WrapPeticion(null, false, -1, [], null);
  }
}
