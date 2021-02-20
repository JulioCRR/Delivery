import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpStatusCode } from 'app/core/common/HttpStatusCode';
import { M2kCatTransaccionesFront } from 'app/catalogos/model/M2kCatTransaccionesFront';
import { AlertService, AlertSeverity } from 'app/alert.service';
import { AuthService } from 'app/app.service';
import { User } from 'app/admin/admin.service';
import { SimpleHelp } from 'app/help/model/SimpleHelpModel';
import { PeticionesWSService } from '../peticiones-ws.service';
import { Peticion } from '../model/Peticion';
import { PeticionProperties } from '../model/PeticionProperties';
import { SolicitudPeticion } from '../model/SolicitudPeticion';
import { WrapSolicitudPeticion, toWrapSolicitudPeticion } from '../model/WrapSolicitudPeticion';
import { StringUtils } from '../utils/StringUtils';
import { EnumAmbiente, EnumEstatus } from '../utils/EnumData';
import { UsuarioProperties } from '../model/UsuarioProperties';
import { FormValidationType } from '../utils/FormValidationType';
import { Constants } from '../utils/Constants';
import { CommonUtils } from '../utils/CommonUtils';

declare let jQuery: any;

@Component({
  selector: 'app-solicitud-peticiones-web',
  templateUrl: './solicitud-peticiones-web.component.html',
  styleUrls: ['./solicitud-peticiones-web.component.css']
})
export class SolicitudPeticionesWebComponent implements OnInit {
  public readonly DT_SCROLL: string = '100px';

  private readonly KEY_LIST_IP: string = 'listIP';
  private readonly MODAL_ID: string = '#modalSolicitud';
  private readonly TRANSACCION_WILDCARD: M2kCatTransaccionesFront = new M2kCatTransaccionesFront(-1, '*', '(TODAS)', '', '* (TODAS)', '', '');

  private MIN_PPM: number = Peticion.MIN_PPM;
  private MAX_PPM: number = Peticion.MAX_PPM;
  public ayuda: any;
  public formErrors: any;
  public formSolicitud: FormGroup;
  public dataSelector: any;
  public labelSelector: any;
  public peticionData: any;
  public listPeticion: Peticion[];
  public listSelPeticion: Peticion[];
  public isUIBlocked: boolean;
  public isComponentEnabled: boolean;
  public isAdmin: boolean;
  public isUrgente: boolean;
  public isFechaEnabled: boolean;
  public isResponse: boolean;
  public isValidSolicitud: boolean;

  private formMessages: any;
  private formValidators: any;
  private formControlValid: any;
  private allKeys: string[];
  private keysPet: string[];
  private usuario: User;
  private usuarioProperties: UsuarioProperties;
  private peticionProperties: PeticionProperties;
  private minDate: Date;
  private lastId: number;
  private prevListTransaccion: any[];
  private isBlocked: boolean;
  private isAmbienteProd: boolean;
  private isValidSolicitudData: boolean;

  constructor(private service: PeticionesWSService, private authService: AuthService, private alertService: AlertService, private fb: FormBuilder) {
    this.initKeys();
    this.initAyuda();
    this.initSelectors();
    this.initForm();
    this.initPeticionData();
  }

  initKeys() {
    this.allKeys = [];
    this.keysPet = [];
    Constants.getKeysSolPeticion().forEach((key) => {
      this.allKeys.push(key);
    });
    Constants.getKeysPeticion().forEach((key) => {
      if (key !== Constants.ambiente) {
        this.allKeys.push(key);
        this.keysPet.push(key);
      }
    });
  }

