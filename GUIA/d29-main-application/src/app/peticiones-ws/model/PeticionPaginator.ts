import { Response } from "@angular/http";
import { Peticion, toPeticionList, toPeticion } from "./Peticion";

export class PeticionPaginator {
  constructor(
    public listPeticion: Peticion[],
    public size: number,
    public totalElements: number,
    public totalPages: number,
    public number: number,
  ) { }

  static getNewInstance(): PeticionPaginator {
    return new PeticionPaginator([], 0, 0, 0, 0);
  }
}

export function toPeticionPaginator(r: any): PeticionPaginator {
  let output: PeticionPaginator = null;
  if (r) {
    output = <PeticionPaginator>({
      listPeticion: toPeticionList(r.content),
      size: r.size,
      totalElements: r.totalElements,
      totalPages: r.totalPages,
      number: r.number
    });
  }
  return output;
}

export function mapPeticionPaginator(response: Response): PeticionPaginator {
  let output: PeticionPaginator = null;
  let responseJson = response.json();
  if (responseJson) {
    output = toPeticionPaginator(responseJson);
  }
  return output;
}
