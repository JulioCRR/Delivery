import { AfterViewInit, Component, OnInit } from '@angular/core';


import {AgendaAmbienteService} from '../agenda-ambiente.service';
import {SolicitudModel} from  '../model/SolicitudModel';
import {User} from '../../admin/admin.service';
import {AlertService} from '../../alert.service';
import {CatalogosService} from '../../catalogos/catalogos.service';
import {M2kCatTransaccion} from  '../../catalogos/model/M2kCatTransaccion';
import {SelectItem,MultiSelectModule} from 'primeng/primeng';
import { NgForm } from '@angular/forms';
import { Router, NoPreloading } from '@angular/router';
import { runInThisContext } from 'vm';
import {CommonUtilsAgenda} from '../util/CommonUtilsAgenda';




@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styleUrls: ['./editar-solicitud.component.css']
})
export class EditarSolicitudComponent implements OnInit, AfterViewInit {

  private detalleSolictud:SolicitudModel[] = [];
  private userId:any;
  private data: any[] = [];
  private trans: string[] = [];
  private displayDetailIp:boolean;
  private displayDetailTrans:boolean;
  private displayEdit:boolean;
  private displayDelete:boolean;
  public ipDesa: string;
  public folio: any;
  public transBack: M2kCatTransaccion[];
  public existedIps: any[]=[];
  public existedTrans: any[]=[];
  public turns:any[]=[];
  public turnoActual:any;
  cargarTransa: SelectItem[];
  public listaTransacciones:any[]=[];
  public tablaSolicitudes :any[]=[]
  public transactLis:SelectItem[]=[];
  public ipList:String[]=[];
  public auxCont=0;
  public spin=false;
  public limiteHabiles:number;

  ipPattern = "\^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\$";
  ipMax="15"

  constructor(private service: AgendaAmbienteService,
              private alertService: AlertService,
              private servicesCat:CatalogosService,
              private route: Router) { }

  ngOnInit() {
    document.getElementById('btnEdit').style.display='none';
    this.cargarTransa = [];
    let userlogin:User= JSON.parse(localStorage.getItem('user_session_data')).user;
    this.userId=userlogin.id;
    this.validaTurno();
    this.spin=true;
    this.cargaTabla();
    this.service.getLimiteHabiles().subscribe(p =>
      {this.limiteHabiles=p.json;
        console.log("LIMITE DE DÍAS HABILES ---->>>> "+this.limiteHabiles);
      },
      err => {console.log(err);}
    );
    /*this.servicesCat.getAllTransactions().subscribe(p =>{ this.transBack= p
      for(var d of this.transBack){
        this.cargarTransa.push({label:d.transaccionPantallaTransient, value:d.transaccion});
      }}, err => {console.log(err);});*/
      console.log("ON INIT METHOD ---->>>> ");
  }

  ngAfterViewInit() {
    CommonUtilsAgenda.removeSelector();
  }

  cargaTabla(){
    this.detalleSolictud=[];
    var now=new Date();
    var starDate=new Date();
    starDate.setDate(starDate.getDate()-1)
    console.log("INFORMACIÓN PARA CARGA DE TABLA ---->>>> "+starDate +"   "+this.userId);
    this.service.getAgendaUser(starDate, this.userId).subscribe(p =>  {this.detalleSolictud = p;
      console.log("LONGITUD DETALLE SOLICITUD ---->>> "+this.detalleSolictud);
      if(this.detalleSolictud==undefined){
        this.spin=false;
        document.getElementById('btnEdit').style.display='block';
      }else{
        for(var detail of this.detalleSolictud){
          var fi=new Date(detail.fechaInicio);
          var ff=new Date(detail.fechaFinal);
          detail.periodoPrueba=detail.fechaInicio+" / "+detail.fechaFinal;
          ff.setDate(ff.getDate()+1);
          fi.setDate(fi.getDate()+1);
          fi.setHours(0,0,0);
          if(this.turnoActual==4){
            this.validaPeriodo(detail);
            this.tablaSolicitudes.push(detail);
          }else{
            if(detail.turno==this.turnoActual && now.getFullYear()==ff.getFullYear() && now.getMonth()==ff.getMonth() && now.getDate()==ff.getDate()){
              console.log("FOLIO EN PROCESO DE EJECUCIÓN -> "+detail.folio);
            }else if(detail.turno==this.turnoActual && now<=ff && now>=fi){
              console.log("FOLIO EN PROCESO DE EJECUCIÓN -> "+detail.folio);
            }else if(detail.turno<=this.turnoActual && now.getFullYear()==ff.getFullYear() && now.getMonth()==ff.getMonth() && now.getDate()==ff.getDate()){
              console.log("FOLIO TERMINADO -> "+detail.folio);
            }else{
              this.validaPeriodo(detail);
              this.tablaSolicitudes.push(detail);
            }
          }

          this.spin=false;
          document.getElementById('btnEdit').style.display='block';
        }
      }
    }, (err) => {console.log(err);});
  }

