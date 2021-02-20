/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.operation;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.dao.EquipoIlimitadoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author VI9XXG0
 */
@Service
public class AdministradorReproceso {
    
    @Autowired
    private EquipoIlimitadoDAO dao;
    
    private static final String PENDIENTE="PE";
    
    public String actualizaSolicitudParaReproceso(int idSolicitud,String telefono){
        
        boolean resultadoSolicitud=dao.actualizaEstatusSolicitud(idSolicitud, PENDIENTE);
        boolean resultadoDetalle=dao.actualizaEstatusDetalle(idSolicitud, telefono, PENDIENTE);
        if(resultadoSolicitud && resultadoDetalle){
            return "Actualización exitosa para reproceso";
        }
        return "Ocurrio un error en la actualización";
    }
    
}
