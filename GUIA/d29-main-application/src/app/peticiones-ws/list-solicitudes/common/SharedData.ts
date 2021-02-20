import { User } from "app/admin/admin.service";
import { UsuarioProperties } from "app/peticiones-ws/model/UsuarioProperties";

export class SharedData {
  constructor() { }
  static ayuda: any = {};
  static dataSelectorSolPeticion: any = {};
  static dataSelectorSolUsuCorp: any = {};
  static usuario: User = User.getNewInstance();
  static usuarioProperties: UsuarioProperties = UsuarioProperties.getNewInstance();
}
