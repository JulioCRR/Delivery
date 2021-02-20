package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.HashMap;

public class RegistroComportamientoUsuario {

	private String usuario;
	private Integer id;
	private long peticionesMinuto;
	private long peticionesHora;
	private long peticionesDia;
	private String sistema;
	
	private HashMap <String,ConsumoServicio> registroConsumoServicios;
	
	public RegistroComportamientoUsuario(String usuario){
		this.usuario=usuario;
	}
	
	
	
	public RegistroComportamientoUsuario(String usuario, Integer id) {
		super();
		this.usuario = usuario;
		this.id = id;
	}
	
	


	public RegistroComportamientoUsuario(String usuario, Integer id,
			String sistema) {
		super();
		this.usuario = usuario;
		this.id = id;
		this.sistema = sistema;
	}



	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
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
	public HashMap<String, ConsumoServicio> getRegistroConsumoServicios() {
		return registroConsumoServicios;
	}
	public void setRegistroConsumoServicios(
			HashMap<String, ConsumoServicio> registroConsumoServicios) {
		this.registroConsumoServicios = registroConsumoServicios;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getSistema() {
		return sistema;
	}
	public void setSistema(String sistema) {
		this.sistema = sistema;
	}
	
	
	
}
