import {Component, OnInit,ViewChild} from '@angular/core';
import {AlertService} from '../../alert.service';
import {FormGroup,AbstractControl, FormBuilder, FormControl, Validators,FormsModule,NgForm} from '@angular/forms';
import { M2kInfoRegistro,SearchPetitionService} from '../search-petition.service';
import {SearchPetitionConsultaAbiertaComponent} from '../search-petition-consulta-abierta/search-petition-consulta-abierta.component';
import { SimpleHelp } from '../../help/model/SimpleHelpModel';

@Component({
    selector: 'app-search-petition',
    templateUrl: './search-petition.component.html',
    styleUrls: ['./search-petition.component.css']
})


export class SearchPetitionComponent implements OnInit {

    @ViewChild(SearchPetitionConsultaAbiertaComponent) PetitionDetail:SearchPetitionConsultaAbiertaComponent;
    public idpeticion: string;
    public formBusqueda: FormGroup;
    public formId: FormGroup;
    public infoRegistro: M2kInfoRegistro;
    public spin:boolean;
    public bloqueoTime:boolean;
    public selectPetition: boolean = false;
    public seleCons: SimpleHelp;
    public idAyuda: SimpleHelp;
    public showPetition: boolean;


    idPattern = "\^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}\$";



    constructor(private service: SearchPetitionService, private alertService: AlertService, private fb: FormBuilder) {
                this.cargarAyuda();
                 this.initFormId();
               }

    ngOnInit() {}

    searchPetition() {
        this.spin=true;
        this.showPetition=false;

        delete this.infoRegistro;
        this.service.getInfoRegistroById(this.idpeticion).subscribe(p => {
            this.spin=false;
            this.infoRegistro = p;
        }, (err) => {
            this.spin=false;
            this.alertService.push({severity: 'info', summary: 'Búsqueda', detail: "No se encontraron resultados"});
        });
     }


    initFormId() {
        this.formId =  this.fb.group({
           'idpeticion' : [this.idpeticion,Validators.compose([Validators.required,Validators.pattern(this.idPattern) ])],
        });
        this.formId.valueChanges.subscribe(data => this.onValueChangedId(data));
        this.onValueChangedId();
    }

    onValueChangedId(data?: any) {
        if (!this.formId) { return; }
             const form1 = this.formId;

            for (const field in this.formErrors) {
            // clear previous error message (if any)

                     this.formErrors[field] = '';
                     const control = form1.get(field);

                 if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
         }
    }



    formErrors = {
        'idpeticion' : '',
    };

    validationMessages = {
            'idpeticion': {
             'required': 'El Id es requerido.',
             'pattern': 'La estructura del Id es incorrecta.'
         },
    };


    cleanScreen(){
        this.formId.reset();
        this.showPetition=true;
        this.PetitionDetail.cleanScreen();
    }


    cargarAyuda() {
        this.seleCons = new SimpleHelp('Consulta','Se realiza ingresando el Id de la petición o los parámetros que son obligatorios en la consulta abierta(teléfono, Imei o Cuenta, fecha de Inicio y hora Inicio).');
        this.idAyuda = new SimpleHelp('Id Petición','es el identificador que viene en la respuesta del servicio.');
    }

    detallePeticion() {
        this.showPetition=true;
    }

}
