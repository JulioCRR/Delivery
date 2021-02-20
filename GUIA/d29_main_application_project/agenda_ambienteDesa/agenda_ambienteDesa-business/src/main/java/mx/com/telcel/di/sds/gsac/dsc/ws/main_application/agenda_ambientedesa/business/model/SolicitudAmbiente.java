
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model;

import java.util.Date;


public class SolicitudAmbiente {
    
      private int folio;
      private int user;
      private String userMail;
      private String nomProyect;
      private Date fechaInicio;
      private Date fechaFinal;
      private PermisosIp permisosIp[]; 
      private PermisosTrans permisosTrans[]; 
      private int dias;
      private String comentarios;
      private String usuario;
      private int turno;
      private String nomUser;
      
    public int getTurno() {
        return turno;
    }

    public void setTurno(int turno) {
        this.turno = turno;
    }
      
      

    public int getFolio() {
        return folio;
    }

    public void setFolio(int folio) {
        this.folio = folio;
    }

   
      

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public String getNomProyect() {
        return nomProyect;
    }

    public void setNomProyect(String nomProyect) {
        this.nomProyect = nomProyect;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

   
  

    public Date getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(Date fechaFinal) {
        this.fechaFinal = fechaFinal;
    }


   

    public int getDias() {
        return dias;
    }

    public void setDias(int dias) {
        this.dias = dias;
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public PermisosIp[] getPermisosIp() {
        return permisosIp;
    }

    public void setPermisosIp(PermisosIp[] permisosIp) {
        this.permisosIp = permisosIp;
    }

    public PermisosTrans[] getPermisosTrans() {
        return permisosTrans;
    }

    public void setPermisosTrans(PermisosTrans[] permisosTrans) {
        this.permisosTrans = permisosTrans;
    }
    
    public String getNomUser() {
        return nomUser;
    }

    public void setNomUser(String nomUser) {
        this.nomUser = nomUser;
    }

   

  
    
    

    
   
}
