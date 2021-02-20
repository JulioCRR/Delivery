import {Component, OnInit, SimpleChanges} from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common'
import {AuthService} from '../../app.service';
import { User, CoreService, ModuleUser, Profile } from '../core.service';
import { reduce } from 'rxjs/operator/reduce';
import { AlertService } from 'app/alert.service';
import { Help } from 'app/core/core.service';
import { CoreModule } from 'app/core/core.module';
import { GlobalService } from 'app/global.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { catchError } from 'rxjs/operators';
import { SimpleHelp } from '../../help/model/SimpleHelpModel';


declare var jQuery: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    error: any;
    profiles: Response[];
    areas: Response[];
    puestos : Response[];
    oficinas: Response[];
    private ayudaName:SimpleHelp;
    private ayudaSurNameP:SimpleHelp;
    private ayudaSurNameM:SimpleHelp;
    private ayudaNemp:SimpleHelp;
    private ayudaMail:SimpleHelp;
    private ayudaUsuarioRed:SimpleHelp;
    private ayudaExt:SimpleHelp;
    private ayudaArea:SimpleHelp;
    private ayudaOfice:SimpleHelp;
    private ayudaPuesto:SimpleHelp;
    private ayudaPass:SimpleHelp;
    private ayudaPass2:SimpleHelp;
    private ayudaResp:SimpleHelp;
    private ayudaModule:SimpleHelp;
    private ayudaJustif:SimpleHelp;
    public mail:boolean;
    public modulos:any[]=[];

    user: User = new User(
      null,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
  );
  modulo:ModuleUser=new ModuleUser(
    null,
    null,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  )

    constructor(
      public authService: AuthService,
      public router: Router,
      public location: Location,
      public service: CoreService,
      public alertService: AlertService,
      public globalService:GlobalService
      ) {

    }


    ngOnInit() {
        this.authService.logout();
        document.getElementById('envioEmail').style.display='none';
        this.cargarAyuda();

    }

    login() {

        this.loading = true;
        this.authService.login(this.model.username, this.model.password).subscribe(() => {
            this.loading = false;
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = '/admin';

                // Set our navigation extras object
                // that passes on our global query params and fragment
                let navigationExtras: NavigationExtras = {
                    queryParamsHandling: 'preserve',
                    preserveFragment: true
                };

                // Redirect the user
                this.router.navigate([redirect], navigationExtras);
            }
        },
            error => {
                this.loading = false;
                this.error = error;
            },
            () => console.log("Done"));

    }

    logout() {
        this.authService.logout();
    }

    clearUser() {
      this.modulo = new ModuleUser(
        null,
        null,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      );
  }

  validatePassword(){
    if(this.modulo.password === this.user.password){
      document.getElementById('pswd2').focus;
      document.getElementById('pswd2').style.borderRadius="8px";
      document.getElementById('pswd2').style.border = "4px solid #4CAF50" ;
    }else{
      document.getElementById('pswd2').focus;
      document.getElementById('pswd2').style.borderRadius="8px";
      document.getElementById('pswd2').style.border = "4px solid #E23237" ;
    }
  }


  /*validateManager(){
    if(this.modulo.puesto=='2952'){//2952 nuevo id de gerente
      this.modulo.responsable="mail@mail.com";
      document.getElementById('respon').removeAttribute('required');
      document.getElementById('responD').style.display='none';
    }else if(this.modulo.puesto!='2952'){
      this.modulo.responsable="";
      document.getElementById('respon').setAttribute('required','true');
      document.getElementById('responD').style.display='block';
    }
  }*/


  /*sendMail(){
    let name=this.modulo.nombre+" "+this.modulo.aPaterno+" "+this.modulo.aMaterno;
    let cadena=this.modulo.responsable+"|"+name;
    this.service.sendMail(cadena)
    .pipe(
      catchError(err =>{
        console.log("Asignación de alerta según return");
        if(err.status=406){
          this.alertService.push({severity:'error', summary: 'Error con email', detail: 'Ah surgido un error al enviar mail al usuario responsable'});
        }else{
          this.alertService.push({severity: 'error', summary: 'Error Inesperado', detail: 'Ah surgido un error inesperado, intentalo nuevamente'});
        }
        return Observable.throw(err.status);
      })
    )
    .subscribe(()=>{
      this.alertService.push({ severity: 'info', summary: 'Envio de email exitoso', detail: "El se envió correctamente al responsable a su cargo"});
      document.getElementById('registro').style.display='block';
      document.getElementById('envioEmail').style.display='none';
      this.modulo = new ModuleUser(
        null,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      );
    });
  }*/


  saveUser(){
    //let correo=this.modulo.responsable;
    this.alertService.push({severity: 'info', summary: 'Ejecutando...', detail: "Comenzando registro, espera un momento"});
    this.modulo.modulos=this.modulos;
    this.service.saveUser(this.modulo)
    .pipe(
      catchError(err =>{
        console.log("ERROR -> "+err.status);
        if(err.status==428){
          document.getElementById('registro').style.display='none';
          document.getElementById('envioEmail').style.display='block';
          //this.modulo.responsable=correo;
          document.getElementById('regModal').click();
      }else if(err.status==423){
        this.alertService.push({severity:'warn',summary:'Usuario Incorrecto',detail:'El número de empleado que se intenta registrár no es valido, favor de revisar'});
      }else if(err.status==422){
        this.alertService.push({severity:'warn',summary:'Usuario Existente',detail:'El usuario que se intenta registrar ya existe en el sistema'});
      }else if(err.status==406){
        this.alertService.push({severity:'error',summary:'Error con email',detail:'Ah surgido un error al enviar mail al usuario responsable'});
      }else if(err.status==409){
        this.alertService.push({severity:'error',summary:'Error al registrar',detail:'Ah surgido un error al intentar registrar al usuario, intentelo nuevamente'});
      }
        return Observable.throw(err.status);
      })
    )
    .subscribe(() => {
      this.modulo = new ModuleUser(
        null,
        null,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      );

      this.alertService.push({severity: 'info', summary: 'Registro exitoso', detail: "El usuario fue registrado satisfactoriamente"});
      console.log("FINALIZANDO METODO DE GUARDAR USUARIO NUEVO");
    })
    document.getElementById('registro').style.display='block';
    document.getElementById('envioEmail').style.display='none';
  }

  chargeModules(){
    this.service.getModules().subscribe(res=>this.profiles=res.json());
    this.service.getAreas().subscribe(res=>this.areas=res.json());
    this.service.getPuestos().subscribe(res => this.puestos = res.json());
    this.service.getOficinas().subscribe(res => this.oficinas = res.json());
  }

  cargarAyuda(){
    this.ayudaArea=new SimpleHelp('Área laboral','Área en la que se encuentra laborando, p.ej. SISTEMAS CORPORATIVOS');
    this.ayudaNemp=new SimpleHelp('Número de Empleado','Número que la empresa le asignó p.ej. EX385040');
    this.ayudaName=new SimpleHelp('Nombre','Nombre completo del usuario');
    this.ayudaSurNameP=new SimpleHelp('Apellido Paterno','Apellido paterno del usuario a registrar');
    this.ayudaSurNameM=new SimpleHelp('Apellido Materno','Apellido materno del usuario a registrar');
    this.ayudaMail=new SimpleHelp('Email','Correo electronico empresarial');
    this.ayudaUsuarioRed= new SimpleHelp('Usuario de Red','Usuario proporcionado por la empresa que inivia con la letra V');
    this.ayudaExt=new SimpleHelp('Extensión','Número de extensión telefónico que pertenece al usuario a registrar');
    this.ayudaOfice=new SimpleHelp('Oficína','Ubicación de la oficina en la que labora el usuario a regidstrar');
    this.ayudaPuesto=new SimpleHelp('Puesto','Puesto que ejerce el usuario dentro de la empresa');
    this.ayudaPass=new SimpleHelp('Contraseña','Contraseña que utiliza en la empresa para la gestión de sus aplicativos (correo, oficina de arquitectura, etc...)');
    this.ayudaPass2=new SimpleHelp('Confirmación de contraseña','Validación de que las contraseñas coincidan para poder proceder');
    //this.ayudaResp=new SimpleHelp('Responsable','Correo electronico del usuario responsable del usuario a registrar (jefe directo)');
    this.ayudaModule=new SimpleHelp('Modulo','Modulo(s) a los que se desea tener acceso');
    this.ayudaJustif=new SimpleHelp('Justificación','Aclaración por la cual se desea accesar al modulo o modulos seleccionados');
  }

  clearMail(){
    this.modulo = new ModuleUser(
      null,
      null,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    );
    document.getElementById('registro').style.display='block';
    document.getElementById('envioEmail').style.display='none';
  }

}
