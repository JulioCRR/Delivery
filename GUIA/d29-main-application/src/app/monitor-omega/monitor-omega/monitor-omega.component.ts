import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MonitorOmegaService} from '../monitor-omega.service';
import { ReportePantallaOmega } from '../model/ReportePantallaOmega';
import { PropiedadesMonitorOmega } from '../model/PropiedadesMonitorOmega';
import { endpointServer } from '../../../environments/environment';
import { AlertService } from '../../alert.service';
import { SimpleHelp } from '../../help/model/SimpleHelpModel';
import { ImageHelp } from '../../help/model/ImageHelpModel';
import { connect, disconnect, initData, resetDTOrder, startTimer } from '../scripts/dataTableFunctions';

declare let jQuery: any;

// Llama a la desconexion antes de quitar la pagina (F5)
$(window).on('beforeunload', function(){
  disconnect();
});

@Component({
  selector: 'app-monitor-omega',
  templateUrl: './monitor-omega.component.html',
  styleUrls: ['./monitor-omega.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MonitorOmegaComponent implements OnInit, OnDestroy {

  private baseUrl: string = endpointServer.basePath;
  private reportePantallaOmega: ReportePantallaOmega;
  private helpAssets = 'assets/images/help';
  public isAdmin = false;
  public propiedadesUser = PropiedadesMonitorOmega.getNewInstance();
  public propiedades = PropiedadesMonitorOmega.getNewInstance();
  public ayudaFecha: SimpleHelp;
  public ayudaAlertas: SimpleHelp;
  public ayudaTiempo: SimpleHelp;
  public ayudaUmbral: SimpleHelp;
  public ayudaPropiedades: SimpleHelp;
  public ayudaReordenar: SimpleHelp;
  public ayudaTabla: ImageHelp;
  public ayudaMonitorOn: SimpleHelp;
  public ayudaMaxCpu: SimpleHelp;

  constructor(private service: MonitorOmegaService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.baseUrl = this.service.getEndPoint();
    this.cargarAyuda();
    this.refrescaDatos();
    startTimer();
  }

  ngOnDestroy() {
    disconnect();
  }

  public clearPropiedades() {
    this.service.getPropiedadesMonitor().subscribe((p) => {
      this.propiedades = p;
      this.propiedadesUser = new PropiedadesMonitorOmega(
        this.propiedades.intervaloRefrescado,
        this.propiedades.umbralAlertas,
        this.propiedades.monitorOn,
        this.propiedades.correosAlerta,
        this.propiedades.correosAlertaError,
        this.propiedades.maxCpu);
    });
  }

  public savePropiedades() {
    this.service.actualizaPropiedadesMonitor(this.propiedadesUser).subscribe((p) => {
      if (p.status === 200) {
        this.refrescaDatos();
        this.alertService.push({severity: 'info', summary: 'Actualizado', detail: 'Propiedades actualizadas'});
      } else {
        this.alertService.push({severity: 'error', summary: 'Sin Actualizar', detail: 'Ocurrio un error al actualizar las propiedades'});
      }
    });
    jQuery('#adminMonitor').modal('hide');
  }

  public reordena() {
    resetDTOrder();
  }

  private cargarAyuda() {
    this.ayudaFecha = new SimpleHelp('Última Actualizacion',
      'Fecha y hora de la última actualización de los datos de Omega');
    this.ayudaAlertas = new SimpleHelp('Alertas', 'Alertas registradas en la última actualización');
    this.ayudaTiempo = new SimpleHelp('Tiempo Refrescado', 'Tiempo de intervalo del refrescado de datos de Omega');
    this.ayudaUmbral = new SimpleHelp('Umbral Tiempo', 'Tiempo que una transacción de Omega debe durar para ser considerada como alerta');
    this.ayudaPropiedades = new SimpleHelp('Editar Propiedades', 'Permite editar el tiempo de refrescado y el umbral de alertas');
    this.ayudaReordenar = new SimpleHelp('Reordenar Datos',
      'Reordena la tabla mostrando las transacciones de alerta, normales y las ignoradas respectivamente');
    this.ayudaTabla = new ImageHelp(
      `${this.helpAssets}/monitor-omega-help_tabla.png`,
      'Colores usados para identificar las transacciones alertadas (rebasa umbral de alertas), ' +
        'normales e ignoradas (tiempos altos son normales)',
      'Ayuda Tabla Omega');
    this.ayudaMonitorOn = new SimpleHelp('Estado del Monitor', 'Estado en el que se encuentra el monitor (Encendido/Apagado)');
    this.ayudaMaxCpu = new SimpleHelp('Umbral CPU', 'Porcentaje máximo permitido del CPU antes de ser considerado como alerta');
  }

  private refrescaDatos() {
    this.service.getReportePantallaOmega().subscribe((p) => {
      this.reportePantallaOmega = p;
      if (this.reportePantallaOmega) {
        initData(this.reportePantallaOmega);
        connect(this.baseUrl);
      }
    });
  }
}
