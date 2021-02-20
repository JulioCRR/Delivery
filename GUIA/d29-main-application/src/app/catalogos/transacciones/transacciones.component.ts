import { request } from 'http';
import { M2kRelAccionTransaccion } from '../model/M2kRelAccionTransaccion';
import { CatalogosService } from '../catalogos.service';
import { Component, OnInit, ElementRef, ViewChild, PLATFORM_INITIALIZER} from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { M2kCatTransaccion } from '../model/M2kCatTransaccion';
import { BlockableUI } from 'primeng/primeng';
import { AlertService } from '../../alert.service';
import { endpointServer } from '../../../environments/environment';
import {ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ImageHelp} from '../../help/model/ImageHelpModel';
import {SimpleHelp} from '../../help/model/SimpleHelpModel';
import {SimpleHelpComponent} from '../../help/simpleHelp/simple_help.component';
import {ImageHelpComponent} from '../../help/imageHelp/image_help.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NuevaTransaccion } from '../model/NuevaTransaccion';
//import { ModalService } from '../transacciones/utils/ModalService';


declare let jsPDF;

function getCurrentPageNumber(doc) {
	return doc.internal.getCurrentPageInfo().pageNumber;
}

      function makeRequestTable(doc, chapter, title, urls, xml, deprecated?, mrgSize?) {
                mrgSize = mrgSize ? mrgSize : {top: 60, bottom: 50}
	              var posSub = 65;
	              var mrg = {top: 68};
	              doc.setFontSize(14);
	              doc.setFontStyle("Arial");
	              doc.setFontType("bold");
	              doc.text(20, 55, chapter + '. ' + title);
	              if (deprecated) {
		            posSub = 75;
		            mrg = {top: 80};
		            doc.setTextColor(255,0,0);
                doc.text(111, 55, '(Deprecada)');
		            doc.setFontStyle("Arial");
		            doc.setFontType("bold");
		            doc.setFontSize(12);
		            doc.setTextColor(255,0,0);
		            doc.text(20, 60, 'Para acatar los estándares de comunicación definidos por la Oficina de Arquitectura, se recomienda el uso de las interfaces definidas en apartado 3 del presente documento.', {maxWidth: 160, align: "justify"});
		            doc.setFontType("bold");
		            doc.setTextColor(0,0,0);
	              }
	              doc.setFontSize(14);
	              doc.text(20, posSub, chapter + '.1 Localización del Servicio');
	              doc.setFontStyle("Arial");
	              doc.setFontSize(10);

	              doc.autoTable({
                margin: mrg,
                theme: 'plain',
		            styles: {lineWidth: 0.3, lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], fillColor: [198, 217, 241]},
		            //headStyles: {},
		            head: [['Recurso', 'URL']],
		            bodyStyles: {fillColor: [255,255,255], fontSize: [9]},
		            body: [
			          ['End-point', urls.endpoint],
			          ['WSDL', urls.wsdl],
		            ]
	              });
	                  if (deprecated)
		                  makeXmlTable(doc, chapter + '.2 Request', xml, 107, {top: 197, bottom: 10});
	                  else
		                  makeXmlTable(doc, chapter + '.2 Request', xml, 95, {top: 190, bottom: 10});
                    }

                  function makeXmlTable(doc, title, xml, position?, mrgSize?) {
	                position = position ? position : 50;
	                mrgSize = mrgSize ? mrgSize : {top: 60, bottom: 50}
	                doc.setFontSize(14);
	                doc.setFontStyle("Arial");
	                doc.setFontType("bold");
	                doc.text(20, position, title);
	                doc.setFontStyle("Arial");
	                doc.setFontSize(10);
	                doc.autoTable({
                  margin: mrgSize,
                  theme: 'plain',
		              styles: {lineWidth: 0.3, lineColor: [0, 0, 0], halign: 'left', textColor: [0, 0, 0], fillColor: [255, 0, 0]},
		              body: [[xml]],
		              bodyStyles: {fillColor: [198, 217, 241], fontSize: [10]}
	                });
                    }

                  @Component({

                  selector: 'app-transacciones',
                  templateUrl: './transacciones.component.html',
                  styleUrls: ['./transacciones.component.css']
                  })
                  export class TransaccionesComponent implements OnInit {

                  @ViewChild('transactionInfo') el: ElementRef;

      private baseUrl: string = endpointServer.basePath + '/';
      private logoTelcel: any;
      private logoTelcelBlue: any;
      private esquemaGeneral: any;
      private contratoEnvChecked: boolean = false;
      private contratorRequestChecked: boolean = true;
      private contratoSelected: string;
      private bodyText: string;


      blockedDocument: boolean = false;
      disableSelect: boolean = false;
      transBackEnd: M2kCatTransaccion[];
      accionesBackEnd: M2kRelAccionTransaccion[];
      selectedAccion: any;
      nuevaTransaccion: NuevaTransaccion;
      selectedTransaccion: string;
      selectedTransaccionTxt: string;
      selectedPantallaTxt: string;
      selectedAccionTxt: string;
      descripcionTxt: string;
      responsableM2k: string;
      correspondencia: String;
      requestXml: string;
      contratoRequestXmlPDF: string;
      contratoRequestXml: string="";
      contratoRequestXmlClose: string;
      responseXmlSuccess: string;
      contratoResponseXmlSuccessPDF: string;
      contratoResponseXmlSuccess: string="";
      contratoResponseXmlSuccessClose: string;
      responseXmlEM2K: string;
      contratoResponseXmlEM2KPDF: string;
      contratoResponseXmlEM2K: string = "";
      responseXmlEMob: string;
      contratoResponseXmlEMobPDF: string;
      contratoResponseXmlEMob: string = "";
      contratoResponseXmlEMobClose: string;
      endpointContratoCorporativo: string;
      newdat: string;
      help: SimpleHelp;
      img_help: ImageHelp;
      selectedFechaCreacion: any;
      selectedFechaModifiacion: any;
      transaccionList: any[];
      agregadas: any[];
      aux: any[];
      indexCountInit:number=3;
      indexCountFinish:number;
      extraPags: number;
      display: boolean=false;
      conteoTransaccion: number=0;
      lastTitle:number;

      //Arrays para paginas de request
      indexPagReq:number[];
      indexPagResOk:number[];
      indexPagResWs:number[];
      indexPagResM2k:number[];

      indexReq:number[];
      indexResOk:number[];
      indexResWs:number[];
      indexResM2k:number[];

      constructor(private catalogosService: CatalogosService, private alertService: AlertService) {
        this.transBackEnd = [];
        this.accionesBackEnd = [];
        this.transaccionList = [];
        this.agregadas = [];
        this.aux = [];
        //Inicialización de arrays para paginas
        this.indexPagReq=[];
        this.indexPagResOk=[];
        this.indexPagResWs=[];
        this.indexPagResM2k=[];

        this.indexReq=[];
        this.indexResOk=[];
        this.indexResWs=[];
        this.indexResM2k=[];
        }

    ngOnInit() {

       this.contratoRequestXmlPDF="<cor:corpEjecutaServicio>"+"\n"+
       "  <controlData>"+"\n"+
       "    <v1:messageUUID> </v1:messageUUID>"+"\n"+
       "    <v1:requestDate> </v1:requestDate>"+"\n"+
       "    <v1:sendBy> </v1:sendBy>"+"\n"+
       "    <v1:version> </v1:version>"+"\n"+
       "    <v1:ipClient> </v1:ipClient>"+"\n"+
       "    <v1:ipServer> </v1:ipServer>"+"\n"+
       "    <v1:user> </v1:user>"+"\n"+
       "  </controlData>"+"\n"+
       "<corpEjecutaServicio>"+"\n";

       this.contratoRequestXmlClose="</corpEjecutaServicio>"+"\n"+
       "</cor:corpEjecutaServicio>";

       this.contratoResponseXmlSuccessPDF="<dlwmin:corpEjecutaServicioResponse>"+"\n"+
       "<controlData>"+"\n"+
       "  <b:messageUUID> </b:messageUUID>"+"\n"+
       "  <b:responseDate> </b:responseDate>"+"\n"+
       "  <b:sendBy> </b:sendBy>"+"\n"+
       "  <b:latency> </b:latency>"+"\n"+
       "  <b:version> </b:version>"+"\n"+
       "</controlData>"+"\n"+
       "<detailResponse>"+"\n"+
       "  <b:code> </b:code>"+"\n"+
       "  <b:severityLevel> </b:severityLevel>"+"\n"+
       "  <b:description> </b:description>"+"\n"+
       "  <b:actor> </b:actor>"+"\n"+
       "  <b:businessMeaning> </b:businessMeaning>"+"\n"+
       "</detailResponse>"+"\n"+
       "<corpEjecutaServicioResponse>"+"\n";

       this.contratoResponseXmlSuccessClose="</corpEjecutaServicioResponse>"+"\n"+
       "</dlwmin:corpEjecutaServicioResponse>";

       this.contratoResponseXmlEM2KPDF="<faultcode> </faultcode>"+"\n"+
       "<faultstring> </faultstring>"+"\n"+
       "<detail>"+"\n"+
       "  <a:corpEjecutaServicioException>"+"\n"+
       "    <controlData>"+"\n"+
       "      <b:messageUUID> </b:messageUUID>"+"\n"+
       "      <b:responseDate> </b:responseDate>"+"\n"+
       "      <b:sendBy> </b:sendBy>"+"\n"+
       "      <b:latency> </b:latency>"+"\n"+
       "      <b:version> </b:version>"+"\n"+
       "    </controlData>"+"\n"+
       "    <detailFail>"+"\n"+
       "      <b:errors>"+"\n"+
       "        <b:code> </b:code>"+"\n"+
       "        <b:severityLevel> </b:severityLevel>"+"\n"+
       "        <b:description> </b:description>"+"\n"+
       "        <b:actor> </b:actor>"+"\n"+
       "        <b:businessMeaning> </b:businessMeaning>"+"\n"+
       "      </b:errors>"+"\n"+
       "    </detailFail>"+"\n"+
       "  </a:corpEjecutaServicioException>"+"\n"+
       "</detail>"+"\n";


       this.contratoResponseXmlEMobPDF="<dlwmin:corpEjecutaServicioResponse>"+"\n"+
       "<controlData>"+"\n"+
       "  <b:messageUUID> </b:messageUUID>"+"\n"+
       "  <b:responseDate> </b:responseDate>"+"\n"+
       "  <b:sendBy> </b:sendBy>"+"\n"+
       "  <b:latency> </b:latency>"+"\n"+
       "  <b:version> </b:version>"+"\n"+
       "</controlData>"+"\n"+
       "<detailResponse>"+"\n"+
       "  <b:code> </b:code>"+"\n"+
       "  <b:severityLevel> </b:severityLevel>"+"\n"+
       "  <b:description> </b:description>"+"\n"+
       "  <b:actor> </b:actor>"+"\n"+
       "  <b:businessMeaning> </b:businessMeaning>"+"\n"+
       "</detailResponse>"+"\n"+
       "<corpEjecutaServicioResponse>"+"\n";

       this.contratoResponseXmlEMobClose="</corpEjecutaServicioResponse>"+"\n"+
       "</dlwmin:corpEjecutaServicioResponse>";

       this.endpointContratoCorporativo="http://serviciosm2k.telcel.com/telcel-ws-web/services/CorporateControlWebServiceHttpService";

        this.contratoEnvChecked = false;
        this.blockDocument();
        this.help = new SimpleHelp('TRANSACCIÓN','Para poder cargar las acciones se debe dar DOBLE CLICK y con ello se cargaran las acciones, debe elegir una acción diferente a la opción (-- SELECCIONE UNA OPCION --)');
        this.img_help = new ImageHelp('assets/images/help/Manual_usuario_cat_transacciones_select.PNG','Muestra el proceso de obtener las acciones para una transaccion y con ello poder obtener las cadenas para dicha transaccion y acción.','Ayuda con lista de Transacciones');
        this.catalogosService.getAllTransactions().subscribe(p => this.transBackEnd = p, err => {console.log(err);});
        this.unlockDocument();


    }


    onclick() {

      this.nuevaTransaccion = new NuevaTransaccion("","","","","","","","","");

        if (this.selectedAccion == 0 || this.selectedAccion == null) {
            this.alertService.push({severity: 'error', summary: 'Consultar', detail: "Debe seleccionar una acción valida para realizar la consulta"});
            return;
        } else {

            let value = $('#selectAccion option:selected').text();
            let val = +this.selectedTransaccion;
            this.blockDocument();
            this.selectedAccion = value;
            let accion = this.accionesBackEnd.filter(function(node) {
                if (node.accion.clave == value && node.transaccion.id == val){
                    return node;
                }
            })[0];

            if (accion) {
                this.selectedFechaCreacion = accion.fechaCreacion;
                this.selectedFechaModifiacion = accion.fechaModificacion;
                this.selectedTransaccionTxt = accion.transaccion.transaccion;
                this.selectedPantallaTxt = accion.transaccion.nombrePantalla;
                this.selectedAccionTxt = accion.accion.clave;
                this.descripcionTxt = accion.transaccion.descripcion;
                this.requestXml = accion.request;
                this.responseXmlSuccess = accion.responseExitoso;
                this.responseXmlEM2K = accion.responseErrorEM2k;
                this.responseXmlEMob = accion.responseErrorEMOB;
                this.nuevaTransaccion.accion = accion.accion.clave;
                this.nuevaTransaccion.fechaCreacion = accion.fechaCreacion;
                this.nuevaTransaccion.fechaModificacion = accion.fechaModificacion;
                this.nuevaTransaccion.request = accion.request;
                this.nuevaTransaccion.responseErrorEM2k = accion.responseErrorEM2k;
                this.nuevaTransaccion.responseErrorEMOB = accion.responseErrorEMOB;
                this.nuevaTransaccion.responseExitoso = accion.responseExitoso;
                this.nuevaTransaccion.transaccion = accion.transaccion.transaccion;
                this.nuevaTransaccion.pantalla=accion.transaccion.nombrePantalla;
                this.correspondencia=accion.transaccion.correspondencia;
                console.log("VALOR DEL RESPONSABLE ->>>> "+accion.transaccion.responsableM2k);
                if(accion.transaccion.responsableM2k=="" || accion.transaccion.responsableM2k==null){
                  this.responsableM2k="Sin responsable asignado"
                }else{
                  this.responsableM2k=accion.transaccion.responsableM2k;
                }
            }
            this.selectedAccion = null;
            this.unlockDocument();
        }
    }

    public validarAccion(x:any) {
        console.log("ACCION: ",this.selectedAccion);
        //this.nuevaTransaccion=this.selectedAccion;
        this.selectedTransaccionTxt = "";
        this.selectedPantallaTxt = "";
        this.selectedAccionTxt = "";
        this.descripcionTxt = "";
        this.requestXml = "";
        this.responseXmlSuccess = "";
        this.responseXmlEM2K = "";
        this.responseXmlEMob = "";
        this.selectedFechaCreacion = "";
        this.selectedFechaModifiacion = "";
    }

    public changeRequest(){

      if (this.contratoEnvChecked == true) {
        this.contratoEnvChecked = false;
        this.contratorRequestChecked = true;
      } else {
        this.contratoEnvChecked = true;
        this.contratorRequestChecked = false;
      }
  }





    public download() {
      if(this.agregadas.length>0){




        console.log("DESCARGANDO PDF....");

        if (typeof this.requestXml!='undefined' && this.requestXml) {
            this.blockDocument();
            var doc = new jsPDF();
			      doc.page=1;
			      var pdfDoc = {
            index:null,
				    portada: null,
				    historico: null,
				    tabContenido: null,
				    intro: null,
				    esquema: null,
				    cadXMLCorp: {
					  request: null,
					  respExito: null,
					  respErrorWS: null,
					  respErrorM2K: null
				},
				cadXML: {
					request: null,
					respExito: null,
					respErrorWS: null,
					respErrorM2K: null
				},
				dictErrores: null,
				contactos: null
			};
            this.logoTelcel = require('json-loader!../../../assets/json/logoTelcelB64.json');
            this.esquemaGeneral = require('json-loader!../../../assets/json/esquemaGeneral.json');
            doc.addImage(this.logoTelcel.logo, 'JPEG', 50, 60, 120, 35);
            this.logoTelcelBlue = this.esquemaGeneral.logo;


			  // HEADER PAGE
			  const addHeaders = doc => {
        const pageCount = doc.page++;

        var today = new Date();
        var day = "";

        var month = "";
        if(today.getDate()<10){
          day="0"+today.getDate();
        }else{
          day=""+today.getDate();
        }
        if((today.getMonth()+1)<10){
          month="0"+ (today.getMonth()+1);
        }else{
          month=""+(today.getMonth()+1);
        }


        this.newdat = day+"/"+ month+"/"+today.getFullYear();



				doc.setLineWidth(0.5);
				doc.line(10, 15, 200, 15);
				doc.addImage(this.logoTelcelBlue, 'JPEG', 11, 15, 40, 10);
        doc.setFontSize(9);
        doc.setFontType("bold");
				doc.text("WS-M2K", 60, 20);
        doc.text("Servicios WEB hacia Mobile 2000", 60, 25);
        doc.setFontStyle('Arial');
        doc.text("Departamento de Sistemas Corporativos", 120, 20);
        doc.text(""+getCurrentPageNumber(doc)+"/"+doc.internal.getNumberOfPages(), 180, 20);
				doc.setFontSize(6);
				doc.text("Fecha", 120, 30);
				doc.setFontSize(8);
				doc.text(this.newdat, 120, 36);
				doc.text("Rev", 160, 30);
				doc.text("1", 160, 36);
				doc.setLineWidth(0.3);
				doc.line(10, 28, 200, 28);
				doc.setLineWidth(0.5);
				doc.line(10, 33, 200, 33);
				doc.line(10, 38, 200, 38);
			};

        //FOOTER PAGE
        const addFooters = doc => {
				const pageCount = doc.internal.getNumberOfPages()
				doc.setFontSize(8);
				doc.setTextColor(0,0,0);
				doc.setFontStyle('Arial');
				doc.setLineWidth(1.0);
				doc.setDrawColor(0,0,0);
				doc.line(10, 267, 200, 267);
				doc.setLineWidth(0.8);
				doc.line(10, 272, 200, 272);
				doc.setDrawColor(0,0,0);
				doc.text("SUBDIRECCION DE DESARROLLO DE SOFTWARE", 80, 275);// set your margins
				doc.text("Radiomovil DIPSA S.A. de C.V. Ejército Nacional 488, Col. Chapultepec Morales, C.P. 11570, México D.F.", 50, 278);
				doc.text("Tel. 2581-3700, Fax 2581-4795", 95, 281);
          };



            //HOJA 1 PORTADA
			      pdfDoc.portada = getCurrentPageNumber(doc);

            doc.setFontSize(15);
            doc.setFontStyle("Arial");
            doc.setTextColor(0,0,0);
            doc.setFontType("italic");
            doc.text(30 , 105, 'Sistema de Gestión de Servicios M2K - Catálogo de transacciones');
            doc.setFontStyle("Arial");
            doc.setFontSize(22);
            //doc.text(121 , 150, '(       )');
            doc.setTextColor(0,0,0);
            //doc.text(123 , 150, this.selectedTransaccionTxt);
            doc.setTextColor(0,0,0);
            //doc.text(45, 150, 'Servicio');
            doc.setTextColor(0,0,0);
            //doc.text(75, 150, this.selectedPantallaTxt);
            doc.setTextColor(0,0,0);
            //doc.text(140, 150, '- Acción');
            doc.setTextColor(0,0,0);
            //doc.text(170, 150, this.selectedAccionTxt);
            doc.setTextColor(115,135,156);
            doc.setTextColor(0,0,0);
            doc.setFontSize(11);
            //doc.text(60, 160, this.descripcionTxt);
            doc.setLineWidth(0.5);
            doc.setDrawColor(115,135,156);



            //HOJA 2 HISTORICO DE REVISIONES
			      doc.addPage();
			      pdfDoc.historico = getCurrentPageNumber(doc);

			      doc.setFontSize(10);
            doc.setFontStyle("Arial");
            doc.setFontType("bold");
			      doc.text(15, 55, 'HISTÓRICO DE REVISIONES');
            doc.setTextColor(0,0,0);

            var today = new Date();
            var day = "";

            var month = "";
            if(today.getDate()<10){
            day="0"+today.getDate();
            }else{
            day=""+today.getDate();
            }
           if((today.getMonth()+1)<10){
           month="0"+ (today.getMonth()+1);
           }else{
           month=""+(today.getMonth()+1);
           }

          this.newdat = day+"/"+ month+"/"+today.getFullYear();

            console.log(this.newdat);
			      doc.autoTable({
                margin: {top: 60},
                theme: 'plain',
                fontSize: 9,
                styles: {lineWidth: 0.3, lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], overflow: 'linebreak'},
                headStyles: {halign: 'center', fillColor: [198, 217, 241]},
                head: [['Rev.', 'Fecha  ','Autor', 'Descripción']],
                //body: {fillColor: [255,0,0], halign: 'center'},
                body: [
                    ['1.', this.newdat,'DEPARTAMENTO DE SISTEMAS CORPORATIVOS','Creación de documento y primera versión.'],
                    // ...

                ]

            });



            //HOJA 3 TABLA DE CONTENIDO
			      /* AGREGADO AL FINAL */



            //HOJA 4 INTRODUCCIÓN
            if(this.agregadas.length>1){
              if(this.agregadas.length%2==0){

                this.extraPags=(this.agregadas.length/2);

                console.log('PAGINAS EXTRA', this.extraPags);
                for(var pag=1;pag<=this.extraPags;pag++){
                  if(pag==1){
                    doc.addPage();
                    pdfDoc.index=getCurrentPageNumber(doc);
                 }else{
                   doc.addPage();
                 }
               }
              }else{
                this.extraPags=(this.agregadas.length/2)+0.5;

                console.log('PAGINAS EXTRA', this.extraPags);
                for(var pag=1;pag<=this.extraPags;pag++){
                  if(pag==1){
                    doc.addPage();
                    pdfDoc.index=getCurrentPageNumber(doc);
                 }else{
                   doc.addPage();
                 }
               }
              }

            }else{

              this.extraPags=2;
              for(var pag=1;pag<this.extraPags;pag++){
                if(pag==1){
                  doc.addPage();
                  pdfDoc.index=getCurrentPageNumber(doc);
               }else{
                 doc.addPage();
               }

              }
            }



            doc.addPage();
		        pdfDoc.intro = getCurrentPageNumber(doc);

            doc.setFontSize(16);
            doc.setFontStyle("Arial");
            doc.setFontType("bold");
            doc.text(20, 50, '1. Introducción');
            var uno=doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontSize(12);
            doc.text(20, 60, '1.1 Propósito del Documento');
            var unouno=doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontSize(10);
            doc.setFontStyle("Arial");
            doc.text(20, 70, 'Este documento tiene por objetivo especificar la información necesaria para el consumo de los servicios WS-M2K:', {maxWidth: 160, align: "justify"});
            doc.text(20, 85, ' - End-point:');
            doc.text(20, 95, ' - WSDL');
            doc.text(20, 105, ' - Cadenas XML Entrada/Salida');
            doc.setFontType("bold");
            doc.setFontSize(12);
            doc.text(20, 115, '1.2 Soporte para Caracteres Internacionales');
            var unodos=doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontStyle("Arial");
            doc.setFontSize(10);
            doc.text(20, 125, 'El esquema XML soporta caracteres Internacionales en campos de cadena, definiendo como cadena cualquier carácter del conjunto de caracteres UTF-8. Se requiere el soporte del esquema XML para permitir el envío y almacenamiento de caracteres Internacionales.', {maxWidth: 160, align: "justify"});
            doc.setFontType("bold");
            doc.setFontSize(16);
            doc.text(20, 155, '2.Especificación de Interfaz');
            var dos=doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontSize(12);
            doc.text(20, 165, ' 2.1 Antecedente');
            var dosuno=doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontStyle("Arial");
            doc.setFontSize(10);
            doc.text(20, 175, 'El departamento de sistemas corporativos tiene a su cargo el desarrollo de los servicios web que permiten a los usuarios tener acceso a la funcionalidad que ofrece el sistema de facturación Mobile 2000. La funcionalidad que ofrecen estos servicios es la misma que ofrecen las pantallas de M2K, es decir, los servicios utilizan las pantallas para realizar las acciones solicitadas por los usuarios; a esta técnica se le conoce como screen scrapy.', {maxWidth: 160, align: "justify"});
            doc.text(20, 205, 'Adicionalmente a la técnica del Screen Scrapy se maneja otra técnica para exponer la funcionalidad de M2K, la denominada CTG.', {maxWidth: 160, align: "justify"});
            doc.text(20, 220, 'Los programas que utilizan esta tecnología se les denomina IGTOC’s. Estos programas reciben una cadena de entrada y deben responder con una cadena de éxito o de error, dependiendo del resultado de la operación solicitada. La respuesta de éxito se utiliza para indicar que la acción solicitada por el usuario fue exitosa, mientras que la respuesta de error es para indicar que la acción requerida por el usuario no pudo realizarse.', {maxWidth: 160, align: "justify"});



            //HOJA 5 ESQUEMA GENERAL
            doc.addPage();
			      pdfDoc.esquema = getCurrentPageNumber(doc);

            doc.setFontSize(12);
            doc.setFontStyle("Arial");
            doc.setFontType("bold");
            doc.text(20, 50, ' 2.2 Esquema General');
            var dosdos=doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontStyle("Arial");
            doc.setFontSize(10);
            doc.text(20, 60, 'La capa WS permite la comunicación entre los ambientes distribuidos y el Facturador Mobile 2000 (M2K), de acuerdo al siguiente esquema General', {maxWidth: 160, align: "justify"});
            doc.addImage(this.esquemaGeneral.esquema, 'JPEG', 20, 70, 160, 80);



            //HOJA 6 CADENAS ENTRADA/SALIDA CONTRATO CORP
            console.log("LONGITUD tRANSACCION LIST" + this.transaccionList.length);
            for(var i= 0, indx=3; i<this.transaccionList.length; i++,indx++){
            this.lastTitle=indx;
            doc.addPage();
            //pdfDoc.cadXMLCorp.request = getCurrentPageNumber(doc);
            this.indexPagReq[i]=getCurrentPageNumber(doc);
            doc.setFontSize(16);
            doc.setFontStyle("Arial");
            doc.setFontType("bold");
            //doc.text(20, 50, indx+'.'+this.transaccionList[i].pantalla+' ('+this.transaccionList[i].transaccion+') - Acción '+this.transaccionList[i].accion);
            doc.text(20, 45, indx +'.'+ this.transaccionList[i].pantalla+' ('+this.transaccionList[i].transaccion+') - Acción '+this.transaccionList[i].accion);

			      if (this.transaccionList[i].request) {
				    this.requestXml=this.transaccionList[i].request+
				    "</corpEjecutaServicio>"+"\n"+
				    "</cor:corpEjecutaServicio>";
				    this.contratoRequestXml=this.contratoRequestXmlPDF+this.requestXml;
				    //doc.text(20, 165, this.requestXml);
			      } else {
				    this.contratoRequestXml="EL REQUEST AUN NO HA SIDO DADO DE ALTA.";
				    //doc.text(20, 165, 'EL REQUEST AUN NO HA SIDO DADO DE ALTA.');
            }
            doc.setFontSize(14);
			      makeRequestTable(
				    doc,
				    indx+'.1',//ingreso de numero dinamico para indice
				    'Cadenas XML Entrada/Salida (Contrato Corporativo) ',
				    {
					  endpoint: 'http://serviciosm2k.telcel.com:80/telcel-ws-web/services/CorporateControlWebServiceHttpService',
					  wsdl: 'http://serviciosm2k.telcel.com:80/telcel-ws-web/services/CorporateControlWebServiceHttpService?wsdl'
				    },
				    this.contratoRequestXml);



            //HOJA 7 CADENAS RESPONSE EXITOSO
            doc.addPage();
			      //pdfDoc.cadXMLCorp.respExito = getCurrentPageNumber(doc);
            this.indexPagResOk[i]=getCurrentPageNumber(doc);
            if (this.transaccionList[i].responseExitoso) {
              this.responseXmlSuccess=this.transaccionList[i].responseExitoso+
              "</corpEjecutaServicioResponse>"+"\n"+
              "</dlwmin:corpEjecutaServicioResponse>";
              this.contratoResponseXmlSuccess = this.contratoResponseXmlSuccessPDF+this.responseXmlSuccess;
                //doc.text(20, 130, this.responseXmlSuccess);
            } else {
              this.contratoResponseXmlSuccess='EL RESPONSE AUN NO HA SIDO DADO DE ALTA.';
                //doc.text(20, 130, 'EL RESPONSE AUN NO HA SIDO DADO DE ALTA.');
            }
			makeXmlTable(
				doc,
				indx+'.1.3 Response Exitoso',
				this.contratoResponseXmlSuccess);



             //HOJA 8 CADENAS RESPONSE ERROR WebService (Interfaz)
			doc.addPage();
			//pdfDoc.cadXMLCorp.respErrorWS = getCurrentPageNumber(doc);
        this.indexPagResWs[i]=getCurrentPageNumber(doc);
			makeXmlTable(
				doc,
				indx+'.1.4 Response Error WebService (Interfaz)',
				this.contratoResponseXmlEM2KPDF);



            //HOJA 9 RESPONSE ERROR M2K (Negocio)
            doc.addPage();
      //pdfDoc.cadXMLCorp.respErrorM2K = getCurrentPageNumber(doc);
        this.indexPagResM2k[i]=getCurrentPageNumber(doc);
      if (this.transaccionList[i].responseErrorEMOB) {
              this.responseXmlEMob = this.transaccionList[i].responseErrorEMOB+
              "</corpEjecutaServicioResponse>"+"\n"+
              "</dlwmin:corpEjecutaServicioResponse>";
              this.contratoResponseXmlEMob = this.contratoResponseXmlEMobPDF+this.responseXmlEMob;
                //doc.text(20, 130, this.responseXmlEMob);
            } else {
                this.contratoResponseXmlEMob = 'EL RESPONSE DE ERROR DE MOBILE 2000 NO HA SIDO DADO DE ALTA.';
                //doc.text(20, 130, 'EL RESPONSE DE ERROR DE MOBILE 2000 NO HA SIDO DADO DE ALTA.');
       }

			makeXmlTable(
				doc,
				indx+'.1.5 Response Error M2K (Negocio)',
				this.contratoResponseXmlEMob);



			//HOJA 10 Cadenas XML Entrada/Salida V1.0 (Deprecada)
			doc.addPage();
      //pdfDoc.cadXML.request = getCurrentPageNumber(doc);
      this.indexReq[i]=getCurrentPageNumber(doc);

			if (this.transaccionList[i].request) {
                this.requestXml = this.transaccionList[i].request;
                //doc.text(20, 50, this.requestXml);
            } else {
                this.requestXml = 'EL REQUEST AUN NO HA SIDO DADO DE ALTA.';
                //doc.text(20, 50, 'EL REQUEST AUN NO HA SIDO DADO DE ALTA.');
            }

			makeRequestTable(
				doc,
				indx+'.2',
				'Cadenas XML Entrada/Salida V1.0',
				{
					endpoint: 'http://serviciosm2k.telcel.com/telcel-ws-web/services/ControlWebService',
					wsdl: 'http://serviciosm2k.telcel.com/telcel-ws-web/services/ControlWebService?wsdl'
				},
				this.requestXml,
				true);



            //HOJA 11 RESPONSE EXITOSO DEPRECADA
            doc.addPage();
			      //pdfDoc.cadXML.respExito = getCurrentPageNumber(doc);
            this.indexResOk[i]=getCurrentPageNumber(doc);

            if (this.transaccionList[i].responseExitoso) {
                this.responseXmlSuccess = this.transaccionList[i].responseExitoso;
                //doc.text(20, 50, this.responseXmlSuccess);
            } else {
              this.responseXmlSuccess = 'EL RESPONSE AUN NO HA SIDO DADO DE ALTA.';
                //doc.text(20, 50, 'EL RESPONSE AUN NO HA SIDO DADO DE ALTA.');
            }

			makeXmlTable(
				doc,
				indx+'.2.3 Response Exitoso',
				this.responseXmlSuccess);



            //HOJA 12 Response Error WebService (Error de Interfaz)
            doc.addPage();
			//pdfDoc.cadXML.respErrorWS = getCurrentPageNumber(doc);
        this.indexResWs[i]=getCurrentPageNumber(doc);

			if (this.transaccionList[i].responseErrorEM2k) {
				this.responseXmlEM2K = this.transaccionList[i].responseErrorEM2k;
				//doc.text(20, 50, this.responseXmlEM2K);
			} else {
				this.responseXmlEM2K = 'EL RESPONSE DE ERROR TIPO M2K NO HA SIDO DADO DE ALTA.';
				//doc.text(20, 50, 'EL RESPONSE DE ERROR TIPO M2K NO HA SIDO DADO DE ALTA.');
			}

			makeXmlTable(
				doc,
				indx+'.2.4 Response Error WebService (Error de Interfaz)',
				this.responseXmlEM2K);



            //HOJA 13 Response Error WebService (Error de Interfaz)
            doc.addPage();
        //pdfDoc.cadXML.respErrorM2K = getCurrentPageNumber(doc);
        this.indexResM2k[i]=getCurrentPageNumber(doc);

        if (this.transaccionList[i].responseErrorEMOB) {
				this.responseXmlEMob = this.transaccionList[i].responseErrorEMOB;
				//doc.text(20, 50, this.responseXmlEMob);
			} else {
				this.responseXmlEMob = 'EL RESPONSE DE ERROR DE MOBILE 2000 NO HA SIDO DADO DE ALTA.';
				//doc.text(20, 50, 'EL RESPONSE DE ERROR DE MOBILE 2000 NO HA SIDO DADO DE ALTA.');
			}

			makeXmlTable(
				doc,
				indx+'.2.5 Response Error M2K (Error de Negocio)',
				this.responseXmlEMob);


        this.requestXml = "";
        this.responseXmlSuccess = "";
        this.responseXmlEM2K = "";
        this.responseXmlEMob = "";
        this.contratoRequestXml = "";
        this.contratoResponseXmlEMob= "";
        this.contratoResponseXmlSuccess = "";
        this.contratoResponseXmlEM2K= "";
      }//cierre de for

            //HOJA 14  Diccionario de errores conocidos
            doc.addPage();
			      pdfDoc.dictErrores = getCurrentPageNumber(doc);

            doc.setFontSize(16);
            doc.setFontStyle("Arial");
            doc.setFontType("bold");
            doc.text(20, 50, ''+(this.lastTitle+1)+'. Diccionario de errores conocidos');
            doc.autoTable({
            margin: {top: 60},
            theme: 'plain',
				    styles: {lineWidth: 0.3, lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], fillColor: [198, 217, 241]},
				    headStyles: {halign: 'center', fillColor: [198, 217, 241]},
				    head: [['Incidencia', 'Descripción','Acción correctiva']],
				    bodyStyles: {fillColor: [255,255,255], halign: 'left'},
				    body: [
					  ['CTG9631E Error occurred during interaction with CICS. Error Code=: ECI_ERR_NO_CICS', 'El CICS está en periodo de reciclaje o los puertos de comunicación cerrados.','Favor de reportarlo con WS-M2K.'],
				  	['M2K closed the session unexpectedly', 'Error de comunicación, se cerró la sesión inesperadamente.','Favor de reintentar la operación, en caso recurrente favor de reportarlo a WS-M2K.'],
				  	['CTG9638E Transaction Abend occurred in CICS. Abend Code=: xxxx', 'Error interno del componente M2K','Favor de contactar a M2K. sposm2k@mail.telcel.com, sactm2k@mail.telcel.com'],
					  ['CTG9630E IOException occurred in communication with CICS', 'El CTG no se encuentra disponible.','Favor de reportarlo a WS-M2K'],
					  ['(30). No se obtuvo respuesta de M2K durante 30s.', 'Lentitud en M2K. Generalmente causada por intermitencia.','El error se considera reintentable y se presenta por intermitencia en M2K.'],
				  	['javax.resource.spi.UnexpectedResponseException', 'El componente CTG en M2K está retornando una respuesta inconsistente (Más de 1 resultado de la operación)','Reportarlo con WS-M2K.'],
				  	['CTG9631E Error occurred during interaction with CICS. Error Code=: ECI_ERR_RESPONSE_TIMEOUT', 'El componente M2K tardó más de 30s. en procesar la solicitud','El error se considera reintentable y se presenta por intermitencia en M2K.'],
				  	['CTG9631E Error occurred during interaction with CICS. Error Code=: ECI_ERR_MAX_SESSIONS', 'Se alcanzó el número máximo de conexiones concurrentes a CTG (Se determina en función de la memoria física disponible en el host)','Reportarlo con WS-M2K'],
				  	['(11). Error en login: com.telcel.crm.scrapy.IOHTimeOutNoLockException: (28). No se obtuvo respuesta de M2K.', 'Lentitud en M2K. Generalmente causada por la ejecución de un JOB.','Reportarlo a WS-M2K'],
				  	['(11). Error en login: com.telcel.crm.scrapy.IOHTimeOutException: (30). No se obtuvo respuesta de M2K durante 30s.', 'Lentitud en M2K. Generalmente causada por la ejecución de un JOB.','Reportarlo con WS-M2K.'],
				    ]
			      });



            //HOJA 15 Contactos
            doc.addPage();
			      pdfDoc.contactos = getCurrentPageNumber(doc);

            doc.setFontSize(16);
            doc.setFontStyle("Arial");
            doc.setFontType("bold");
            doc.text(20, 50, ''+(this.lastTitle+2)+'. Contactos');
            doc.setFontSize(12);
            doc.text(20, 60, ''+(this.lastTitle+2)+'.1 Servicios WEB M2K (Errores en la interfaz)');
            doc.setFontSize(10);

            doc.autoTable({
            margin: {top: 65, bottom: 40},
            theme: 'plain',
				    styles: {lineWidth: 0.3, lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], fillColor: [198, 217, 241]},
				    headStyles: {halign: 'center', fillColor: [198, 217, 241]},
				    head: [['Nivel de Escalamiento', 'Nombre','Contacto']],
				    bodyStyles: {fillColor: [255,255,255], halign: 'center'},
				    body: [
				  	['1', 'Correo grupal de soporte','sactweb@mail.telcel.com'],
					  ['2', 'Guardia asignada','55 54 00 04 27'],
					  ['3', 'Supervisor Daniel Castillo Bermúdez','Ext. 1845'],
					  ['4', 'Jefe de Departamento Jesús Luna Castro','Ext. 4151, Asignado: 5510104016'],
				    ]
            });



            doc.setFontSize(12);
            doc.setFontStyle("Arial");
            doc.setFontType("bold");
            doc.text(20, 115, ''+(this.lastTitle+2)+'.2 Sistemas de POST-ACTIVACIONES M2K(Errores de Negocio)');

            doc.autoTable({
            startY: doc.lastAutoTable.finalY + 20,
            margin: {top: 130, bottom: 20},
            theme: 'plain',
				    styles: {lineWidth: 0.3, lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], fillColor: [198, 217, 241]},
				    headStyles: {halign: 'center', fillColor: [198, 217, 241]},
			    	head: [['Nivel de Escalamiento', 'Nombre','Contacto']],
				    bodyStyles: {fillColor: [255,255,255], halign: 'center'},
				    body: [
					  ['1', 'Correo grupal de soporte','sposm2k@mail.telcel.com '],
					  ['2', 'Jefe de Departamento: Elyria Torres Flores','Ext. 3429, Asignado: 5510100732'],
            ],

            }
            );


            doc.setFontSize(12);
            doc.setFontStyle("Arial");
            doc.setFontType("bold");
            doc.text(20, 160, ''+(this.lastTitle+2)+'.3 Sistemas de activaciones M2K(Errores de Negocio)');

            doc.autoTable({
            startY: doc.lastAutoTable.finalY + 20,
            margin: {top: 160, bottom: 40},
            theme: 'plain',
            styles: {lineWidth: 0.3, lineColor: [0, 0, 0], halign: 'center', textColor: [0, 0, 0], fillColor: [198, 217, 241]},
            headStyles: {halign: 'center', fillColor: [198, 217, 241]},
            head: [['Nivel de Escalamiento', 'Nombre','Contacto']],
            bodyStyles: {fillColor: [255,255,255], halign: 'center', textColor: [0, 0, 0]},
            body: [
                ['1', 'Correo grupal de soporte','sactm2k@mail.telcel.com'],
                ['2', 'Jefe de Departamento: Yolanda Revilla Aquino','Ext. 5595'],
                // ...
            ]
        }
        );



            //HOJA 16 TABLA DE CONTENIDO DE PRUEBA
			  const addTablaContenido = doc => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontType("bold");

				doc.autoTable({
          margin: {top: 50, bottom: 50},
          theme: 'plain',
					headStyles: {halign: 'center', fillColor: [0, 32, 96], textColor: [255, 255, 255]},
					head: [['', 'Tabla de Contenido','']],
					body: [
            ['1.', 'INTRODUCCIÓN', pdfDoc.intro],
						['  1.1.', '  PROPÓSITO DEL DOCUMENTO', pdfDoc.intro],
            ['  1.2.', '  SOPORTE PARA CARACTERES INTERNACIONALES', pdfDoc.intro],
            [],
						['2.', 'ESPECIFICACIÓN DE INTERFAZ', pdfDoc.intro],
						['  2.1.', '  ANTECEDENTE',pdfDoc.intro],
            ['  2.2.', '  ESQUEMA GENERAL',pdfDoc.esquema],
					]
        });
        //Fin autotable
        for(var i=3,j=0;i<(this.indexCountInit+this.agregadas.length);i++,j++){
          doc.autoTable({
            margin: {top: 50, bottom: 50},
            //headStyles: {halign: 'center', fillColor: [0, 32, 96], textColor: [255, 255, 255]},
            theme: 'plain',
            body: [
              [i+'.', (this.transaccionList[j].pantalla +'  (' + this.transaccionList[j].transaccion + ' )  - Acción ' + this.transaccionList[j].accion), this.indexPagReq[j]],
                [i+'.1', 'CADENAS XML ENTRADA/SALIDA (CONTRATO CORPORATIVO)', this.indexPagReq[j]],
                ['  '+i+'.1.1.', '  LOCALIZACIÓN DEL SERVICIO', this.indexPagReq[j]],
                ['  '+i+'.1.2.', '  REQUEST', this.indexPagReq[j]],
                ['  '+i+'.1.3.', '  RESPONSE EXITOSO', this.indexPagResOk[j]],
                ['  '+i+'.1.4.', '  RESPONSE ERROR WEBSERVICE (INTERFAZ)', this.indexPagResWs[j]],
                ['  '+i+'.1.5.', '  RESPONSE ERROR M2K (NEGOCIO)', this.indexPagResM2k[j]],
                [i+'.2', 'CADENAS XML ENTRADA/SALIDA V1.0 (DEPRECADA)', this.indexReq[j]],
                ['  '+i+'.2.1.', '  LOCALIZACIÓN DEL SERVICIO', this.indexReq[j]],
                ['  '+i+'.2.2.', '  REQUEST', this.indexReq[j]],
                ['  '+i+'.2.3.', '  RESPONSE EXITOSO	  ', this.indexResOk[j]],
                ['  '+i+'.2.4.', '  RESPONSE ERROR WEBSERVICE (ERROR DE INTERFAZ)', this.indexResWs[j]],
                ['  '+i+'.2.5.', '  RESPONSE ERROR M2K (ERROR DE NEGOCIO)', this.indexResM2k[j]],
            ]
          });
        }
        this.indexCountFinish=this.indexCountInit+this.agregadas.length;
        doc.autoTable({
        margin: {top: 50, bottom: 50},
          theme: 'plain',
          body: [
            [this.indexCountFinish+'.', 'DICCIONARIO DE ERRORES CONOCIDOS', pdfDoc.dictErrores],
            [],
						[(this.indexCountFinish+1)+'.', 'CONTACTOS', pdfDoc.contactos],
            ['  '+(this.indexCountFinish+1)+'.1.', '  SERVICIOS WEB M2K (ERRORES EN LA INTERFAZ).', pdfDoc.contactos],
            ['  '+(this.indexCountFinish+1)+'.2.', '  SISTEMAS DE POST-ACTIVACIONES M2K(Errores de Negocio).', pdfDoc.contactos],
            ['  '+(this.indexCountFinish+1)+'.3.', '  SISTEMAS DE ACTIVACIONES M2K(Errores de Negocio).', pdfDoc.contactos],
          ]
        });
			};


      var oldCount = doc.internal.getNumberOfPages();

      doc.insertPage(pdfDoc.index);
			//doc.insertPage(pdfDoc.intro);

			pdfDoc.tabContenido = getCurrentPageNumber(doc);

			var pageCount = doc.internal.getNumberOfPages();
			var diff = pageCount - oldCount;
			pdfDoc.intro = pdfDoc.intro + diff;
			pdfDoc.esquema = pdfDoc.esquema + diff;
      //pdfDoc.cadXMLCorp.request = pdfDoc.cadXMLCorp.request + diff;

      //asignacion de valores de pagina sumando la diferencia(paginas iniciales)
      for(var i=0;i<this.indexPagReq.length;i++){

        this.indexPagReq[i]=this.indexPagReq[i]+diff;
        this.indexPagResOk[i]=this.indexPagResOk[i]+diff;
        this.indexPagResWs[i]=this.indexPagResWs[i]+diff;
        this.indexPagResM2k[i]=this.indexPagResM2k[i]+diff;

        this.indexReq[i]=this.indexReq[i]+diff;
        this.indexResOk[i]=this.indexResOk[i]+diff;
        this.indexResWs[i]=this.indexResWs[i]+diff;
        this.indexResM2k[i]=this.indexResM2k[i]+diff;
      }

      pdfDoc.dictErrores = pdfDoc.dictErrores + diff;
			pdfDoc.contactos = pdfDoc.contactos + diff;
			addTablaContenido(doc);
            for(var i = 1; i <= pageCount; i++) {
				      doc.setPage(i);
				      addHeaders(doc);
				      addFooters(doc);
            }

            //window.open(URL.createObjectURL(doc.output("blob")));
            //doc.save(this.selectedTransaccionTxt +'_'+this.selectedPantallaTxt+'.pdf');
			      doc.save('WS-M2K.pdf');
            this.unlockDocument();
        } else {
            this.alertService.push({severity: 'info', summary: 'Exportar', detail: "No se encontraron resultados para exportar el documento."});
            return;
        }
        this.transaccionList=[];
        this.agregadas=[];
        this.conteoTransaccion=0;
      }

    }//cierre de metodo dowload

    public pdfHtml() {
        let pdf = new jsPDF();
        let options = {
            pagesplit: true
        };
        pdf.addHTML(this.el.nativeElement, 0, 0, options, () => {
            pdf.save(this.selectedTransaccion+".pdf");
        });
    }

    blockDocument() {
        this.blockedDocument = true;
        this.disableSelect = true;
    }

    unlockDocument() {
        this.blockedDocument = false;
        this.disableSelect = false;
    }


    public buscaraccion() {
        this.blockDocument();
        this.accionesBackEnd = [];
        this.selectedAccion = null;
        this.selectedTransaccionTxt = "";
        this.selectedPantallaTxt = "";
        this.selectedAccionTxt = "";
        this.descripcionTxt = "";
        this.requestXml = "";
        this.responseXmlSuccess = "";
        this.responseXmlEM2K = "";
        this.responseXmlEMob = "";
        this.selectedFechaCreacion = "";
        this.selectedFechaModifiacion = "";
        this.responsableM2k="";
        this.correspondencia="";
        this.catalogosService.getActions(this.selectedTransaccion).subscribe(p => {this.accionesBackEnd = p; this.handleAccionError();}, err => {this.handleAccionError();});
        this.unlockDocument();
    }

    public handleAccionError() {

         if (this.accionesBackEnd == null || !this.catalogosService.globalService.authService.isLoggedIn) {
            this.disableSelect = true;
            this.alertService.push({severity: 'error', summary: 'Consultar Acción', detail: "No se han encontrado acciones para la función."});
         }

    }

    public agragarTransaccion(){

      var transRepetida;
      //debugger;
      if(this.transaccionList.length>0){
        for(var i=0;i<this.transaccionList.length;i++){
          if(this.transaccionList[i].transaccion === this.selectedTransaccionTxt && this.transaccionList[i].accion === this.selectedAccionTxt){
            console.log("TRANSACCIÓN REPETIDA");
            transRepetida=true;
            break;
          }else{
            transRepetida=false;
          }
        }
        console.log("SELECTED ACTION  -> "+this.selectedAccion);
        if(!transRepetida){
          this.transaccionList.push(this.nuevaTransaccion);
          this.agregadas.push(this.accionesBackEnd[0].transaccion.transaccion);
          this.conteoTransaccion=this.agregadas.length;
        }
      }else{
        console.log("SELECTED ACTION  -> "+this.selectedAccionTxt);
        if(this.selectedAccionTxt){
          this.transaccionList.push(this.nuevaTransaccion);
          this.agregadas.push(this.accionesBackEnd[0].transaccion.transaccion);
          this.conteoTransaccion=this.agregadas.length;
        }

      }

    }



  public eliminarAgregada(transaccion:string){
    console.log("nomnbreRecibido" + transaccion);
    const index:number=this.agregadas.indexOf(transaccion);
    for(var i=0;i<this.transaccionList.length;i++){
      if(this.transaccionList[i].transaccion===transaccion){
        this.transaccionList.splice(i,1);
      }
    }

    if(index!== -1){
      this.agregadas.splice(index,1);
    }

    console.log("ARRAY DE TRANSACCIONES FINAL", this.agregadas);
    console.log("ARRAY DE XML FINAL", this.transaccionList);

    this.conteoTransaccion= this.agregadas.length;
  }

  showDialog() {
  this.display = true;
  }

}