  initAyuda() {
    this.ayuda = {};
    this.ayuda[Constants.urgente] = new SimpleHelp('Solicitud Urgente', 'Las peticiones de la solicitud se registrarán en calor a producción');
    this.ayuda[Constants.folioSISAP] = new SimpleHelp('Folio SISAP', 'Folio SISAP Asociado a la solicitud');
    this.ayuda[Constants.aplicativo] = new SimpleHelp('Aplicativo', 'Nombre del aplicativo que hará uso del servicio');
    this.ayuda[Constants.area] = new SimpleHelp('Área Responsable', 'Área responsable del desarrollo de la aplicación que consumirá el servicio');
    this.ayuda[Constants.ambiente] = new SimpleHelp('Ambiente Ejecución', 'Tipo de ambiente desde el que se consumirá el servicio');
    this.ayuda[Constants.fechaCaducidad] = new SimpleHelp('Fecha de Caducidad', 'Fecha en la que las peticiones serán deshabilitadas (solo ambiente no productivo)');
    this.ayuda[Constants.usuarioCorp] = new SimpleHelp('Usuario Corporativo', 'Usuario corporativo que se usará en el servicio web');
    this.ayuda[Constants.ip] = new SimpleHelp('IP', 'Dirección IP desde donde será ejecutado el servicio web');
    this.ayuda[Constants.region] = new SimpleHelp('Región', 'Número de la región donde se consumirá el servicio (del 1 al 9)');
    this.ayuda[Constants.transaccion] = new SimpleHelp('Transacción', 'Identificador de transacción que se ejecuta directamente en Mobile y que en el XML se encuentra en el tag <function>I*XX</function>');
    this.ayuda[Constants.ppm] = new SimpleHelp('Peticiones Por Minuto', `Número máximo de llamadas por minuto que se invocara al servicio web (máximo ${this.MAX_PPM})`);
  }

  initSelectors() {
    this.dataSelector = {};
    this.dataSelector[Constants.area] = [];
    this.dataSelector[Constants.ambiente] = []
    EnumAmbiente.getNameValuePairs().forEach((ambiente) => {
      this.dataSelector[Constants.ambiente].push({ label: ambiente.name, value: ambiente.value });
    });
    this.dataSelector[Constants.usuarioCorp] = [];
    this.dataSelector[Constants.transaccion] = [];
    this.dataSelector[Constants.aplicativo] = [];
    this.dataSelector[Constants.region] = [];
    this.labelSelector = {};
    this.labelSelector[Constants.region] = '--SELECCIONAR REGIÓN--';
    this.labelSelector[Constants.transaccion] = '--SELECCIONAR TRANSACCIÓN--';
  }

  initForm() {
    this.formMessages = {};
    this.formErrors = {};
    this.formValidators = {};
    this.formControlValid = {};
    const msgRequerdia = FormValidationType.getDefaultMessage(FormValidationType.REQUIRED);
    this.allKeys.forEach((key: string) => {
      this.formMessages[key] = {};
      this.formMessages[key][FormValidationType.REQUIRED] = msgRequerdia;
      this.formErrors[key] = '';
      this.formControlValid[key] = false;
    });
    this.formMessages[Constants.ip][FormValidationType.FORMAT] = 'Formato IP incorrecto';
    this.formMessages[Constants.ppm][FormValidationType.RANGE] = `Valor debe ser entre ${this.MIN_PPM} y ${this.MAX_PPM}`;
    this.formMessages[Constants.justificacion][FormValidationType.MIN_LENGTH] = `Longitud mínima de ${SolicitudPeticion.MIN_CHARS} caracteres`;
    this.formMessages[Constants.justificacion][FormValidationType.MAX_LENGTH] = `Longitud máxima de ${SolicitudPeticion.MAX_CHARS} caracteres`;

    this.formValidators[Constants.aplicativo] = Validators.compose([Validators.required]);
    this.formValidators[Constants.ambiente] = Validators.compose([Validators.required]);
    this.formValidators[Constants.justificacion] = Validators.compose([Validators.required, Validators.minLength(SolicitudPeticion.MIN_CHARS), Validators.maxLength(SolicitudPeticion.MAX_CHARS)]);

    this.formSolicitud = this.fb.group({
      solicitudData: this.fb.group({
        aplicativo: [null, this.formValidators[Constants.aplicativo]],
        ambiente: [null, this.formValidators[Constants.ambiente]],
        fechaCaducidad: [null],
        justificacion: ['', this.formValidators[Constants.justificacion]]
      }),
      peticionData: this.fb.group({
        usuarioCorp: ['', [Validators.required]],
        ip: [[], Validators.compose([Validators.required])],
        region: [[], [Validators.required]],
        transaccion: [[], [Validators.required]],
        ppm: [0, [Validators.required]]
      })
    });
    this.formSolicitud.valueChanges.subscribe((data) => { this.onFormValueChanged(data) });
    this.onFormValueChanged();
  }

