
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.exception;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.InstanciaWSM2K;

public class InstanceException extends Exception {

	private static final long serialVersionUID = -1004599709446647981L;
	private InstanciaWSM2K instancia;
	
	public InstanceException(String message){
		super(message);	
	}
	
	
	
	public InstanceException(InstanciaWSM2K instancia) {
		super();
		this.instancia = instancia;
	}



	public InstanciaWSM2K getInstancia() {
		return instancia;
	}

	public void setInstancia(InstanciaWSM2K instancia) {
		this.instancia = instancia;
	}
		
}

