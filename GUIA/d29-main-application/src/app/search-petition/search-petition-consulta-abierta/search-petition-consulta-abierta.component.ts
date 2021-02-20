import {Component, OnInit,Input,Output,Pipe, PipeTransform,ViewChild} from '@angular/core';
import {AuthService} from '../../app.service';
import {AlertService} from '../../alert.service';
import {FormGroup,AbstractControl, FormBuilder, FormControl, Validators,FormsModule,NgForm} from '@angular/forms';
import { SearchPetitionService} from '../search-petition.service';
import {PeticionWS} from '../modelo/PeticionWS';
import { M2kCatUsuarios } from '../modelo/M2kCatUsuarios';
import { SimpleHelp } from '../../help/model/SimpleHelpModel';
import {User} from '../../admin/admin.service';
import { D29Id,ValidarForm } from '../modelo/D29Id';
import { D29EstatusFront } from '../modelo/D29EstatusFront';
import * as moment from 'moment';
import { M2kCatTransaccion } from 'app/catalogos/model/M2kCatTransaccion';

@Component({
  selector: 'app-search-petition-consulta-abierta',
  templateUrl: './search-petition-consulta-abierta.component.html',
  styleUrls: ['./search-petition-consulta-abierta.component.css']
})
export class SearchPetitionConsultaAbiertaComponent implements OnInit {


    public telefono: string;
    public ip: string;
    public region: string;
    public usuario: string;
    public transaccion: string;
    public fechaInicio: Date;
    public horaInicio: Date;
    public horaFinal: Date;
    public formConsulta: FormGroup;
    public usersBack: M2kCatUsuarios[];
    public transBack: M2kCatTransaccion[];
    public spin:boolean;
    public idAyuda: SimpleHelp;
    public telAyuda: SimpleHelp;
    public ipAyuda: SimpleHelp;
    public regAyuda: SimpleHelp;
    public usuAyuda: SimpleHelp;
    public transAyuda: SimpleHelp;
    public fechaInAyuda: SimpleHelp;
    public horaInAyuda: SimpleHelp;
    public hoFAyuda: SimpleHelp;
    public showPetition: boolean;
    public infoBatch:D29Id;
    public folio:any;
    public infoEstatus:D29EstatusFront[];
    public displayConfirmBatch: boolean;
    public validar:ValidarForm;
    public tableView: boolean;

    private userlogin:User= JSON.parse(localStorage.getItem('user_session_data')).user;
    private userId: any=this.userlogin.id;
    public name_user=this.userlogin.nombre;

    regionsBack:string[]=['1','2','3','4','5','6','7','8','9'];
    ipPattern = "\^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\$";


    restricDateMin = new Date();
    restricDateMax = new Date();


    constructor(private service: SearchPetitionService, private alertService: AlertService, private fb: FormBuilder) {
         this.cargarAyuda();
         this.initForm();
         this.restricDateMin.setDate(this.restricDateMin.getDate()-14);
         this.restricDateMax.setDate(this.restricDateMax.getDate());

     }

    ngOnInit() {
        this.service.getUsers().subscribe(p => this.usersBack = p, err => {console.log(err);});
        this.service.getTrans().subscribe(p => this.transBack = p, err => {console.log(err);});
        this.displayConfirmBatch = false;
        this.searchStatus();
    }


    validarConsulta() {
        this.spin=true;
        console.log("USUARIO_ID SESSION:", this.userlogin.id);
        let enviarConsulta = new PeticionWS(
            this.userId,
            this.telefono,
            this.ip,
            this.region,
            this.usuario,
            this.transaccion,
            this.fechaInicio,
            this.horaInicio,
            this.horaFinal,
         );

        if(this.validandoHora(this.fechaInicio,this.horaInicio,this.horaFinal)){
            console.log("Error al validar los horarios de consulta.");
        }else{
            this.service.validar(enviarConsulta).subscribe(p => {this.validar=p;
                    if(this.validar.conteo==0){
                        this.enviarConsulta(enviarConsulta);
                    }else{
                        this.spin=false;
                         this.alertService.push({severity: 'warn', summary: 'Info', detail: "Datos de búsqueda ya se están procesando."});
                    }
            }, (err) => {
                this.spin=false;
                this.alertService.push({severity: 'error', summary: 'Búsqueda', detail: "No se guardarn los datos enviados."});
            });
        }
   }

    obtenerFecha(Date:Date) {
       return Date.getDate()+"/"+(Date.getMonth()+1)+"/"+Date.getFullYear();
   }

    obtenerHora(Date:Date) {
       var hora=moment(Date).format('HH:mm:ss');
       return hora;
    }




  enviarConsulta(data:any) {
    this.service.guardarPeticion(data).subscribe(p => {
    this.infoBatch=p;
    this.folio=this.infoBatch.idfolio;
    this.displayConfirmBatch = true;
    this.spin=false;
    }, (err) => {
        this.spin=false;
        this.alertService.push({severity: 'Error', summary: 'Búsqueda', detail: "No se guardaron los datos enviados."});
    });
}


