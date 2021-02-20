import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataTable, SelectItem } from 'primeng/primeng';
import { AlertService, AlertSeverity } from '../../../alert.service';
import { AuthService } from '../../../app.service';
import { PeticionesWSService } from '../../peticiones-ws.service';
import { User } from '../../../admin/admin.service';
import { SolicitudUsuarioCorp } from '../../model/SolicitudUsuarioCorp';
import { StringUtils } from '../../utils/StringUtils';
import { ModalData } from '../../utils/ModalData';
import { EnumTipoSolicitud, EnumEstatus } from '../../utils/EnumData';
import { UsuarioProperties } from '../../model/UsuarioProperties';
import { CommonUtils } from '../../utils/CommonUtils';
import { Constants } from '../../utils/Constants';
import { HttpStatusCode } from 'app/core/common/HttpStatusCode';
import { SharedData } from '../common/SharedData';
import { DateUtils } from 'app/peticiones-ws/utils/DateUtils';

class SolicitudUsuarioCorpData {
  constructor(
    public id: Number,
    public fechaRegistro: string,
    public estatus: string,
    public usuarioCorp: string,
    public solicitante: string,
    public justificacion: string,
    public comentarioResponsable: string,
  ) { }

  static getNewInstance(id?: Number): SolicitudUsuarioCorpData {
    return new SolicitudUsuarioCorpData(id, '', '', '', '', '', '');
  }

  static toSolicitudUsuarioCorpData(r: SolicitudUsuarioCorp): SolicitudUsuarioCorpData {
    let output: SolicitudUsuarioCorpData = null;
    const NA: string = 'N/A';
    const DATE_FORMAT: string = 'DD/MM/YYYY';
    if (r) {
      output = <SolicitudUsuarioCorpData>({
        id: r.id,
        fechaRegistro: DateUtils.formatDate(r.fechaRegistro, DATE_FORMAT, NA),
        estatus: EnumEstatus.getName(r.estatus),
        usuarioCorp: r.usuarioCorp,
        solicitante: CommonUtils.getUserFullName(r.solicitante),
        justificacion: r.justificacion,
        comentarioResponsable: r.comentarioResponsable
      });
    }
    return output;
  }
}

@Component({
  selector: 'app-list-sol-usuario-corp',
  templateUrl: './list-sol-usuario-corp.component.html',
  styleUrls: ['./list-sol-usuario-corp.component.css']
})
export class ListSolUsuarioCorpComponent implements OnInit {
  @Output('outputModalData') outputModalData: EventEmitter<ModalData> = new EventEmitter<ModalData>();
  @ViewChild('dtSolUsuCorp')
  private dtSolicitud: DataTable;

  public readonly AUTORIZAR: number = EnumEstatus.AUTORIZADA;
  public readonly RECHAZAR: number = EnumEstatus.RECHAZADA;
  public readonly CANCELAR: number = EnumEstatus.CANCELADA;
  public readonly REVOCAR: number = EnumEstatus.EXPIRADA;

  public ayuda: any;
  public dataSelector: any;
  public listSolicitudData: SolicitudUsuarioCorpData[];
  public listSelSolicitudData: SolicitudUsuarioCorpData[];
  public selTipoSolicitud: number;
  public isTipoSolicitudEnabled: boolean;
  public isSelectable: boolean;
  public isOwner: boolean;

  private usuario: User;
  private usuarioProperties: UsuarioProperties;
  private isAdmin: boolean;
  private isResponsable: boolean;
  private selAccion: number;
  private listSolicitud: SolicitudUsuarioCorp[];
  private listSelSolicitud: SolicitudUsuarioCorp[];
  private defTipoSol: number;
  private isResponse: boolean;

  constructor(private service: PeticionesWSService, private authService: AuthService, private alertService: AlertService) {
    this.ayuda = SharedData.ayuda;
    this.dataSelector = SharedData.dataSelectorSolUsuCorp;
  }

  ngOnInit() {
    this.isResponsable = false;
    this.isResponse = false;
    this.isTipoSolicitudEnabled = false;
    this.defTipoSol = EnumTipoSolicitud.PROPIAS;
    this.selTipoSolicitud = this.defTipoSol;
    this.resetSolicitudData();
  }

