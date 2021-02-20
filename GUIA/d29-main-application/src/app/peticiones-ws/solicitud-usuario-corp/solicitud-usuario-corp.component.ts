import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpStatusCode } from 'app/core/common/HttpStatusCode';
import { AlertService, AlertSeverity } from '../../alert.service';
import { AuthService } from '../../app.service';
import { NgForm } from '@angular/forms';
import { PeticionesWSService } from '../peticiones-ws.service';
import { User } from '../../admin/admin.service';
import { ResponsableUsuarioCorp } from '../model/ResponsableUsuarioCorp';
import { SolicitudUsuarioCorp } from '../model/SolicitudUsuarioCorp';
import { WrapSolicitudUsuarioCorp } from '../model/WrapSolicitudUsuarioCorp';
import { SimpleHelp } from 'app/help/model/SimpleHelpModel';
import { StringUtils } from '../utils/StringUtils';
import { UsuarioProperties } from '../model/UsuarioProperties';
import { FormValidationType } from '../utils/FormValidationType';
import { Constants } from '../utils/Constants';
import { EnumEstatus } from '../utils/EnumData';
import { ModalData } from '../utils/ModalData';

declare let jQuery: any;

@Component({
  selector: 'app-solicitud-usuario-corp',
  templateUrl: './solicitud-usuario-corp.component.html',
  styleUrls: ['./solicitud-usuario-corp.component.css']
})
export class SolicitudUsuarioCorpComponent implements OnInit {
  @ViewChild('formSolicitud') formSolicitud: NgForm;

  private readonly MODAL_ID = '#modalSolicitudForm';
  private readonly MODAL_TITLE_SOLICTITUD = 'Solicitud de Usuario Corporativo';
  private readonly MODAL_TITLE_REPORTE = 'Reportar Usuario Corporativo';
  private readonly MODAL_LABEL_SOLICITUD = 'Solicitud';
  private readonly MODAL_LABEL_REPORTE = 'Reporte';

  public estatus: string;
  public solicitud: SolicitudUsuarioCorp;
  public modalData: ModalData;
  public isValidSolicitud: boolean;
  public isResponsable: boolean;
  public formErrors: any;

  private formMessages: any;
  private formControlValid: any;
  private ayuda: any;

  private usuario: User;
  private usuarioProperties: UsuarioProperties;
  private respUsuCorp: ResponsableUsuarioCorp;
  private isAdmin: boolean;
  private tipoReporte: number;

  constructor(private authService: AuthService, private alertService: AlertService, private service: PeticionesWSService) {
    this.initAyuda();
    this.initForm();
  }

  initAyuda() {
    this.ayuda = {};
    this.ayuda[Constants.usuarioCorp] = new SimpleHelp('Usuario Corporativo', 'Usuario corporativo a buscar');
  }

  initForm() {
    this.formErrors = {};
    this.formMessages = {};
    this.formControlValid = {};
    const msgRequired = FormValidationType.getDefaultMessage(FormValidationType.REQUIRED);
    Constants.getKeysSolUsuCorp().forEach((key) => {
      this.formMessages[key] = {};
      this.formMessages[key][FormValidationType.REQUIRED] = msgRequired;
      this.formErrors[key] = '';
      this.formControlValid[key] = false;
    });
    this.formMessages[Constants.justificacion][FormValidationType.MIN_LENGTH] = `Se requiere un mínimo de ${SolicitudUsuarioCorp.MIN_CHARS} caracteres`;
    this.formMessages[Constants.justificacion][FormValidationType.MAX_LENGTH] = `Se requiere un máximo de ${SolicitudUsuarioCorp.MAX_CHARS} caracteres`;
  }

  ngOnInit() {
    this.usuario = this.service.getSessionUser();
    this.isAdmin = false;
    this.resetForm();
    this.service.getUsuarioPropertiesByUsuario(this.usuario.id).subscribe((data) => {
      this.usuarioProperties = data;
      this.isAdmin = UsuarioProperties.isAdminOrAutorizador(this.usuarioProperties);
    });
  }

  resetForm() {
    this.formSolicitud.resetForm();
    let usuCorp: string = this.solicitud != null ? this.solicitud.usuarioCorp : '';
    this.solicitud = SolicitudUsuarioCorp.getNewInstance();
    this.solicitud.usuarioCorp = usuCorp;
    this.respUsuCorp = null;
    this.isResponsable = false;
    this.isValidSolicitud = false;
    this.tipoReporte = 0;
    Constants.getKeysSolUsuCorp().forEach((key) => {
      this.formErrors[key] = '';
      this.formControlValid[key] = false;
    });
    this.modalData = ModalData.getNewInstance();
    this.modalData.title = this.MODAL_TITLE_SOLICTITUD;
    this.modalData.label = this.MODAL_LABEL_SOLICITUD;
  }

