import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, DataTable, SelectItem } from 'primeng/primeng';
import { HttpStatusCode } from 'app/core/common/HttpStatusCode';
import { PeticionesWSService } from '../peticiones-ws.service';
import { AuthService } from 'app/app.service';
import { AlertService, AlertSeverity } from 'app/alert.service';
import { User } from 'app/admin/admin.service';
import { SimpleHelp } from 'app/help/model/SimpleHelpModel';
import { UsuarioProperties } from '../model/UsuarioProperties';
import { PeticionProperties } from '../model/PeticionProperties';
import { Peticion, toPeticionList } from '../model/Peticion';
import { PeticionPaginator } from '../model/PeticionPaginator';
import { StringUtils } from '../utils/StringUtils';
import { FormValidationType } from '../utils/FormValidationType';
import { EnumAmbiente, EnumEstatus } from '../utils/EnumData';
import { CommonUtils } from '../utils/CommonUtils';
import { Constants } from '../utils/Constants';
import { WrapPeticion } from '../model/WrapPeticion';
import { PeticionData } from '../model/PeticionData';

declare let jQuery: any;

class DataAutoComplete {
  constructor(
    public usuarioCorp: any,
    public transaccion: any
  ) { }

  static getNewInstance(): DataAutoComplete {
    return new DataAutoComplete({}, {});
  }
}

@Component({
  selector: 'app-admin-peticiones',
  templateUrl: './admin-peticiones.component.html',
  styleUrls: ['./admin-peticiones.component.css']
})
export class AdminPeticionesComponent implements OnInit {

  @ViewChild('dtPeticiones')
  private dtPeticiones: DataTable;

  public readonly DEFAULT_PAGE_SIZE: number = 10;
  public readonly AUTORIZAR: number = EnumEstatus.AUTORIZADA;
  public readonly RECHAZAR: number = EnumEstatus.RECHAZADA;
  public readonly ELIMINAR: number = EnumEstatus.ELIMINADA;
  public readonly ACTUALIZAR: number = EnumEstatus.REVISION;
  public readonly USUARIO_CORP: string = Constants.usuarioCorp;
  public readonly TRANSACCION: string = Constants.transaccion;

  private readonly MAX_PETICIONES: number = 50;
  private readonly MODAL_ID: string = '#modalConfirmacion';
  private readonly NA: string = '[N/A]';
  private readonly FILTER_NULL_VALUE: string = '-';

  public ayuda: any;
  public dataSelector: any;
  public filterSelector: any;
  public formErrors: any;
  public tableCols: any[];
  public peticionData: PeticionData;
  public peticionDataEdit: PeticionData;
  public paginator: PeticionPaginator;
  public listPeticionData: PeticionData[];
  public listSelPeticionData: PeticionData[];
  public selAccionName: string;
  public isAdmin: boolean;
  public isUrgente: boolean;
  public dataAutoComplete: DataAutoComplete;
  public dataAutoCompleteEdit: DataAutoComplete;

  private formMessages: any;
  private maxRecords: number;
  private usuario: User;
  private usuarioProperties: UsuarioProperties;
  private peticionProperties: PeticionProperties;
  private page: number;
  private filterQuery: string;
  private selAccion: number;
  private lastId: number;
  private isAccionGlobal: boolean;
  private isProcessBlocked: boolean;

  constructor(private service: PeticionesWSService, private authService: AuthService, private alertService: AlertService) {
    this.initColumns();
    this.initForm();
    this.initAyuda();
    this.initSelectors();
  }

  initColumns() {
    this.tableCols = PeticionData.getColumns();
  }

  initForm() {
    this.formMessages = {};
    this.formErrors = {};
    const msgRequired = FormValidationType.getDefaultMessage(FormValidationType.REQUIRED);
    Constants.getKeysPeticion().forEach((key) => {
      this.formMessages[key] = {};
      this.formMessages[key][FormValidationType.REQUIRED] = msgRequired;
      this.formErrors[key] = '';
    });
    this.formMessages[Constants.ip][FormValidationType.FORMAT] = 'Formato IP incorrecto';
  }

  setFormError(key: string, validation?: string) {
    this.formErrors[key] = '';
    if (validation) {
      this.formErrors[key] = this.formMessages[key][validation];
    }
  }

  resetFormErrors() {
    Constants.getKeysPeticion().forEach((key) => {
      this.setFormError(key);
    });
  }

