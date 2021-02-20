package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

public class ConsumoServicio {

	private String nombre; 
	private long peticionesMinuto;
	private long peticionesHora;
	private long peticionesDia;
	private String servicio;
	private String id;
	
	public ConsumoServicio(String nombre){
		this.servicio=nombre;
	}
	
	
	public ConsumoServicio(String nombre, String id) {
		super();
		this.nombre = nombre;
		this.id = id;
	}
	
	

	public ConsumoServicio(String nombre, String servicio, String id) {
		super();
		this.nombre = nombre;
		this.servicio = servicio;
		this.id = id;
	}


	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
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


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getServicio() {
		return servicio;
	}


	public void setServicio(String servicio) {
		this.servicio = servicio;
	}


	
	
	
	
	
}
