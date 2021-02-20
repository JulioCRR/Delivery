import { request } from 'http';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { endpointServer } from '../../../environments/environment';
import {ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Help} from '../help/model/HelpModel';
import { Subscription } from 'rxjs/Subscription';
import {CtgExecutionCommonService} from '../ctg-execution.service';

@Component({
  selector: 'app-ctg-help',
  templateUrl: './ctg_help.component.html',
  styleUrls: ['./ctg_help.component.css']
})
export class CtgHelpComponent implements OnInit {
    
    //@Input() clave: string;
    //@Input() valor: string;
    @Input() ayuda: Help;
    private subscription: Subscription;
    private displayFormHelp: boolean;
    private valoresAyuda: Help[]=[];

    constructor(private ctgExecutionCommonService: CtgExecutionCommonService) {
        //this.subscription = this.ctgExecutionCommonService.notifyObservable$.subscribe((res) => {            
        //    if (res.hasOwnProperty('option') && res.option === 'setValoresAyuda') {
        //        this.setValoresAyuda(res.value);
        //    }
        //});
    }

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