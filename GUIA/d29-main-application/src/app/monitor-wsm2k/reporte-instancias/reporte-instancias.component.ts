import { Component, OnInit } from '@angular/core';
import {MonitorWsm2kService, Incidencia, IncidenciaPaginator} from '../monitor-wsm2k.service';

declare let SockJS;
declare let Stomp;

@Component({
  selector: 'app-reporte-instancias',
  templateUrl: './reporte-instancias.component.html',
  styleUrls: ['./reporte-instancias.component.css']
})
export class ReporteInstanciasComponent implements OnInit {

  constructor(private service: MonitorWsm2kService) { }

  ngOnInit() {
    console.log('iniciando: ');
    var baseURL=this.service.getEndPoint();
    connect(baseURL);
  }

}

var stompClient = null;
var data=null;
var orderColumn = 3;
var orderType = 'desc';


function connect(baseURL) {

    var socket = new SockJS(baseURL+'/incidencias');
    //var socket = new SockJS('http://10.191.104.244:8081/monitoreoInstancias');
    stompClient = Stomp.over(socket);
    stompClient.debug = () => {};// para inhabilitar la impresion en consola de los datos recibidos
    stompClient.connect({}, function(frame) {
        stompClient.subscribe('/topic/monitoreoInstancias', function(reporteInstancias){
          showGreeting(reporteInstancias);
        });
    });
  }

  function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
  }

  function sendName() {
    stompClient.send("/app/monitoreoInstancias", {}, JSON.stringify({ 'message': 'test' }));
  }

  function ordenaReporte(columna){
    orderColumn=columna;
  }

  function showGreeting(reporteInstancias) {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    (<any>$("#tablaInstancias")).dataTable().fnDestroy();
    muestraTabla(reporteInstancias);
  }

  function muestraTabla(reporteInstancias) {
    (<any>$('#tablaInstancias')).dataTable({
      "paging":   false,
        "ordering": false,
        "info":     false,
        "searching":     false,
        "data": JSON.parse(reporteInstancias.body).listaInstancias ,
        "columns": [
          {"data": "instancia"},
          {"data": "connectionTime"},
          {"data": "readTime"},
          {"data": "statusValidation"},
          {"data": "description"},
          {"data": "intentosExitosos"},
          {"data": "intentosFallidos"},
          {"data": "horaUltimoExitoString"},
          {"data": "horaUltimoErrorString"}
        ]
    });
  }

  $( document ).ready(function() {
    console.log( "ready as!" );
    //connect();



    $(function() {
      setInterval(function() {
        sendName();
      },1000);
    });



  });

