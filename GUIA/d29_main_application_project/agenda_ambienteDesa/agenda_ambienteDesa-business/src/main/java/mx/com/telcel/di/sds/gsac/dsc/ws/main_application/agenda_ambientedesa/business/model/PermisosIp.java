
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model;


public class PermisosIp {
    
    
  private String id;
  private String ip;

    public PermisosIp( String ip) {
      
        this.ip = ip;
    }


    
    public PermisosIp() {
    }

   

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

   

   
}
