import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {Message, LazyLoadEvent} from 'primeng/primeng';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {MonitorWsm2kService, Incidencia, IncidenciaPaginator} from '../monitor-wsm2k.service';
declare var jQuery: any;

@Component({
  selector: 'app-administracion-monitoreo',
  templateUrl: './administracion-monitoreo.component.html',
  styleUrls: ['./administracion-monitoreo.component.css']
})
export class AdministracionMonitoreoComponent implements OnInit {
  
  textSearch: string = "";
  operacionIncidencia: string = "Agregar";
  incidencias: Incidencia[];
  incidencia: Incidencia = new Incidencia(0,"",0,0,"","");


  constructor(private http: Http,private service: MonitorWsm2kService) {
  }

  ngOnInit(): void {
      //this.service.getAllIncidencias().subscribe((p) => { this.incidencias = p; });
      this.service.getIncidencias().subscribe((p) => { this.incidencias = p; });
  }

  guardaIncidencia() {
    this.service.guardaIncidencia(this.incidencia).subscribe(() => {
                
    //this.refreshData(this.page);
    jQuery('#agregarModal').modal("hide");
    });
}

procesaIncidencia(){
    if(this.operacionIncidencia == "Agregar"  ){
        this.service.guardaIncidencia(this.incidencia).subscribe(() => {
            
        //this.refreshData(this.page);
        jQuery('#agregarModal').modal("hide");
        });        
    }
    else{
        this.service.actualizaIncidencia(this.incidencia).subscribe(() => {
            
        //this.refreshData(this.page);
        jQuery('#agregarModal').modal("hide");
        });
    }
}


        refreshIncidents() {
            this.service.buscaIncidenciasPorMensaje(this.textSearch).subscribe((p) => {
                this.incidencias = p; 
            });
        }
    
        filterSearch() {
            this.refreshIncidents();
        }
 
  
  loadLazyData(event: LazyLoadEvent) {

    this.service.getAllIncidencias().subscribe((p) => { this.incidencias = p; });   

}

refreshData(page) {
 
  this.service.getAllIncidencias().subscribe((p) => { this.incidencias = p;});   
 
}

selectIncident(incidentSelected) {
    this.incidencia = incidentSelected;
    this.operacionIncidencia= "Modificar";
}

agregar(){
    this.operacionIncidencia= "Agregar";
    this.incidencia=new Incidencia(0,"",0,0,"","");
}

}
