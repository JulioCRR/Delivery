import { Peticion } from "./Peticion";
import { EnumAmbiente, EnumEstatus } from "../utils/EnumData";
import { SolicitudPeticion } from "./SolicitudPeticion";
import { StringUtils } from "../utils/StringUtils";

export class PeticionData {
  constructor(
    public id: Number,
    public usuarioCorp: string,
    public ip: string,
    public region: string,
    public transaccion: string,
    public peticionesPorMinuto: string,
    public solicitudPeticion: string,
    public ambiente: string,
    public estatus: string,
    public repetida: boolean
  ) { }

  static getNewInstance(id?: Number): PeticionData {
    return new PeticionData(id, '', '', '', '', '', '', '', '', false);
  }

  static getClone(p: PeticionData) {
    return new PeticionData(p.id, p.usuarioCorp, p.ip, p.region, p.transaccion, p.peticionesPorMinuto, p.solicitudPeticion, p.ambiente, p.estatus, p.repetida);
  }

  static getColumns(): any[] {
    return [
      { header: 'ID', field: 'id' },
      { header: 'Usuario Corporativo', field: 'usuarioCorp' },
      { header: 'IP', field: 'ip' },
      { header: 'Región', field: 'region' },
      { header: 'Transacción', field: 'transaccion' },
      { header: 'Peticiones por Minuto', field: 'peticionesPorMinuto' },
      { header: 'Ambiente', field: 'ambiente' },
      { header: 'Estatus', field: 'estatus' },
      { header: 'ID Solicitud', field: 'solicitudPeticion' }
    ];
  }

  static toPeticionData(r: Peticion): PeticionData {
    let output: PeticionData = null;
    if (r) {
      output = <PeticionData>({
        id: r.id,
        usuarioCorp: r.usuarioCorp,
        ip: r.ip,
        region: r.region,
        transaccion: r.transaccion,
        peticionesPorMinuto: `${r.peticionesPorMinuto}`,
        solicitudPeticion: r.solicitudPeticion ? `${r.solicitudPeticion.id}` : '',
        ambiente: EnumAmbiente.getName(r.ambiente),
        estatus: EnumEstatus.getName(r.estatus)
      });
    }
    return output;
  }

  static toPeticion(r: PeticionData): Peticion {
    let output: Peticion = null;
    if (r) {
      let petSol: SolicitudPeticion = null;
      if (!StringUtils.isBlank(r.solicitudPeticion) && r.solicitudPeticion != '-1') {
        petSol = SolicitudPeticion.getNewInstance(Number(r.solicitudPeticion));
      }
      let petId: Number = null;
      if (r.id != null && r.id > 0) {
        petId = r.id;
      }
      output = <Peticion>({
        id: petId,
        usuarioCorp: r.usuarioCorp,
        ip: r.ip,
        region: r.region,
        transaccion: r.transaccion,
        peticionesPorMinuto: Number(r.peticionesPorMinuto),
        solicitudPeticion: petSol,
        ambiente: EnumAmbiente.getValue(r.ambiente),
        estatus: EnumEstatus.getValue(r.estatus)
      });
    }
    return output;
  }
}
