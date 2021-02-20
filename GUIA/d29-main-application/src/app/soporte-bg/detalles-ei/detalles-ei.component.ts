import { Component, OnInit } from '@angular/core';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Http} from "@angular/http";
import {ActivatedRoute, Router, Params} from '@angular/router';
import {M2kInfoRegistro, SearchPetitionService} from '../../search-petition/search-petition.service';
import {AuthService} from '../../app.service';
import {AlertService} from '../../alert.service';

import {SolicitudEI, SoporteBgService,DetalleSolicitud,MovimientoEI,ResponseSoporte} from '../soporte-bg.service';
declare var jQuery: any;

@Component({
  selector: 'app-detalles-ei',
  templateUrl: './detalles-ei.component.html',
  styleUrls: ['./detalles-ei.component.css']
})
export class DetallesEiComponent implements OnInit {

  telefono: string;
  fechaTramite: string;
  //solicitudesEI:SolicitudEI[];
  solicitudesEI=[{"idSolicitud":0,"tramite":0,"grupoNacional":0,"aplicacion":"0","estatus":null,"mensaje":"","fechaIngreso":"","fechaEjecucion":"","envioRespuesta":"","idComudidad":0,"tipo":""}];
  solicitudesAux=[{"idSolicitud":0,"tramite":0,"grupoNacional":0,"aplicacion":"0","estatus":null,"mensaje":"","fechaIngreso":"","fechaEjecucion":"","envioRespuesta":"","idComudidad":0,"tipo":""}];
  solicitudEI: SolicitudEI = new SolicitudEI(0,0,0,"0","","","","","","",0);
  detalleSolicitud: DetalleSolicitud=new DetalleSolicitud("","","","","","","","","","","","",0,"","","","",false);
  detallesSolicitudes:DetalleSolicitud[];
  responseSoporte:ResponseSoporte[];
  mensajeSoporte="";
  movimientosEI:MovimientoEI[];
  movimientoEI:MovimientoEI=new MovimientoEI(0,0,"","",0,"","","",0,"",0,"","");
  
  showNoResults = true;
  showResults=false;
  showDetail=false;
  showSearching=false;
  showInfoWSM2K=true;
  showNoInfoWSM2K=false;
  showBotonReproceso=false;
  



  private idpetition="";
  infoRegistro: M2kInfoRegistro;
  
  xmlRecibido:string;
  xmlRespuesta:string;
  idM2Kinfo:string;
  region:string;
  accion:string;
  usuario:string;
  servicio:string;
  tipoConector:string;
  fechaInicio:Date;
  tiempoConector:number;
  tiempoTotal:number;
  ip:string;
  instancia:string;
  tipoRespuesta:string;
  

 



  constructor(private http: Http, private service:SoporteBgService,private searchPetitionService: SearchPetitionService, private alertService: AlertService) { }

  ngOnInit() {

  }
  
  consultaMovimiento(){
    this.showSearching=true;
    
    this.showNoResults=false;
    this.solicitudesEI=this.solicitudesAux;
    console.log("consultando moviemiento con: "+this.telefono+" : "+this.fechaTramite);
    this.service.getSolitudesPorTelefono(this.telefono).subscribe((p) => {
      this.solicitudesEI = p; 
      console.log("solicitudes encontradas: "+this.solicitudesEI.length );
      if(this.solicitudesEI.length>0 && this.solicitudesEI[0].idSolicitud!=0 ){
        this.showResults=true;
        this.showNoResults=false;
        this.showDetail=false;
        this.showSearching=false;
      }
      else{
        this.showResults=false;
        this.showNoResults=true;
        this.showDetail=false;
        this.showSearching=false;
      }
    });
    
  }

  selectSolicitud(solicitudSeleccionada){
    this.solicitudEI=solicitudSeleccionada;
    this.showDetail=true;
    this.mensajeSoporte="";
    console.log("datos de consulta solicitud,telefono: "+this.solicitudEI.idSolicitud+","+this.telefono );
    this.service.getDetalleSolicitud(this.telefono,this.solicitudEI.idSolicitud,this.solicitudEI.estatus ).subscribe((p) => {
      this.detallesSolicitudes = p;
      this.detalleSolicitud= this.detallesSolicitudes[0];
      console.log("bandera reproceso: "+this.detalleSolicitud.banderaReproceso);
      this.showBotonReproceso=this.detalleSolicitud.banderaReproceso;
    });
    
    this.service.getMovimientosEI(this.telefono,this.solicitudEI.idSolicitud ).subscribe((p) => {
      this.movimientosEI = p;
    });
    

  }
  
  searchPetition(movimiento) {
    delete this.infoRegistro;
    this.movimientoEI=movimiento;
    this.idpetition=this.movimientoEI.idPeticion;
    console.log("id peticion: "+ this.idpetition );
    if(this.idpetition !=null ){

      this.searchPetitionService.getInfoRegistroById(this.idpetition ).subscribe((p) => {
      this.infoRegistro = p;
      this.xmlRespuesta=this.infoRegistro.xmlRespuesta;

      this.xmlRecibido=this.infoRegistro.xmlEntrada ;
      this.idM2Kinfo=this.infoRegistro.idPeticion ;
      this.region=this.infoRegistro.region ;
      this.accion=this.infoRegistro.accion ;
      this.usuario=this.infoRegistro.usuario ;
      this.servicio=this.infoRegistro.funcion ;
      this.tipoConector=this.infoRegistro.tipoConector ;
      this.fechaInicio=this.infoRegistro.fechaInicio ;
      this.tiempoConector=this.infoRegistro.tiempoTotalConector ;
      this.tiempoTotal=this.infoRegistro.tiempoTotalWeb ;
      this.ip=this.infoRegistro.ip ;
      this.instancia=this.infoRegistro.instancia ;
      this.tipoRespuesta=this.infoRegistro.tipoRespuesta ;
      if( this.idM2Kinfo.length > 1){
        this.showNoInfoWSM2K=false;
        this.showInfoWSM2K=true;
      }
      else{
        this.showNoInfoWSM2K=true;
        this.showInfoWSM2K=false;
      }
      
    }, (err) => {
      this.alertService.push({severity: 'info', summary: 'Búsqueda', detail: "No se encontraron resultados"});
  });
  }
  else{
    this.showNoInfoWSM2K=true;
    this.showInfoWSM2K=false;
  }


    //console.log("xml regresado: "+this.infoRegistro.xmlRespuesta );
  }
  
  activarTimer(){
    console.log("activar timer");
    this.service.activarTimer().subscribe((p) => {
      this.responseSoporte=p;
      this.mensajeSoporte= this.responseSoporte[0].mensaje;
    });
    
  }
  
  actualizaEstatusSolicitud(){
    console.log("actualizando solicitud");
    this.service.actualizaEstatusSolicitud(this.telefono,this.solicitudEI.idSolicitud).subscribe((p) => {
      this.responseSoporte=p;
      this.mensajeSoporte= this.responseSoporte[0].mensaje;
          });
  }


}
