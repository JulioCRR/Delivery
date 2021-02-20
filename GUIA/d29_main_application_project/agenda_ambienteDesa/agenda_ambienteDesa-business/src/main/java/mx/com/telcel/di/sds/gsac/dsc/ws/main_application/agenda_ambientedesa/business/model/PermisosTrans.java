
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model;


public class PermisosTrans {
    
    
  private String id;
  private String transaccion;

    public PermisosTrans(String transaccion) {
        this.transaccion = transaccion;
    }
  
  
    
    public PermisosTrans() {
    }

   

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTransaccion() {
        return transaccion;
    }

    public void setTransaccion(String transaccion) {
        this.transaccion = transaccion;
    }

   
   

   
}
