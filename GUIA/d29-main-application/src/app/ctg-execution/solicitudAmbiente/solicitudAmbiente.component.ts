import { request } from 'http';
import { Component, OnInit, ElementRef, ViewChild, Pipe, PipeTransform} from '@angular/core';
import { AlertService } from '../../alert.service';
import { endpointServer } from '../../../environments/environment';
import {ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {M2kSolicitudCtg} from '../modelo/M2kSolicitudCtg';
import {SolM2kSolicitudCtg} from '../modelo/SolM2kSolicitudCtg';
import {User} from '../../admin/admin.service';
import {CtgExecutionCommonService, ResponsableUser} from '../ctg-execution.service';
import {Help} from '../help/model/HelpModel';
import {GlobalService} from '../../global.service';

@Component({
  selector: 'app-solicitudAmbiente',
  templateUrl: './solicitudAmbiente.component.html',
  styleUrls: ['./solicitudAmbiente.component.css']
})
export class SolicitudAmbienteComponent implements OnInit {

    private fechaInput: Date;
    private horaInicioInput: Date;
    private horaFinOutput: Date;
    private minDate: Date;
    private maxDate: Date;
    private usuarioInput: String;
    private transaccionInput: String;
    private noTransaccionesInput: number;
    private proyAsociadoInput: String;
    private comentarioInput: String;
    private programaInput: String;
    private solicitud: M2kSolicitudCtg;
    private usuarioSolicitud: User;
    private usuarioResponsable: User;
    private responsableAuth: any;
    private displayConfirmSol: boolean;
    private es: any;
    private errorMessage: any;
    private complexForm : FormGroup;
    private validating: boolean;
    private ayudaNoTrans: Help;
    private ayudaUsr: Help;
    private ayudaProg: Help;
    private ayudaTrans: Help;
    private ayudaHoraInicio: Help;
    private isDataAvailable: boolean;
    responsable: ResponsableUser= new ResponsableUser(
        "",
        ""
      );

    constructor(private alertService: AlertService, private ctgService: CtgExecutionCommonService,
        private fb: FormBuilder, private globalService: GlobalService) {
        this.isDataAvailable = false;

        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }

        this.cargarAyuda();
        this.initForm();
    }

    initForm() {
         this.complexForm = this.fb.group({
            'fechaInput' : [null, Validators.required],
            'horaInicioInput' : [null, Validators.required],
            'horaFinOutput' : [null, Validators.required],
            'usuarioInput' : ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10)])],
            'noTransaccionesInput' : [null, Validators.required],
            'responsableOutput' : [null, null],
            'transaccionInput' : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
            'programaInput' : ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(7)])],
            'correoNotificacionOutput' : [null, null],
            'proyAsociadoInput' : ['', Validators.maxLength(20)],
            'comentarioInput' : ['', Validators.maxLength(250)],
            });
        this.horaFinOutput = null;
        this.complexForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if (!this.complexForm) { return; }
        const form = this.complexForm;

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

    cargarAyuda() {
        this.ayudaUsr = new Help('Usuario Mobile','Usuario registrado en M2K con autoridad para ejecutar el componente en Producción');
        this.ayudaNoTrans = new Help('No. Transacciones','Total de pruebas unitarias para el folio y por cada transacción.');
        this.ayudaTrans = new Help('Transacción','Transacción M2K asignada al componente, p.ej. I*TC');
        this.ayudaProg = new Help('Programa','Nombre del programa en M2K, p.ej. IGTOC65 ');
        this.ayudaHoraInicio = new Help('Restricciones','La hora de Inicio, debe ser MAYOR a la hora actual. Ejemplo: Hora Actual: 15:30, Hora Solicitud debe ser 15:31 y mayores.');
    }

    formErrors = {
            'fechaInput' : '',
            'horaInicioInput' : '',
            'horaFinOutput' : '',
            'usuarioInput' : '',
            'noTransaccionesInput' : '',
            'responsableOutput' : '',
            'transaccionInput' : '',
            'programaInput' : '',
            'correoNotificacionOutput' : '',
            'proyAsociadoInput' : '',
            'comentarioInput' : '',
    };

    validationMessages = {
        'fechaInput': {
        'required': 'Fecha de la Solicitud es REQUERIDA.'
        },
        'horaInicioInput': {
        'required': 'La hora de inicio es REQUERIDA.'
        },
        'horaFinOutput': {
        'required': 'La hora Fin es REQUERIDA (Autogenerado).'
        },
        'usuarioInput' : {
            'required': 'El usuario MOBILE es REQUERIDO.',
            'minlength': 'El usuario MOBILE debe tener al menos 1 caractér.',
            'maxlength': 'El usuario MOBILE debe tener máximo 10 caracteres.'
        },
        'noTransaccionesInput': {
            'required': 'El número de transacciones es REQUERIDO.'
        },
        'responsableOutput': {
        },
        'transaccionInput': {
            'required': 'La TRANSACCIÓN es REQUERIDA.',
            'minlength': 'La TRANSACCIÓN debe tener al menos 4 caracteres.',
            'maxlength': 'La TRANSACCIÓN debe tener máximo 4 caracteres.'
        },
        'programaInput': {
            'required': 'El PROGRAMA es REQUERIDO.',
            'minlength': 'El PROGRAMA debe tener al menos 7 caracteres.',
            'maxlength': 'El PROGRAMA debe tener máximo 7 caracteres.'
        },
        'correoNotificacionOutput': {
        },
        'proyAsociadoInput': {
            'maxlength': 'El PROYECTO ASOCIADO debe tener máximo 20 caracteres.'
        },
        'comentarioInput': {
            'maxlength': 'El COMENTARIO debe tener máximo 250 caracteres.'
        }

    };

    ngOnInit(): void {

        this.displayConfirmSol = false;
        this.minDate = new Date();
        this.maxDate = new Date((new Date(this.minDate)).getTime() + (60*60*24*1000));
        this.validating = false;
        this.usuarioSolicitud = JSON.parse(localStorage.getItem('user_session_data')).user;
        this.responsable.idUsuario=""+this.usuarioSolicitud.id;
        console.log("EL ID DEL USUARIO ES -> "+this.responsable.idUsuario);
        this.ctgService.obtenerResponsable(this.usuarioSolicitud.id).subscribe(
            data => {
                if (data) {
                    this.usuarioResponsable = new User(data.id, data.nempleado, data.nombre, data.apaterno, data.amaterno, data.correo, data.usuarioRed, data.extension);
                    console.log("RESPONSABLE DEL USUARIO ->>>>>>>>>>> "+this.usuarioResponsable.nempleado);
                    this.complexForm.patchValue({
                      'responsableOutput': this.usuarioResponsable.correo
                    });
                }
            },
            err => {console.log(err);this.isDataAvailable = true;},
            () => {
              this.isDataAvailable = true;
              this.complexForm.patchValue({
                'correoNotificacionOutput': this.usuarioSolicitud.correo
              });
            }
        );
    }

    setInputResponsable(nombre:String, aPaterno: String, aMaterno:String, correo: String) {
        $('input[id="responsableOutput"]').val(""+nombre + " " + aPaterno + " " + aMaterno+ " <" + correo + ">");
        this.complexForm.patchValue({
          'responsableOutput': ''+nombre + ' ' + aPaterno + ' ' + aMaterno+ ' <' + correo + '>'
        });
    }

    generarSolicitud() {
        let solicitud = new SolM2kSolicitudCtg(
            0,
            this.complexForm.get('fechaInput').value,
            this.complexForm.get('horaInicioInput').value,
            this.complexForm.get('horaFinOutput').value,
            this.complexForm.get('usuarioInput').value.toUpperCase(),
            this.complexForm.get('noTransaccionesInput').value,
            this.complexForm.get('transaccionInput').value.toUpperCase(),
            this.complexForm.get('proyAsociadoInput').value.toUpperCase(),
            this.complexForm.get('comentarioInput').value.toUpperCase(),
            this.usuarioSolicitud.id,
            this.usuarioResponsable.id,
            'N/A',
            new Date(),
            'INA',
            'P',
            this.complexForm.get('programaInput').value.toUpperCase()
        );

        this.ctgService.guardarSolicitud(solicitud).subscribe(
            data => {this.solicitud = data;
                     this.resetForm();
                     setTimeout(() => this.displayConfirmSol = true, 1000);
                    },
            err => {},
            () => console.log('done')
        );

    }

    resetForm() {

        this.complexForm.reset();
        this.complexForm.markAsUntouched();
        Object.keys(this.complexForm.controls).forEach((name) => {
            let control = this.complexForm.controls[name];
            control.setErrors(null);
        })
        this.ctgService.obtenerResponsable(this.usuarioSolicitud.id).subscribe(
            data => {this.usuarioResponsable = new User(data.id, data.nempleado, data.nombre, data.apaterno, data.amaterno, data.correo, data.usuarioRed, data.extension);
              this.complexForm.patchValue({
                'responsableOutput': this.usuarioResponsable.correo
              });
            },
            err => {console.log(err);},
            () => console.log('done')
        );
        this.usuarioSolicitud = JSON.parse(localStorage.getItem('user_session_data')).user;
        console.log("USUARIO SESSION:", this.usuarioSolicitud);
        $('input[formcontrolname="correoNotificacionOutput"]').val(""+this.usuarioSolicitud.correo);
        this.complexForm.patchValue({
          'correoNotificacionOutput': ''+this.usuarioSolicitud.correo
        });
    }

    actualizarHoraFin() {
		this.complexForm.patchValue({
			'horaFinOutput': new Date(this.complexForm.get('horaInicioInput').value.getTime() + (60*60*1*1000))
		});
    }

    cancelDialog(){
        this.displayConfirmSol = false;
    }

    spinnerOnFocus() {
        console.log("SPINNER ON FOCUS.");
    }

    asignarResp(){
      console.log("SE ENVIARON LOS DATOS DE ASIGNACIÓN, el responsable es -> "+this.responsable.idUsuario +" "+this.responsable.responsable);
      this.ctgService.assignResponsable(this.responsable)
      .pipe(
        catchError(err =>{
          console.log("ERROR -> "+err.status);
          if(err.status=400){
            this.alertService.push({severity:'error',summary:'Error al asignar responsable',detail:'Ocurrio un error al intentar asignar su responsable'});
          }else if(err.status=401){
            this.alertService.push({severity:'error',summary:'Error inesperado',detail:'Ocurrio un error inesperado en el proceso de asignación'});
          }
          return Observable.throw(err.status);
        })
      )
      .subscribe(()=>{

        this.responsable=new ResponsableUser(
          "",
          ""
        );
        this.alertService.push({severity: 'info', summary: 'Asignación exitosa', detail: "El responsable fue asignado satisfactoriamente"});
        console.log("FINALIZANDO METODO DE ASIGNACIÓN DE RESPONSABLE");
      });
    }

    cnlcel(){

    }
}