  initAyuda() {
    this.ayuda = {};
    this.ayuda[Constants.usuarioCorp] = new SimpleHelp('Usuario Corporativo', 'Usuario corporativo de la petición (* = cualquier usuario corporativo)');
    this.ayuda[Constants.ip] = new SimpleHelp('IP', 'Dirección IP desde donde es ejecutado el servicio web (* = cualquier IP)');
    this.ayuda[Constants.region] = new SimpleHelp('Región', 'Número de la región (1 - 9) de la petición (* = cualquier región)');
    this.ayuda[Constants.transaccion] = new SimpleHelp('Transacción', 'Transacción de la petición web (* = cualquier transacción)');
    this.ayuda[Constants.ppm] = new SimpleHelp('Peticiones Por Minuto', 'Número máximo de llamadas por minuto que se invoca el servicio web (0 = ignorar cantidad)');
    this.ayuda[Constants.ambiente] = new SimpleHelp('Ambiente Ejecución', 'Tipo de ambiente en donde se consumirá el servicio web');
    this.ayuda[Constants.estatus] = new SimpleHelp('Estatus Petición', 'Estatus de la petición');
    this.ayuda[Constants.solicitudPeticion] = new SimpleHelp('ID Solicitud', 'ID de la solicitud en la que se encuentra registrada la petición (0 = ignorar ID, -1 = borrar ID)');
  }

  initSelectors() {
    this.dataSelector = {};
    this.filterSelector = {};
    Constants.getKeysPeticion().forEach((key) => {
      this.dataSelector[key] = [];
    });

    let key = Constants.region;
    this.dataSelector[key] = [
      { label: this.NA, value: '0' },
      { label: Peticion.WILDCARD, value: '10' },
    ];
    for (let i = 1; i < 10; i++) {
      this.dataSelector[key].push({ label: `${i}`, value: `${i}` });
    }

    key = Constants.ambiente;
    this.dataSelector[key].push({ label: this.NA, value: this.NA });
    EnumAmbiente.getNameValuePairs().forEach((data) => {
      this.dataSelector[key].push({ label: data.name, value: data.name });
    });
    this.dataSelector[key].push({ label: EnumAmbiente.N_SICATEL, value: EnumAmbiente.N_SICATEL });

    key = Constants.estatus;
    this.dataSelector[key].push({ label: this.NA, value: this.NA });
    EnumEstatus.getNameValuePairs().forEach((data) => {
      this.dataSelector[key].push({ label: data.name, value: data.name });
    });
    this.dataSelector[key].push({ label: EnumEstatus.N_ELIMINADA, value: EnumEstatus.N_ELIMINADA });
  }

  ngOnInit() {
    this.usuario = this.service.getSessionUser();
    this.isAdmin = false;
    this.service.getPeticionPropertiesByUsuario(this.usuario.id).subscribe((data) => {
      this.peticionProperties = data;
      this.usuarioProperties = this.peticionProperties.usuarioProperties;
      this.isAdmin = this.usuarioProperties.administrador;
      this.createLists();
    }, (error) => {
      console.log('error: ', error);
    });
    this.maxRecords = -1;
    this.paginator = PeticionPaginator.getNewInstance();
    this.peticionData = PeticionData.getNewInstance();
    this.dataAutoComplete = DataAutoComplete.getNewInstance();
    this.filterQuery = '';
    this.isProcessBlocked = false;
    this.selAccionName = '';
    this.resetPeticionData();
  }

  createLists() {
    let key = Constants.usuarioCorp;
    this.dataSelector[key] = this.peticionProperties.listM2kCatUsuarios.map((p) => {
      return { label: StringUtils.toUpperCase(p.claveUsuario, true), value: StringUtils.toUpperCase(p.claveUsuario, true) };
    });
    this.dataSelector[key].unshift({ label: `${Peticion.WILDCARD}`, value: Peticion.WILDCARD });
    this.dataSelector[key].unshift({ label: this.NA, value: '' });
    this.filterSelector[key] = [];

    key = Constants.transaccion;
    this.dataSelector[key] = this.peticionProperties.listM2kCatTransaccionesFront.map((p) => {
      return { label: p.transaccionPantallaTransient, value: StringUtils.toUpperCase(p.transaccion, true) };
    });
    this.dataSelector[key].unshift({ label: `${Peticion.WILDCARD} (TODAS)`, value: Peticion.WILDCARD });
    this.dataSelector[key].unshift({ label: this.NA, value: '' });
    this.filterSelector[key] = [];
  }

