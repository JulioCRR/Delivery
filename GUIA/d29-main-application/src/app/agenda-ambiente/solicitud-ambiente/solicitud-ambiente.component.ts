import { Component, OnInit,ViewChild, ElementRef,Input,ChangeDetectorRef ,ChangeDetectionStrategy, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, FormArray ,FormControl, Validators,FormsModule,NgForm ,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';
import {User} from '../../admin/admin.service';
import {ISolicitud} from '../model/ISolicitud';
import {SolicitudModel} from '../model/SolicitudModel';
import {AgendaAmbienteService} from '../agenda-ambiente.service';
import {AlertService} from '../../alert.service';
import {M2kCatTransaccion} from  '../../catalogos/model/M2kCatTransaccion';
import { SimpleHelp } from '../../help/model/SimpleHelpModel';
import * as moment from 'moment';
import { ContadorSolicitud } from '../model/ContadorSolicitud';
import {DiasInhablies} from  '../model/DiasInhablies';
import {FormatSelectItemPipe} from  '../../catalogos/transacciones/utils/FormatSelectItemPipe';

import {CatalogosService} from '../../catalogos/catalogos.service';
import {SelectItem,Message,MultiSelectModule} from 'primeng/primeng';
import {CommonUtilsAgenda} from '../util/CommonUtilsAgenda';





@Component({
  selector: 'app-solicitud-ambiente',
  templateUrl: './solicitud-ambiente.component.html',
  styleUrls: ['./solicitud-ambiente.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})


export class SolicitudAmbienteComponent implements OnInit, AfterViewInit {

    private nomProyecto: string;
    private fechaInicio:Date;
    private fechaFinal:Date;
    private dias:number;
    private comentarios:string;
    public transBack: M2kCatTransaccion[];
    public diasInhabiles: DiasInhablies[];
    public usuario:string;
    public nProyectoAyuda: SimpleHelp;
    public inFePruebasAyuda: SimpleHelp;
    public fnFePruebasAyuda: SimpleHelp;
    public usuarioAyuda: SimpleHelp;
    public comentariosAyuda: SimpleHelp;
    public ipAyuda: SimpleHelp;
    public transAyuda: SimpleHelp;
    public turno:number;
    public turnoAyuda: SimpleHelp;
    permisosABorrar: number[] = [];
    restriFechaMin = new Date();
    restriFechaMax = new Date();
    diasSinLaborar: Date[] = [];
    public transacciones:string [];
    public limitHabil:number;
    public spin=false;


    private ambiente:ContadorSolicitud;
    private  formGroup: FormGroup;
    private fechaEnvio:Date;
    private limiteDias:any;
    private limiteAmbiente:any;

    cargarTransa: SelectItem[];
    selectedCity: string[];



    public HORARIO_DIU="09:00 hrs a 12:00 hrs."
    public HORARIO_MEDIODIA="12:00 hrs a 15:00 hrs."
    public HORARIO_VES="15:00 hrs a 18:00 hrs."
    ipPattern = "\^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\$";
    ipMax="15"


  constructor(private fb: FormBuilder,
              private service:AgendaAmbienteService,
              private  cdr: ChangeDetectorRef,
              private route: Router,
              private alertService: AlertService,
              private servicesCat:CatalogosService) {this.transBack = [];
              }



    ngOnInit() {
      this.cargarTransa = [];
      this.cargarAyuda();
      this.initForm();
      this.restriFechaMin.setDate(this.restriFechaMin.getDate()+1);
      this.restriFechaMax.setDate(this.restriFechaMax.getDate()+30);
      this.agregarPermisosIp();
      this.servicesCat.getAllTransactions().subscribe(p =>{ this.transBack= p
        for(var d of this.transBack){
          this.cargarTransa.push({label:d.transaccionPantallaTransient, value:d.transaccion});
          this.limpiaLista();
        }}, err => {console.log(err);});
      this.service.getLimiteReservacion().subscribe(p => this.limiteDias = p.json, err => {console.log(err);});
      this.service.getLimiteAmbiente().subscribe(p => this.limiteAmbiente = p.json, err => {console.log(err);});
    }

    limpiaLista(){
      for(var i=0;i<this.cargarTransa.length;i++){
        if(this.cargarTransa[i].value==="SALDOCORTE"){
          this.cargarTransa.splice(i,1);
        }
      }
    }

      initForm() {
          this.formGroup = this.fb.group({
            'fechaInicio' : new FormControl(this.fechaInicio, Validators.required),
            'nomProyect': [this.nomProyecto, Validators.compose([Validators.required, Validators.maxLength(40)])],
            'fechaFinal':[this.fechaFinal, Validators.required],
            'permisosIp': this.fb.array([],Validators.required),
            'permisosTrans':[this.transacciones,Validators.required],
            'comentarios':[this.comentarios, Validators.compose([Validators.required, Validators.maxLength(250)])],
            'usuario':[this.usuario,Validators.compose([Validators.required, Validators.maxLength(7)])],
            'turno':[this.turno,Validators.required],
          });
          this.formGroup.valueChanges.subscribe(data => this.onValueChanged(data));
          this.onValueChanged();
        }

    ngAfterViewInit() {
      CommonUtilsAgenda.removeSelector();
    }


    guardarSolicitud() {
      document.getElementById('enviarFormulario').setAttribute('disabled','true');
      let userlogin:User= JSON.parse(localStorage.getItem('user_session_data')).user;
      let userId: any=userlogin.id;
      let userMail: any=userlogin.correo;
      console.log(this.formGroup.value)
      let solicitud: ISolicitud = Object.assign({}, this.formGroup.value);
      let dataSolicitud = new SolicitudModel(
         0,
         userId,
         userMail,
         solicitud.nomProyect,
         solicitud.fechaInicio,
         solicitud.fechaFinal,
         solicitud.permisosIp,
         solicitud.permisosTrans,
         0,
         solicitud.comentarios,
         solicitud.usuario,
         solicitud.turno,
      );
        //this.validaDuplicidad(dataSolicitud);
       // this.enviarSolicitud(dataSolicitud);
        //this.ambienteDispo(dataSolicitud)
        //this.limiteDiasReserdados(dataSolicitud)
      if(this.validarPermisosIP(dataSolicitud.permisosIp)){
          this.validaFinSemana(dataSolicitud);
      }
    }




    validaFinSemana(solicitud:SolicitudModel){

      this.service.getDiasInhabiles().subscribe(p =>{ this.diasInhabiles = p
        for(var dia of this.diasInhabiles){
            this.diasSinLaborar.push(dia.diaInhabil);
          }

        if(!this.getValidarDia(solicitud.fechaInicio,this.diasSinLaborar)){
            this.getAlertServices('error','Día NO laborable','La fecha de Inicio ('+this.getFormatoDay(solicitud.fechaInicio)+') NO se puede reservar.');
            document.getElementById('enviarFormulario').removeAttribute('disabled');
            return null;
        }else if(!this.getValidarDia(solicitud.fechaFinal,this.diasSinLaborar)){
            this.getAlertServices('error','Día NO laborable','La fecha final ('+this.getFormatoDay(solicitud.fechaFinal)+') NO se puede reservar.');
            document.getElementById('enviarFormulario').removeAttribute('disabled');
            return null;
        }else{
            this.limiteDiasReserdados(solicitud)
        }
      } , (err)  => {console.log(err);});
    }


      getValidarDia(date:Date, data){
        for (var i = 0; i < data.length; i++) {
              if (this.getFormatoDay(data[i])=== this.getFormatoDay(date)) {
                  console.log("dia inabil");
                  return false;
              }
          }
        return true;
      }


    limiteDiasReserdados(solicitud:SolicitudModel){
      this.fechaEnvio=new Date();
      this.dias=this.getDias(solicitud.fechaInicio,solicitud.fechaFinal);
      var date=solicitud.fechaInicio;
      for (var i = 0; i < this.dias; i++) {
        this.fechaEnvio.setDate(solicitud.fechaInicio.getDate()+i)
        this.fechaEnvio.setDate(date.getDate()+i);
        if( this.fechaEnvio.getDay()===6 ||  this.fechaEnvio.getDay()===5){
                 this.dias--;
         }
         this.fechaEnvio.setDate(solicitud.fechaInicio.getDate());
      }

        if(this.dias <=  this.limiteDias){
          if (solicitud.fechaInicio.getTime() <=solicitud.fechaFinal.getTime()){
               this.ambienteDispo(solicitud)
           }else{
               this.getAlertServices('error','Solicitud','La fecha Inicial No puede ser mayor a la fecha final.');
               document.getElementById('enviarFormulario').removeAttribute('disabled');
               return null;
           }
          }else{
               this.getAlertServices('error','Solicitud','No se puede reservar más de '+ this.limiteDias +' días hábiles el ambiente, contando el día actual');
               document.getElementById('enviarFormulario').removeAttribute('disabled');
               return null;
        }

    }



    getFormatoDay(date:Date){
        var fecha=moment(date).format('DD-MM');
        return fecha;
    }

    ambienteDispo(solicitud:SolicitudModel){
      this.service.validarAmbiente(solicitud).subscribe( p => {
        this.ambiente= p.json;
           var fechaInicio=this.getFormatoDay(this.ambiente.diaOcupado);
           //el condicional para permitir 2 soliitudes por turno en el calendario (también se cambia en el back )
            if(this.ambiente.cDias< this.limiteAmbiente){
                this.validaDuplicidad(solicitud);
            }else{
              this.getAlertServices('error','Disponibilidad de Ambiente','El día '+fechaInicio+' NO tiene disponiblididad para reservar el ambiente. Favor de cambiar los días de prueba.');
              document.getElementById('enviarFormulario').removeAttribute('disabled');
            }
         }, (err) => {
             console.log("ERROR"+err);

          });
   }


    validaDuplicidad(data:SolicitudModel){
      this.service.verificarSolicitud(data).subscribe(p => {
            console.log("respuesta con exito");
             this.enviarSolicitud(data);
        }, (err) => {
           this.getAlertServices('error','Pemisos Duplicados','La solicitud ya está registrada.');
           document.getElementById('enviarFormulario').removeAttribute('disabled');
        });
   }




    validarPermisosIP(data){
      var repetido =true;
      var ips = []
      for(let del of data){
          ips.push(del.ip);
       }
       var uniqueItems = Array.from(new Set(ips))
       if(data.length > uniqueItems.length || data.length < uniqueItems.length){
          this.getAlertServices('error','Solicitud','No se permiten Ip repetidas.');
          document.getElementById('enviarFormulario').removeAttribute('disabled');
          return false;
       }

      return repetido;
    }

    enviarSolicitud(data){
        this.service.sendSolicitud(data).subscribe(p => {
            this.route.navigate(['/admin/agenda-ambiente']);
            this.getAlertServices('success','Solicitud de Ambiente',"La solicitd se envió con exito!");
          }, (err) => {
             this.getAlertServices('error','Solicitud de Ambiente','Surgido un error al enviar la solicitud, favor de intentar más tarde.');
             document.getElementById('enviarFormulario').removeAttribute('disabled');
          });
    }

    getAlertServices(sevError:string, sumMsg:string,msg:string ){
      this.alertService.push({severity:sevError,summary:sumMsg,
      detail:msg});
    }



    getDias(ini:Date,fin: Date){
      var dInicial = moment(ini);
      var dFn = moment(fin);
      var dia=Math.abs(dInicial.diff(dFn, 'days'));
      dia++;
      return dia;
    }


    getAlertaServices(msg:any,detalle:any){
      this.alertService.push({severity:'error',summary:msg,
       detail:detalle});
    }


    agregarPermisosIp() {
     // this.cdr.detectChanges();
       let permisosArr1 = this.formGroup.get('permisosIp') as FormArray;
       let  permisosFG1 = this.permisosIp();
        permisosArr1.push(permisosFG1);
    }



    eliminarPermisosIp(index: number ) {

      let permisos;
      permisos = this.formGroup.get('permisosIp') as FormArray;
      let eliminarPermisosr = permisos.at(index) as FormGroup;
      if (eliminarPermisosr.controls['id'].value != '0') {
        this.permisosABorrar.push(<number>eliminarPermisosr.controls['id'].value);
      }
      permisos.removeAt(index);
      //console.log("se eliminan permisos");
    }



    permisosIp() {
      return this.fb.group({
        id: '0',
        ip: '',
      });
    }





    cleanScreen(){
      this.formGroup.reset();
    }



    cargarAyuda() {
      this.nProyectoAyuda = new SimpleHelp('Proyecto','Nombre del proyecto para el cual se aplicarán las pruebas.');
      this.inFePruebasAyuda = new SimpleHelp('Fecha Inicio','Día en que se inciarán las pruebas en desarrollo.');
      this.fnFePruebasAyuda = new SimpleHelp('Fin de Pruebas','Fecha de terminación de las pruebas.');
      this.usuarioAyuda = new SimpleHelp('Usuario','Es el usuario que se utiliza para entrar a M2K.');
      this.comentariosAyuda = new SimpleHelp('Comentarios','Indicar el folio SISAP o alguna referencia de las pruebas.');
      this.ipAyuda = new SimpleHelp('Ip','Es la Ip de donde se va invocar el servicio.');
      this.transAyuda = new SimpleHelp('Transacción','Es el nombre del servicio que se va a consumir.');
      this.turnoAyuda = new SimpleHelp('Horario de pruebas','Los horarios de pruebas se distribuirán en 3 turnos. Serán de 09:00 a 12:00 , 12:00 a 15:00 y de 15:00 a 18:00 hrs. con soporte.');
  }



  onValueChanged(data?: any) {
    if (!this.formGroup) { return; }
        const form = this.formGroup;

        for (const field in this.formErrors) {
        // clear previous error message (if any)
                 this.formErrors[field] = '';
                 const control = form.get(field);

             if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                this.formErrors[field] += messages[key] + ' ';
            }
        }
     }
   }

   formErrors = {
    'nomProyect' : '',
    'comentarios' : '',
    'usuario' : '',
   };

   validationMessages = {
      'nomProyect': {
      'required': 'Ingrese el nombre del proyecto.',
      'maxlength': 'Máximo 40 caracteres'
    },'comentarios': {
      'required': 'Favor de incluir algún comentario.',
      'maxlength': 'El COMENTARIO debe tener máximo 250 caracteres.'
    },'usuario': {
      'required': 'Ingrese el usuario.',
      'maxlength': 'Max. 7 caracteres.'
    },
  };


  onChange(event){
    var trans=document.getElementsByClassName('ui-multiselect-label-container');
    trans[0].children[0].textContent="SELECCIONAR-";
  }
}
