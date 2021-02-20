import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertService, AlertSeverity } from '../../../alert.service';
import { AuthService } from '../../../app.service';
import { PeticionesWSService } from '../../peticiones-ws.service';
import { User } from '../../../admin/admin.service';
import { StringUtils } from '../../utils/StringUtils';
import { SolicitudPeticion } from '../../model/SolicitudPeticion';
import { ModalData } from '../../utils/ModalData';
import { EnumTipoSolicitud, EnumEstatus, EnumAmbiente } from '../../utils/EnumData';
import { UsuarioProperties } from '../../model/UsuarioProperties';
import { DataTable, SelectItem } from 'primeng/primeng';
import { CommonUtils } from '../../utils/CommonUtils';
import { Constants } from '../../utils/Constants';
import { SharedData } from '../common/SharedData';
import { HttpStatusCode } from 'app/core/common/HttpStatusCode';
import { PeticionData } from 'app/peticiones-ws/model/PeticionData';
import { AplicativoTelcel } from 'app/peticiones-ws/model/AplicativoTelcel';
import { DateUtils } from 'app/peticiones-ws/utils/DateUtils';

class SolicitudPeticionData {
  constructor(
    public id: Number,
    public fechaRegistro: string,
    public estatus: string,
    public aplicativo: string,
    public areaResponsable: string,
    public ambiente: string,
    public fechaCaducidad: string,
    public solicitante: string,
    public justificacion: string,
    public autorizador: string,
    public fechaAutorizacion: string,
    public comentarioAutorizador: string
  ) { }

  static getNewInstance(id?: Number): SolicitudPeticionData {
    return new SolicitudPeticionData(id, '', '', '', '', '', '', '', '', '', '', '');
  }

  static toSolicitudPeticionData(r: SolicitudPeticion): SolicitudPeticionData {
    let output: SolicitudPeticionData = null;
    const NA: string = 'N/A';
    const DATE_FORMAT: string = 'DD/MM/YYYY';
    if (r) {
      output = <SolicitudPeticionData>({
        id: r.id,
        fechaRegistro: DateUtils.formatDate(r.fechaRegistro, DATE_FORMAT, NA),
        estatus: EnumEstatus.getName(r.estatus),
        aplicativo: r.aplicativo ? r.aplicativo.nombre : NA,
        areaResponsable: StringUtils.defaultIfBlank(AplicativoTelcel.getAreaNombre(r.aplicativo), NA),
        ambiente: EnumAmbiente.getName(r.ambiente),
        fechaCaducidad: DateUtils.formatDate(r.fechaCaducidad, DATE_FORMAT, NA),
        solicitante: CommonUtils.getUserFullName(r.solicitante),
        justificacion: r.justificacion,
        autorizador: CommonUtils.getUserFullName(r.autorizador),
        fechaAutorizacion: DateUtils.formatDate(r.fechaAutorizacion, DATE_FORMAT, NA),
        comentarioAutorizador: r.comentarioAutorizador
      });
    }
    return output;
  }
}

@Component({
  selector: 'app-list-sol-peticiones-web',
  templateUrl: './list-sol-peticiones-web.component.html',
  styleUrls: ['./list-sol-peticiones-web.component.css']
})
export class ListSolPeticionesWebComponent implements OnInit {
  @Output('outputModalData') outputModalData: EventEmitter<ModalData> = new EventEmitter<ModalData>();
  @ViewChild('dtSolPeticion')
  private dtSolicitud: DataTable;
  @ViewChild('dtPeticion')
  private dtPeticion: DataTable;

  public readonly AUTORIZAR: number = EnumEstatus.AUTORIZADA;
  public readonly RECHAZAR: number = EnumEstatus.RECHAZADA;
  public readonly CANCELAR: number = EnumEstatus.CANCELADA;
  public readonly REVOCAR: number = EnumEstatus.EXPIRADA;

  public ayuda: any;
  public dataSelector: any;
  public listSolicitudData: SolicitudPeticionData[];
  public listSelSolicitudData: SolicitudPeticionData[];
  public selTipoSolicitud: number;
  public isTipoSolicitudEnabled: boolean;
  public isSelectable: boolean;
  public isOwner: boolean;
  public solicitudData: SolicitudPeticionData;

  private usuario: User;
  private usuarioProperties: UsuarioProperties;
  private isAdmin: boolean;
  private isAutorizador: boolean;
  private tipoAccion: number;
  private selAccion: number;
  private listSolicitud: SolicitudPeticion[];
  private listSelSolicitud: SolicitudPeticion[];
  private selIdSolicitud: number;
  private listPeticionData: PeticionData[];
  private defTipoSol: number;