  validaPeriodo(detail:any){
    var now= new Date();
    var ultimoDia=new Date(now.getFullYear(),now.getMonth()+1,0);
    var fi=new Date(detail.fechaInicio);
    var ff=new Date(detail.fechaFinal);
    ff.setDate(ff.getDate()+1);
      if(now>fi){
        if(now.getMonth()<10){
          if(detail.turno<this.turnoActual && now.getDate()<ultimoDia.getDate()){
            detail.periodoPrueba=now.getFullYear()+"-0"+(now.getMonth()+1)+"-"+(now.getDate()+1)+" / "+ff.getFullYear()+"-0"+(ff.getMonth()+1)+"-"+ff.getDate();

          }else{
            detail.periodoPrueba=now.getFullYear()+"-0"+(now.getMonth()+1)+"-"+now.getDate()+" / "+ff.getFullYear()+"-0"+(ff.getMonth()+1)+"-"+ff.getDate();
          }


        }else{
          if(detail.turno<this.turnoActual && now.getDate()<ultimoDia.getDate()){
            detail.periodoPrueba=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+(now.getDate()+1)+" / "+ff.getFullYear()+"-"+(ff.getMonth()+1)+"-"+ff.getDate();

          }else{
            detail.periodoPrueba=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" / "+ff.getFullYear()+"-"+(ff.getMonth()+1)+"-"+ff.getDate();
          }
        }
      }
  }

  validaTurno(){
    var now=new Date();
    var t1Inicio=new Date();
    var t2Inicio=new Date();
    var t2fin=new Date();
    var t3fin=new Date();
    t1Inicio.setHours(9);
    t2Inicio.setHours(12);
    t2fin.setHours(15);
    t3fin.setHours(18);
    if(now.getHours() >= t1Inicio.getHours() && now.getHours() < t2Inicio.getHours()){
      this.turnoActual=1;
    }else if(now.getHours() < t2fin.getHours() && now.getHours() >= t2Inicio.getHours()){
      this.turnoActual=2;
    }else if(now.getHours() >= t2fin.getHours() && now.getHours() < t3fin.getHours()){
      this.turnoActual=3;
    }else{
      this.turnoActual=4;
    }
    console.log("TURNO ACTUAL---> "+this.turnoActual);
  }

  getCalendarRouter(){
    this.route.navigate(['/admin/agenda-ambiente']);
  }


  getFolioTrans(detalleSolictud:SolicitudModel){
    var now=new Date();
    var fecha="";
    if(now.getMonth()<10){
      fecha=now.getFullYear()+"-0"+(now.getMonth()+1)+"-"+now.getDate();
    }else{
      fecha=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
    }
    if(fecha>=detalleSolictud.fechaInicio.toString() && fecha<=detalleSolictud.fechaFinal.toString() && this.turnoActual==detalleSolictud.turno){
      console.log("LA FECHA ENTRA EN EL RANGO DE EJECUCIÓN");
      this.getAlertServices('warn','Ventana en ejecución','No es posible agregar transacciones ya que la ventana de prueba se encuentra en ejecución');
      return;
    }

    this.folio= detalleSolictud.folio;
    this.service.getTransByFolio(this.folio).subscribe(p =>
      this.existedTrans=p.json, (err) => {console.log(err);}
      );

    this.displayDetailTrans=true;
  }



