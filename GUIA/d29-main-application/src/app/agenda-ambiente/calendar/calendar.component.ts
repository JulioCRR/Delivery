import { Component, OnInit,Output ,EventEmitter} from '@angular/core';
import { AgendaAmbienteService } from '../agenda-ambiente.service';
import { AuthService } from '../../app.service';
import { Validators, FormControl, FormGroup, FormBuilder,FormArray } from '@angular/forms';
import { AlertService } from '../../alert.service';
import { User } from '../../admin/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { CalendarFormComponent } from '../calendar-form/calendar-form.component';
import { ViewChild } from '@angular/core/src/metadata/di';
import { SolicitudModel } from '../model/SolicitudModel';
import * as moment from 'moment';

import { IfObservable } from 'rxjs/observable/IfObservable';
import { AutoComplete } from 'primeng/primeng';




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],

})
export class CalendarComponent implements OnInit {

  public calendarOptions: any;
  public calendarHeader: any;
  public calendarDefaultView: string;
  public calendarDefaultDate: Date;
  public listCalendarEvent: any[];
  public displayPetButton: boolean;
  public serviceCount: number;
  public displayModalForm:boolean;
  public fecha:string;
  public spin:boolean;


  private detalleSolictud:SolicitudModel[] = [];
  private userlogin:User= JSON.parse(localStorage.getItem('user_session_data')).user;
  private userId: any=this.userlogin.id;
  private formGroup: FormGroup;
  private displayDetailAgenda:boolean;
  private COLOR_DIU:string='#008B8B';
  private COLOR_VES:string='#6495ED';
  private COLOR_MEDIO_DIA:string='#778899';



  pdfSrc = "/assets/pdf/Manual_de_Usuario_Agendar_Ambiente_WS-M2k.pdf";

  constructor(private service: AgendaAmbienteService) {this.spin = true;}

  ngOnInit() {
    document.getElementById('btnEdit').style.display='none';
    this.displayPetButton = false;
    //this.calendarDefaultView = this.CALENDAR_VIEW_MONTH;
    this.calendarDefaultDate = new Date();
    this.calendarDefaultDate.setHours(0, 0, 0, 0);
    this.listCalendarEvent = [];
    this.calendarOnViewRender;

    this.calendarHeader = {
      left: 'prev',
      center: 'title',
      right: 'next'
    };

    this.calendarOptions = {
      validRange: {
        //start  : this.calendarDefaultDate,
      },
    };
  }



 getDetalleSolictud(){
    this.service.getAgenda(this.userId).subscribe(p => { this.detalleSolictud = p;
      let color;
        for (let del of this.detalleSolictud) {
          (del.turno===1) ? color=this.COLOR_DIU:color=this.COLOR_VES ;
          let listaCal= this.calendarEvent(del.nomProyect,del.fechaInicio,del.fechaFinal,del.folio,color,del.turno);
          this.listCalendarEvent.push(listaCal);
        }

     } , (err) => {console.log(err);});
   }



  clickButtonAgregarPeticion(fc) {
    console.log("Configurar modal para agregar las peticiones");
    console.log('clickButtonAgregarPeticion(fc):');
    console.log(fc);

  }

  clickCalendarDay(e, fc) {}



