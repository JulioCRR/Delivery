import { request } from 'http';
import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AlertService } from '../../alert.service';
import { endpointServer } from '../../../environments/environment';
import {ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {PruebaCtg} from '../modelo/PruebaCtg';
import {RespuestaCtg} from '../modelo/RespuestaCtg';
import {M2kSolicitudCtg} from '../modelo/M2kSolicitudCtg';
import {CtgExecutionCommonService} from '../ctg-execution.service';
import { SelectItem } from 'primeng/primeng';
import {User} from '../../admin/admin.service';
import {Help} from '../help/model/HelpModel';
import {GlobalService} from '../../global.service';

declare let jsPDF;

@Component({
  selector: 'app-pruebasIgtoc',
  templateUrl: './pruebasIgtoc.component.html',
  styleUrls: ['./pruebasIgtoc.component.css']
})
export class PruebasIgtocComponent implements OnInit {

    private prodEnvChecked: boolean = false;
    private enviromentSelected: string;
    private programaInput: string;
    private transaccionInput: string;
    private cadenaIgtocInput: string;
    private usuarioInput: string;
    private pwdInput: string;
    private infoEnviadaCtgOutput: string;
    private respProgramaOutput: string;
    private respXmlOutput: string;
    private respCtgOutput: string;
    private displayConfirmProd: boolean = false;
    private codigoProdInput: string;
    private isProdEnvEnabled: boolean = false;
    private respCtg: RespuestaCtg;
    private opcionesRegion: SelectItem[];
    private opcionesCics: SelectItem[];
    private selectOption: any;
    private selectCics: any;
    private logoTelcel: any;
    private usuario: User;
    private solicitudValidada: M2kSolicitudCtg;
    private igtocForm: FormGroup;
    private ayudaCambioAmbiente: Help;
    private ayudaUsr: Help;
    private ayudaProg: Help;
    private ayudaTrans: Help;
    private ayudaCadenaIgtoc: Help;
    private ayudaCicsDesarrollo: Help;

	private foliosCTG: SelectItem[];
	private mensajeFolios: string = 'NO TIENE SOLICITUDES ACTIVAS';
	private isExecDisabled: boolean = false;

    constructor(private alertService: AlertService, private ctgService: CtgExecutionCommonService,
      fb: FormBuilder, private globalService: GlobalService) {

      this.igtocForm = fb.group({
          'programaInput' : ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(7)])],
          'transaccionInput' : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
          'cadenaIgtocInput' : ['', Validators.compose([Validators.required,Validators.maxLength(2000)])],
          'usuarioInput' : ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10)])],
          'pwdInput' : ['', Validators.required]
        });
        this.cargarAyuda();
        this.igtocForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    ngOnInit() {
      this.usuario = JSON.parse(localStorage.getItem('user_session_data')).user;
      this.ctgService.obtenerResponsable(this.usuario.id).subscribe(
        data => {
            console.log(data);
        },
        err => {console.log(err);},
        () => {console.log("Responsable obtenido [done]");}
      );

      if (this.prodEnvChecked == true) {
        this.enviromentSelected = "Producción";
      } else {
        this.enviromentSelected = "Desarrollo";
      }

      this.opcionesRegion = [
        {label:'R01', value:1},
        {label:'R02', value:2},
        {label:'R03', value:3},
        {label:'R04', value:4},
        {label:'R05', value:5},
        {label:'R06', value:6},
        {label:'R07', value:7},
        {label:'R08', value:8},
        {label:'R09', value:9},
      ];

      this.selectOption = 1;

      this.opcionesCics = [
        {label:'DEVL', value:1},
        {label:'CICSDSB9', value:2}
      ];

      this.selectCics = 1;
    }

    checkSession() {

    }

    cargarAyuda() {
      this.ayudaUsr = new Help('Usuario Mobile','Usuario registrado en M2K con autoridad para ejecutar el componente en Producción');
      this.ayudaCambioAmbiente = new Help('AMBIENTE','Existen dos ambientes: DESARROLLO y PRODUCCIÓN y ambos se ejecutan por medio de la región seleccionada. Para poder acceder al ambiente PRODUCTIVO es requerido un folio en el formato CTGPRODXXX autorizado por su SUPERVISOR/RESPONSABLE.');
      this.ayudaTrans = new Help('Transacción','Transacción M2K asignada al componente, p.ej. I*TC');
      this.ayudaProg = new Help('Programa','Nombre del programa en M2K, p.ej. IGTOC65 ');
      this.ayudaCadenaIgtoc = new Help('Cadena IGTOC', 'Cadena que contiene un formato especifico definido en el PROGRAMA IGTOCXX que desea probar.');
      this.ayudaCicsDesarrollo = new Help('Cics Desarrollo', 'Existen dos CICS en el ambiente de desarrollo: DEVL y CICSDSB9, en ambos ambientes se permite ejecutar programas tipo IGTOC.');
    }

    onValueChanged(data?: any) {
      if (!this.igtocForm) { return; }
      const form = this.igtocForm;

      for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }

    formErrors = {
      'programaInput' : '',
      'transaccionInput' : '',
      'cadenaIgtocInput' : '',
      'usuarioInput' : '',
      'pwdInput' : ''
    };

    validationMessages = {
      'programaInput': {
          'required': 'El PROGRAMA es REQUERIDO.',
          'minlength': 'El PROGRAMA debe tener al menos 7 caracteres.',
          'maxlength': 'El PROGRAMA debe tener máximo 7 caracteres.'
      },'transaccionInput': {
          'required': 'La TRANSACCIÓN es REQUERIDA.',
          'minlength': 'La TRANSACCIÓN debe tener al menos 4 caracteres.',
          'maxlength': 'La TRANSACCIÓN debe tener máximo 4 caracteres.'
      },
      'cadenaIgtocInput': {
          'required': 'La cadena para ejecutar el IGTOC es REQUERIDA.',
          'maxlength': 'La cadena a enviar debe tener máximo 2000 caracteres.'
      },
      'usuarioInput' : {
          'required': 'El usuario MOBILE es REQUERIDO.',
          'minlength': 'El usuario MOBILE debe tener al menos 1 caractér.',
          'maxlength': 'El usuario MOBILE debe tener máximo 10 caracteres.'
      },
      'pwdInput' : {
          'required': 'El password es REQUERIDO.'
      },
    };

    cambioRegion() {
    }

    cambioCics() {
    }

    handleChange(e) {
        var isChecked = e.checked;
        this.solicitudValidada = null;
        if (isChecked == true) {
          this.showDialog();
          this.prodEnvChecked = true;
		  this.solicitudesActivas();
        } else {
          this.prodEnvChecked = false;
          this.isProdEnvEnabled = false;
          this.enviromentSelected = "Desarrollo";
        }
        this.limpiar();
    }

    executeIgtoc() {
      this.isExecDisabled = true;
      let ambiente: String;
      let idSolicitud: any;

      if (this.isProdEnvEnabled) {
        ambiente = 'P';
        idSolicitud = this.solicitudValidada.id;
      } else {
          //ambiente = 'D';
          if(this.selectCics == 1){
            ambiente = 'D' //DEVL
          }else{
            ambiente = 'C' //CICSDSB9
          }
      idSolicitud = 0;
      this.codigoProdInput = '';
      }

      let prueba = new PruebaCtg(
        this.igtocForm.get('usuarioInput').value.toUpperCase(),
        this.igtocForm.get('pwdInput').value,
        this.igtocForm.get('programaInput').value.toUpperCase(),
        'R0'+this.selectOption,
        this.igtocForm.get('transaccionInput').value.toUpperCase(),
        this.igtocForm.get('cadenaIgtocInput').value.toUpperCase(),
        ambiente,
        this.codigoProdInput,
        new Date(),
        this.usuario.id,
        idSolicitud
      );

      let respuesta = this.ctgService.ejecutarPruebaCtg(prueba).subscribe(
        data => {this.respCtg = data;
          if (data != null) {
            if (this.isProdEnvEnabled) {
              this.solicitudValidada.countEjecuciones = this.solicitudValidada.countEjecuciones + 1;
            }
            if (this.respCtg.mensajeValidacion == 'VALIDACION EXITOSA') {
              this.alertService.push({severity: 'info', summary: 'Acción Exitosa', detail: "Se ha completado la acción correctamente."});
            } else {
              this.alertService.push({severity: 'error', summary: 'Error en la operación', detail: this.respCtg.mensajeValidacion});
            }
          } else {
            this.alertService.push({severity: 'error', summary: 'Error en la operación', detail: "No se ha podido completar la operación. Favor de intentar nuevamente."});
          }
          this.isExecDisabled = false;
        },
        err => {console.log(err);
                this.solicitudValidada = null;
                this.cancelDialog();
                this.limpiar();
              },
        () => {this.isExecDisabled = false;}
      );

    }

    validarEnvProd() {
      this.isExecDisabled = false;
      if (this.codigoProdInput) {
        this.ctgService.validarCodigoProduccion(this.codigoProdInput,this.usuario.id).subscribe(
          data => {
            if (data != null) {
              this.solicitudValidada = data;
              this.enviromentSelected = "Produccion";
              this.isProdEnvEnabled = true;
              this.codigoProdInput = null;
              this.cargarEnvProd(data.programa,data.transaccion, data.usuario);
              this.alertService.push({severity: 'info', summary: 'Exito', detail: "Se ha realizado con éxito el acceso al ambiente de PRODUCCIÓN."});
            } else {
              this.codigoProdInput = null;
              this.prodEnvChecked = false;
              this.isProdEnvEnabled = false;
              this.enviromentSelected = "Desarrollo";
              this.alertService.push({severity: 'error', summary: 'Acceso no valido', detail: "El código de acceso al ambiente de PRODUCCION es incorrecto o ha caducado. Favor de revisar el folio."});
            }
          },
          err => {console.log(err);
                  this.prodEnvChecked = false;
                  this.isProdEnvEnabled = false;
                  this.enviromentSelected = "Desarrollo";
                  this.codigoProdInput = null;
                },
          () => {this.hideDialog();
                  console.log('done');}
        );
      } else {
        this.codigoProdInput = null;
        this.prodEnvChecked = false;
        this.isProdEnvEnabled = false;
        this.enviromentSelected = "Desarrollo";
        this.alertService.push({severity: 'error', summary: 'Codigo Vacio', detail: "El código de acceso al ambiente de PRODUCCION no puede estar vacío"});
        this.hideDialog();
      }
    }

    cargarEnvProd(program: any, transaccion: any, usr: any) {
      this.codigoProdInput = null;
      this.igtocForm.patchValue({
        'programaInput': ''+program.toUpperCase(),
        'transaccionInput': ''+transaccion.toUpperCase(),
        'usuarioInput': ''+usr.toUpperCase()
      });
      $('input[id="programaInput"]').val(""+program);
      $('input[id="transaccionInput"]').val(""+transaccion);
      $('input[id="usuarioInput"]').val(""+usr);
      $('input[id="programaInput"]').attr('readonly', ""+this.isProdEnvEnabled);
      $('input[id="transaccionInput"]').attr('readonly', ""+this.isProdEnvEnabled);
      $('input[id="usuarioInput"]').attr('readonly', ""+this.isProdEnvEnabled);
    }

    showDialog() {
      this.codigoProdInput = null;
      this.displayConfirmProd = true;
    }

    hideDialog() {
      this.codigoProdInput = null;
      this.displayConfirmProd = false;
    }

    cancelDialog() {
      this.prodEnvChecked = false;
      this.isProdEnvEnabled = false;
      this.enviromentSelected = "Desarrollo";
      this.hideDialog();
    }

    limpiar() {
      this.isExecDisabled = false;
      this.selectOption = 1;
      this.selectCics = 1;
      $( '#formPruebaIgtoc' ).each(function(){
            this.reset();
      });
      this.respCtg = null;
      if (this.prodEnvChecked == true && this.solicitudValidada != null) {
        this.igtocForm.patchValue({
          'programaInput': ''+this.solicitudValidada.programa.toUpperCase(),
          'transaccionInput': ''+this.solicitudValidada.transaccion.toUpperCase(),
          'usuarioInput': ''+this.solicitudValidada.usuario.toUpperCase()
        });
        $('input[id="programaInput"]').val(""+this.solicitudValidada.programa);
        $('input[id="transaccionInput"]').val(""+this.solicitudValidada.transaccion);
        $('input[id="usuarioInput"]').val(""+this.solicitudValidada.usuario);
      } else {
        $('input[id="programaInput"]').prop('readonly', false);
        $('input[id="transaccionInput"]').prop('readonly', false);
        $('input[id="usuarioInput"]').prop('readonly', false);
      }
    }

	solicitudesActivas() {
		this.foliosCTG = [];
		this.mensajeFolios = 'SELECCIONAR CODIGO SOLICITUD';
		this.ctgService.listarSolicitudes(this.usuario.id, 2).subscribe(
          data => {
			  console.log("SOLICITUDES: ", data);
			  if (data) {
				  this.foliosCTG = data.map(s =>{
					  return {label: s.folioGenerado, value: s.folioGenerado};
				  });
			  } else {
				  this.mensajeFolios = 'NO TIENE SOLICITUDES ACTIVAS';
			  }
			},
          err => {console.log(err);},
          () => console.log('done')
		);
	}

    download() {
      var doc = new jsPDF();
      this.logoTelcel = require('json-loader!../../../assets/json/logoTelcelB64.json');
      doc.addImage(this.logoTelcel.logo, 'JPEG', 50, 20, 100, 25);
      doc.setFontSize(16);
      doc.setFontStyle("italic");
      doc.setTextColor(115,135,156);
      doc.text(20 , 55, 'Sistema de Gestión de Servicios M2K - Ejecución de IGTOC');
      doc.setFontSize(13);
      doc.text(20 , 70, 'Programa');
      doc.setTextColor(51,122,183);
      doc.text(20 , 80, this.igtocForm.get('programaInput').value.toUpperCase());
      doc.setTextColor(115,135,156);
      doc.text(20, 90, 'Transacción');
      doc.setTextColor(51,122,183);
      doc.text(20, 100, this.igtocForm.get('transaccionInput').value.toUpperCase());
      doc.setTextColor(115,135,156);
      doc.text(20, 110, 'Región');
      doc.setTextColor(51,122,183);
      doc.text(20, 120, 'R0'+this.selectOption);
      doc.setTextColor(115,135,156);
      doc.text(20, 130, 'Usuario Mobile');
      doc.setTextColor(51,122,183);
      doc.text(20, 140, this.igtocForm.get('usuarioInput').value.toUpperCase());
      doc.setTextColor(115,135,156);
      if (this.prodEnvChecked == true) {
        doc.text(20, 150, 'Ambiente Producción');
        doc.text(20, 160, 'Código de Respuesta CTG');
        doc.setTextColor(51,122,183);
      } else {
        doc.text(20, 150, 'Ambiente Desarrollo');
        doc.setTextColor(51,122,183);
        if (this.selectCics == 1){
          doc.text(20, 160, 'DEVL');
        }else{
          doc.text(20, 160, 'CICSDSB9');
        }

      }
      doc.setTextColor(51,122,183);
      var sourceCodigoCtg = $('#codigoCtg')[0];
      var margins = {
          width: 175
      };
      var specialElementHandlers = {
          '#bypassme': function (element, renderer) {
              return true
          }
      };
      doc.fromHTML(
          sourceCodigoCtg, // HTML string or DOM elem ref.
          20, // x coord
          170, { // y coord
              'width': margins.width, // max width of content on PDF
              'elementHandlers': specialElementHandlers
      });
      //SE AGREGAN LOS CAMPOS QUE PUEDEN TENER UNA LONGITUD MUY EXTENSA: CADENA ENVIADA, RESPEUSTA PROGRAMA, RESPUESTA XML
      var sourceCadEnviada = $('#infoEnviadaCtg')[0];
      var sourceRespProg = $('#respPrograma')[0];
      var sourceRespXml = $('#respXmlCtg')[0];
      var sourceMensajeValidacion = $('#mensajeValidacion')[0];
      var margins = {
          width: 175
      };
      var specialElementHandlers = {
          '#bypassme': function (element, renderer) {
              return true
          }
      };
      doc.fromHTML(
      sourceCadEnviada, // HTML string or DOM elem ref.
      20, // x coord
      185, { // y coord
          'width': margins.width, // max width of content on PDF
          'elementHandlers': specialElementHandlers
      });

      doc.addPage();
      doc.fromHTML(
      sourceRespProg, // HTML string or DOM elem ref.
      20, // x coord
      30, { // y coord
          'width': margins.width, // max width of content on PDF
          'elementHandlers': specialElementHandlers
      });

      doc.addPage();
      doc.fromHTML(
      sourceRespXml, // HTML string or DOM elem ref.
      20, // x coord
      30, { // y coord
          'width': margins.width, // max width of content on PDF
          'elementHandlers': specialElementHandlers
      });

	  doc.addPage();
      doc.fromHTML(
      sourceMensajeValidacion, // HTML string or DOM elem ref.
      20, // x coord
      30, { // y coord
          'width': margins.width, // max width of content on PDF
          'elementHandlers': specialElementHandlers
      });

      doc.save('EjecucionCTG_'+this.igtocForm.get('programaInput').value.toUpperCase()+'.pdf');
    }
}