    searchStatus() {
        delete this.infoEstatus;
        this.service.getInfoEstatusById(this.userId).subscribe(p => {
            this.infoEstatus = p;
           (this.infoEstatus.length==0)? this.tableView=false:this.tableView=true;
        }, (err) => {
            this.spin=false;
            this.alertService.push({ severity: 'warn', summary: 'Búsqueda', detail: "No se encontraron resultados" });
        });
    }



  initForm() {
      this.formConsulta =  this.fb.group({
         'fechaInicio' : new FormControl(this.fechaInicio,Validators.required),
         'horaInicio' : [this.horaInicio , Validators.required],
         'horaFinal' : [this.horaFinal, Validators.required],
         'telefono' : [this.telefono,Validators.compose([Validators.required,
                           Validators.minLength(5),Validators.maxLength(30)])],
         'ip' : [this.ip,Validators.compose([Validators.pattern(this.ipPattern)])],
         'region' : [this.region, Validators.nullValidator],
         'usuario' : [this.usuario, Validators.nullValidator],
         'transaccion' : [this.transaccion, Validators.nullValidator]
      });

      this.formConsulta.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
  }

    onValueChanged(data?: any) {
      if (!this.formConsulta) { return; }
          const form = this.formConsulta;

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
        'telefono' : '',
        'ip' : '',
       };

       validationMessages = {
          'telefono': {
          'required': 'El Teléfono, Imei o Cuenta son requeridos.',
          'minlength': 'Mínimo  5 caracteres',
          'maxlength': 'Máximo 30 caracteres'
        },'ip': {
          'pattern': 'El formato de la Ip no está bien definido.'
        },
      };





    cleanScreen(){
      this.formConsulta.reset();
      this.bloqueCampos();

    }


    cargarAyuda() {
        this.telAyuda = new SimpleHelp('Teléfono, Imei o Cuenta','la búsqueda se realiza ingresando 1 de los 3 parámetros ya indicados.');
        this.ipAyuda = new SimpleHelp('Ip','se ingresa la Ip de donde se consumió el servicio.');
        this.regAyuda = new SimpleHelp('Región','se ingresa la Región de donde se consumió el servicio.');
        this.usuAyuda = new SimpleHelp('Usuario','es el usuario de M2K con el que se realizo la petición.');
        this.transAyuda = new SimpleHelp('Transacción ','es la transacción con que se ejecuta el servicio (nombre del programa en M2K.)');
        this.fechaInAyuda = new SimpleHelp('Fecha Inicio','es la fecha que se indica cuando iniciar la búsqueda.');
        this.horaInAyuda = new SimpleHelp('Hora Inicio','es la hora que indica cuando iniciar la búsqueda.');
        this.hoFAyuda = new SimpleHelp('Hora Final','se indica la hora para finalizar la búsqueda en bitácora.');
    }


    desbloqueo(event: any) {
        ( document.getElementById("ip")).removeAttribute('disabled');
        ( document.getElementById("region")).removeAttribute('disabled');
        ( document.getElementById("usuario")).removeAttribute('disabled');
        ( document.getElementById("transaccion")).removeAttribute('disabled');

    }

    bloqueCampos(){
        ( document.getElementById("ip")).setAttribute('disabled', 'true');
        (document.getElementById("region")).setAttribute('disabled', 'true');
        ( document.getElementById("usuario")).setAttribute('disabled', 'true');
        ( document.getElementById("transaccion")).setAttribute('disabled', 'true');

    }

    cancelDialog(){
        this.displayConfirmBatch = false;
        this.searchStatus();
    }


    validandoHora(fecha:Date, hrInic:Date, hrfn:Date){

        var validacion:boolean=false;

        if(this.horaInicio >= this.horaFinal){
            this.spin=false;
            this.alertService.push({severity: 'warn', summary: 'Info', detail: "La hora final no debe ser menor a la hora de inico."});
            this.horaFinal=null;
            validacion=true;
        }else if((this.obtenerFecha(fecha)==this.obtenerFecha(this.restricDateMax)&&
                                                            this.obtenerHora(hrInic) >this.obtenerHora(this.restricDateMax))){
            this.alertService.push({severity: 'warn', summary: 'Info', detail: "La hora Inicio no puede ser mayor a la hora actual"});
            this.spin=false;
            this.horaInicio=null;
            validacion=true;
        }else if((this.obtenerFecha(fecha)==this.obtenerFecha(this.restricDateMax)
                                                            &&this.obtenerHora(hrfn) >this.obtenerHora(this.restricDateMax))){
            this.alertService.push({severity: 'warn', summary: 'Info', detail: "La hora final no puede ser mayor a la hora actual"});
            this.spin=false;
            this.horaFinal=null;
            validacion=true;
        }
        return validacion;
    }

}
