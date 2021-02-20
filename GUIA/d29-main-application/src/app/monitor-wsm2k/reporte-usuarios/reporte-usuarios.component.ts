import { Component, OnInit } from '@angular/core';
import {MonitorWsm2kService, Incidencia, IncidenciaPaginator} from '../monitor-wsm2k.service';

declare let SockJS;
declare let Stomp;

@Component({
  selector: 'app-reporte-usuarios',
  templateUrl: './reporte-usuarios.component.html',
  styleUrls: ['./reporte-usuarios.component.css']
})
export class ReporteUsuariosComponent implements OnInit {

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
    //var socket = new SockJS('http://10.191.104.244:8081/comportamientoUsuarios');
    var socket = new SockJS(baseURL+'/comportamientoUsuarios');
    stompClient = Stomp.over(socket);
    stompClient.debug = () => {};// para inhabilitar la impresion en consola de los datos recibidos 
    stompClient.connect({}, function(frame) {
        console.log('Connected sas 123: ' + frame);
        stompClient.subscribe('/topic/comportamientoUsuarios', function(reporteUsuarios){
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
    stompClient.send("/app/comportamientoUsuarios", {}, JSON.stringify({ 'message': 'test' }));
  }  

  function showGreeting(reporteUsuarios) {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    (<any>$("#tablaUsuarios")).dataTable().fnDestroy();
    muestraTabla(reporteUsuarios);
  }

  function muestraTabla(reporteUsuarios) {
    (<any>$('#tablaUsuarios')).dataTable({
      "paging":   false,
        "ordering": false,
        "info":     false,
        "searching":     false,
        "data": JSON.parse(reporteUsuarios.body).comportamientoUsuarios ,
        "columns": [
          {"data": "usuario"},
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
    console.log( "ready as!" );
    //connect();    
    
    $(function() {
      setInterval(function() {
        sendName();
      },1000);
    });
    
  });