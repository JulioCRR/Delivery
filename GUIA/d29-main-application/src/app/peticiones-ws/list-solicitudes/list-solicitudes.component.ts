import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AlertService } from '../../alert.service';
import { AuthService } from '../../app.service';
import { PeticionesWSService } from '../peticiones-ws.service';
import { ListSolUsuarioCorpComponent } from './list-sol-usuario-corp/list-sol-usuario-corp.component';
import { ListSolPeticionesWebComponent } from './list-sol-peticiones-web/list-sol-peticiones-web.component';
import { ModalData } from '../utils/ModalData';
import { StringUtils } from '../utils/StringUtils';
import { FormValidationType } from '../utils/FormValidationType';
import { SolicitudUsuarioCorp } from '../model/SolicitudUsuarioCorp';
import { Constants } from '../utils/Constants';
import { SimpleHelp } from 'app/help/model/SimpleHelpModel';
import { EnumTipoSolicitud, EnumEstatus } from '../utils/EnumData';
import { SharedData } from './common/SharedData';
import { SelectItem } from 'primeng/primeng';

declare let jQuery: any;

@Component({
  selector: 'app-list-solicitudes',
  templateUrl: './list-solicitudes.component.html',
  styleUrls: ['./list-solicitudes.component.css']
})
export class ListSolicitudesComponent implements OnInit, AfterViewInit {

  @ViewChild(ListSolUsuarioCorpComponent)
  private ListSolUsuarioCorp: ListSolUsuarioCorpComponent;

  @ViewChild(ListSolPeticionesWebComponent)
  private ListSolPeticionesWeb: ListSolPeticionesWebComponent;

  public readonly TAB_SOL_USU_CORP = 1;
  public readonly TAB_SOL_PETICION = 2;
  private readonly MODAL_ID = '#modalSolicitud';

  public isSolUsuCorpEnabled: boolean;
  public modalData: ModalData;
  public formErrors: any;
  public isValidComentario: boolean;

  private formMessages: any;
  private selTab: number;

  constructor(private service: PeticionesWSService, private authService: AuthService, private alertService: AlertService) {
    this.initAyuda();
    this.initSelectors();
    this.initForm();
  }

  initAyuda() {
    let ayuda = {};
    ayuda[Constants.tipoSolicitud] = new SimpleHelp('Tipo Solicitud', `Seleccione entre solicitudes [${EnumTipoSolicitud.N_PROPIAS}] o [${EnumTipoSolicitud.N_EXTERNAS}] para autorizar`);
    ayuda[Constants.estatusSolicitud] = new SimpleHelp('Estatus Solicitud', 'Seleccione el estatus del tipo de solicitud seleccionado');
    SharedData.ayuda = ayuda;
  }

  initSelectors() {
    let selectorUsuCorp = {};
    let selectorPeticion = {};
    let key = Constants.tipoSolicitud;
    selectorUsuCorp[key] = [];
    selectorPeticion[key] = [];
    EnumTipoSolicitud.getNameValuePairs().forEach((data) => {
      selectorUsuCorp[key].push({ label: data.name, value: data.value });
      selectorPeticion[key].push({ label: data.name, value: data.value });
    });

    key = Constants.estatusSolicitud;
    selectorUsuCorp[key] = [];
    selectorPeticion[key] = [];
    EnumEstatus.getNameValuePairs().forEach((data) => {
      selectorPeticion[key].push({ label: data.name, value: data.value });
      selectorUsuCorp[key].push({ label: data.name, value: data.value });
    });
    selectorUsuCorp[key] = selectorUsuCorp[key].filter((item: SelectItem) => {
      return item.value !== EnumEstatus.URGENTE;
    });

    SharedData.dataSelectorSolUsuCorp = selectorUsuCorp;
    SharedData.dataSelectorSolPeticion = selectorPeticion;
  }

