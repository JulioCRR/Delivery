import {OmegaData, toOmegaData} from './OmegaData';
import {PropiedadesMonitorOmega, toPropiedadesMonitorOmega} from './PropiedadesMonitorOmega';

export class ReportePantallaOmega {
  constructor(
    public lastUpdate: Date,
    public alertsCount: number,
    public omegaData: OmegaData,
    public propiedadesMonitorOmega: PropiedadesMonitorOmega
  ) {}

  static getNewInstance(): ReportePantallaOmega {
    return new ReportePantallaOmega(new Date(), 0, OmegaData.getNewInstance(), PropiedadesMonitorOmega.getNewInstance());
  }
}

export function mapPantalla(response: any): ReportePantallaOmega {
  let pantalla: ReportePantallaOmega = ReportePantallaOmega.getNewInstance();
  let responseJson = response.json();
  if (responseJson) {
    pantalla = <ReportePantallaOmega>({
      lastUpdate: responseJson.lastUpdate,
      alertsCount: responseJson.alertsCount,
      omegaData: toOmegaData(responseJson.omegaData),
      propiedadesMonitorOmega: toPropiedadesMonitorOmega(responseJson.propiedadesMonitorOmega)
    });
  }
  return pantalla;
}
