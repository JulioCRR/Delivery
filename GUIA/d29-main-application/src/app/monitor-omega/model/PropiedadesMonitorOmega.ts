export class PropiedadesMonitorOmega {
  constructor(
    public intervaloRefrescado: number,
    public umbralAlertas: number,
    public monitorOn: boolean,
    public correosAlerta: string,
    public correosAlertaError: string,
    public maxCpu: number
  ) {}

  static getNewInstance(): PropiedadesMonitorOmega {
    return new PropiedadesMonitorOmega(0, 0.0, false, '', '', 0.0);
  }
}

export function mapPropiedades(response: any): PropiedadesMonitorOmega {
  let responseJson = response.json();
  let propiedades: PropiedadesMonitorOmega;
  if (responseJson) {
    propiedades = <PropiedadesMonitorOmega>({
      intervaloRefrescado: responseJson.intervaloRefrescado,
      umbralAlertas: responseJson.umbralAlertas,
      maxCpu: responseJson.maxCpu
    });
  }
  return propiedades;
}

export function toPropiedadesMonitorOmega(r: any): PropiedadesMonitorOmega {
  let porpiedadesMonitorOmega = <PropiedadesMonitorOmega>({
    intervaloRefrescado: r.intervaloRefrescado,
    umbralAlertas: r.umbralAlertas,
    monitorOn: r.monitorOn,
    correosAlerta: r.correosAlerta,
    correosAlertaError: r.correosAlertaError,
    maxCpu: r.maxCpu
  });
  return porpiedadesMonitorOmega;
}
