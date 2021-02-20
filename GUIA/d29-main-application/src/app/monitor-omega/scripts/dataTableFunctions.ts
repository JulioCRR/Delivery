import { ReportePantallaOmega } from '../model/ReportePantallaOmega';
import { Cics } from '../model/Cics';
import { CicsThread } from '../model/CicsThread';
import { OmegaData } from '../model/OmegaData';

declare let SockJS;
declare let Stomp;
declare let jQuery: any;

let stompClient: any = null;
let data: any = null;
let timer: any = null;

// Reinicia las variables globales a NULL
function resetAll() {
  stompClient = null;
  data = null;
  timer = null;
}

// Da formato en dd/MM/yyyy HH:mm:ss
function getDateFormat(date: Date): string {
  let formatString = '';
  let dateString = date.toLocaleDateString();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  formatString = dateString + ' ' +
    (hours < 10 ? '0' + hours : hours) + ':' +
    (minutes < 10 ? '0' + minutes : minutes) + ':' +
    (seconds < 10 ? '0' + seconds : seconds);

  return formatString;
}

// Cambia el lenguaje de DataTable
function getDTLanguage() {
  return {
    'decimal':        '',
    'emptyTable':     'No hay información disponible',
    'info':           'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
    'infoEmpty':      'Mostrando registros del 0 al 0 de un total de 0 registros',
    'infoFiltered':   '(filtrado de un total de _MAX_ registros)',
    'infoPostFix':    '',
    'thousands':      ',',
    'lengthMenu':     'Mostrar _MENU_ registros',
    'loadingRecords': 'Cargando...',
    'processing':     'Procesando...',
    'search':         'Buscar:',
    'zeroRecords':    'No se encontraron registros',
    'paginate': {
        'first':      'Primero',
        'last':       'Último',
        'next':       'Siguiente',
        'previous':   'Anterior'
    },
    'aria': {
        'sortAscending':  ': Activar para ordenar la columna de manera ascendente',
        'sortDescending': ': Activar para ordenar la columna de manera descendente'
    }
  };
}

function getDTFormatCics(cicsList: Cics[]) {
  let arrTab = [];
  cicsList.map((p) => {
    arrTab.push({
      cics: p.jobName,
      totalCpu: getCpuNumber(p.totalCpu),
      alertRaised: p.alertRaised
    });
  });
  return arrTab;
}

// Da el formato correcto a la informacion para el DataTable
function getDTFormatCicsThread(cicsThreadList: CicsThread[]) {
  let arrTab = [];
  cicsThreadList.map((r) => {
    arrTab.push({
      cics: r.jobName,
      region: r.region,
      programa: r.planName,
      transaccion: r.transaccion,
      tiempo: r.elapsed.replace(/[a-z||A-Z||*]/g, ''),
      cpu: getCpuNumber(r.cpu),
      estatus: r.status,
      threadType: r.threadType,
      tiempoNum: r.elapsedTime,
      pantallaM2k: r.pantallaM2k
    });
  });
  return arrTab;
}

function getCpuNumber(cpu: string) {
  if (cpu) {
    let cpuNum = Number.parseFloat(cpu.replace('%', ''));
    if (isNaN(cpuNum)) {
      return -1.0;
    }
    return cpuNum;
  }
  return -1.0;
}

// Realiza la conexion al servidor por medio de SockJS
export function connect(baseUrl: string) {
  let socket = new SockJS(baseUrl + '/pantallaOmega');
  stompClient = Stomp.over(socket);
  stompClient.debug = () => {}; // para inhabilitar la impresion en consola de los datos recibidos
  stompClient.connect({}, function(frame) {
    stompClient.subscribe('/topic/pantallaOmega', function(pantallaOmega){
      if (pantallaOmega) {
        reloadData(pantallaOmega);
        }
    });
  });
}

// Desconecta el SockJS y elimina el Interval
export function disconnect() {
  if (stompClient != null) {
      stompClient.disconnect();
  }
  clearInterval(timer);
  resetAll();
}

// Metodo que llama al servidor para obtener nueva informacion del monitor Omega
function getData() {
  if (stompClient != null) {
    stompClient.send('/app/pantallaOmega', {}, JSON.stringify({ 'message': 'test' }));
  }
}

