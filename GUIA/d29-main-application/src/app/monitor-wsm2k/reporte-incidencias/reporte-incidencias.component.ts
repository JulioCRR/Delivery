import { Component, OnInit } from '@angular/core';
import {MonitorWsm2kService, Incidencia, IncidenciaPaginator} from '../monitor-wsm2k.service';

declare let SockJS;
declare let Stomp;

@Component({
  selector: 'app-reporte-incidencias',
  templateUrl: './reporte-incidencias.component.html',
  styleUrls: ['./reporte-incidencias.component.css']
})
export class ReporteIncidenciasComponent implements OnInit {

  //public data;
  //public data1;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private service: MonitorWsm2kService) { }

  ngOnInit() {
    console.log('iniciando: ');
    var baseURL=this.service.getEndPoint(); 
    connect(baseURL);
  }

  

}

var stompClient = null;
var data=null;

function connect(baseURL) {

  var socket = new SockJS(baseURL+'/incidencias');
  //var socket = new SockJS('http://10.191.104.244:8081/incidencias');
  stompClient = Stomp.over(socket);
  stompClient.debug = () => {};// para inhabilitar la impresion en consola de los datos recibidos 
  stompClient.connect({}, function(frame) {
      //setConnected(true);
      console.log('Connected sas 123: ' + frame);
      stompClient.subscribe('/topic/reporteIncidencias', function(reporteIncidencias){
          //showGreeting(JSON.parse(greeting.body).content);
        showGreeting(reporteIncidencias);
        //this.data=JSON.parse(reporteIncidencias.body).errores;
      });
  });
}

function disconnect() {
  if (stompClient != null) {
      stompClient.disconnect();
  }
  console.log("Disconnected sa sdasdasdas");
}

function sendName() {
  //var name = document.getElementById('name').value;
  //console.log("entre a sendName");
  stompClient.send("/app/incidencias", {}, JSON.stringify({ 'message': 'test' }));
  //console.log("sali de  sendName");
}


function showGreeting(reporteIncidencias) {
  var response = document.getElementById('response');
  var p = document.createElement('p');
  p.style.wordWrap = 'break-word';
  //p.appendChild(document.createTextNode(message));
  //p.appendChild(document.createTextNode(JSON.parse(greeting.body).content + " prueba"));
  //response.appendChild(p);
  //inicializa();
  (<any>$("#tablaIncidencias")).dataTable().fnDestroy();
  muestraTabla(reporteIncidencias);
  //inicializa();
}

function muestraTabla(reporteIncidencias) {
  (<any>$('#tablaIncidencias')).dataTable({
    "paging":   false,
      "ordering": false,
      "info":     false,
      "searching":     false,
      "data": JSON.parse(reporteIncidencias.body).errores ,
      "columns": [
          {"data": "mensaje"},
          {"data": "erroresAcumulados"},
          {"data": "erroresAcumuladosHora"},
          {"data": "erroresAcumuladosDia"},
          {"data": "intervaloTiempo"},
          {"data": "maximoUmbralErrores"},
          {"data": "tipoBusqueda"},
          {"data": "horaUltimoErrorString"},
          {"data": "destinatariosAlertas"}
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


