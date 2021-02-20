package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities;

public class NumberUtil {

	public static int parseInt(String number){
		try{
			return Integer.parseInt(number);
		}
		catch(Exception e){
			return -1;
		}
	}
	
	
}
