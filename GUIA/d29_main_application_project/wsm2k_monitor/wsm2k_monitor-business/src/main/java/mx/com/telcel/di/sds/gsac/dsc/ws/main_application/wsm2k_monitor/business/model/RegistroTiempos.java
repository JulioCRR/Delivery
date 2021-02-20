package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

public class RegistroTiempos {

	private String region;
	private long t_menor_un_segundo;
	private long t_1_a_5_segundos;
	private long t_5_a_10_segundos;
	private long t_10_a_20_segundos;
	private long t_20_a_30_segundos;
	private long t_30_a_40_segundos;
	private long t_40_a_50_segundos;
	private long t_50_a_60_segundos;
	private long t_mayor_un_minuto;
	
	private long t_menor_un_segundo_5min;
	private long t_1_a_5_segundos_5min;
	private long t_5_a_10_segundos_5min;
	private long t_10_a_20_segundos_5min;
	private long t_20_a_30_segundos_5min;
	private long t_30_a_40_segundos_5min;
	private long t_40_a_50_segundos_5min;
	private long t_50_a_60_segundos_5min;
	private long t_mayor_un_minuto_5min;
	
	private long t_menor_un_segundo_hora;
	private long t_1_a_5_segundos_hora;
	private long t_5_a_10_segundos_hora;
	private long t_10_a_20_segundos_hora;
	private long t_20_a_30_segundos_hora;
	private long t_30_a_40_segundos_hora;
	private long t_40_a_50_segundos_hora;
	private long t_50_a_60_segundos_hora;
	private long t_mayor_un_minuto_hora;
	
	private long t_menor_un_segundo_dia;
	private long t_1_a_5_segundos_dia;
	private long t_5_a_10_segundos_dia;
	private long t_10_a_20_segundos_dia;
	private long t_20_a_30_segundos_dia;
	private long t_30_a_40_segundos_dia;
	private long t_40_a_50_segundos_dia;
	private long t_50_a_60_segundos_dia;
	private long t_mayor_un_minuto_dia;
	
	private long numPeticiones5min;
	private long numPeticionesHora;
	private long numPeticiones;
	private long numPeticionesDia;
	
	public long getNumPeticiones() {
		return numPeticiones;
	}

	public void setNumPeticiones(long numPeticiones) {
		this.numPeticiones = numPeticiones;
	}

	public long getT_30_a_40_segundos() {
		return t_30_a_40_segundos;
	}

	public void setT_30_a_40_segundos(long t_30_a_40_segundos) {
		this.t_30_a_40_segundos = t_30_a_40_segundos;
	}

	
	
	public long getT_30_a_40_segundos_5min() {
		return t_30_a_40_segundos_5min;
	}

	public void setT_30_a_40_segundos_5min(long t_30_a_40_segundos_5min) {
		this.t_30_a_40_segundos_5min = t_30_a_40_segundos_5min;
	}

	public long getT_30_a_40_segundos_hora() {
		return t_30_a_40_segundos_hora;
	}

	public void setT_30_a_40_segundos_hora(long t_30_a_40_segundos_hora) {
		this.t_30_a_40_segundos_hora = t_30_a_40_segundos_hora;
	}

	public long getT_30_a_40_segundos_dia() {
		return t_30_a_40_segundos_dia;
	}

	public void setT_30_a_40_segundos_dia(long t_30_a_40_segundos_dia) {
		this.t_30_a_40_segundos_dia = t_30_a_40_segundos_dia;
	}

	
	

	
	public long getNumPeticiones5min() {
		return numPeticiones5min;
	}

	public void setNumPeticiones5min(long numPeticiones5min) {
		this.numPeticiones5min = numPeticiones5min;
	}

	public long getNumPeticionesHora() {
		return numPeticionesHora;
	}

	public void setNumPeticionesHora(long numPeticionesHora) {
		this.numPeticionesHora = numPeticionesHora;
	}

	public long getNumPeticionesDia() {
		return numPeticionesDia;
	}

	public void setNumPeticionesDia(long numPeticionesDía) {
		this.numPeticionesDia = numPeticionesDía;
	}