  onFormValueChanged(data?: any) {
    if (this.formSolicitud == null
      || this.formSolicitud.get(Constants.solicitudData) == null
      || this.formSolicitud.get(Constants.peticionData) == null) {
      return;
    }
    const form = this.formSolicitud;
    this.onFormValueChangedData(form.get(Constants.solicitudData), Constants.getKeysSolPeticion());
    this.onFormValueChangedData(form.get(Constants.peticionData), this.keysPet);
    this.validateSolicitud();
  }

  onFormValueChangedData(formGroup: any, fields: string[]) {
    fields.forEach((key) => {
      this.formErrors[key] = '';
      const control = formGroup.get(key);
      if (control) {
        this.formControlValid[key] = (control.valid || control.disabled);
        if (control.dirty && !control.valid) {
          const messages = this.formMessages[key];
          if (messages) {
            for (const validation in control.errors) {
              this.formErrors[key] = messages[validation];
              this.formControlValid[key] = false;
            }
          }
        }
      }
    });
  }

  resetFormSolicitudData() {
    const form = this.formSolicitud.get(Constants.solicitudData);
    const keys = Constants.getKeysSolPeticion();
    keys.forEach((key) => {
      const control = form.get(key);
      control.clearValidators();
      if (!this.isUrgente || key === Constants.ambiente) {
        const validator = this.formValidators[key];
        if (validator) {
          control.setValidators(validator);
        }
      }
    });
    form.updateValueAndValidity();
    this.onFormValueChanged();
  }

  resetForm() {
    this.allKeys.forEach((key) => {
      this.formErrors[key] = '';
      this.formControlValid[key] = false;
    });
    this.resetFormSolicitudData();
    this.formSolicitud.reset();
  }

  initPeticionData() {
    this.peticionData = {};
    this.resetPeticionData();
  }

  resetPeticionData() {
    this.peticionData[Constants.ip] = '';
    this.peticionData[this.KEY_LIST_IP] = [];
    this.peticionData[Constants.region] = [];
    this.peticionData[Constants.transaccion] = [];
  }

  ngOnInit() {
    this.usuario = this.service.getSessionUser();
    this.isAdmin = false;
    this.isComponentEnabled = false;
    this.isUIBlocked = false;
    this.resetAll();
    this.blockUI();
    this.service.getPeticionPropertiesByUsuario(this.usuario.id).subscribe((data) => {
      this.peticionProperties = data;
      this.usuarioProperties = this.peticionProperties.usuarioProperties;
      this.isAdmin = UsuarioProperties.isAdminOrAutorizador(this.usuarioProperties);
      this.createLists();
      this.unblockUI();
      if (this.dataSelector[Constants.usuarioCorp].length == 0) {
        this.alertService.alert(AlertSeverity.WARN, 'Sin Usuarios Corporativos', 'No tiene usuarios corporativos autorizados');
      } else {
        this.isComponentEnabled = true;
      }
    }, (error) => {
      console.log('error: ', error);
      this.unblockUI();
    });
  }

  resetAll() {
    this.minDate = new Date();
    this.minDate.setDate(new Date().getDate() + 1);
    this.listPeticion = [];
    this.listSelPeticion = [];
    this.isUrgente = false;
    this.lastId = 0;
    this.isResponse = false;
    this.isBlocked = false;
    this.isAmbienteProd = false;
    this.isValidSolicitud = false;
    this.isValidSolicitudData = false;
    this.isFechaEnabled = false;
    this.prevListTransaccion = [];
    this.isUIBlocked = false;
    this.resetPeticionData();
    this.resetForm();
  }

  createLists() {
    this.dataSelector[Constants.usuarioCorp] = this.peticionProperties.listM2kCatUsuarios.map((p) => {
      return { label: p.claveUsuario, value: p.claveUsuario };
    });
    this.dataSelector[Constants.transaccion] = this.peticionProperties.listM2kCatTransaccionesFront.map((p) => {
      return { label: p.transaccionPantallaTransient, value: p };
    });
    this.dataSelector[Constants.area] = this.peticionProperties.listArea.map((p) => {
      return { label: p.nombre, value: p };
    });
    this.dataSelector[Constants.aplicativo] = this.peticionProperties.listAplicativo.map((p) => {
      return { label: p.nombreCompuesto, value: p };
    });
    for (let i = 1; i < 10; i++) {
      this.dataSelector[Constants.region].push({ label: `${i}`, value: `${i}` });
    }
    if (this.isAdmin) {
      this.dataSelector[Constants.usuarioCorp].unshift({ label: '*', value: '*' });
      this.dataSelector[Constants.transaccion].unshift({ label: this.TRANSACCION_WILDCARD.transaccionPantallaTransient, value: this.TRANSACCION_WILDCARD });
      this.dataSelector[Constants.region].unshift({ label: '*', value: '*' });
    }
  }

