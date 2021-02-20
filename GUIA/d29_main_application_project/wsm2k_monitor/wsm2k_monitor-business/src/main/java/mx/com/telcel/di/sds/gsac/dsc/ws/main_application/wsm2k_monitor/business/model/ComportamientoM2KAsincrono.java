package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;



public class ComportamientoM2KAsincrono {

	private  int contadorHibernateException;
	private  int contadorJmsException;
	private  int contadorMQException;
	private  long mensajesGuardadosPorDia;
	private  long mensajesGuardadosPorHora;
	private  long peticionesUltimaHora;
	private  long peticionesPorDia;
	private  int hora;
	
	
	
	public ComportamientoM2KAsincrono(int hora) {
		super();
		this.hora = hora;
	}
	public int getContadorHibernateException() {
		return contadorHibernateException;
	}
	public void setContadorHibernateException(int contadorHibernateException) {
		this.contadorHibernateException = contadorHibernateException;
	}
	public int getContadorJmsException() {
		return contadorJmsException;
	}
	public void setContadorJmsException(int contadorJmsException) {
		this.contadorJmsException = contadorJmsException;
	}
	public int getContadorMQException() {
		return contadorMQException;
	}
	public void setContadorMQException(int contadorMQException) {
		this.contadorMQException = contadorMQException;
	}
	public long getMensajesGuardadosPorDia() {
		return mensajesGuardadosPorDia;
	}
	public void setMensajesGuardadosPorDia(long mensajesGuardadosPorDia) {
		this.mensajesGuardadosPorDia = mensajesGuardadosPorDia;
	}
	public long getMensajesGuardadosPorHora() {
		return mensajesGuardadosPorHora;
	}
	public void setMensajesGuardadosPorHora(long mensajesGuardadosPorHora) {
		this.mensajesGuardadosPorHora = mensajesGuardadosPorHora;
	}
	public long getPeticionesUltimaHora() {
		return peticionesUltimaHora;
	}
	public void setPeticionesUltimaHora(long peticionesUltimaHora) {
		this.peticionesUltimaHora = peticionesUltimaHora;
	}
	public long getPeticionesPorDia() {
		return peticionesPorDia;
	}
	public void setPeticionesPorDia(long peticionesPorDia) {
		this.peticionesPorDia = peticionesPorDia;
	}
	public int getHora() {
		return hora;
	}
	public void setHora(int hora) {
		this.hora = hora;
	}
	
	
	
	
}