  calendarOnViewRender(event,fc){
    this.spin=true;

    let mesActual=event.view.dateProfileGenerator._view.title
    console.log(event.view.dateProfileGenerator._view.title);
    var res= mesActual.replace(" ","_");
    if(this.calendarEvent.length>0){
      this.listCalendarEvent=[]
    }
    this.service.getAgenda(res).subscribe(p => {
      this.detalleSolictud = p;
      console.log("DETALLE SOLICITUD --->>> "+this.detalleSolictud);
      if(this.detalleSolictud==undefined){
        this.closeSpinner();
      }else{
        let color;
      //console.log("AGENDA"+this.detalleSolictud )
        for (let del of this.detalleSolictud) {
          var d =new Date(del.fechaInicio);
          var df=new Date(del.fechaFinal);
          switch (del.turno) {
            case 1:
              color=this.COLOR_DIU;
              d.setHours(9,0,0);
              df.setHours(12,0,0);
              break;
            case 2:
              color=this.COLOR_MEDIO_DIA;
              d.setHours(12,0,0);
              df.setHours(15,0,0);
              break;
            case 3:
              color=this.COLOR_VES;
              d.setHours(15,0,0);
              df.setHours(18,0,0);
              break;
            default:
          }
          if(d.getDay()===5 || d.getDay()===6){
            console.log("FECHA INHABILITADA -->>> "+d.getMonth()+"-"+d.getDate());
                //no se agregan al calendario
          }else{

            d.setDate(d.getDate()+1);
            df.setDate(df.getDate()+1);
            var auxDateI=new Date(d);
            var auxDateF=new Date(df);
            //var days=this.getDays(auxDateI, auxDateF);
            //var days=auxDateF.getDate()-auxDateI.getDate();
            var days=this.getCountDays(auxDateI,auxDateF);
            console.log("D�AS RESERVADOS --->>> ",days,del.folio);
            //debugger;
            if(days>0){
              var auxI=new Date(auxDateI);
              var auxF=new Date(auxDateF);
              var weekI=this.getWeekNumber(auxI);
              var weekF=this.getWeekNumber(auxF);
              var festivo=getDayFestivos();
              if(weekI==weekF){
                var contFestDays=0;
                for(var i=0;i<days;i++){
                  for(var f=0;f<festivo.length;f++){
                    var now=this.getMonthDay(auxDateI);
                    if(now==festivo[f]){
                      contFestDays=contFestDays+1;
                      auxDateI.setDate(auxDateI.getDate()+1);
                    }
                  }
                  auxDateI.setDate(auxDateI.getDate()+1);
                }

                var auxDateI=new Date(d);
                var auxDateF=new Date(df);

                if(contFestDays>0){
                  for(var i=0;i<days;i++){
                    for(var f=0;f<festivo.length;f++){
                      var now=this.getMonthDay(auxDateI);
                      if(now==festivo[f]){
                        console.log("D�A FESTIVO --->>> "+now,festivo[f]);
                        auxF.setDate(auxDateI.getDate()-1);
                        let listaCalIf= this.calendarEvent(del.nomProyect,d,auxF,del.folio,color,del.turno);
                        this.listCalendarEvent.push(listaCalIf);

                        auxI.setDate(auxDateI.getDate()+1);
                        let listaCalFf= this.calendarEvent("",auxI,df,del.folio,color,del.turno);
                        this.listCalendarEvent.push(listaCalFf);
                        auxDateI.setDate(auxDateI.getDate()+1);
                      }
                    }
                    auxDateI.setDate(auxDateI.getDate()+1);
                  }
                }else{

                  var lastDay=this.getLastDay(auxDateI);
                  var flag=this.validateLast(auxDateI,days,del);
                  auxDateI= new Date(d);
                  auxF=new Date(auxDateI);

                  if(flag){
                    for(var cont=0;cont<days;cont++){
                      if(auxDateI.getDate()==lastDay){
                        auxF.setDate(auxDateI.getDate());
                        let listaCalIf= this.calendarEvent(del.nomProyect,d,auxF,del.folio,color,del.turno);
                        this.listCalendarEvent.push(listaCalIf);
                        auxDateI.setDate(auxDateI.getDate()+1);
                      }else{
                        auxDateI.setDate(auxDateI.getDate()+1);
                      }
                    }
                  }else{
                    let listaCal= this.calendarEvent(del.nomProyect,d,df,del.folio,color,del.turno);
                    this.listCalendarEvent.push(listaCal);
                  }
                }
              }else{

                var lastDay=this.getLastDay(auxDateI);
                var flag=this.validateLast(auxDateI,days,del);
                auxDateI= new Date(d);
                auxF=new Date(auxDateI);

                if(flag){
                  for(var cont=0;cont<days;cont++){
                    if(auxDateI.getDate()==lastDay){
                      auxF.setDate(auxDateI.getDate());
                      let listaCalIf= this.calendarEvent(del.nomProyect,d,auxF,del.folio,color,del.turno);
                      this.listCalendarEvent.push(listaCalIf);
                      auxDateI.setDate(auxDateI.getDate()+1);
                    }else{
                      auxDateI.setDate(auxDateI.getDate()+1);
                    }
                  }
                }else{
                  for(var i=0,cont=1;i<days;i++){


                    if(auxDateI.getDay()==5 && days>=1){

                      auxF.setDate(auxI.getDate()+i);
                      console.log("FECHAS ACTUALIZADAS --->>> "+d,auxF,del.folio);
                      let listaCalV= this.calendarEvent(del.nomProyect,d,auxF,del.folio,color,del.turno);
                      this.listCalendarEvent.push(listaCalV);

                      auxI.setDate(auxDateI.getDate()+3);
                      console.log("FECHAS ACTUALIZADAS --->>> "+auxI,df,del.folio);
                      let listaCalL= this.calendarEvent(del.nomProyect,auxI,df,del.folio,color,del.turno);
                      this.listCalendarEvent.push(listaCalL);
                      auxDateI.setDate(auxDateI.getDate()+cont);
                    }else{
                      auxDateI.setDate(auxDateI.getDate()+cont);
                    }

                  }
                }
              }
            }else{
              let listaCal= this.calendarEvent(del.nomProyect,d,df,del.folio,color,del.turno);
              this.listCalendarEvent.push(listaCal);
            }
          }
        }
        this.closeSpinner()
      }
     } , (err) => {console.log(err);});

  }

