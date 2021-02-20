package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

public class PropiedadMonitoreo {

	private String nombre;
	private String valor;
	
	
	
	public PropiedadMonitoreo(String nombre, String valor) {
		super();
		this.nombre = nombre;
		this.valor = valor;
	}
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	
	
	
}
