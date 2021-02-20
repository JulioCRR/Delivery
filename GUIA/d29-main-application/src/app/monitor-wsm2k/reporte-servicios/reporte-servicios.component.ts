import { Component, OnInit } from '@angular/core';
import {MonitorWsm2kService, Incidencia, IncidenciaPaginator} from '../monitor-wsm2k.service';

declare let SockJS;
declare let Stomp;

@Component({
  selector: 'app-reporte-servicios',
  templateUrl: './reporte-servicios.component.html',
  styleUrls: ['./reporte-servicios.component.css']
})
export class ReporteServiciosComponent implements OnInit {

  constructor(private service: MonitorWsm2kService) { }
  
  ngOnInit() {
    console.log('iniciando: ');
    var baseURL=this.service.getEndPoint(); 
    connect(baseURL);
  }

}

var stompClient = null;
var data=null;
var orderColumn = 4;
var orderType = 'desc';

function connect(baseURL) {
    //var socket = new SockJS('http://10.191.104.244:8081/consumoServicios');
    var socket = new SockJS(baseURL+'/consumoServicios');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        console.log('Connected sas 123: ' + frame);
        stompClient.debug = () => {};// para inhabilitar la impresion en consola de los datos recibidos 
        stompClient.subscribe('/topic/consumoServicios', function(reporteUsuarios){
          showGreeting(reporteUsuarios);
        });
    });
  }

  function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
  }
  
  function sendName() {
    stompClient.send("/app/consumoServicios", {}, JSON.stringify({ 'message': 'test' }));
  }
  
  function showGreeting(reporteServicios) {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    (<any>$("#tablaServicios")).dataTable().fnDestroy();
    muestraTabla(reporteServicios);
  }

  function muestraTabla(reporteServicios) {
    (<any>$('#tablaServicios')).dataTable({
      "paging":   false,
        "ordering": false,
        "info":     false,
        "searching":     false,
        "data": JSON.parse(reporteServicios.body).consumoServicios ,
        "columns": [
          {"data": "servicio"},
          {"data": "nombre"},
          {"data": "peticionesMinuto"},
          {"data": "peticionesHora"},
          {"data": "peticionesDia"}
        ]
    });   
  }
  
  function ordenaReporte(columna){
    orderColumn=columna;
    
  }

  $( document ).ready(function() {
    console.log( "ready !" );
    //connect();
    $(function() {
      setInterval(function() {
        sendName();
      },1000);
    });
    
    
    
  });