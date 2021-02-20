import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { endpointServer } from 'environments/environment';
import {ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Help} from '../help/model/HelpModel';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-encryption-help',
  templateUrl: './encryption_help.component.html',
  styleUrls: ['./encryption_help.component.css']
})
export class HelpComponent implements OnInit {

  @Input() ayuda: Help;
  private  subscription: Subscription;
  public   displayFormHelp: boolean;
  private valoresAyuda: Help[]=[];
constructor() { }

ngOnInit(): void {
  this.displayFormHelp = false;
}

cargarAyuda() {
  this.valoresAyuda=[];
  this.valoresAyuda.push(this.ayuda);
  this.displayFormHelp = true;
  }

cancelDialog() {
  this.displayFormHelp = false;
}

setValoresAyuda(ayuda: Help[]) {
  this.valoresAyuda = ayuda;
  }
}