  getFolioIP(detalleSolictud:SolicitudModel){
    var now=new Date();
    var fecha="";
    if(now.getMonth()<10){
      fecha=now.getFullYear()+"-0"+(now.getMonth()+1)+"-"+now.getDate();
    }else{
      fecha=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
    }
    if(fecha>=detalleSolictud.fechaInicio.toString() && fecha<=detalleSolictud.fechaFinal.toString() && this.turnoActual==detalleSolictud.turno){
      console.log("LA FECHA ENTRA EN EL RANGO DE EJECUCIÓN");
      this.getAlertServices('warn','Ventana en ejecución','No es posible agregar IP´s ya que la ventana de prueba se encuentra en ejecución');
      return;
    }
    this.folio= detalleSolictud.folio;
    this.displayDetailIp=true;
    var flag;
    console.log("OBTENIENDO IPS DEL FOLIO ");
    flag=this.service.getIpsByFolio(this.folio).subscribe(p =>
        this.existedIps = p.json , (err) => {console.log(err);}
        );
    if(flag){
      console.log("LA CONSULTA SE REALIZÓ BIEN");
      console.log("DETALLE SOLICITUD ------->>>> "+this.existedIps);
    }else{
      console.log("LA CONSULTA FALLÓ AL REALIZARSE ");
    }
  }


  modificarSolicitud(){
    console.log("SENDING INFO TO UPDATE IT ---->>> ");

    console.log("VALIDATE NEW IP ---->>> ");
    var statusIp;
    var statusTrans;
    var flagIp=false;
    var flagTrans=false;
    var msj="";
    if(this.ipList.length==0){
      if(this.trans.length==0){
        this.getAlertServices('error','Datos nulos','Se debe ingresar una ip o una transacción para agregar');
        return;
      }else{
        console.log("INTO IP VALIDATION");
          for(var i=0;i<this.trans.length;i++){
            if(this.trans[i]==this.existedTrans[i]){
              console.log("TRANS->>>> "+this.trans[i]+"   ExistedTransaction ->>> "+this.existedTrans[i]);
              this.getAlertServices('error','Información Repetida','Se han seleccionado transacciones ya registradas');
              return;
            }
          }
          flagTrans=this.service.agregarTrans(this.trans,this.folio).subscribe( p => {
          statusTrans= p.json;
          console.log("RESPUESTA DEL SERVIDOR"+ statusTrans);
          var  msj='Se agregaron las transacciones';
          this.getValidacionMes(statusTrans,msj);
          }, (err) => {});

          if(flagTrans){
            this.cancelModal();
            this.getAlertServices('success','Solicitud Editada','La(s) transaccion(es) se almacenaron on exito!');
          }else{
            this.cancelModal();
            this.getAlertServices('error','Ah ocurrido un error','Ah ocurrido un error al intentar modificar su solicitud, favor de reintentar');
          }
      }
    }else{
      var lista:any[]=[];
      for(var i=0,aux=0;i<this.ipList.length;i++){
        if(this.ipList[i]){
          lista[aux]=this.ipList[i];
          console.log("POSICIIÓN "+aux+" CONTENIDO "+lista[aux]);
          aux++;
        }
      }
      flagIp=this.service.agregarIp(lista,this.folio).subscribe( p =>  {
        statusIp= p.json;
        msj="Se agregaron las ip "

      }, (err) => {});
      console.log("FLAG IPS->>> "+flagIp);
      setTimeout(()=>{this.validaTransact(flagIp)},2000);

    }
    this.auxCont=0;
  }

