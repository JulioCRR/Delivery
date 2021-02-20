import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SimpleHelp} from '../model/SimpleHelpModel';

@Component({
  selector: 'simple-help',
  templateUrl: './simple_help.component.html',
  styleUrls: ['./simple_help.component.css']
})
export class SimpleHelpComponent implements OnInit {
    
    @Input() ayuda: SimpleHelp;
    private displayFormHelp: boolean;
    private valoresAyuda: SimpleHelp[]=[];

    constructor() {
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

    setValoresAyuda(ayuda: SimpleHelp[]) {
        this.valoresAyuda = ayuda;
    }

}