  private isResponse: boolean;
  private isValidListSelected: boolean;
  private isValidListPeticion: boolean;

  constructor(private service: PeticionesWSService, private authService: AuthService, private alertService: AlertService) {
    this.ayuda = SharedData.ayuda;
    this.dataSelector = SharedData.dataSelectorSolPeticion;
  }

  ngOnInit() {
    this.isAdmin = false;
    this.isAutorizador = false;
    this.isTipoSolicitudEnabled = false;
    this.selTipoSolicitud = EnumTipoSolicitud.PROPIAS;
    this.defTipoSol = EnumTipoSolicitud.PROPIAS;
    this.resetSolicitudData();
  }

  initComponent() {
    this.usuario = SharedData.usuario;
    this.usuarioProperties = SharedData.usuarioProperties;
    this.isAdmin = this.usuarioProperties.administrador;
    this.isAutorizador = (this.usuarioProperties.autorizador != null);
    const key = Constants.tipoSolicitud;
    if (!this.isAutorizador) {
      this.dataSelector[key] = this.dataSelector[key].filter((selector: SelectItem) => {
        return selector.label !== EnumTipoSolicitud.N_EXTERNAS;
      });
    }
    if (this.isAdmin) {
      this.dataSelector[key].push({ label: EnumTipoSolicitud.N_TODAS, value: EnumTipoSolicitud.TODAS });
    }
    this.isTipoSolicitudEnabled = (this.dataSelector[key].length > 1);
    this.defTipoSol = this.dataSelector[key][0] ? this.dataSelector[key][0].value : -1;
    if (this.defTipoSol == EnumTipoSolicitud.PROPIAS && this.isAutorizador) {
      this.defTipoSol = EnumTipoSolicitud.EXTERNAS;
    }
    this.selTipoSolicitud = this.defTipoSol;
    this.isResponse = true;
    this.consultarSolicitudes();
  }

  clearScreen() {
    this.selTipoSolicitud = this.defTipoSol;
    this.resetSolicitudData();
    this.consultarSolicitudes();
  }

  actualizarModal(inputModal: ModalData) {
    if (inputModal) {
      this.actualizarSolicitudes(inputModal.input);
    }
  }

  protected resetSolicitudData() {
    this.listSolicitud = [];
    this.listSelSolicitud = [];
    this.listSolicitudData = [];
    this.listSelSolicitudData = [];
    this.solicitudData = null;
    this.selIdSolicitud = -1;
    this.tipoAccion = -1;
    this.selAccion = -1;
    this.isSelectable = true;
    this.isValidListSelected = false;
    this.isOwner = false;
    if (this.dtSolicitud) {
      this.dtSolicitud.reset();
    }
    this.resetPeticionData();
  }

  protected resetPeticionData() {
    this.listPeticionData = [];
    this.isValidListPeticion = false;
    if (this.dtPeticion) {
      this.dtPeticion.reset();
    }
  }

  protected consultarSolicitudes() {
    switch (this.selTipoSolicitud) {
      case EnumTipoSolicitud.PROPIAS:
        this.isOwner = true;
        this.service.getAllSolPeticionBySolicitante(this.usuario.id).subscribe((data) => {
          this.fillData(data);
        });
        break;
      case EnumTipoSolicitud.EXTERNAS:
        this.service.getAllSolPeticionByNivelAutorizador(this.usuarioProperties.autorizador.nivel).subscribe((data) => {
          this.fillData(data);
        });
        break;
      case EnumTipoSolicitud.TODAS:
        this.isSelectable = false;
        this.service.getAllSolPeticion().subscribe((data) => {
          this.fillData(data);
        });
        break;
      default:
        console.log(`Ni idea como es que usuaste una solicitud con un valor de ${this.selTipoSolicitud}`);
        this.alertService.alert(AlertSeverity.ERROR, 'Error en Búsqueda', 'Ocurrió un error al buscar las solicitudes');
    }
  }

  private fillData(data: SolicitudPeticion[]) {
    if (data == null) {
      this.alertService.alert(AlertSeverity.ERROR, 'Error en Búsqueda', 'Ocurrió un error al buscar las solicitudes');
      this.isResponse = false;
      return;
    }
    this.listSolicitud = data;
    this.listSolicitudData = this.listSolicitud.map(SolicitudPeticionData.toSolicitudPeticionData);
    if (this.dtSolicitud) {
      this.dtSolicitud.sortOrder = -1;
      this.dtSolicitud.sortField = 'id';
    }
    if (!this.isResponse && this.listSolicitud.length == 0) {
      this.alertService.alert(AlertSeverity.WARN, 'Sin Solicitudes', `No hay solicitudes ${EnumTipoSolicitud.getName(this.selTipoSolicitud)}`);
    }
    this.isResponse = false;
  }

