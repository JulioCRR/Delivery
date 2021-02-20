import {Component, OnInit, Input, Output,ViewContainerRef} from '@angular/core';
import {M2kInfoRegistro, SearchPetitionService} from '../search-petition.service';
import { SearchPetitionComponent} from '../search-petition/search-petition.component';

import { XmlPipe } from '../formatters/XmlFormater';
import { DatePipe } from '@angular/common';


declare let jsPDF;



@Component({
    selector: 'app-search-petition-detail',
    templateUrl: './search-petition-detail.component.html',
    styleUrls: ['./search-petition-detail.component.css'],
    providers: [XmlPipe,DatePipe]
})


export class SearchPetitionDetailComponent implements OnInit {

    private logoTelcel: any;

    @Input() infoRegistro: M2kInfoRegistro  ;
    @Input()showdetail:boolean;
    @Input()showTable:boolean;
    blockedDocument: boolean;



    constructor(  private datepipe: DatePipe){}


    ngOnInit() {}




    blockDocument() {
        this.blockedDocument = true;
    }

    unlockDocument() {
        this.blockedDocument = false;
     }


    public downloadPDF() {

            console.log("GENERANDO PDF....");
            let request = new XmlPipe().transform(this.infoRegistro.xmlEntrada);
            let response = new XmlPipe().transform(this.infoRegistro.xmlRespuesta);
            this.blockDocument();
            let doc = new jsPDF();
            this.logoTelcel = require('json-loader!../../../assets/json/logoTelcelB64.json');
            doc.addImage(this.logoTelcel.logo, 'JPEG', 50, 20, 100, 25);
            doc.setFontSize(16);
            doc.setFontStyle("italic");
            doc.setTextColor(115,135,156);
            doc.text(20 , 55, 'Sistema de Gestión de Servicios WS-M2K - ConsultaWS');

            doc.line(20, 70, 200, 70); // horizontal line
            doc.setLineWidth(0.5);
            doc.setDrawColor(115,135,156);

            doc.setFontSize(13);
            doc.text(20 , 90, 'Detalle de Consulta');

            doc.setFontSize(10);
            doc.text(20 , 120, 'Id Petición:');
            doc.setTextColor(51,122,183);
            doc.text(40 , 120, this.infoRegistro.idPeticion);
            doc.setTextColor(115,135,156);
            doc.text(148, 120, 'Ip:');
            doc.setTextColor(51,122,183);
            doc.text(153, 120, this.infoRegistro.ip);
            doc.setTextColor(115,135,156);

            doc.text(20, 130, 'Usuario:');
            doc.setTextColor(51,122,183);
            doc.text(37, 130, this.infoRegistro.usuario);
            doc.setTextColor(115,135,156);
            doc.text(128, 130, 'Fecha de Incio:');
            doc.setTextColor(51,122,183);
            doc.text(153, 130, this.infoRegistro.fechaInicio + '');
            doc.setTextColor(115,135,156);

            doc.text(20, 140, 'Región:');
            doc.setTextColor(51,122,183);
            doc.text(40, 140, this.infoRegistro.region);
            doc.setTextColor(115,135,156);
            doc.text(140, 140, 'Acción:');
            doc.setTextColor(51,122,183);
            doc.text(154, 140, this.infoRegistro.accion);
            doc.setTextColor(115,135,156);

            doc.text(20, 150, 'Servicio:');
            doc.setTextColor(51,122,183);
            doc.text(40, 150, this.infoRegistro.funcion);
            doc.setTextColor(115,135,156);
            doc.text(124, 150, 'Tipo de conector:');
            doc.setTextColor(51,122,183);
            doc.text(153, 150, this.infoRegistro.tipoConector);
            doc.setTextColor(115,135,156);

            doc.text(20, 160, 'Tiempo de Respuesta Web:');
            doc.setTextColor(51,122,183);
            doc.text(65, 160, this.infoRegistro.tiempoTotalWeb  +' ms');
            doc.setTextColor(115,135,156);
            doc.text(119, 160, 'Tiempo de Conector:');
            doc.setTextColor(51,122,183);
            doc.text(153, 160, this.infoRegistro.tiempoTotalConector +' ms');
            doc.setTextColor(115,135,156);

            doc.text(19, 170, 'Instancia:');
            doc.setTextColor(51,122,183);
            doc.text(40, 170, this.infoRegistro.instancia);
            doc.setTextColor(115,135,156);
            doc.text(138, 170, 'Servidor:');
            doc.setTextColor(51,122,183);
           doc.text(153, 170,this.infoRegistro.server + '');
           doc.setTextColor(115,135,156);

            doc.addPage();
            doc.setTextColor(115,135,156);
            doc.text(20, 30, 'Request');
            doc.line(20, 40, 185, 40); // horizontal line
            doc.setLineWidth(0.5);
            doc.setTextColor(51,122,183);
            doc.text(20, 50, request);

            doc.addPage();
            doc.setTextColor(115,135,156);
            doc.text(20, 30, 'Response');
            doc.line(20, 40, 185, 40); // horizontal line
            doc.setLineWidth(0.5);
            doc.setTextColor(51,122,183);
            doc.text(20, 50, response);

            doc.save(this.infoRegistro.idPeticion +'.pdf');
            this.unlockDocument();

        }

}
