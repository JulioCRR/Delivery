package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.HashMap;

public class RegistroComportamientoUsuarios {
	
	
	private long peticionesMinuto;
	private long peticionesHora;
	private long peticionesDia;
	
	private HashMap<String,RegistroComportamientoUsuario> registroComportamientoUsuarios;

	public HashMap<String, RegistroComportamientoUsuario> getRegistroComportamientoUsuarios() {
		return registroComportamientoUsuarios;
	}

	public void setRegistroComportamientoUsuarios(
			HashMap<String, RegistroComportamientoUsuario> registroComportamientoUsuarios) {
		this.registroComportamientoUsuarios = registroComportamientoUsuarios;
	}

	public long getPeticionesMinuto() {
		return peticionesMinuto;
	}

	public void setPeticionesMinuto(long peticionesMinuto) {
		this.peticionesMinuto = peticionesMinuto;
	}

	public long getPeticionesHora() {
		return peticionesHora;
	}

	public void setPeticionesHora(long peticionesHora) {
		this.peticionesHora = peticionesHora;
	}

	public long getPeticionesDia() {
		return peticionesDia;
	}

	public void setPeticionesDia(long peticionesDia) {
		this.peticionesDia = peticionesDia;
	}
	
	
	
}
