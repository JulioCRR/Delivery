package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.Date;

public class RespuestaError {

	private int id;
	private String mensaje;
	private int maximoUmbralErrores;
	private int erroresAcumulados;
	private String usuario;
	private String cics;
	private String tipo;
	private long intervaloTiempo;
	private int erroresAcumuladosDia;
	private int erroresAcumuladosHora; 
	private long horaInicioIntervalo;
	private int prioridad;
	private String tipoBusqueda;
	private Date horaUltimoError;
	private String horaUltimoErrorString;
	private String destinatariosAlertas;
	
	public String getDestinatariosAlertas() {
		return destinatariosAlertas;
	}

	public void setDestinatariosAlertas(String destinatariosAlertas) {
		this.destinatariosAlertas = destinatariosAlertas;
	}

	public String getTipoBusqueda() {
		return tipoBusqueda;
	}

	public void setTipoBusqueda(String tipoBusqueda) {
		this.tipoBusqueda = tipoBusqueda;
	}

	public int getPrioridad() {
		return prioridad;
	}

	public void setPrioridad(int prioridad) {
		this.prioridad = prioridad;
	}

	public int getErroresAcumuladosDia() {
		return erroresAcumuladosDia;
	}

	public void setErroresAcumuladosDia(int erroresAcumuladosDia) {
		this.erroresAcumuladosDia = erroresAcumuladosDia;
	}

	public int getErroresAcumuladosHora() {
		return erroresAcumuladosHora;
	}

	public void setErroresAcumuladosHora(int erroresAcumuladosHora) {
		this.erroresAcumuladosHora = erroresAcumuladosHora;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public RespuestaError(){}
	
	public RespuestaError(String mensaje,int maximoUmbral){
		this.mensaje=mensaje;
		this.maximoUmbralErrores=maximoUmbral;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public int getMaximoUmbralErrores() {
		return maximoUmbralErrores;
	}

	public void setMaximoUmbralErrores(int maximoUmbralErrores) {
		this.maximoUmbralErrores = maximoUmbralErrores;
	}


	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getCics() {
		return cics;
	}

	public void setCics(String cics) {
		this.cics = cics;
	}


	public int getErroresAcumulados() {
		return erroresAcumulados;
	}

	public void setErroresAcumulados(int erroresAcumulados) {
		this.erroresAcumulados = erroresAcumulados;
	}

	public long getIntervaloTiempo() {
		return intervaloTiempo;
	}

	public void setIntervaloTiempo(long intervaloTiempo) {
		this.intervaloTiempo = intervaloTiempo;
	}

	public long getHoraInicioIntervalo() {
		return horaInicioIntervalo;
	}

	public void setHoraInicioIntervalo(long horaInicioIntervalo) {
		this.horaInicioIntervalo = horaInicioIntervalo;
	}

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	
	
	public Date getHoraUltimoError() {
		return horaUltimoError;
	}

	public void setHoraUltimoError(Date horaUltimoError) {
		this.horaUltimoError = horaUltimoError;
	}

	
	
	public String getHoraUltimoErrorString() {
		return horaUltimoErrorString;
	}

	public void setHoraUltimoErrorString(String horaUltimoErrorString) {
		this.horaUltimoErrorString = horaUltimoErrorString;
	}

    @Override
    public String toString() {
        return "RespuestaError{" + "id=" + id + ", mensaje=" + mensaje + ", maximoUmbralErrores=" + maximoUmbralErrores + ", erroresAcumulados=" + erroresAcumulados + ", usuario=" + usuario + ", cics=" + cics + ", tipo=" + tipo + ", intervaloTiempo=" + intervaloTiempo + ", erroresAcumuladosDia=" + erroresAcumuladosDia + ", erroresAcumuladosHora=" + erroresAcumuladosHora + ", horaInicioIntervalo=" + horaInicioIntervalo + ", prioridad=" + prioridad + ", tipoBusqueda=" + tipoBusqueda + ", horaUltimoError=" + horaUltimoError + ", horaUltimoErrorString=" + horaUltimoErrorString + ", destinatariosAlertas=" + destinatariosAlertas + '}';
    }

	

	
	
	

	
	
	
	
	
	
	
}
