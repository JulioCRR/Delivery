/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.model;

/**
 *
 * @author VI9XXG0
 */
public class DetalleSolicitud {
    
    //detalle
    private String telefono;
    private String region;
    private String estatusDetalle;
    private String codigoDetalle;
    private String fechaEjecucionDetalle;
    private String mensajeDetalle; 
    private String productoDetalle;
    private boolean banderaReproceso;
    
    
    //solicitud producto
    private String usuario;
    private String tipoGrupo;
    private String productoLocal;
    private String productoNacional;
    private String productoExt;
    private int pivote;
    private String serviceOffering;

    
    
    //estatus productos 
    private String estatusProductoLocal;
    private String estatusProductoNacional;
    private String estatusProductoExt;

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getEstatusDetalle() {
        return estatusDetalle;
    }

    public void setEstatusDetalle(String estatusDetalle) {
        this.estatusDetalle = estatusDetalle;
    }

    public String getCodigoDetalle() {
        return codigoDetalle;
    }

    public void setCodigoDetalle(String codigoDetalle) {
        this.codigoDetalle = codigoDetalle;
    }

    public String getFechaEjecucionDetalle() {
        return fechaEjecucionDetalle;
    }

    public void setFechaEjecucionDetalle(String fechaEjecucionDetalle) {
        this.fechaEjecucionDetalle = fechaEjecucionDetalle;
    }

    public String getMensajeDetalle() {
        return mensajeDetalle;
    }

    public void setMensajeDetalle(String mensajeDetalle) {
        this.mensajeDetalle = mensajeDetalle;
    }

    public String getProductoDetalle() {
        return productoDetalle;
    }

    public void setProductoDetalle(String productoDetalle) {
        this.productoDetalle = productoDetalle;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getTipoGrupo() {
        return tipoGrupo;
    }

    public void setTipoGrupo(String tipoGrupo) {
        this.tipoGrupo = tipoGrupo;
    }

    public String getProductoLocal() {
        return productoLocal;
    }

    public void setProductoLocal(String productoLocal) {
        this.productoLocal = productoLocal;
    }

    public String getProductoNacional() {
        return productoNacional;
    }

    public void setProductoNacional(String productoNacional) {
        this.productoNacional = productoNacional;
    }

    public String getProductoExt() {
        return productoExt;
    }

    public void setProductoExt(String productoExt) {
        this.productoExt = productoExt;
    }

   

    public String getServiceOffering() {
        return serviceOffering;
    }

    public void setServiceOffering(String serviceOffering) {
        this.serviceOffering = serviceOffering;
    }

    public String getEstatusProductoLocal() {
        return estatusProductoLocal;
    }

    public void setEstatusProductoLocal(String estatusProductoLocal) {
        this.estatusProductoLocal = estatusProductoLocal;
    }

    public String getEstatusProductoNacional() {
        return estatusProductoNacional;
    }

    public void setEstatusProductoNacional(String estatusProductoNacional) {
        this.estatusProductoNacional = estatusProductoNacional;
    }

    public String getEstatusProductoExt() {
        return estatusProductoExt;
    }

    public void setEstatusProductoExt(String estatusProductoExt) {
        this.estatusProductoExt = estatusProductoExt;
    }
    
    
    public int getPivote() {
        return pivote;
    }

    public void setPivote(int pivote) {
        this.pivote = pivote;
    }

    public boolean isBanderaReproceso() {
        return banderaReproceso;
    }

    public void setBanderaReproceso(boolean banderaReproceso) {
        this.banderaReproceso = banderaReproceso;
    }
    
    
    
}