  resetPeticionData() {
    this.resetFormErrors();
    this.resetPeticionDataEdit();
    this.resetDataTable();
  }

  resetPeticionDataEdit() {
    this.listSelPeticionData = [];
    this.peticionDataEdit = PeticionData.getNewInstance();
    this.dataAutoCompleteEdit = DataAutoComplete.getNewInstance();
    this.isAccionGlobal = false;
    this.isUrgente = false;
    this.selAccion = -1;
    this.lastId = -1;
  }

  resetDataTable() {
    this.page = 0;
    this.listPeticionData = [];
    if (this.dtPeticiones) {
      this.dtPeticiones.reset();
    }
  }

  filterSearch() {
    if (this.isProcessBlocked) {
      return;
    }
    this.globalBlock();
    this.service.findAllPeticionByFilters(this.DEFAULT_PAGE_SIZE, this.page, this.filterQuery).subscribe((data) => {
      if (data) {
        this.paginator = data;
        if (this.paginator.totalElements > this.maxRecords) {
          this.maxRecords = this.paginator.totalElements;
        }
        this.listPeticionData = this.paginator.listPeticion.map(PeticionData.toPeticionData);
        if (this.paginator.totalElements == 0) {
          this.alertService.alert(AlertSeverity.WARN, 'Sin Peticiones', 'No hay peticiones con los filtros seleccionados');
        } else {
          this.validateEditTable();
        }
      } else {
        this.alertService.alert(AlertSeverity.ERROR, 'Error en Búsqueda', 'Ocurrió un error al realizar la búsqueda');
      }
      this.globalUnblock();
    }, (error) => {
      console.log('error: ', error);
      this.globalUnblock();
    });
  }

  updatePeticiones() {
    if (this.isProcessBlocked) {
      return;
    }
    let wrapPeticion = WrapPeticion.getNewInstance();
    if (this.isAccionGlobal) {
      wrapPeticion.filterQuery = this.filterQuery;
    } else {
      wrapPeticion.listPeticion = this.listSelPeticionData.map(PeticionData.toPeticion);
    }
    wrapPeticion.usuario = this.usuario;
    wrapPeticion.urgente = this.isUrgente;
    wrapPeticion.accion = this.selAccion;
    this.globalBlock();
    this.alertService.alert(AlertSeverity.INFO, 'Procesando', 'Procesando actualización de peticiones WS-M2k');
    this.service.updatePeticiones(wrapPeticion).subscribe((data) => {
      switch (data.status) {
        case HttpStatusCode.OK:
          this.alertService.alert(AlertSeverity.SUCCESS, 'Peticiones Actualizadas', 'Se actualizaron las peticiones WS-M2k');
          break;
        case HttpStatusCode.ALREADY_REPORTED:
          this.alertService.alert(AlertSeverity.WARN, 'Sin Cambios', 'No se encontraron cambios a las peticiones');
          break;
        case HttpStatusCode.NO_CONTENT:
          this.alertService.alert(AlertSeverity.ERROR, 'Error en Actualizacion', 'Favor de revisar los logs para más detalles');
          break;
        default:
          this.alertService.alert(AlertSeverity.WARN, 'Estatus Desconocido', 'Se desconoce el estatus retornado');
          console.log('data: ', data);
      }
      this.globalUnblock();
      this.resetPeticionData();
    }, (error) => { this.globalUnblock(); });
  }

  addPeticionesEdit() {
    if (this.isProcessBlocked) {
      return;
    }
    this.globalBlock();
    if (this.listPeticionData.length == 0) {
      this.globalUnblock();
      return;
    }
    this.alertService.alert(AlertSeverity.INFO, 'Agregando Peticiones', 'Agregando peticiones a lista de ediciones');
    if (this.listPeticionData.length < this.paginator.totalElements) {
      this.service.getAllPeticionByFilters(this.filterQuery).subscribe((data) => {
        if (data) {
          let listData = data.map(PeticionData.toPeticionData);
          CommonUtils.addListPeticionDataToList(listData, this.listSelPeticionData, true);
        }
        this.validateEditTable();
        this.globalUnblock();
        this.alertService.alert(AlertSeverity.SUCCESS, 'Peticiones Agregadas', 'Se agregaron las peticiones a la lista de ediciones');
      }, (error) => { this.globalUnblock(); });
    } else {
      CommonUtils.addListPeticionDataToList(this.listPeticionData.slice(0), this.listSelPeticionData, true);
      this.validateEditTable();
      this.globalUnblock();
      this.alertService.alert(AlertSeverity.SUCCESS, 'Peticiones Agregadas', 'Se agregaron las peticiones a la lista de ediciones');
    }
  }