  validaTransact(flagIp: any){
    console.log("INICIO DE VALIDACIÓN PARA GUARDAR TRANSACCIONES ");
    var flagTrans;
    if(this.trans.length!=0){
      for(var i=0;i<this.trans.length;i++){
        if(this.trans[i]==this.existedTrans[i]){
          console.log("TRANS->>>> "+this.trans[i]+"   ExistedTransaction ->>> "+this.existedTrans[i]);
          this.getAlertServices('error','Información Repetida','Se han seleccionado transacciones ya registradas');
          return;
        }
      }
      flagTrans=this.service.agregarTrans(this.trans,this.folio).subscribe( p => {
      var statusTrans= p.json;
      console.log("RESPUESTA DEL SERVIDOR"+ statusTrans);
      var  msj='Se agregaron las transacciones';
      }, (err) => {});

    }

    console.log("ESTATUS IP -->> "+flagIp+"  ESTATUS TRANS --->> "+flagTrans);
      if(flagIp==undefined && flagTrans==undefined){
        this.cancelModal();
        this.getAlertServices('error','Ah ocurrido un error','Ah ocurrido un error al intentar modificar su solicitud, favor de reintentar');
      }else if(flagTrans && flagIp==undefined ){
        this.cancelModal();
        this.getAlertServices('success','Solicitud Editada','La(s) transaccion(es) se almacenaron on exito!');
      }else if(flagIp && flagTrans==undefined){
        this.cancelModal();
        this.getAlertServices('success','Solicitud Editada',' Ip guardada con exito!');
      }else if(flagIp && flagTrans){
        this.cancelModal();
        this.getAlertServices('success','Solicitud Editada',' La solicitud de modificó correctamente');
      }
  }

  getModify(detalleSolictud:SolicitudModel){
    this.trans=[];
    this.ipDesa="";
    this.ipList=[];
    this.existedTrans=[];
    this.existedIps=[];
    this.transactLis=[];
    this.cargarTransa=[];
    this.folio=detalleSolictud.folio;
    this.spin=true;
    this.servicesCat.getAllTransactions().subscribe(p =>{ this.transBack= p
      for(var d of this.transBack){
        this.cargarTransa.push({label:d.transaccionPantallaTransient, value:d.transaccion});
      }}, err => {console.log(err);});

    this.service.getIpsByFolio(this.folio).subscribe(p =>
      this.existedIps = p.json , (err) => {console.log(err);}
      );

    this.service.getTransByFolio(this.folio).subscribe(p =>
       this.existedTrans=p.json, (err) => {console.log(err);}
      );

    setTimeout(()=> {
      this.cargaListTransact();
      },2000);
    setTimeout(()=>{this.displayEdit=true;},2000);
    console.log("DETALLE SOLICITUD GENERAL ---->>>> "+this.detalleSolictud);

  }

  cargaListTransact(){
    console.log("CARGA TRANSA LENGTH -->>> "+this.cargarTransa.length);
    console.log("EXISTED TRANS LENGTH -->>> "+this.existedTrans.length);
    if(this.cargarTransa){
      var cont=0;
      this.transactLis=this.cargarTransa;
      for(var i=0;i<this.existedTrans.length;i++){
        for(var j=0;j<this.transactLis.length;j++){
          if(this.transactLis[j].value==this.existedTrans[i] || this.transactLis[j].value==="SALDOCORTE"){
            console.log("TRANSACT LIST REMOVE --->>> "+this.transactLis[j].value);
            this.transactLis.splice(j,1);
          }
        }
      }
      console.log("TRANSACCION-->>> "+this.transactLis.length);
    }
    this.spin=false;
    this.displayEdit=true;
  }

