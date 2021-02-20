import { Component, OnInit } from '@angular/core';
import {MonitorWsm2kService, Incidencia, IncidenciaPaginator} from '../monitor-wsm2k.service';

declare let SockJS;
declare let Stomp;

@Component({
  selector: 'app-reporte-tiempos',
  templateUrl: './reporte-tiempos.component.html',
  styleUrls: ['./reporte-tiempos.component.css']
})
export class ReporteTiemposComponent implements OnInit {
		
  
  
  constructor(private service: MonitorWsm2kService) { }
  
  
  

  ngOnInit() {
    console.log('iniciando: ');
    var baseURL=this.service.getEndPoint(); 
    connect(baseURL);
  }
  /*
   muestraTabla5minutos(){
    $('#peticiones5minutos').show();
    $('#peticionesUltimaHora').hide();
    $('#peticionesDelDia').hide();
  }
  
 muestraTablaHora(){
$('#peticionesUltimaHora').show();
    $('#peticiones5minutos').hide();
    $('#peticionesDelDia').hide();
  }

 muestraTablaDia(){
  
$('#peticionesDelDia').show();
    $('#peticiones5minutos').hide();
    $('#peticionesUltimaHora').hide();
  }
*/   
funcionTest(){
  console.log("--::");
}

}

var stompClient = null;
var data=null;

function connect(baseURL) {
  

    
    var socket = new SockJS(baseURL+'/tiempos');
    stompClient = Stomp.over(socket);
    stompClient.debug = () => {};// para inhabilitar la impresion en consola de los datos recibidos 
    stompClient.connect({}, function(frame) {
        stompClient.subscribe('/topic/reporteTiempos', function(reporteTiempos){
          showGreeting(reporteTiempos);
        });
    });
  }

  function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
  }
  
  function sendName() {

    stompClient.send("/app/tiempos", {}, JSON.stringify({ 'message': 'test' }));

  }

  function showGreeting(reporteTiempos) {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';

    (<any>$("#tabla5Minutos")).dataTable().fnDestroy();
    (<any>$("#ultimaHora")).dataTable().fnDestroy();
    (<any>$("#dia")).dataTable().fnDestroy();
    muestraTabla(reporteTiempos);

  }

  function muestraTabla(reporteTiempos) {
    (<any>$('#tabla5Minutos')).dataTable({
      "paging":   false,
        "ordering": false,
        "info":     false,
        "searching":     false,
        "data": JSON.parse(reporteTiempos.body).registroTiempos ,
        "columns": [
          {"data": "region"},
          {"data": "numPeticiones5min"},
          {"data": "t_menor_un_segundo_5min"},
          {"data": "t_1_a_5_segundos_5min"},
          {"data": "t_5_a_10_segundos_5min"},
          {"data": "t_10_a_20_segundos_5min"},
          {"data": "t_20_a_30_segundos_5min"},
          {"data": "t_30_a_40_segundos_5min"},
          {"data": "t_40_a_50_segundos_5min"},
          {"data": "t_50_a_60_segundos_5min"},
          {"data": "t_mayor_un_minuto_5min"}
        ]
    }); 
    
    (<any>$('#ultimaHora')).dataTable({
      "paging":   false,
        "ordering": false,
        "info":     false,
        "searching":     false,
        "data": JSON.parse(reporteTiempos.body).registroTiempos ,
        "columns": [
          {"data": "region"},
          {"data": "numPeticionesHora"},
          {"data": "t_menor_un_segundo_hora"},
          {"data": "t_1_a_5_segundos_hora"},
          {"data": "t_5_a_10_segundos_hora"},
          {"data": "t_10_a_20_segundos_hora"},
          {"data": "t_20_a_30_segundos_hora"},
          {"data": "t_30_a_40_segundos_hora"},
          {"data": "t_40_a_50_segundos_hora"},
          {"data": "t_50_a_60_segundos_hora"},
          {"data": "t_mayor_un_minuto_hora"}
        ]
    }); 

    (<any>$('#dia')).dataTable({
      "paging":   false,
        "ordering": false,
        "info":     false,
        "searching":     false,
        "data": JSON.parse(reporteTiempos.body).registroTiempos ,
        "columns": [
          {"data": "region"},
          {"data": "numPeticionesDia"},
          {"data": "t_menor_un_segundo_dia"},
          {"data": "t_1_a_5_segundos_dia"},
          {"data": "t_5_a_10_segundos_dia"},
          {"data": "t_10_a_20_segundos_dia"},
          {"data": "t_20_a_30_segundos_dia"},
          {"data": "t_30_a_40_segundos_dia"},
          {"data": "t_40_a_50_segundos_dia"},
          {"data": "t_50_a_60_segundos_dia"},
          {"data": "t_mayor_un_minuto_dia"}
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