  initComponent() {
    this.usuario = SharedData.usuario;
    this.usuarioProperties = SharedData.usuarioProperties;
    this.isResponsable = (this.usuarioProperties.respUsuCorp != null);
    this.isAdmin = this.usuarioProperties.administrador;
    const isAutorizador = (this.usuarioProperties.autorizador != null);
    const key = Constants.tipoSolicitud;
    if (this.isAdmin || isAutorizador) {
      this.dataSelector[key] = this.dataSelector[key].filter((item: SelectItem) => {
        return item.value !== EnumTipoSolicitud.PROPIAS;
      });
      if (this.isAdmin) {
        this.dataSelector[key].push({ label: EnumTipoSolicitud.N_TODAS, value: EnumTipoSolicitud.TODAS });
      }
    }
    if (!this.isResponsable) {
      this.dataSelector[key] = this.dataSelector[key].filter((item: SelectItem) => {
        return item.value !== EnumTipoSolicitud.EXTERNAS;
      });
    }
    this.isTipoSolicitudEnabled = (this.dataSelector[key].length > 1);
    this.defTipoSol = this.dataSelector[key][0] ? this.dataSelector[key][0].value : -1;
    if (this.defTipoSol == EnumTipoSolicitud.PROPIAS && this.isResponsable) {
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
    this.selAccion = -1;
    this.isSelectable = true;
    this.isOwner = false;
    if (this.dtSolicitud) {
      this.dtSolicitud.reset();
    }
  }

  protected consultarSolicitudes() {
    switch (this.selTipoSolicitud) {
      case EnumTipoSolicitud.PROPIAS:
        this.isOwner = true;
        this.service.getAllSolUsuCorpBySolicitante(this.usuario.id).subscribe((data) => {
          this.fillData(data);
        });
        break;
      case EnumTipoSolicitud.EXTERNAS:
        this.service.getAllSolUsuCorpByResponsable(this.usuario.id).subscribe((data) => {
          this.fillData(data);
        });
        break;
      case EnumTipoSolicitud.TODAS:
        this.isSelectable = false;
        this.service.getAllSolUsuCorp().subscribe((data) => {
          this.fillData(data);
        });
        break;
      default:
        console.log(`Ni idea como es que usuaste una solicitud con un valor de ${this.selTipoSolicitud}`);
        this.alertService.alert(AlertSeverity.ERROR, 'Error en Búsqueda', 'Ocurrió un error al buscar las solicitudes');
    }
  }

  private fillData(data: SolicitudUsuarioCorp[]) {
    if (data == null) {
      this.alertService.alert(AlertSeverity.ERROR, 'Error en Búsqueda', 'Ocurrió un error al buscar las solicitudes');
      this.isResponse = false;
      return;
    }
    this.listSolicitud = data;
    this.listSolicitudData = this.listSolicitud.map(SolicitudUsuarioCorpData.toSolicitudUsuarioCorpData);
    if (this.dtSolicitud) {
      this.dtSolicitud.sortOrder = -1;
      this.dtSolicitud.sortField = 'id';
    }
    if (!this.isResponse && this.listSolicitud.length == 0) {
      this.alertService.alert(AlertSeverity.WARN, 'Sin Solicitudes', `No hay solicitudes ${EnumTipoSolicitud.getName(this.selTipoSolicitud)}`);
    }
    this.isResponse = false;
  }

  protected actualizarSolicitudes(comentario?: string) {
    this.listSelSolicitud.forEach((solicitud) => {
      solicitud.estatus = this.selAccion;
      solicitud.comentarioResponsable = StringUtils.trimToNull(comentario);
    });
    this.service.updateEstatusSolUsuCorp(this.listSelSolicitud).subscribe((data) => {
      this.isResponse = true;
      if (data && data.status === HttpStatusCode.OK) {
        this.alertService.alert(AlertSeverity.SUCCESS, 'Actualizacion Exitosa', 'Se actualizaron las solicitudes correctamente');
        this.resetSolicitudData();
        this.consultarSolicitudes();
      } else {
        this.alertService.alert(AlertSeverity.ERROR, 'Error en Actualizacion', 'Ocurrio un error al actualizar las solicitudes');
        this.isResponse = false;
      }
    });
  }

  protected getSolicitudData(solicitud: SolicitudUsuarioCorp): string {
    if (solicitud) {
      return `#${solicitud.id} - Usuario Corporativo: ${solicitud.usuarioCorp} - Solicitante: ${CommonUtils.getUserFullName(solicitud.solicitante)}`;
    }
    return 'N/A';
  }

  protected onChangeTipoSolicitud() {
    this.resetSolicitudData();
    this.consultarSolicitudes();
  }

  protected onClickAccion(accion: number) {
    if (this.listSelSolicitudData.length == 0) {
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

  protected createListSelSolicitud(isRevocar?: boolean) {
    this.listSelSolicitud = [];
    let estatus = !isRevocar ? EnumEstatus.N_REVISION : EnumEstatus.N_AUTORIZADA;
    if (this.listSelSolicitudData.length > 0) {
      let listaId: Number[] = [];
      this.listSelSolicitudData.forEach((data) => {
        if (data.estatus == estatus) {
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
