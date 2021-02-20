import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ImageHelp} from '../model/ImageHelpModel';

@Component({
  selector: 'image-help',
  templateUrl: './image_help.component.html',
  styleUrls: ['./image_help.component.css']
})
export class ImageHelpComponent implements OnInit {
    
    @Input() ayuda: ImageHelp;
    private displayFormHelp: boolean;
    private imagenes: any[]=[];

    constructor() {
    }

    ngOnInit(): void {
        this.displayFormHelp = false;
    }

    cargarAyuda() {
        this.imagenes=[];
        this.imagenes.push(this.ayuda);
        this.displayFormHelp = true;
    }

    cancelDialog() {
        this.displayFormHelp = false;
    }

}