	public RegistroTiempos(String region){
		this.region=region;
	}
	
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public long getT_menor_un_segundo() {
		return t_menor_un_segundo;
	}
	public void setT_menor_un_segundo(long t_menor_un_segundo) {
		this.t_menor_un_segundo = t_menor_un_segundo;
	}
	public long getT_1_a_5_segundos() {
		return t_1_a_5_segundos;
	}
	public void setT_1_a_5_segundos(long t_1_a_5_segundos) {
		this.t_1_a_5_segundos = t_1_a_5_segundos;
	}
	public long getT_5_a_10_segundos() {
		return t_5_a_10_segundos;
	}
	public void setT_5_a_10_segundos(long t_5_a_10_segundos) {
		this.t_5_a_10_segundos = t_5_a_10_segundos;
	}
	public long getT_10_a_20_segundos() {
		return t_10_a_20_segundos;
	}
	public void setT_10_a_20_segundos(long t_10_a_20_segundos) {
		this.t_10_a_20_segundos = t_10_a_20_segundos;
	}
	public long getT_20_a_30_segundos() {
		return t_20_a_30_segundos;
	}
	public void setT_20_a_30_segundos(long t_20_a_30_segundos) {
		this.t_20_a_30_segundos = t_20_a_30_segundos;
	}
	public long getT_40_a_50_segundos() {
		return t_40_a_50_segundos;
	}
	public void setT_40_a_50_segundos(long t_40_a_50_segundos) {
		this.t_40_a_50_segundos = t_40_a_50_segundos;
	}
	public long getT_50_a_60_segundos() {
		return t_50_a_60_segundos;
	}
	public void setT_50_a_60_segundos(long t_50_a_60_segundos) {
		this.t_50_a_60_segundos = t_50_a_60_segundos;
	}
	public long getT_mayor_un_minuto() {
		return t_mayor_un_minuto;
	}
	public void setT_mayor_un_minuto(long t_mayor_un_minuto) {
		this.t_mayor_un_minuto = t_mayor_un_minuto;
	}

	public long getT_menor_un_segundo_5min() {
		return t_menor_un_segundo_5min;
	}

	public void setT_menor_un_segundo_5min(long t_menor_un_segundo_5min) {
		this.t_menor_un_segundo_5min = t_menor_un_segundo_5min;
	}

	public long getT_1_a_5_segundos_5min() {
		return t_1_a_5_segundos_5min;
	}

	public void setT_1_a_5_segundos_5min(long t_1_a_5_segundos_5min) {
		this.t_1_a_5_segundos_5min = t_1_a_5_segundos_5min;
	}

	public long getT_5_a_10_segundos_5min() {
		return t_5_a_10_segundos_5min;
	}

	public void setT_5_a_10_segundos_5min(long t_5_a_10_segundos_5min) {
		this.t_5_a_10_segundos_5min = t_5_a_10_segundos_5min;
	}

	public long getT_10_a_20_segundos_5min() {
		return t_10_a_20_segundos_5min;
	}

	public void setT_10_a_20_segundos_5min(long t_10_a_20_segundos_5min) {
		this.t_10_a_20_segundos_5min = t_10_a_20_segundos_5min;
	}

	public long getT_20_a_30_segundos_5min() {
		return t_20_a_30_segundos_5min;
	}

	public void setT_20_a_30_segundos_5min(long t_20_a_30_segundos_5min) {
		this.t_20_a_30_segundos_5min = t_20_a_30_segundos_5min;
	}

	public long getT_40_a_50_segundos_5min() {
		return t_40_a_50_segundos_5min;
	}

	public void setT_40_a_50_segundos_5min(long t_40_a_50_segundos_5min) {
		this.t_40_a_50_segundos_5min = t_40_a_50_segundos_5min;
	}

	public long getT_50_a_60_segundos_5min() {
		return t_50_a_60_segundos_5min;
	}

	public void setT_50_a_60_segundos_5min(long t_50_a_60_segundos_5min) {
		this.t_50_a_60_segundos_5min = t_50_a_60_segundos_5min;
	}

	public long getT_mayor_un_minuto_5min() {
		return t_mayor_un_minuto_5min;
	}

	public void setT_mayor_un_minuto_5min(long t_mayor_un_minuto_5min) {
		this.t_mayor_un_minuto_5min = t_mayor_un_minuto_5min;
	}

	public long getT_menor_un_segundo_hora() {
		return t_menor_un_segundo_hora;
	}

	public void setT_menor_un_segundo_hora(long t_menor_un_segundo_hora) {
		this.t_menor_un_segundo_hora = t_menor_un_segundo_hora;
	}

