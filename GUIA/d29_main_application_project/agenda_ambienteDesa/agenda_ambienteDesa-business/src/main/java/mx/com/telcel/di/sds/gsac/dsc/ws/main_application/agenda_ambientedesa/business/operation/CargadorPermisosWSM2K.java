
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.operation;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;

import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.Repository.AgendaServicesImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.ValidadorTiempo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.PermisosDesarrolloWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.AgendaDesarrolloWSM2K;
import org.joda.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;




public class CargadorPermisosWSM2K {
    
    private static final Logger LOG = LoggerFactory.getLogger(CargadorPermisosWSM2K.class);
    
    private static String archivoPermisoDesa;
  
    @Autowired
    private AgendaServicesImp agendaImp;
    
    @Autowired
    private UploadFileFtp uploadFile;
    
    private int turno=1;
   
   
    void cargaInicialPermisos(){
        this.getArchivoPermisoDesa();
    }
    

    public void inciarproceso() throws ParseException {
        ValidadorTiempo val=new ValidadorTiempo();
        PermisosDesarrolloWSM2K permiso = null;
        List<PermisosDesarrolloWSM2K> listPermisos = new ArrayList<>();
        ManipuladorProperties mn = new ManipuladorProperties();
        
        int validacion=1;
        if(val.validarHoraSolicitud()==4){
            validacion=0;
        }
        agendaImp.validarEstatus(validacion);
        String tNow=LocalDateTime.now().toString("dd/MM/yyyy hh:mm:ss a");
        if(tNow.contains("PM")){
            turno=val.validarHoraSolicitud();
        }
        LOG.info("TURNO: "+turno);
        List<AgendaDesarrolloWSM2K> agenda = agendaImp.buscarAgendaPermisos(turno);
        if (agenda.size() > 0 && agenda != null) {
            for (AgendaDesarrolloWSM2K permisosDB : agenda) {
                for (int i = 0; i < permisosDB.getPermisos().size(); i++) {
                    permiso = new PermisosDesarrolloWSM2K(permisosDB.getUsuarioDesa()+"_"+ 
                                               permisosDB.getPermisos().get(i).getIpDesa(),
                                           permisosDB.getPermisos().get(i).getTransDesa());
                    listPermisos.add(permiso);
                }
            }
          } 
            if (archivoPermisoDesa != null) {
                //se extre las Ip's del equipo WS
                if (mn.getIpCVS(archivoPermisoDesa).size() > 0) {
                    for (String ipsDesa : mn.getIpCVS(archivoPermisoDesa)) {
                        permiso = new PermisosDesarrolloWSM2K("*_"+ipsDesa, "*");
                        listPermisos.add(permiso);
                    }
                }

            }else {
                LOG.error("NO SE ENCONTRO EL ARCHIVO: " + archivoPermisoDesa);
            }
       
        try {
            uploadFile.uploadPropertiesDesa(listPermisos);
        } catch (IOException ex) {
            LOG.error("ERRRO: " + ex.getMessage());
        }

        
    }
            
  
    public String getArchivoPermisoDesa() {
        return archivoPermisoDesa;
    }

    public void setArchivoPermisoDesa(String archivoPermisoDesa) {
        CargadorPermisosWSM2K.archivoPermisoDesa = archivoPermisoDesa;
    }  
}
