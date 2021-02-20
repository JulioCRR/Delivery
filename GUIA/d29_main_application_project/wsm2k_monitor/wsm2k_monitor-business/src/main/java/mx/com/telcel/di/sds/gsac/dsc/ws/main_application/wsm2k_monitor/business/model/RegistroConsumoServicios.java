package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.HashMap;

public class RegistroConsumoServicios {

	private long peticionesMinuto;
	private long peticionesHora;
	private long peticionesDia;
	
	
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

	private static HashMap<String,ConsumoServicio> registroConsumoServicios;

	public static HashMap<String, ConsumoServicio> getRegistroConsumoServicios() {
		return registroConsumoServicios;
	}

	public static void setRegistroConsumoServicios(
			HashMap<String, ConsumoServicio> registroConsumoServicios) {
		RegistroConsumoServicios.registroConsumoServicios = registroConsumoServicios;
	} 
	
	
	
	
}