	public long getT_1_a_5_segundos_hora() {
		return t_1_a_5_segundos_hora;
	}

	public void setT_1_a_5_segundos_hora(long t_1_a_5_segundos_hora) {
		this.t_1_a_5_segundos_hora = t_1_a_5_segundos_hora;
	}

	public long getT_5_a_10_segundos_hora() {
		return t_5_a_10_segundos_hora;
	}

	public void setT_5_a_10_segundos_hora(long t_5_a_10_segundos_hora) {
		this.t_5_a_10_segundos_hora = t_5_a_10_segundos_hora;
	}

	public long getT_10_a_20_segundos_hora() {
		return t_10_a_20_segundos_hora;
	}

	public void setT_10_a_20_segundos_hora(long t_10_a_20_segundos_hora) {
		this.t_10_a_20_segundos_hora = t_10_a_20_segundos_hora;
	}

	public long getT_20_a_30_segundos_hora() {
		return t_20_a_30_segundos_hora;
	}

	public void setT_20_a_30_segundos_hora(long t_20_a_30_segundos_hora) {
		this.t_20_a_30_segundos_hora = t_20_a_30_segundos_hora;
	}

	public long getT_40_a_50_segundos_hora() {
		return t_40_a_50_segundos_hora;
	}

	public void setT_40_a_50_segundos_hora(long t_40_a_50_segundos_hora) {
		this.t_40_a_50_segundos_hora = t_40_a_50_segundos_hora;
	}

	public long getT_50_a_60_segundos_hora() {
		return t_50_a_60_segundos_hora;
	}

	public void setT_50_a_60_segundos_hora(long t_50_a_60_segundos_hora) {
		this.t_50_a_60_segundos_hora = t_50_a_60_segundos_hora;
	}

	public long getT_mayor_un_minuto_hora() {
		return t_mayor_un_minuto_hora;
	}

	public void setT_mayor_un_minuto_hora(long t_mayor_un_minuto_hora) {
		this.t_mayor_un_minuto_hora = t_mayor_un_minuto_hora;
	}

	public long getT_menor_un_segundo_dia() {
		return t_menor_un_segundo_dia;
	}

	public void setT_menor_un_segundo_dia(long t_menor_un_segundo_dia) {
		this.t_menor_un_segundo_dia = t_menor_un_segundo_dia;
	}

	public long getT_1_a_5_segundos_dia() {
		return t_1_a_5_segundos_dia;
	}

	public void setT_1_a_5_segundos_dia(long t_1_a_5_segundos_dia) {
		this.t_1_a_5_segundos_dia = t_1_a_5_segundos_dia;
	}

	public long getT_5_a_10_segundos_dia() {
		return t_5_a_10_segundos_dia;
	}

	public void setT_5_a_10_segundos_dia(long t_5_a_10_segundos_dia) {
		this.t_5_a_10_segundos_dia = t_5_a_10_segundos_dia;
	}

	public long getT_10_a_20_segundos_dia() {
		return t_10_a_20_segundos_dia;
	}

	public void setT_10_a_20_segundos_dia(long t_10_a_20_segundos_dia) {
		this.t_10_a_20_segundos_dia = t_10_a_20_segundos_dia;
	}

	public long getT_20_a_30_segundos_dia() {
		return t_20_a_30_segundos_dia;
	}

	public void setT_20_a_30_segundos_dia(long t_20_a_30_segundos_dia) {
		this.t_20_a_30_segundos_dia = t_20_a_30_segundos_dia;
	}

	public long getT_40_a_50_segundos_dia() {
		return t_40_a_50_segundos_dia;
	}

	public void setT_40_a_50_segundos_dia(long t_40_a_50_segundos_dia) {
		this.t_40_a_50_segundos_dia = t_40_a_50_segundos_dia;
	}

	public long getT_50_a_60_segundos_dia() {
		return t_50_a_60_segundos_dia;
	}

	public void setT_50_a_60_segundos_dia(long t_50_a_60_segundos_dia) {
		this.t_50_a_60_segundos_dia = t_50_a_60_segundos_dia;
	}

	public long getT_mayor_un_minuto_dia() {
		return t_mayor_un_minuto_dia;
	}

	public void setT_mayor_un_minuto_dia(long t_mayor_un_minuto_dia) {
		this.t_mayor_un_minuto_dia = t_mayor_un_minuto_dia;
	}
	
	
	
	
}