  closeSpinner(){
    this.spin=false;
    document.getElementById('btnEdit').style.display='block';
  }

  clickCalendarEvent(e) {
    this.service.getAgendaFolio(e.calEvent.folio).subscribe(p => { this.detalleSolictud = p;
      console.log(this.detalleSolictud);
      this.displayDetailAgenda=true;
      console.log("buscar peticion")
     } , (err) => {
       console.log(err);
    })
  }



  calendarEvent(proyecto:string, fechaI:Date,fechafIn:Date,folio:number,color:string,turno:string): any {
    let event = {
      title:proyecto,
      start: fechaI,
      end: fechafIn,
      folio: folio,
      color: color,
      turno:turno,
    };

    return event;
  }



  cancelDetalleAgenda(){
    this.displayDetailAgenda=false;
  }

  eventRender(event,element){
    //debugger;
    var time=element[0].children[0].children[0];
    time.style.display='none';
  }

  dayRender(date ,cell){

    const COLOR_GRIS= '#efefef';
    var d=moment(date).format('YYYY-MM-DD');
    let inhabil=new Date(d);
    var festivo = getDayFestivos();
    for ( var i = 0; i < festivo.length; i++) {
      var df=moment(date).format('MM-DD');
      if(!festivo[i].localeCompare(df)){
          cambiarColorCelda(cell);
    }

    switch (inhabil.getDay()) {
      case 6:
        cambiarColorCelda(cell);
        break;
      case 5:
        cambiarColorCelda(cell);
        break;
      default:
        // color blanco
    }
    }

   }

getWeekNumber(d: Date): number {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
}

getMonthDay(d:Date): string{
  var newFech="";
  if(d.getMonth()<10){
    if(d.getDate()<10){
      newFech="0"+(d.getMonth()+1)+"-0"+d.getDate();
    }else{
      newFech="0"+(d.getMonth()+1)+"-"+d.getDate();
    }
  }else{
    if(d.getDate()<10){
      newFech="0"+(d.getMonth()+1)+"-0"+d.getDate();
    }else{
      newFech="0"+(d.getMonth()+1)+"-"+d.getDate();
    }
  }
  return newFech;
}


getDays(inicio:Date,fin:Date):number{
  var days=0
  if(inicio.getMonth()==fin.getMonth()){
    days=(fin.getDate()-inicio.getDate());
  }else{
    var lastDay=this.getLastDay(inicio);

    var difI=lastDay-inicio.getDate();
    days=difI;
  }
  return days;
}

//0,2,4,6,7,9,11- 31 d�as
//3,5,8,10 30 d�as

getLastDay(d:Date):number{
  var month=0;
  if(d.getMonth()==0 || d.getMonth()==2 || d.getMonth()==4 || d.getMonth()==6 || d.getMonth()==7 || d.getMonth()==9 || d.getMonth()==11){
    month=31;
  }else if(d.getMonth()==3 || d.getMonth()==5 || d.getMonth()==8 || d.getMonth()==10){
    month=30;
  }else if(d.getMonth()==1){
    if(d.getFullYear()%4==0 && (d.getFullYear()%100!=0 || d.getFullYear()%400==0)){
      month=29;
    }else{
      month=28;
    }
  }
  return month;
}

validateLast(auxDateI:Date, days:number,del:SolicitudModel):boolean{

  if(days<0){
    days=0;
  }
  var now=auxDateI.getDate();
  console.log("WILL VALIDATE END OF MONTH ",now);
  var lastDay=this.getLastDay(auxDateI);
  var flag=false;
  for(var i=0;i<=days;i++){
    if(now==lastDay){
      flag=true;
      console.log("FLAG IS TRUE",del.folio);
    }
    auxDateI.setDate(auxDateI.getDate()+1);
  }
  return flag;
}

getCountDays(auxDateI:Date,auxDateF:Date):number{

  let lastDay=this.getLastDay(auxDateI);
  let inicio=auxDateI.getDate();
  let fin=auxDateF.getDate();
  let days=0;
  if(auxDateI.getMonth()<auxDateF.getMonth()){
    inicio=lastDay-inicio;
    days=inicio+fin;
  }else{
    days=fin-inicio;
  }

  return days;
}


}
function getDayFestivos(){
  var  diaFestivo = new Array();
  diaFestivo.push('01-01');
  diaFestivo.push('05-01');
  diaFestivo.push('09-16');
  diaFestivo.push('11-01');
  diaFestivo.push('11-02');
  //diaFestivo.push('11-16');
  diaFestivo.push('12-26');
  return diaFestivo;
}


function cambiarColorCelda(cell){
  const COLOR_GRIS= '#efefef';
  var celda=  cell.css("background-color", COLOR_GRIS);
  return celda;
}
