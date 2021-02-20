/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.operation;

import java.util.ArrayList;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model.DetalleSolicitud;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model.SolicitudEI;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.dao.EquipoIlimitadoDAO;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.DetalleEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.DetalleStatusProductosEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.SolicitudEIEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.SolicitudProductoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author VI9XXG0
 */
@Service
public class ReporteadorSolicitud {
    
    @Autowired
    private EquipoIlimitadoDAO dao; 
    
    public List<SolicitudEI> consultaSolicitudesPorTelefono(String telefono){
        List<Integer> idSolicitudes=dao.consultaPorTelefono(telefono);
        List<SolicitudEI> solicitudes=new ArrayList();
        if(idSolicitudes.size() > 0 ){
            List<SolicitudEIEntity> solicitudesEntity = dao.consultaSolicitudes(idSolicitudes);
            UtilParser parser=new UtilParser();
            solicitudes=parser.parseSolicitudEI(solicitudesEntity);
        }
        
        return solicitudes;
    }
    
    public List<DetalleSolicitud> consultaDetallesSolicitud(Integer idSolicitud,String telefono,String estatusSolicitud){
        List<DetalleEntity> detalle=dao.consultaDetalleSolicitud(idSolicitud, telefono);
        List<SolicitudProductoEntity> solicitudProducto=dao.consultaSolicitudProducto(idSolicitud);
        List<DetalleStatusProductosEntity> estatusProductos=dao.consultaDetalleStatusProductos(idSolicitud, telefono);
        UtilParser parser=new UtilParser();
        DetalleSolicitud detalleResponse=parser.concentraDetalle(detalle,solicitudProducto,estatusProductos,estatusSolicitud);
        List<DetalleSolicitud> detalles=new ArrayList();
        detalles.add(detalleResponse);
        return detalles;
    }
    
    
    
}
