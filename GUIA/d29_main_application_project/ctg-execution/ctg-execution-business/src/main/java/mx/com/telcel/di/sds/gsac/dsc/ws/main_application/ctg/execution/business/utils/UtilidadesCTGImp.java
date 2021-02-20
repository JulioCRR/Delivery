/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils;

import com.ibm.ctg.client.ECIRequest;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
public class UtilidadesCTGImp {
    
    private ECIRequest req;
    private String respuestaCTG;
    private String respuestaXML;
    private String cadenaEnviadaCTG;
    private String mensajeValidacion;

    public String getCadenaEnviadaCTG()
    {
      return this.cadenaEnviadaCTG;
    }

    public void setCadenaEnviadaCTG(String cadenaEnviadaCTG)
    {
      this.cadenaEnviadaCTG = cadenaEnviadaCTG;
    }

    public ECIRequest getReq()
    {
      return this.req;
    }

    public void setReq(ECIRequest req)
    {
      this.req = req;
    }

    public String getRespuestaCTG()
    {
      return this.respuestaCTG;
    }

    public void setRespuestaCTG(String respuestaCTG)
    {
      this.respuestaCTG = respuestaCTG;
    }

    public String getRespuestaXML()
    {
      return this.respuestaXML;
    }

    public void setRespuestaXML(String respuestaXML)
    {
      this.respuestaXML = respuestaXML;
    }
    
    public String getMensajeValidacion() {
        return mensajeValidacion;
    }
    
    public void setMensajeValidacion(String mensajeValidacion) {
        this.mensajeValidacion = mensajeValidacion;
    }
}
