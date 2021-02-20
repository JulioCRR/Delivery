import { Component, OnInit } from '@angular/core';
import {MonitorWsm2kService, Incidencia, IncidenciaPaginator} from '../monitor-wsm2k.service';
import {endpointServer} from '../../../environments/environment';

declare let SockJS;
declare let Stomp;



@Component({
  selector: 'app-monitor-wsm2k',
  templateUrl: './monitor-wsm2k.component.html',
  styleUrls: ['./monitor-wsm2k.component.css']
})
export class MonitorWsm2kComponent implements OnInit {
  
  incidencias: Incidencia[]; 
  baseUrl = endpointServer.basePath;
  constructor(private service: MonitorWsm2kService) { }

  ngOnInit() {
    this.service.getIncidencias().subscribe((p) => { this.incidencias = p; });
    var baseURL=this.service.getEndPoint(); 
    //console.log('iniciando wsckt: '+baseURL);
    connect(baseURL);
  }

}

var stompClient = null;
var data=null;

function connect(baseURL) {
  
  var socket = new SockJS(baseURL+'/estadoMonitoreo');
  
  //var socket = new SockJS(url);
  stompClient = Stomp.over(socket);
  stompClient.debug = () => {};// para inhabilitar la impresion en consola de los datos recibidos 
  stompClient.connect({}, function(frame) {
      stompClient.subscribe('/topic/estadoMonitoreo', function(reporteEstadoMonitoreo){
        showGreeting(reporteEstadoMonitoreo);
      });
  });
}

function disconnect() {
  if (stompClient != null) {
      stompClient.disconnect();
  }
}

function sendName() {
  stompClient.send("/app/estadoMonitoreo", {}, JSON.stringify({ 'message': 'test' }));
}

function showGreeting(reporteEstadoMonitoreo) {
  var response = document.getElementById('response');
  var p = document.createElement('p');
  p.style.wordWrap = 'break-word';
  (<any>$("#tablaMonitoreo")).dataTable().fnDestroy();
  muestraTabla(reporteEstadoMonitoreo);
}

function muestraTabla(reporteEstadoMonitoreo) {
  (<any>$('#tablaMonitoreo')).dataTable({
    "paging":   false,
      "ordering": false,
      "info":     false,
      "searching":     false,
      "data": JSON.parse(reporteEstadoMonitoreo.body).propiedadesMonitoreo ,
      "columns": [
        {"data": "nombre"},
        {"data": "valor"}
      ]
  });   
}


$( document ).ready(function() {
  console.log( "ready as!" );
  //connect();
  //sendName();
  
  
  $(function() {
    setInterval(function() {
      sendName();
    },1000);
  });
  
  
  
});