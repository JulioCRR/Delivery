import { User } from 'app/admin/admin.service';
import { Peticion } from '../model/Peticion';
import { PeticionData } from '../model/PeticionData';
import { EnumAmbiente, EnumEstatus } from './EnumData';
import { NumberUtils } from './NumberUtils';
import { StringUtils } from './StringUtils';

export class CommonUtils {
  constructor() { }

  static getUserFullName(usuario: User): string {
    if (usuario) {
      return `${usuario.nombre} ${usuario.apaterno} ${usuario.amaterno}`;
    }
    return '';
  }

  static formatIP(ip: string): string {
    let format = '';
    let prefix = '';
    let arr = ip.trim().split('.');
    arr.forEach((octet) => {
      format += prefix + Number(octet);
      prefix = '.';
    });
    return format;
  }

  static isValidIP(ip: string): boolean {
    if (StringUtils.isBlank(ip)) {
      return false;
    }
    let arr = ip.trim().split('.');
    if (arr.length == 4) {
      let i = 0;
      while (i < 4) {
        let part = arr[i].trim();
        if (StringUtils.isBlank(part)) {
          break;
        }
        let octet = Number(part);
        if (isNaN(octet)) {
          break;
        }
        if (NumberUtils.isNotInRange(octet, 0, 254)) {
          break;
        }
        i++;
      }
      if (i == 4) {
        return true;
      }
    }
    return false;
  }

  static isPeticionEqualOrWildcard(petOld: Peticion, petNew: Peticion): boolean {
    if (StringUtils.isEqualOrDefault(petOld.ip, petNew.ip, Peticion.WILDCARD)) {
      return (
        StringUtils.isEqualOrDefault(petOld.usuarioCorp, petNew.usuarioCorp, Peticion.WILDCARD)
        && StringUtils.isEqualOrDefault(petOld.region, petNew.region, Peticion.WILDCARD)
        && StringUtils.isEqualOrDefault(petOld.transaccion, petNew.transaccion, Peticion.WILDCARD)
      );
    }
    return false;
  }

  static isPeticionDataEqualOrWildcard(petOld: PeticionData, petNew: PeticionData): boolean {
    if (StringUtils.isEqualOrDefault(petOld.ip, petNew.ip, Peticion.WILDCARD)) {
      return (
        StringUtils.isEqualOrDefault(petOld.usuarioCorp, petNew.usuarioCorp, Peticion.WILDCARD)
        && StringUtils.isEqualOrDefault(petOld.region, petNew.region, Peticion.WILDCARD)
        && StringUtils.isEqualOrDefault(petOld.transaccion, petNew.transaccion, Peticion.WILDCARD));
    }
    return false;
  }

  static isPeticionRepetida(petNew: Peticion, listPeticion: Peticion[]): boolean {
    if (listPeticion === undefined || listPeticion == null) {
      return false;
    }
    if (listPeticion.length > 0) {
      for (let i = 0; i < listPeticion.length; i++) {
        let petOld: Peticion = listPeticion[i];
        if (this.isPeticionEqualOrWildcard(petOld, petNew)) {
          return true;
        }
      }
    }
    return false;
  }

  static isPeticionDataRepetida(petNew: PeticionData, listPeticionData: PeticionData[]): boolean {
    if (listPeticionData.length > 0) {
      for (let i = 0; i < listPeticionData.length; i++) {
        let petOld: PeticionData = listPeticionData[i];
        if (petOld.id === petNew.id
          || this.isPeticionDataEqualOrWildcard(petOld, petNew)) {
          return true;
        }
      }
    }
    return false;
  }

  static addPeticionDataToList(data: PeticionData, listTarget: PeticionData[], clone?: boolean): boolean {
    if (!this.isPeticionDataRepetida(data, listTarget)) {
      if (clone) {
        listTarget.push(PeticionData.getClone(data));
      } else {
        listTarget.push(data);
      }
      return true;
    }
    return false;
  }

  static addListPeticionDataToList(listData: PeticionData[], listTarget: PeticionData[], clone?: boolean) {
    listData.forEach((data) => {
      this.addPeticionDataToList(data, listTarget, clone);
    });
  }
}