  addNewPeticion(dataInput: PeticionData) {
    if (this.isProcessBlocked) {
      return;
    }
    this.globalBlock();
    let peticion: Peticion = PeticionData.toPeticion(dataInput);
    this.alertService.alert(AlertSeverity.INFO, 'Revisando Petición', 'Revisando la petición en base de datos');
    this.service.checkPeticionRepetida(peticion).subscribe((data) => {
      switch (data.status) {
        case HttpStatusCode.ALREADY_REPORTED:
          this.alertService.alert(AlertSeverity.WARN, 'Petición Repetida', 'La petición ya existe en la base de datos, favor de validar');
          break;
        case HttpStatusCode.NO_CONTENT:
          this.alertService.alert(AlertSeverity.ERROR, 'Error al Revisar', 'Favor de revisar los logs para más detalles');
          break;
        case HttpStatusCode.OK:
          dataInput.id = this.lastId--;
          this.listSelPeticionData.push(PeticionData.getClone(dataInput));
          this.alertService.alert(AlertSeverity.SUCCESS, 'Petición Agregada', 'Se agregó la petición');
          break;
        default:
          this.alertService.alert(AlertSeverity.WARN, 'Estatus Desconocido', 'Se desconoce el estatus retornado');
          console.log('data: ', data);
      }
      this.globalUnblock();
    }, (error) => { this.globalUnblock(); });
  }

  onLazyLoadData(event: LazyLoadEvent) {
    this.page = event.first / this.DEFAULT_PAGE_SIZE;
    this.filterSearch();
  }

  onAutoComplete(key: string, event: any) {
    this.filterSelector[key] = [];
    const label = event.query;
    if (StringUtils.isBlank(label)) {
      return;
    }
    this.dataSelector[key].forEach((data: SelectItem) => {
      if (data.label.indexOf(StringUtils.toUpperCase(label, true)) > -1) {
        this.filterSelector[key].push(data);
      }
    });
  }

  onAutoCompleteDropdown(key: string) {
    this.filterSelector[key] = [];
    this.dataSelector[key].forEach((data: SelectItem) => {
      this.filterSelector[key].push(data);
    });
  }

  onAutoCompleteSelect(key: string, event: any, edit?: any) {
    if (edit) {
      this.peticionDataEdit[key] = event.value;
    } else {
      this.peticionData[key] = event.value;
    }
  }

  onClickFilterSearch() {
    this.filterQuery = this.getPeticionFilterFormat(this.getValidPeticionData(this.peticionData));
    this.resetDataTable();
  }

  onClickFilterClear() {
    this.peticionData = PeticionData.getNewInstance();
    this.filterQuery = '';
    this.dataAutoComplete = DataAutoComplete.getNewInstance();
    this.resetDataTable();
  }

  onClickRowEdit(data: PeticionData) {
    if (CommonUtils.addPeticionDataToList(data, this.listSelPeticionData, true)) {
      data.repetida = true;
      this.alertService.alert(AlertSeverity.SUCCESS, 'Petición Agregada', 'La petición se agregó a la tabla de ediciones');
    } else {
      this.alertService.alert(AlertSeverity.WARN, 'Petición Existente', 'Ya existe la petición en la lista de ediciones');
    }
  }

  onClickRowDelete(id: Number) {
    this.listSelPeticionData = this.listSelPeticionData.filter((data) => {
      return data.id !== id;
    });
    this.validateEditTable();
  }

  onClickRowCopy(data: PeticionData) {
    this.peticionDataEdit = PeticionData.getClone(data);
    this.peticionDataEdit.id = null;
    if (this.peticionDataEdit.region == Peticion.WILDCARD) {
      this.peticionDataEdit.region = '10';
    }
  }

  onClickAccionGlobal(accion: number) {
    this.selAccion = accion;
    this.isAccionGlobal = true;
    this.selAccionName = this.getAccionName();
    if (!this.isAccionAllowed()) {
      return;
    }
    if (this.selAccion === this.ACTUALIZAR) {
      this.addPeticionesEdit();
      return;
    }
    this.modalShow();
  }

