import { Response } from "@angular/http";

export class M2kCatTransaccionesFront {
  constructor(
    public id: Number,
    public transaccion: string,
    public nombrePantalla: string,
    public descripcion: string,
    public transaccionPantallaTransient: string,
    public responsableM2k: string,
    public correspondencia: string
  ) { }

  static getNewInstance(id?: Number): M2kCatTransaccionesFront {
    return new M2kCatTransaccionesFront(id, '', '', '', '', '', '');
  }
}

export function toM2kCatTransaccionesFront(r: any): M2kCatTransaccionesFront {
  let output: M2kCatTransaccionesFront = null;
  if (r) {
    output = <M2kCatTransaccionesFront>({
      id: r.id,
      transaccion: r.transaccion,
      nombrePantalla: r.nombrePantalla,
      descripcion: r.descripcion,
      transaccionPantallaTransient: `${r.transaccion.trim()} (${r.nombrePantalla.trim()})`,
      responsableM2k: r.responsableM2k,
      correspondencia: r.correspondencia
    });
  }
  return output;
}

export function toM2kCatTransaccionesFrontList(r: any): M2kCatTransaccionesFront[] {
  let output: M2kCatTransaccionesFront[] = [];
  if (r) {
    output = r.map(toM2kCatTransaccionesFront);
  }
  return output;
}

export function mapM2kCatTransaccionesFront(response: Response): M2kCatTransaccionesFront {
  let output: M2kCatTransaccionesFront = null;
  let responseJson = response.json();
  if (responseJson) {
    output = toM2kCatTransaccionesFront(responseJson);
  }
  return output;
}

export function mapM2kCatTransaccionesFrontList(response: Response): M2kCatTransaccionesFront[] {
  let output: M2kCatTransaccionesFront[] = [];
  let responseJson = response.json();
  if (responseJson) {
    output = responseJson.map(toM2kCatTransaccionesFront);
  }
  return output;
}
