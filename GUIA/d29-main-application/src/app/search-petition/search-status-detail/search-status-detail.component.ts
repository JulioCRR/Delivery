import { Component, OnInit,Input,HostListener } from '@angular/core';
import { D29EstatusFront } from '../modelo/D29EstatusFront';
import { DetallesEiComponent } from 'app/soporte-bg/detalles-ei/detalles-ei.component';





@Component({
  selector: 'app-search-status-detail',
  templateUrl: './search-status-detail.component.html',
  styleUrls: ['./search-status-detail.component.css'],
  providers: []
})
export class SearchStatusDetailComponent implements OnInit {


  @Input() infoEstatus: D29EstatusFront[]=[];
  private displayDetail: boolean;
  detail:D29EstatusFront []=[];




  constructor( ) { }

  ngOnInit() {
    this.displayDetail = false;
  }

  onProcessDetailSelected1(event: any) {
    this.detail = event.data;
    this.displayDetail=true;

  }

  cancelDialog(){
    this.displayDetail = false;
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.displayDetail = false;
    }
  }


}