  onClickMultiEdit() {
    this.resetFormErrors();
    if (!this.isValidIP(this.peticionDataEdit.ip)) {
      return;
    }
    if (this.listSelPeticionData.length == 0) {
      return;
    }
    let data = this.getValidPeticionData(this.peticionDataEdit);
    this.listSelPeticionData.forEach((petData) => {
      petData.usuarioCorp = StringUtils.defaultIfBlank(data.usuarioCorp, petData.usuarioCorp);
      petData.ip = StringUtils.defaultIfBlank(data.ip, petData.ip);
      petData.region = StringUtils.defaultIfBlank(data.region, petData.region);
      petData.transaccion = StringUtils.defaultIfBlank(data.transaccion, petData.transaccion);
      petData.peticionesPorMinuto = StringUtils.defaultIfBlank(data.peticionesPorMinuto, petData.peticionesPorMinuto);
      petData.ambiente = StringUtils.defaultIfBlank(data.ambiente, petData.ambiente);
      petData.estatus = StringUtils.defaultIfBlank(data.estatus, petData.estatus);
      if (data.solicitudPeticion == '-1') {
        petData.solicitudPeticion = '';
      } else {
        petData.solicitudPeticion = StringUtils.defaultIfBlank(data.solicitudPeticion, petData.solicitudPeticion);
      }
    });
  }

  onClickAddNewPeticion() {
    if (this.isProcessBlocked) {
      return;
    }
    let output = this.getValidPeticionData(this.peticionDataEdit);
    if (!this.isValidPeticion(output)) {
      this.alertService.alert(AlertSeverity.WARN, 'Datos Incorrectos', 'Favor de validar datos ingresados');
      return;
    }
    if (CommonUtils.isPeticionDataRepetida(output, this.listSelPeticionData)) {
      this.alertService.alert(AlertSeverity.WARN, 'Petición Existente', 'Ya existe la petición en la tabla de ediciones');
      return;
    }
    if (StringUtils.isBlank(output.solicitudPeticion) || output.solicitudPeticion == '-1') {
      output.solicitudPeticion = '';
    }
    this.addNewPeticion(output);
  }

  onClickClearEditFileds() {
    this.resetFormErrors();
    this.peticionDataEdit = PeticionData.getNewInstance();
  }

  onClickClearEdits() {
    this.resetPeticionDataEdit();
    this.validateEditTable();
  }

  onClickAccion(accion: number) {
    this.selAccion = accion;
    this.isAccionGlobal = false;
    this.selAccionName = this.getAccionName();
    if (!this.isAccionAllowed()) {
      return;
    }
    this.modalShow();
  }

  onClickDialogCancel() {
    this.isUrgente = false;
    this.modalHide();
  }

  onClickDialogOK() {
    this.modalHide();
    if (this.isAccionGlobal && (StringUtils.isBlank(this.filterQuery) || this.paginator.totalElements >= this.maxRecords)) {
      this.alertService.alert(AlertSeverity.ERROR, 'Actualización No Permitida', 'No se permite realizar la acutalización de todos los registros');
      return;
    }
    this.updatePeticiones();
  }

  globalBlock() { this.isProcessBlocked = true; }
  globalUnblock() { this.isProcessBlocked = false; }
  modalShow() { jQuery(this.MODAL_ID).modal('show'); }
  modalHide() { jQuery(this.MODAL_ID).modal('hide'); }

  validateEditTable() {
    let listId: Number[] = this.listSelPeticionData.map((data) => {
      return data.id;
    });
    this.listPeticionData.forEach((peticion) => {
      peticion.repetida = (listId.indexOf(peticion.id) > -1);
    });
  }

  getPeticionFilterFormat(data: PeticionData): string {
    let output = '';
    const ambiente = StringUtils.isBlank(data.ambiente) ? this.FILTER_NULL_VALUE : EnumAmbiente.getValue(data.ambiente);
    const estatus = StringUtils.isBlank(data.estatus) ? this.FILTER_NULL_VALUE : EnumEstatus.getValue(data.estatus);
    output += StringUtils.defaultIfBlank(data.usuarioCorp, this.FILTER_NULL_VALUE) + '_';
    output += StringUtils.defaultIfBlank(data.ip, this.FILTER_NULL_VALUE) + '_';
    output += StringUtils.defaultIfBlank(data.region, this.FILTER_NULL_VALUE) + '_';
    output += StringUtils.defaultIfBlank(data.transaccion, this.FILTER_NULL_VALUE) + '_';
    output += StringUtils.defaultIfBlank(data.peticionesPorMinuto, this.FILTER_NULL_VALUE) + '_';
    output += ambiente + '_';
    output += estatus + '_';
    output += StringUtils.defaultIfBlank(data.solicitudPeticion, this.FILTER_NULL_VALUE);
    if (output == '-_-_-_-_-_-_-_-') {
      return '';
    }
    return output;
  }