// Verifica si la informacion obtenida es nueva
function reloadData(pantallaOmega) {
  let jsonPantalla: ReportePantallaOmega = JSON.parse(pantallaOmega.body);
  if (data.lastUpdate !== jsonPantalla.lastUpdate) {
    data = jsonPantalla;
    if (!jsonPantalla.omegaData) {
      jsonPantalla.omegaData = OmegaData.getNewInstance();
    }
    fillData(jsonPantalla);
  }
}

// Llena la informacion en los campos HTML correspondientes
function fillData(reportePantallaOmega: ReportePantallaOmega) {
  $('#lastUpdate').html(getDateFormat(new Date(reportePantallaOmega.lastUpdate)));
  $('#alertsCount').html('' + reportePantallaOmega.alertsCount);
  $('#refreshRate').html(reportePantallaOmega.propiedadesMonitorOmega.intervaloRefrescado + ' minutos');
  $('#alertThreshold').html(reportePantallaOmega.propiedadesMonitorOmega.umbralAlertas + ' segundos');
  $('#monitorOn').html(reportePantallaOmega.propiedadesMonitorOmega.monitorOn ? 'Encendido' : 'Apagado');
  $('#maxCpu').html(reportePantallaOmega.propiedadesMonitorOmega.maxCpu + '%');
  (<any>$('#omegaTableCics')).dataTable().fnDestroy();
  (<any>$('#omegaTable')).dataTable().fnDestroy();
  reloadTableCics(getDTFormatCics(reportePantallaOmega.omegaData.listCics));
  reloadTableCicsThread(getDTFormatCicsThread(reportePantallaOmega.omegaData.listCicsThread));
}

function reloadTableCics(dtData: any) {
  (<any>$('#omegaTableCics')).dataTable({
    'language': getDTLanguage(),
    'paging': false,
    'ordering': true,
    'info': true,
    'searching': false,
    'autoWidth': true,
    'pageLength': 1,
    'data': dtData,
    'columns': [
      {'data': 'cics'},
      {'data': 'totalCpu'},
      {'data': 'alertRaised', 'visible': false, 'searchable': false}
    ],
    'columnDefs': [
      {
        'targets': '_all',
        'createdCell': function(td, cellData, rowData, rowIndex, colIndex){
          if (rowData.alertRaised) {
            $(td).addClass('thread-type-alert');
          }
        }
      }
    ],
    'order': [[1, 'desc']],
  });
}

// Recarga la informacion del DataTable
function reloadTableCicsThread(dtData: any) {
  (<any>$('#omegaTable')).dataTable({
    'language': getDTLanguage(),
    'paging': true,
    'ordering': true,
    'info': true,
    'searching': true,
    'autoWidth': true,
    'pageLength': 10,
    'data': dtData,
    'columns': [
      {'data': 'cics'}, // CICS
      {'data': 'region'}, // region
      {'data': 'programa'}, // programa
      {'data': 'transaccion'}, // transaccion
      {'data': 'pantallaM2k'}, // pantalla m2k
      {'data': 'tiempo', 'orderData': [9]}, // tiempo ejecucion
      {'data': 'cpu'}, // cpu
      {'data': 'estatus'}, // estatus
      {'data': 'threadType', 'visible': false, 'searchable': false},
      {'data': 'tiempoNum', 'visible': false, 'searchable': false}
    ],
    'columnDefs': [
      {
        'targets': '_all',
        'createdCell': function(td, cellData, rowData, rowIndex, colIndex){
          switch (rowData.threadType) {
            case -1: $(td).addClass('thread-type-ignore'); break;
            case 1: $(td).addClass('thread-type-alert'); break;
          }
        }
      }
    ],
    'order': [[8, 'desc'], [0, 'asc']],
  });
}

// Inicia la informacion del monitor Omega
export function initData(reportePantallaOmega: ReportePantallaOmega) {
  data = reportePantallaOmega;
  fillData(data);
}

// Reinicia el orden del DataTable
export function resetDTOrder() {
  (<any>$('#omegaTableCics')).dataTable().fnSort([[1, 'desc']]);
  (<any>$('#omegaTableCics')).dataTable().fnDraw();
  (<any>$('#omegaTable')).dataTable().fnSort([[7, 'desc'], [0, 'asc']]);
  (<any>$('#omegaTable')).dataTable().fnDraw();
}

// Inicia el intervalo, llama al metodo getData() cada N millisegundos
export function startTimer() {
  $(function() {
    timer = setInterval(function() {
      getData();
    }, 15000); // millisegundos
  });
}