  agregaIp(){
    const patern= new  RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm);
    if(this.ipDesa=="" || this.ipDesa=='undefined'){
      this.ipList=[];
      this.ipDesa="";
      this.getAlertServices('error','Ingresa ip','Es necesario que ingreses una ip para poderla agregar');
      return;
    }
    if(this.ipDesa.search(patern)!=0){
      this.ipDesa="";
      this.getAlertServices('error','Ip invalida','El formato de ip ingresado no es valido, favor de corregir');
      return;
    }
    for(var i=0;i<this.existedIps.length;i++){
      if(this.ipDesa===this.existedIps[i]){
        this.ipList=[];
        this.getAlertServices('error','Ip repetida','La ip que se intenta agregar ya está registrada en la solicitud');
        return;
      }
    }
    if(this.ipList.length>0){
      for(var j=0;j<this.ipList.length;j++){
        if(this.ipList[j]==this.ipDesa){
          this.getAlertServices('error','Ip existente','La ip que se intenta agregar ya se ah agregado');
          this.ipList=[];
          return;
        }
      }
    }
    this.ipList[this.auxCont]=this.ipDesa;
    this.auxCont++;
    this.ipDesa="";

    for(var i=0;i<this.ipList.length;i++){
        console.log("IPS AGREGADAS "+this.ipList[i]);

    }
  }



  getValidacionMes(status:any, msj:any){

    switch(status){
      case 0:
       this.cancelModal();
       this.getCalendarRouter();
       this.getAlertServices('success','Solicitud Editada',msj+ 'con exito!');
      break;
      case 1:
       this.getAlertServices('error','Pruebas ejecutandose','Los cambios no pueden ser aplicados.');
      break;
      case 4:

       this.getAlertServices('error','Datos Repetidos','Los datos que se ingresaron ya están registrados.');
      break;

    }

 }


 cancelModalTrans(){
   this.displayDetailTrans=false;
 }


 openDelete(detalleSolictud:SolicitudModel){
    this.folio=detalleSolictud.folio;
    this.displayDelete=true;

  }

  eliminarSolicitud(){
    console.log("Seleccionaste aliminar la solicitud "+this.folio);
    this.displayDelete=false;
    this.service.eliminarSolicitud(this.folio).subscribe( p => {
      this.getAlertServices('success','','Se eliminó con éxito la solicitud!');
      this.route.navigate(['/admin/agenda-ambiente/editarSolicitud']);
      for(var i=0;i<this.tablaSolicitudes.length;i++){
        if(this.tablaSolicitudes[i].folio==this.folio){
          console.log("ELEMENTO A ELIMINAR EN POS ->>> "+i+" -->>> "+this.tablaSolicitudes[i].folio);
          this.tablaSolicitudes.splice(i,1);
        }
      }
      }, (err) => {
        this.getAlertServices('error','','Ocurrió un error al eliminar el folio');
      });
  }

  cancelDelete(){
    this.displayDelete=false;
  }

  cancelModal(){
    this.displayEdit=false;
    this.trans=[];
    this.ipDesa="";
    this.ipList=[];
    this.existedTrans=[];
    this.existedIps=[];
    this.transactLis=[];
    var trans=document.getElementsByClassName('ui-multiselect-label-container');
    trans[0].children[0].textContent="TRANSACCIONES DISPONIBLES";
  }


  getAlertServices(sevError:string, sumMsg:string,msg:string ){
    this.alertService.push({severity:sevError,summary:sumMsg,
    detail:msg});
  }

  getTurnoByFolio(detalleSolictud:SolicitudModel){
    var folio=detalleSolictud.folio;
    this.service.getTurnByFolio(this.folio).subscribe(p =>
      this.turns = p.json , (err) => {console.log(err);}
      );
      console.log("TURNOS RECIBIDOS ---->>>> "+this.turns);
  }

  validaMes(mes:any){
    if(mes==0 || mes==2 || mes==4 || mes==6 || mes==7 || mes==9 || mes==11){
      return 31;
    }else if(mes==3 || mes==5 || mes==8 || mes==10){
      return 30;
    }else{
      return 28;
    }
  }

  onChange(event){
    event.originalEvent;
    var trans=document.getElementsByClassName('ui-multiselect-label-container');
    trans[0].children[0].textContent="TRANSACCIONES DISPONIBLES-";

  }

}
