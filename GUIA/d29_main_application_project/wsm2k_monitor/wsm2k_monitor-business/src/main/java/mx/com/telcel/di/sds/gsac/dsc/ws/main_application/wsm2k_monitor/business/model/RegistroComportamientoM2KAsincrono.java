package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.HashMap;

public class RegistroComportamientoM2KAsincrono {

	private static HashMap<Integer,ComportamientoM2KAsincrono> registrosComportamientoM2KAsincrono;
	
	static{
		registrosComportamientoM2KAsincrono=new HashMap<Integer,ComportamientoM2KAsincrono>();
		registrosComportamientoM2KAsincrono.put( new Integer(0),new ComportamientoM2KAsincrono(0) );
		registrosComportamientoM2KAsincrono.put( new Integer(1),new ComportamientoM2KAsincrono(1) );
		registrosComportamientoM2KAsincrono.put( new Integer(2),new ComportamientoM2KAsincrono(2) );
		registrosComportamientoM2KAsincrono.put( new Integer(3),new ComportamientoM2KAsincrono(3) );
		registrosComportamientoM2KAsincrono.put( new Integer(4),new ComportamientoM2KAsincrono(4) );
		registrosComportamientoM2KAsincrono.put( new Integer(5),new ComportamientoM2KAsincrono(5) );
		registrosComportamientoM2KAsincrono.put( new Integer(6),new ComportamientoM2KAsincrono(6) );
		registrosComportamientoM2KAsincrono.put( new Integer(7),new ComportamientoM2KAsincrono(7) );
		registrosComportamientoM2KAsincrono.put( new Integer(8),new ComportamientoM2KAsincrono(8) );
		registrosComportamientoM2KAsincrono.put( new Integer(9),new ComportamientoM2KAsincrono(9) );
		registrosComportamientoM2KAsincrono.put( new Integer(10),new ComportamientoM2KAsincrono(10) );
		registrosComportamientoM2KAsincrono.put( new Integer(11),new ComportamientoM2KAsincrono(11) );
		registrosComportamientoM2KAsincrono.put( new Integer(12),new ComportamientoM2KAsincrono(12) );
		registrosComportamientoM2KAsincrono.put( new Integer(13),new ComportamientoM2KAsincrono(13) );
		registrosComportamientoM2KAsincrono.put( new Integer(14),new ComportamientoM2KAsincrono(14) );
		registrosComportamientoM2KAsincrono.put( new Integer(15),new ComportamientoM2KAsincrono(15) );
		registrosComportamientoM2KAsincrono.put( new Integer(16),new ComportamientoM2KAsincrono(16) );
		registrosComportamientoM2KAsincrono.put( new Integer(17),new ComportamientoM2KAsincrono(17) );
		registrosComportamientoM2KAsincrono.put( new Integer(18),new ComportamientoM2KAsincrono(18) );
		registrosComportamientoM2KAsincrono.put( new Integer(19),new ComportamientoM2KAsincrono(19) );
		registrosComportamientoM2KAsincrono.put( new Integer(20),new ComportamientoM2KAsincrono(20) );
		registrosComportamientoM2KAsincrono.put( new Integer(21),new ComportamientoM2KAsincrono(21) );
		registrosComportamientoM2KAsincrono.put( new Integer(22),new ComportamientoM2KAsincrono(22) );
		registrosComportamientoM2KAsincrono.put( new Integer(23),new ComportamientoM2KAsincrono(23) );
		
	}

	public static HashMap<Integer, ComportamientoM2KAsincrono> getRegistrosComportamientoM2KAsincrono() {
		return registrosComportamientoM2KAsincrono;
	}

	public static void setRegistrosComportamientoM2KAsincrono(
			HashMap<Integer, ComportamientoM2KAsincrono> registrosComportamientoM2KAsincrono) {
		RegistroComportamientoM2KAsincrono.registrosComportamientoM2KAsincrono = registrosComportamientoM2KAsincrono;
	}

	
	
	
	
}