  protected consultarPeticiones() {
    this.service.getAllPeticionBySolicitud(this.selIdSolicitud).subscribe((data) => {
      this.listPeticionData = data.map(PeticionData.toPeticionData);
      this.isValidListPeticion = (this.listPeticionData.length > 0);
      if (!this.isValidListPeticion) {
        this.alertService.alert(AlertSeverity.WARN, 'Sin Peticiones', 'La solicitud no tiene peticiones');
      }
    });
  }

  protected actualizarSolicitudes(comentario: string) {
    this.listSelSolicitud.forEach((solicitud) => {
      solicitud.estatus = this.selAccion;
      if (this.selAccion !== this.CANCELAR) {
        solicitud.autorizador = this.usuario;
        solicitud.fechaAutorizacion = new Date();
        solicitud.comentarioAutorizador = StringUtils.trimToNull(comentario);
      }
    });
    this.service.updateEstatusSolPeticion(this.listSelSolicitud).subscribe((data) => {
      this.isResponse = true;
      if (data && data.status === HttpStatusCode.OK) {
        this.alertService.alert(AlertSeverity.SUCCESS, 'Actualizacion Exitosa', 'Se actualizaron las solicitudes correctamente');
        this.resetSolicitudData();
        this.consultarSolicitudes();
      } else {
        this.alertService.alert(AlertSeverity.ERROR, 'Error en Actualizacion', 'Ocurrio un error al actualizar las solicitudes');
      }
    });
  }

  protected getSolicitudData(solicitud: SolicitudPeticion): string {
    return `#${solicitud.id} - Justificacion: ${solicitud.justificacion} - Solicitante: ${CommonUtils.getUserFullName(solicitud.solicitante)}`;
  }

  protected onChangeTipoSolicitud() {
    this.resetSolicitudData();
    this.consultarSolicitudes();
  }

  protected onClickSolicitud(data: SolicitudPeticionData) {
    this.solicitudData = data;
    const id = this.solicitudData.id;
    if (id > 0) {
      this.selIdSolicitud = Number(id);
      this.consultarPeticiones();
    }
  }

  protected onClickAccion(accion: number) {
    this.validateListSelSolicitud();
    if (!this.isValidListSelected) {
      this.alertService.alert(AlertSeverity.WARN, 'Sin Selección', 'Favor de seleccionar al menos 1 solicitud');
      return;
    }
    this.selAccion = accion;
    let required = true;
    let disabled = false;
    let title = '';
    let isRevocar = false;
    switch (this.selAccion) {
      case this.AUTORIZAR:
        title = Constants.AUTORIZAR;
        break;
      case this.RECHAZAR:
        title = Constants.RECHAZAR;
        break;
      case this.CANCELAR:
        title = Constants.CANCELAR;
        disabled = true;
        required = false;
        break;
      case this.REVOCAR:
        title = Constants.REVOCAR;
        isRevocar = true;
        break;
      default:
        this.alertService.alert(AlertSeverity.ERROR, 'Acción No Reconocida', 'La acción no es reconocida');
        return;
    }
    title = '¿' + title + ' las Solicitudes?';
    this.createListSelSolicitud(isRevocar);
    if (this.listSelSolicitud.length == 0) {
      this.alertService.alert(AlertSeverity.WARN, 'Lista de Solicitudes Incorrecta', 'Solicitudes seleccionadas son incorrectas para la acción');
      return;
    }
    let data = this.listSelSolicitud.map((solicitud) => {
      return this.getSolicitudData(solicitud);
    });
    this.outputModalData.emit(new ModalData(title, data, '', required, disabled));
  }

  protected validateListSelSolicitud() {
    this.isValidListSelected = !(this.listSelSolicitudData === undefined
      || this.listSelSolicitudData == null
      || this.listSelSolicitudData.length == 0);
  }

  protected createListSelSolicitud(isRevocar: boolean) {
    this.listSelSolicitud = [];
    let estatus = !isRevocar ? EnumEstatus.N_REVISION : EnumEstatus.N_AUTORIZADA;
    if (this.listSelSolicitudData.length > 0) {
      let listaId: Number[] = [];
      this.listSelSolicitudData.forEach((data) => {
        if (data.estatus === estatus) {
          listaId.push(data.id);
        }
      });
      if (listaId.length > 0) {
        this.listSelSolicitud = this.listSolicitud.filter((data) => {
          return listaId.indexOf(data.id) !== -1;
        });
      }
    }
  }
}
