import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {EncryptionCredentialService} from '../encryption-credential.service';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {AlertService} from '../../alert.service';
import {endpointServer} from '../../../environments/environment';
import { SelectItem } from 'primeng/primeng';
import {Help} from '../help/model/HelpModel';
import {GlobalService} from '../../global.service';






@Component({
    selector: 'app-encryption-validate',
    templateUrl: './encryption-validate.component.html',
    styleUrls: ['./encryption-validate.component.css']
})
export class EncryptionValidateComponent implements OnInit {
    private claveV: string;
    private usuarioV: string;
    private folioV: string;
    private signatureV: string;
    public usuarioM2k: String;
    public regionM2k: SelectItem[];
    public selectOption: any;
    private prodEnvChecked: boolean = false;
    private enviromentSelected: string;
    public ayudaUsr: Help;
    public ayudaClave: Help;
    public ayudaFolio: Help;
    public ayudaSignature: Help;
    public ayudaRegion: Help;
    public validateForm: FormGroup;

    constructor(private service: EncryptionCredentialService,
        private alertService: AlertService,
        private fb: FormBuilder, private globalService: GlobalService) {}

    ngOnInit() {
        this.validateForm = this.fb.group({
            'clave': new FormControl('', Validators.required),
            'folio': new FormControl('', Validators.required),
            'signature': new FormControl('', Validators.required),
            'usuarioM2k' : new FormControl ('', Validators.required),
            'regionM2k': new FormControl ('', Validators.required)
        });

        this.cargarAyuda();

        if (this.prodEnvChecked == true) {
          this.enviromentSelected = "Producción";
        } else {
          this.enviromentSelected = "Desarrollo";
        }

        this.regionM2k = [
          {label: 'R01', value: 'R01'},
          {label: 'R02', value: 'R02'},
          {label: 'R03', value: 'R03'},
          {label: 'R04', value: 'R04'},
          {label: 'R05', value: 'R05'},
          {label: 'R06', value: 'R06'},
          {label: 'R07', value: 'R07'},
          {label: 'R08', value: 'R08'},
          {label: 'R09', value: 'R09'},
      ];

      this.selectOption = 1;

    }

    validateCredential() {
      this.service.validateCredntial(this.validateForm.value).subscribe((p) => {
        if(p.json.message){
            this.alertService.push({severity: 'error', summary: 'Mobile2000', detail: p.json.message});
          } else {
            console.log(p.json.value);

          if (p.json.value) {
              this.alertService.push({severity: 'success', summary: 'Credenciales válidas', detail: "Las credenciales fueron generadas de una fuente confiable"});
          } else {
              this.alertService.push({severity: 'warn', summary: 'Credenciales inválidas', detail: "Los datos introducidos son apócrifos"});
          }
        }

      });
    }

    checkSession() {

    }

    cargarAyuda() {
      this.ayudaUsr = new Help('Usuario Mobile','Usuario registrado en M2K con autoridad para ejecutar el componente en Producción.');
      this.ayudaClave = new Help('Clave','Contraseña encriptada: Cadena de caracteres generada en el PDF a un lado de la etiqueta Clave.');
      this.ayudaFolio = new Help('Folio','Folio de Solicitud: Cadena de caracteres generada en el PDF a un lado de la etiqueta Folio.');
      this.ayudaSignature = new Help('Signature','Firma de seguridad: Cadena de caracteres generada en el PDF bajo la etiqueta Signature.');
      this.ayudaRegion = new Help('Region','Opciones de region: Cambio de region operativo a nivel nacional.');

  }



    removeBreakLine(event) {

        if (this.validateForm.controls['signature'].value != undefined) {
            this.validateForm.controls['signature'].patchValue(this.validateForm.controls['signature'].value.replace(/(\r?\n|\r)/gm, "").replace(" ", ""));
        }

    }

    cambioRegion() {
      console.log(this.validateForm.controls['regionM2k'].value);
    }

    formErrors = {
      'programaInput' : '',
      'transaccionInput' : '',
      'cadenaIgtocInput' : '',
      'usuarioM2k' : '',
      'regionM2k':'',
    };

    validationMessages = {
      'usuarioM2k' : {
      'required': 'El usuario MOBILE es REQUERIDO.',
      'minlength': 'El usuario MOBILE debe tener al menos 1 caractér.',
      'maxlength': 'El usuario MOBILE debe tener máximo 10 caracteres.',

    },
      'regionM2k' : {
      'required': 'Cambio de region.',
  },


};





}


