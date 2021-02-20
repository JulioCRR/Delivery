package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import java.util.Iterator;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.MapaRegistroTiemposRegion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroAlertas;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroAlertasInstancias;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroTiempos;





import org.springframework.beans.factory.annotation.Autowired;

public class ReseteadorIndicadores5Minutos {

	@Autowired
	private MapaRegistroTiemposRegion mapaRegistroTiemposRegion;
	
	@Autowired
	private RegistroAlertas registroAlertas;
	
	@Autowired
	private RegistroAlertasInstancias registroAlertasInstancias;
	
	public void reiniciaIndicadores5Minutos(){
		Iterator<RegistroTiempos> iterator = mapaRegistroTiemposRegion.getMapaTiempos().values().iterator();
		RegistroTiempos tiempos;
		while(iterator.hasNext() ){
			tiempos=iterator.next();
			tiempos.setNumPeticiones5min(0);
			tiempos.setT_menor_un_segundo_5min(0);
			tiempos.setT_1_a_5_segundos_5min(0);
			tiempos.setT_5_a_10_segundos_5min(0);
			tiempos.setT_10_a_20_segundos_5min(0);
			tiempos.setT_20_a_30_segundos_5min(0);
			tiempos.setT_30_a_40_segundos_5min(0);
			tiempos.setT_40_a_50_segundos_5min(0);
			tiempos.setT_50_a_60_segundos_5min(0);
			tiempos.setT_mayor_un_minuto_5min(0);
		}
		/*InstanciaWSM2K errorInstancia=new InstanciaWSM2K();
		errorInstancia.setId(5);
		errorInstancia.setReadTime((long)3211);
		errorInstancia.setStatusAlert(StatusAlertInstancia.READ_TIMEOUT );
		registroAlertasInstancias.getAlertas().addFirst(errorInstancia);
		
		InstanciaWSM2K errorInstancia2=new InstanciaWSM2K();
		errorInstancia2.setId(2);
		errorInstancia2.setReadTime((long)3213);
		errorInstancia2.setStatusAlert(StatusAlertInstancia.CONNECITON_TIMEOUT );
		registroAlertasInstancias.getAlertas().addFirst(errorInstancia2);
		*/
		//registroAlertas.getAlertas().addFirst(error);
	}
	
	
}
