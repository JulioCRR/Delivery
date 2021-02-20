package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities;

public class Delayer {

	public static void delay(long miliseconds){
		try {
			Thread.sleep(miliseconds);
		} catch (InterruptedException e) {
			// TODO Bloque catch generado autom�ticamente
			e.printStackTrace();
		}
	}
	
        public void delayB(long miliseconds){
		try {
			Thread.sleep(miliseconds);
		} catch (InterruptedException e) {
			// TODO Bloque catch generado autom�ticamente
			e.printStackTrace();
		}
	}
}
