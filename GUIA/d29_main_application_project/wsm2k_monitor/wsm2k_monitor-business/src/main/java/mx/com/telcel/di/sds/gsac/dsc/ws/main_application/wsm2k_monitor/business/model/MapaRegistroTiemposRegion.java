package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.HashMap;

public class MapaRegistroTiemposRegion {

	private static HashMap<String,RegistroTiempos> mapaTiempos;
	private long t_menor_un_segundo;
	private long t_1_a_5_segundos;
	private long t_5_a_10_segundos;
	private long t_10_a_20_segundos;
	private long t_20_a_30_segundos;
	private long t_30_a_40_segundos;
	private long t_40_a_50_segundos;
	private long t_50_a_60_segundos;
	private long t_mayor_un_minuto;
	
	
	static{
		mapaTiempos=new HashMap<String,RegistroTiempos>();
		mapaTiempos.put("1", new RegistroTiempos("1") );
		mapaTiempos.put("2", new RegistroTiempos("2") );
		mapaTiempos.put("3", new RegistroTiempos("3") );
		mapaTiempos.put("4", new RegistroTiempos("4") );
		mapaTiempos.put("5", new RegistroTiempos("5") );
		mapaTiempos.put("6", new RegistroTiempos("6") );
		mapaTiempos.put("7", new RegistroTiempos("7") );
		mapaTiempos.put("8", new RegistroTiempos("8") );
		mapaTiempos.put("9", new RegistroTiempos("9") );
		mapaTiempos.put("TOTAL", new RegistroTiempos("TOTAL") );
		
		
	}

	public  HashMap<String, RegistroTiempos> getMapaTiempos() {
		return mapaTiempos;
	}

	public  void setMapaTiempos(HashMap<String, RegistroTiempos> mapaTiempos) {
		MapaRegistroTiemposRegion.mapaTiempos = mapaTiempos;
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

	public long getT_30_a_40_segundos() {
		return t_30_a_40_segundos;
	}

	public void setT_30_a_40_segundos(long t_30_a_40_segundos) {
		this.t_30_a_40_segundos = t_30_a_40_segundos;
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
	
	
	
}