  addPeticion() {
    const form = this.formSolicitud.get(Constants.peticionData);
    this.keysPet.forEach((key) => {
      if (key != Constants.ambiente && key != Constants.estatus) {
        form.get(key).markAsDirty();
      }
    });
    this.onFormValueChanged();
    if (!this.isValidPeticionData()) {
      return;
    }
    this.splitPeticiones(form.get(Constants.usuarioCorp).value, form.get(Constants.ppm).value);
  }

  splitPeticiones(usuarioCorp: string, ppm: number) {
    this.blockUI();
    let repetidas = 0;
    for (let i = 0; i < this.peticionData[this.KEY_LIST_IP].length; i++) {
      let ip = this.peticionData[this.KEY_LIST_IP][i].ip;
      for (let j = 0; j < this.peticionData[Constants.region].length; j++) {
        let region = this.peticionData[Constants.region][j].region;
        for (let k = 0; k < this.peticionData[Constants.transaccion].length; k++) {
          let transaccion = this.peticionData[Constants.transaccion][k].transaccion;
          let peticion = Peticion.getNewInstance();
          peticion.usuarioCorp = usuarioCorp;
          peticion.ip = ip;
          peticion.region = region;
          peticion.transaccion = transaccion;
          peticion.peticionesPorMinuto = ppm;
          if (this.isPeticionRepetida(peticion)) {
            repetidas++;
          } else {
            peticion.id = this.lastId--;
            this.listPeticion.push(peticion);
          }
        }
      }
    }
    this.validateSolicitud();
    this.unblockUI();
    if (repetidas > 0) {
      this.alertService.alert(AlertSeverity.WARN, 'Peticiones Repetidas', `Se detectaron ${repetidas} peticiones repetidas`);
    }
  }

  isPeticionRepetida(petNew: Peticion): boolean {
    if (this.listPeticion.length > 0) {
      for (let i = 0; i < this.listPeticion.length; i++) {
        let petOld = this.listPeticion[i];
        if (CommonUtils.isPeticionEqualOrWildcard(petOld, petNew)) {
          return true;
        }
      }
    }
    return false;
  }

  sendSolicitud() {
    if (this.isBlocked) {
      return;
    }
    this.alertService.alert(AlertSeverity.INFO, 'Enviando Solicitud', 'Revisando y enviando la solicitud');
    this.isBlocked = true;
    const form = this.formSolicitud.get(Constants.solicitudData);
    let solicitud = SolicitudPeticion.getNewInstance();
    solicitud.fechaRegistro = new Date();
    solicitud.estatus = EnumEstatus.REVISION;
    solicitud.aplicativo = form.get(Constants.aplicativo).value;
    solicitud.ambiente = form.get(Constants.ambiente).value;
    solicitud.fechaCaducidad = form.get(Constants.fechaCaducidad).value;
    solicitud.solicitante = this.usuario;
    solicitud.justificacion = StringUtils.trimToNull(form.get(Constants.justificacion).value);

    if (this.isUrgente) {
      solicitud.estatus = EnumEstatus.URGENTE;
      solicitud.autorizador = this.usuario;
      solicitud.fechaAutorizacion = solicitud.fechaRegistro;
    }
    this.listPeticion.forEach((peticion) => {
      peticion.id = null;
      peticion.ambiente = form.get(Constants.ambiente).value;
      peticion.estatus = solicitud.estatus;
      delete peticion['_$visited']; // Elimina el campo _$visited creado por p-dataTable al usar [(selection)]
    });
    this.lastId = 0;

    let wrapSolicitudPeticion: WrapSolicitudPeticion = new WrapSolicitudPeticion(solicitud, this.listPeticion);
    this.listSelPeticion = [];
    this.service.saveSolicitudPeticion(wrapSolicitudPeticion).subscribe((data) => {
      switch (data.status) {
        case HttpStatusCode.ALREADY_REPORTED:
          this.isResponse = true;
          let wrapper = toWrapSolicitudPeticion(data.json);
          if (wrapper) {
            this.listPeticion = wrapper.listPeticion.map((pet) => {
              pet.id = this.lastId--;
              return pet;
            });
          }
          this.alertService.alert(AlertSeverity.WARN, 'Peticiones Repetidas', 'Se detectaron peticiones ya registradas, favor de validar');
          break;
        case HttpStatusCode.NO_CONTENT:
          this.alertService.alert(AlertSeverity.ERROR, 'Error en la Solicitud', 'Error al registrar la solicitud');
        case HttpStatusCode.OK:
          this.resetAll();
          this.alertService.alert(AlertSeverity.SUCCESS, 'Solicitud Registrada', 'La solicitud fue registrada exitosamente');
          break;
      }
      this.isBlocked = false;
    }, (error) => {
      console.log('Error al enviar la solicitud:', error);
      this.isBlocked = false;
    });
    this.modalHide();
  }

