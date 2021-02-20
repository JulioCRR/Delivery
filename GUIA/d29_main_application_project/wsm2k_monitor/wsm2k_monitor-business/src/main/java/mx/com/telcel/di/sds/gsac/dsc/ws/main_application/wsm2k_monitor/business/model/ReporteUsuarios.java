package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.LinkedList;

public class ReporteUsuarios {

	private LinkedList<RegistroComportamientoUsuario> comportamientoUsuarios;

	public LinkedList<RegistroComportamientoUsuario> getComportamientoUsuarios() {
		return comportamientoUsuarios;
	}

	public void setComportamientoUsuarios(
			LinkedList<RegistroComportamientoUsuario> comportamientoUsuarios) {
		this.comportamientoUsuarios = comportamientoUsuarios;
	}
	
	
	
}
