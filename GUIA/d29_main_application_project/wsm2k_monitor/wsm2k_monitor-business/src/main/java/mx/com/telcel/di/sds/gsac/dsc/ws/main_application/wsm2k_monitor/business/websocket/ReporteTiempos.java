package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.websocket;

import java.util.LinkedList;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroTiempos;

public class ReporteTiempos {

	private LinkedList<RegistroTiempos> registroTiempos;
	

	public LinkedList<RegistroTiempos> getRegistroTiempos() {
		return registroTiempos;
	}

	public void setRegistroTiempos(LinkedList<RegistroTiempos> registroTiempos) {
		this.registroTiempos = registroTiempos;
	}

	
	
	
}