  initForm() {
    this.formMessages = {};
    this.formErrors = {};
    const key = Constants.comentario;
    this.formMessages[key] = {};
    this.formMessages[key][FormValidationType.REQUIRED] = FormValidationType.getDefaultMessage(FormValidationType.REQUIRED);
    this.formMessages[key][FormValidationType.MIN_LENGTH] = `Se requiere un mínimo de ${SolicitudUsuarioCorp.MIN_CHARS} caracteres`;
    this.formMessages[key][FormValidationType.MAX_LENGTH] = `Se requiere un máximo de ${SolicitudUsuarioCorp.MAX_CHARS} caracteres`;
  }

  ngOnInit() {
    this.selTab = this.TAB_SOL_USU_CORP;
    SharedData.usuario = this.service.getSessionUser();
    this.isSolUsuCorpEnabled = true;
    this.resetForm();
  }

  ngAfterViewInit() {
    const idusuario = SharedData.usuario.id;
    this.service.getUsuarioPropertiesByUsuario(idusuario).subscribe((data) => {
      SharedData.usuarioProperties = data;
      if (data.autorizador && !data.respUsuCorp) {
        this.isSolUsuCorpEnabled = false;
        this.selTab = this.TAB_SOL_PETICION;
        jQuery('#tablist-tipoSolicitud a[href="#tab-SolPeticion"]').tab('show');
      }
      this.initChildren();
    });
  }

  resetForm() {
    this.modalData = ModalData.getNewInstance();
    this.isValidComentario = false;
  }

  initChildren() {
    if (this.isSolUsuCorpEnabled) {
      this.ListSolUsuarioCorp.initComponent();
      this.ListSolUsuarioCorp.outputModalData.subscribe((data: ModalData) => {
        this.setModalData(data);
      });
    }
    this.ListSolPeticionesWeb.initComponent();
    this.ListSolPeticionesWeb.outputModalData.subscribe((data: ModalData) => {
      this.setModalData(data);
    });
  }

  clearScreen() {
    this.modalData = ModalData.getNewInstance();
    if (this.selTab === this.TAB_SOL_USU_CORP) {
      this.ListSolUsuarioCorp.clearScreen();
    } else {
      this.ListSolPeticionesWeb.clearScreen();
    }
  }

  setModalData(data?: ModalData) {
    if (data) {
      this.modalData = data;
      this.isValidComentario = !this.modalData.required;
      this.modalShow();
    }
  }

  setFormError(key: string, validation?: string) {
    this.formErrors[key] = '';
    if (validation) {
      this.formErrors[key] = this.formMessages[key][validation];
    }
  }

  onClickTab(tab: number) {
    this.selTab = tab;
    this.clearScreen();
  }

  onClickModalOK() {
    if (this.selTab === this.TAB_SOL_USU_CORP) {
      this.ListSolUsuarioCorp.actualizarModal(this.modalData);
    } else {
      this.ListSolPeticionesWeb.actualizarModal(this.modalData);
    }
    this.modalHide();
    this.resetForm();
  }

  onClickModalCancel() {
    this.modalHide();
  }

  modalShow() { jQuery(this.MODAL_ID).modal('show'); }
  modalHide() { jQuery(this.MODAL_ID).modal('hide'); }

  validateModalInput(event: any) {
    this.modalData.input = event;
    const key = Constants.comentario;
    this.setFormError(key);
    if (!this.modalData.required) {
      this.isValidComentario = true;
      return;
    }
    const value = this.modalData.input;
    let validation = null;
    if (StringUtils.isBlank(value)) {
      validation = FormValidationType.REQUIRED;
    } else if (!StringUtils.hasMinChars(this.modalData.input, SolicitudUsuarioCorp.MIN_CHARS)) {
      validation = FormValidationType.MIN_LENGTH;
    } else if (StringUtils.hasMaxChars(this.modalData.input, SolicitudUsuarioCorp.MAX_CHARS)) {
      validation = FormValidationType.MAX_LENGTH;
    }
    this.setFormError(key, validation);
    this.isValidComentario = StringUtils.isBlank(this.formErrors[key]);
  }

}