  blockUI() { this.isUIBlocked = true; }
  unblockUI() { this.isUIBlocked = false; }
  modalShow() { jQuery(this.MODAL_ID).modal('show'); }
  modalHide() { jQuery(this.MODAL_ID).modal('hide'); }

  onChangeUrgente(event: any) {
    this.isUrgente = event;
    this.resetFormSolicitudData();
    this.onChangeAmbiente();
  }

  onChangeAmbiente(event?: any) {
    if (event) {
      this.isAmbienteProd = (event.value === EnumAmbiente.PROD);
    }
    const controlAmbiente = this.formSolicitud.get(Constants.solicitudData).get(Constants.ambiente);
    controlAmbiente.markAsDirty();
    controlAmbiente.updateValueAndValidity();

    const controlFechaCaducidad = this.formSolicitud.get(Constants.solicitudData).get(Constants.fechaCaducidad);
    controlFechaCaducidad.clearValidators();
    controlFechaCaducidad.patchValue(null);
    if (this.formControlValid[Constants.ambiente]) {
      this.isFechaEnabled = !this.isAmbienteProd;
    }
    if (!this.isUrgente && !this.isAmbienteProd) {
      controlFechaCaducidad.setValidators([Validators.required]);
    }
    controlFechaCaducidad.markAsDirty();
    controlFechaCaducidad.updateValueAndValidity();
    this.onFormValueChanged();
  }

  onChangeRegion(event: any) {
    const key = Constants.region;
    this.multiSelectHack(key);
    let lista = event.value;
    if (this.isAdmin) {
      let isAll = lista.indexOf(Peticion.WILDCARD) !== -1;
      if (isAll) {
        lista = [Peticion.WILDCARD];
        this.formSolicitud.get(Constants.peticionData).get(Constants.region).patchValue(lista.slice());
      }
    }
    this.peticionData[key] = lista.map((data: string) => {
      return { region: data };
    });
  }

  onChangeTransaccion(event: any) {
    const key = Constants.transaccion;
    this.multiSelectHack(key);
    let lista = event.value;
    if (this.isAdmin) {
      let isAll = false;
      for (let i = 0; i < lista.length; i++) {
        let t = lista[i].transaccion;
        if (t === Peticion.WILDCARD) {
          isAll = true;
          break;
        }
      }
      if (isAll) {
        lista = [this.TRANSACCION_WILDCARD];
        this.formSolicitud.get(Constants.peticionData).get(key).patchValue(lista.slice());
      }
    }
    if (lista.length == this.dataSelector[key].length) {
      this.alertService.alert(AlertSeverity.WARN, 'No Permitido', 'No se permite seleccionar todas las transacciones');
      this.formSolicitud.get(Constants.peticionData).get(key).patchValue(this.prevListTransaccion);
    } else {
      this.peticionData[key] = lista.slice();
      this.prevListTransaccion = lista.slice();
    }
  }

  onClickAddIP() {
    const key = Constants.ip;
    const ip = StringUtils.trim(this.peticionData[key]);
    this.formErrors[key] = '';
    if (!CommonUtils.isValidIP(ip)) {
      this.formErrors[key] = this.formMessages[key][FormValidationType.FORMAT];
      return;
    }
    if (!this.isIPRepetida(ip)) {
      this.peticionData[this.KEY_LIST_IP].push({ ip: ip });
      const lista = this.peticionData[this.KEY_LIST_IP].map((data: any) => {
        return data.ip;
      });
      const control = this.formSolicitud.get(Constants.peticionData).get(Constants.ip);
      control.patchValue(lista);
      control.markAsDirty();
      this.onFormValueChanged();
    }
  }

