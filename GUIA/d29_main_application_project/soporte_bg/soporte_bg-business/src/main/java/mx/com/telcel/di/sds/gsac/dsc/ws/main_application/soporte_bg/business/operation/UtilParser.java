/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.operation;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model.DetalleSolicitud;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model.HistoricoMovimiento;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model.SolicitudEI;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.services.BG_EI_Services;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.DetalleEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.DetalleStatusProductosEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.HistoricoMovimientosEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.SolicitudEIEntity;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.db.entites.SolicitudProductoEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 *
 * @author VI9XXG0
 */
public class UtilParser {
    
    private static final String EXITO="EX";
    private static final String ERROR="ER";
    
    private static final Logger LOG = LoggerFactory.getLogger(UtilParser.class);
    
    public DetalleSolicitud concentraDetalle(List<DetalleEntity> detalles,
                                             List<SolicitudProductoEntity> solicitudes,
                                             List<DetalleStatusProductosEntity> estatusProductos,
                                             String estatusSolicitud){
        DetalleSolicitud detalle=new DetalleSolicitud();
        
        //detalle solicitud
        if( detalles != null && detalles.size()>0 ){
            detalle.setTelefono(detalles.get(0).getTelefono() );
            detalle.setRegion(detalles.get(0).getRegion() );
            detalle.setEstatusDetalle(detalles.get(0).getEstatus() );
            detalle.setCodigoDetalle(detalles.get(0).getCodigo() );
            if(detalles.get(0).getFechaEjecucion() != null){
                detalle.setFechaEjecucionDetalle(detalles.get(0).getFechaEjecucion().toString() );
            }
            detalle.setMensajeDetalle(detalles.get(0).getMensaje() );
            detalle.setProductoDetalle(detalles.get(0).getProducto() );
            LOG.info("solicitud,detalle: "+estatusSolicitud+","+detalles.get(0).getEstatus());
            if( estatusSolicitud.equals(EXITO) || estatusSolicitud.equals(ERROR) ||
                detalles.get(0).getEstatus().equals(EXITO) || detalles.get(0).getEstatus().equals(ERROR) ){
                detalle.setBanderaReproceso(false);
                
            }
            else{
                detalle.setBanderaReproceso(true);
                
            }
        }
        
        //solicitud producto
        if( solicitudes!=null && solicitudes.size()>0 ){
            detalle.setUsuario(solicitudes.get(0).getUsuario() );
            detalle.setTipoGrupo(solicitudes.get(0).getTipoGrupo() );
            detalle.setProductoLocal(solicitudes.get(0).getProductoLocal() );
            detalle.setProductoNacional(solicitudes.get(0).getProductoNacional() );
            detalle.setProductoExt(solicitudes.get(0).getProductoExt() );
            detalle.setPivote(solicitudes.get(0).getPivote() );
            detalle.setServiceOffering(solicitudes.get(0).getServiceOffering() );
        }
        
        //estatus productos
        if( estatusProductos!=null & estatusProductos.size() >0 ){
            detalle.setEstatusProductoLocal(estatusProductos.get(0).getEstatusProductoLocal() );
            detalle.setEstatusProductoNacional(estatusProductos.get(0).getEstatusProductoNacional() );
            detalle.setEstatusProductoExt(estatusProductos.get(0).getEstatusProductoExt() );
        }
        
       
        
        return detalle;
    }
    
    
    public List<SolicitudEI> parseSolicitudEI(List<SolicitudEIEntity> solicitudesEntity){
        List<SolicitudEI> solicitudes=new ArrayList();
        Iterator<SolicitudEIEntity> iterator=solicitudesEntity.iterator();
        SolicitudEI solicitud;
        SolicitudEIEntity entity;
        while( iterator.hasNext() ){
            entity=iterator.next();
            solicitud=new SolicitudEI();
            solicitud.setIdSolicitud( entity.getIdSolicitud() );
            solicitud.setTramite(entity.getTramite()  );
            solicitud.setGrupoNacional( entity.getGrupoNacional() );
            solicitud.setTipo( ""+entity.getTipo()+"" );
            solicitud.setEstatus(entity.getEstatus());
            solicitud.setAplicacion( ""+entity.getAplicacion()+"" );
            solicitud.setMensaje( entity.getMensaje() );
            if( entity.getFechaIngreso() != null ){
                solicitud.setFechaIngreso( entity.getFechaIngreso().toString() );
            }
            if( entity.getFechaEjecucion() != null ){
                solicitud.setFechaEjecucion( entity.getFechaEjecucion().toString() );
            }
            
            
            solicitud.setEnvioRespuesta( entity.getEnvioRespuesta() );
            solicitud.setIdComudidad( entity.getIdComudidad() );
            solicitudes.add(solicitud);
        }
        return solicitudes;
    }
    
    
    public List<HistoricoMovimiento> parseHistoricoMovimiento(List<HistoricoMovimientosEntity> movimientosEntity){
        List<HistoricoMovimiento> movimientos=new ArrayList();
        Iterator<HistoricoMovimientosEntity> iterator=movimientosEntity.iterator();
        HistoricoMovimiento movimiento;
        HistoricoMovimientosEntity entity;
        while( iterator.hasNext() ){
            entity=iterator.next();
            movimiento=new HistoricoMovimiento();
            movimiento.setId( entity.getId() );
            movimiento.setIdSolicitud( entity.getIdSolicitud() );
            movimiento.setTelefono(entity.getTelefono() );
            movimiento.setRegion(entity.getRegion() );
            movimiento.setConsecutivo(entity.getConsecutivo() );
            movimiento.setEstatus(entity.getEstatus() );
            movimiento.setMensaje(entity.getMensaje() );
            movimiento.setFechaEjecucion(entity.getFechaEjecucion().toString() );
            movimiento.setGrupoNacional(entity.getGrupoNacional() );
            movimiento.setProducto(entity.getProducto() );
            movimiento.setTipo(entity.getTipo() );
            movimiento.setPivote(entity.getPivote() );
            movimiento.setIdPeticion(entity.getIdPeticion());
            movimientos.add(movimiento);
        }
        return movimientos;
    }
    
    
}
