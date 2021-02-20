import {Component, OnInit} from '@angular/core';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {AlertService} from '../../alert.service';
import {endpointServer} from '../../../environments/environment';
import {Help} from '../help/model/HelpModel';



@Component({
    selector: 'app-encryption',
    templateUrl: './encryption.component.html',
    styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {
    private password: string;
    public ayudaPasswordM2k: Help;
    public loading: boolean;
    private generateForm: FormGroup;

    constructor(private alertService: AlertService, private fb: FormBuilder) {}

    ngOnInit() {

        this.generateForm = this.fb.group({
            'password': new FormControl ('', Validators.required,Validators.maxLength[8]),
        });

        this.cargarAyuda();
        this.loading=true;

        if(!this.generateCredential){
          alert("error en el servidor");
        }else{
          this.loading=false;
        }
    }
    generateCredential() {
        openWindowWithPostRequest(endpointServer.basePath + '/rest/generate-token-pdf/', this.generateForm.controls['password'].value);
    }

    cargarAyuda() {
      this.ayudaPasswordM2k = new Help('Contraseña Mobile','Contraseña registrado en M2K con autoridad para ejecutar el componente en Producción');
    }
}

function openWindowWithPostRequest(endpoint, password) {
    var winName = 'MyWindow';
    var winURL = endpoint;
    var windowoption = 'resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1';
    var params = {'password': password};
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", winURL);
    form.setAttribute("target", winName);
    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = params[i];
            form.appendChild(input);
        }
    }
    document.body.appendChild(form);
    window.open('', winName, windowoption);
    form.target = winName;
    form.submit();
    document.body.removeChild(form);
}