  onClickDeleteIP(ip: string) {
    let lista = this.peticionData[this.KEY_LIST_IP].filter((data: any) => {
      return data.ip !== ip;
    });
    this.peticionData[this.KEY_LIST_IP] = lista.slice();
    lista = lista.map((data: any) => {
      return data.ip;
    });
    this.formSolicitud.get(Constants.peticionData).get(Constants.ip).patchValue(lista);
    this.onFormValueChanged();
  }

  onClickDeleteRegion(region: string) {
    const key = Constants.region;
    let lista = this.peticionData[key].filter((data: any) => {
      return data.region !== region;
    });
    this.formSolicitud.get(Constants.peticionData).get(key).patchValue(lista.map((data: any) => { return data.region; }));
    this.peticionData[key] = lista.slice();
  }

  onClickDeleteTransaccion(transaccion: string) {
    const key = Constants.transaccion;
    let lista = this.peticionData[key].filter((data: any) => {
      return data.transaccion !== transaccion;
    });
    this.formSolicitud.get(Constants.peticionData).get(key).patchValue(lista);
    this.peticionData[key] = lista.slice();
    this.prevListTransaccion = lista.slice();
  }

  isIPRepetida(ip: string): boolean {
    for (let i = 0; i < this.peticionData[this.KEY_LIST_IP].length; i++) {
      let data = this.peticionData[this.KEY_LIST_IP][i].ip;
      if (data === ip) {
        return true;
      }
    }
    return false;
  }

  onClickRowDelete(id: number) {
    if (this.listPeticion.length > 0) {
      this.listPeticion = this.listPeticion.filter((peticion) => {
        return peticion.id !== id;
      });
    }
    this.validateSolicitud();
  }

  onClickModal() {
    const form = this.formSolicitud.get(Constants.solicitudData);
    if (!this.isUrgente) {
      Constants.getKeysSolPeticion().forEach((key) => {
        if (key !== Constants.justificacion) {
          form.get(key).markAsDirty();
        }
      });
      this.onFormValueChanged();
    }
    if (this.isValidSolicitudData) {
      this.modalShow();
    } else if (!this.isValidListPeticion()) {
      this.alertService.alert(AlertSeverity.WARN, 'Lista Peticiones Vacía', 'Se requiere registrar al menos 1 petición');
    } else {
      console.log('Ocurrio un error inesperado');
    }
  }

  onClickDeleteSelected() {
    if (this.listSelPeticion.length == 0) {
      this.alertService.alert(AlertSeverity.WARN, 'Lista Vacía', 'Debe seleccionar al menos 1 petición');
      return;
    }
    let listaID = this.listSelPeticion.map((peticion) => {
      return peticion.id;
    });
    let lista = this.listPeticion.filter((peticion) => {
      return listaID.indexOf(peticion.id) === -1;
    });
    this.listPeticion = lista.slice();
    this.listSelPeticion = [];
    this.validateSolicitud();
  }

  onClickDeleteAll() {
    this.listPeticion = [];
    this.listSelPeticion = [];
    this.validateSolicitud();
  }

  validateSolicitud() {
    this.isValidSolicitudData = this.isValidListPeticion()
      && this.formControlValid[Constants.ambiente]
      && (this.isUrgente
        || (this.formControlValid[Constants.aplicativo]
          && this.formControlValid[Constants.fechaCaducidad])
      );
    this.isValidSolicitud = this.isValidSolicitudData && (this.isUrgente
      || this.formControlValid[Constants.justificacion]);
  }

  isValidListPeticion(): boolean {
    return !(this.listPeticion === undefined
      || this.listPeticion == null
      || this.listPeticion.length == 0);
  }

  isValidPeticionData(): boolean {
    const validIP = this.peticionData[Constants.ip].length > 0;
    const form = this.formSolicitud.get(Constants.peticionData);
    return (
      form.get(Constants.usuarioCorp).valid
      && validIP
      && form.get(Constants.region).valid
      && form.get(Constants.transaccion).valid
      && form.get(Constants.ppm).valid);
  }

  multiSelectHack(key: string) {
    setTimeout(() => {
      $(`#${key} .ui-multiselect-label-container`)[0].children[0].textContent = this.labelSelector[key];
    }, 1);
  }
}