  getValidPeticionData(data: PeticionData): PeticionData {
    let output: PeticionData = PeticionData.getNewInstance();

    output.usuarioCorp = StringUtils.toUpperCase(data.usuarioCorp, true);
    output.ip = StringUtils.trimToEmpty(data.ip);
    output.region = data.region;
    output.transaccion = StringUtils.toUpperCase(data.transaccion, true);
    output.peticionesPorMinuto = StringUtils.trimToEmpty(`${data.peticionesPorMinuto}`);
    output.ambiente = data.ambiente;
    output.estatus = data.estatus;
    output.solicitudPeticion = StringUtils.trimToEmpty(`${data.solicitudPeticion}`);

    if (output.ip == Peticion.ALL_IP) {
      output.ip = Peticion.WILDCARD;
    }

    if (output.region == '0') {
      output.region = '';
    } else if (output.region == '10') {
      output.region = Peticion.WILDCARD;
    }

    if (output.peticionesPorMinuto == '0') {
      output.peticionesPorMinuto = '';
    }

    if (output.ambiente == this.NA) {
      output.ambiente = '';
    }

    if (output.estatus == this.NA) {
      output.estatus = '';
    }

    if (output.solicitudPeticion == '0') {
      output.solicitudPeticion = '';
    }
    return output;
  }

  getAccionName(): string {
    switch (this.selAccion) {
      case this.AUTORIZAR: return 'Autorizar';
      case this.RECHAZAR: return 'Rechazar';
      case this.ELIMINAR: return 'Eliminar';
      case this.ACTUALIZAR: return 'Actualizar';
    }
    return '';
  }

  isValidIP(ip: string): boolean {
    const key = Constants.ip;
    this.setFormError(key);
    if (StringUtils.isBlank(ip) || StringUtils.trimToEmpty(ip) == Peticion.WILDCARD) {
      return true;
    }
    if (!CommonUtils.isValidIP(ip)) {
      this.setFormError(key, FormValidationType.FORMAT);
    }
    return StringUtils.isBlank(this.formErrors[key]);
  }

  isAccionAllowed(): boolean {
    let total: number;
    if (this.isAccionGlobal) {
      total = this.paginator.totalElements;
    } else {
      total = this.listSelPeticionData.length;
    }
    if (total == 0) {
      this.alertService.alert(AlertSeverity.ERROR, 'Selección Vacía', 'No hay peticiones para actualizar o editar');
      return false;
    }
    let isValid = (total <= this.MAX_PETICIONES && total < this.maxRecords);
    if (!isValid) {
      const max = (total <= this.MAX_PETICIONES ? this.maxRecords : this.MAX_PETICIONES);
      this.alertService.alert(AlertSeverity.ERROR, 'Actualización No Permitida', `No se permite acualizar más de ${max} registros`);
    }
    return isValid;
  }

  isValidPeticion(data: PeticionData): boolean {
    let valid = true;
    const required = FormValidationType.REQUIRED;
    this.resetFormErrors();

    if (StringUtils.isBlank(data.ambiente)) {
      this.setFormError(Constants.ambiente, required);
    }

    if (StringUtils.isBlank(data.estatus)) {
      this.setFormError(Constants.estatus, required);
    }

    if (StringUtils.isBlank(data.usuarioCorp)) {
      this.setFormError(Constants.usuarioCorp, required);
    }

    if (StringUtils.isBlank(data.ip)) {
      this.setFormError(Constants.ip, required);
    } else if (!CommonUtils.isValidIP(data.ip)) {
      this.setFormError(Constants.ip, FormValidationType.FORMAT);
    }

    if (StringUtils.isBlank(data.region)) {
      this.setFormError(Constants.region, required);
    }

    if (StringUtils.isBlank(data.transaccion)) {
      this.setFormError(Constants.transaccion, required);
    }

    if (StringUtils.isBlank(data.peticionesPorMinuto)) {
      this.setFormError(Constants.ppm, required);
    }

    Constants.getKeysPeticion().forEach((key) => {
      const error = this.formErrors[key];
      if (!StringUtils.isBlank(error)) {
        valid = false;
      }
    });

    return valid;
  }
}