  buscarResponsableUsuarioCorp() {
    if (!this.isValidUsuarioCorp()) {
      return;
    }
    this.respUsuCorp = null;
    this.service.getRespUsuCorpByUsuarioCorp(this.solicitud.usuarioCorp).subscribe((data) => {
      if (data) {
        if (StringUtils.isBlank(data.usuarioCorp)) {
          this.alertService.alert(AlertSeverity.ERROR, 'Usuario Corporativo Inexistente', 'El usuario corporativo no existe, favor de validar');
        } else if (data.responsable == null) {
          this.tipoReporte = 1;
          this.modalData.title = this.MODAL_TITLE_REPORTE;
          this.modalData.label = this.MODAL_LABEL_REPORTE;
          this.modalData.disabled = true;
          this.isValidSolicitud = true;
          this.modalShow();
        } else {
          this.respUsuCorp = data;
          this.isResponsable = (this.respUsuCorp.responsable.id === this.usuario.id) || this.isAdmin;
        }
      } else {
        this.alertService.alert(AlertSeverity.ERROR, 'Error en Búsqueda', 'Ocurrió un error en la búsqueda');
      }
    });
  }

  generarSolicitud() {
    this.solicitud.fechaRegistro = new Date();
    this.solicitud.solicitante = this.usuario;
    if (this.respUsuCorp == null) {
      this.enviarReporte();
      return;
    }
    this.solicitud.estatus = EnumEstatus.REVISION;
    let wrapSolicitud: WrapSolicitudUsuarioCorp = new WrapSolicitudUsuarioCorp(this.respUsuCorp, this.solicitud);
    this.service.saveSolicitudUsuarioCorp(wrapSolicitud).subscribe((data) => {
      switch (data.status) {
        case HttpStatusCode.OK:
          this.alertService.alert(AlertSeverity.SUCCESS, 'Solicitud Exitosa', 'Solicitud registrada exitosamente');
          break;
        case HttpStatusCode.ALREADY_REPORTED:
          this.alertService.alert(AlertSeverity.WARN, 'Solicitud Existente', 'La solicitud ya existe, favor de validar');
          break;
        default:
          this.alertService.alert(AlertSeverity.ERROR, 'Error en Solicitud', 'Ocurrió un error al registrar la solicitud');
      }
    }, (error: any) => {
      console.log(error);
      this.alertService.alert(AlertSeverity.ERROR, 'Error en Solicitud', 'Ocurrió un error al procesar tu solicitud, intentalo de nuevo');
    });
    this.modalHide();
    this.resetForm();
  }

  enviarReporte() {
    let wrapSolicitud: WrapSolicitudUsuarioCorp = new WrapSolicitudUsuarioCorp(null, this.solicitud, this.tipoReporte);
    this.service.reportUsuarioCorp(wrapSolicitud).subscribe((data) => {
      if (data && data.status === HttpStatusCode.OK) {
        this.alertService.alert(AlertSeverity.SUCCESS, 'Reporte Enviado', 'El reporte fue enviado al equipo de soporte');
      }
    }, (error: any) => {
      console.log(error);
      this.alertService.alert(AlertSeverity.ERROR, 'Error al Enviar', 'Ocurrió un error al enviar el reporte');
    });
    this.modalHide();
    this.resetForm();
  }

  modalShow() { jQuery(this.MODAL_ID).modal('show'); }
  modalHide() { jQuery(this.MODAL_ID).modal('hide'); }

  setFormError(key: string, validation?: string) {
    this.formErrors[key] = '';
    this.formControlValid[key] = true;
    if (validation) {
      this.formErrors[key] = this.formMessages[key][validation];
      this.formControlValid[key] = false;
    }
  }

  onClickModalCancel() {
    if (this.tipoReporte > 0) {
      this.resetForm();
    }
    this.modalHide();
  }

  validateJustificacion(event: any) {
    this.solicitud.justificacion = event;
    const key = Constants.justificacion;
    const value = this.solicitud.justificacion;
    let validation = null;
    if (StringUtils.isBlank(value)) {
      validation = FormValidationType.REQUIRED;
    } else if (!StringUtils.hasMinChars(value, SolicitudUsuarioCorp.MIN_CHARS)) {
      validation = FormValidationType.MIN_LENGTH;
    } else if (StringUtils.hasMaxChars(value, SolicitudUsuarioCorp.MAX_CHARS)) {
      validation = FormValidationType.MAX_LENGTH;
    }
    this.setFormError(key, validation);
    this.validateSolicitud();
  }

  validateSolicitud() {
    this.isValidSolicitud = (this.usuario != null
      && this.formControlValid[Constants.usuarioCorp]
      && this.formControlValid[Constants.justificacion]);
  }

  isValidUsuarioCorp(): boolean {
    console.log(this.solicitud.usuarioCorp);
    const usuarioCorp = StringUtils.toUpperCase(this.solicitud.usuarioCorp, true);
    console.log(usuarioCorp);
    let validation = null;
    if (StringUtils.isBlank(usuarioCorp)) {
      validation = FormValidationType.REQUIRED;
    }
    this.setFormError(Constants.usuarioCorp, validation);
    this.solicitud.usuarioCorp = usuarioCorp;
    return validation == null;
  }
}
