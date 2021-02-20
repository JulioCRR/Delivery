package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.ConsumoServicio;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.PropiedadMonitoreo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroComportamientoUsuarios;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroTiempos;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RespuestaError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.AdministradorListaMensajes;
import org.springframework.beans.factory.annotation.Autowired;



/**
 * Clase axiliar para el manejo de errores y alertas.
 * */
public class UtilMonitoreo {
        

    
	/**Contador de las HibernateException que se van presentando*/
	private static int contadorHibernateException;
	/**Contador de las JmsException que se van presentando*/
	private static int contadorJmsException;
	private static int contadorMQException;
	private static long horaUltimoError;
	private static String ultimoMensajeGuardado;
	private static Date horaUltimoMensajeGuardado;
	private static long mensajesGuardados;
	private static long mensajesGuardadosPorDia;
	private static long mensajesGuardadosPorHora;
	private static int tiempoMaximoParaAlerta;
	private static boolean encolaMensajeEnError;
	private static String destinatariosAlertas;
	private static long peticionesUltimaHora;
	private static long peticionesPorDia;
	private static boolean guardaMensajeEnBD;
	private static Date horaInicioProceso=new Date(System.currentTimeMillis());
	private static long horaUltimoErrorExterno;
        private static int mensajesEncolados;

    public static int getMensajesEncolados() {
        return mensajesEncolados;
    }

    public static void setMensajesEncolados(int mensajesEncolados) {
        UtilMonitoreo.mensajesEncolados = mensajesEncolados;
    }
	
	public static long getMensajesGuardadosPorHora() {
		return mensajesGuardadosPorHora;
	}
	public static void setMensajesGuardadosPorHora(long mensajesGuardadosPorHora) {
		UtilMonitoreo.mensajesGuardadosPorHora = mensajesGuardadosPorHora;
	}

	
	
	public static boolean getGuardaMensajeEnBD() {
		return guardaMensajeEnBD;
	}
	public static void setGuardaMensajeEnBD(boolean guardaMensajeEnBD) {
		UtilMonitoreo.guardaMensajeEnBD = guardaMensajeEnBD;
	}
	
	
	
	public static String getDestinatariosAlertas() {
		return destinatariosAlertas;
	}
	public static void setDestinatariosAlertas(String destinatariosAlertas) {
		UtilMonitoreo.destinatariosAlertas = destinatariosAlertas;
	}
	public static boolean getEncolaMensajeEnError() {
		return encolaMensajeEnError;
	}
	public static void setEncolaMensajeEnError(boolean encolaMensajeEnError) {
		UtilMonitoreo.encolaMensajeEnError = encolaMensajeEnError;
	}
	public static int getTiempoMaximoParaAlerta() {
		return tiempoMaximoParaAlerta;
	}
	public static void setTiempoMaximoParaAlerta(int tiempoMaximoParaAlerta) {
		UtilMonitoreo.tiempoMaximoParaAlerta = tiempoMaximoParaAlerta;
	}
	public static int getContadorHibernateException() {
		return contadorHibernateException;
	}
	public static void setContadorHibernateException(int contadorHibernateException) {
		UtilMonitoreo.contadorHibernateException = contadorHibernateException;
	}
	public static int getContadorJmsException() {
		return contadorJmsException;
	}
	public static void setContadorJmsException(int contadorJmsException) {
		UtilMonitoreo.contadorJmsException = contadorJmsException;
	}
	public static int getContadorMQException() {
		return contadorMQException;
	}
	public static void setContadorMQException(int contadorMQException) {
		UtilMonitoreo.contadorMQException = contadorMQException;
	}
	public static long getHoraUltimoError() {
		return horaUltimoError;
	}
	public static void setHoraUltimoError(long horaUltimoError) {
		UtilMonitoreo.horaUltimoError = horaUltimoError;
	}
	public static Date getHoraUltimoMensajeGuardado() {
		return horaUltimoMensajeGuardado;
	}
	public static void setHoraUltimoMensajeGuardado(Date horaUltimoMensajeGuardado) {
		UtilMonitoreo.horaUltimoMensajeGuardado = horaUltimoMensajeGuardado;
	}
	
	public static long getMensajesGuardados() {
		return mensajesGuardados;
	}
	public static void setMensajesGuardados(long mensajesGuardados) {
		UtilMonitoreo.mensajesGuardados = mensajesGuardados;
	}
	public static String getUltimoMensajeGuardado() {
		return ultimoMensajeGuardado;
	}
	public static void setUltimoMensajeGuardado(String ultimoMensajeGuardado) {
		UtilMonitoreo.ultimoMensajeGuardado = ultimoMensajeGuardado;
	}
	public static long getPeticionesUltimaHora() {
		return peticionesUltimaHora;
	}
	public static void setPeticionesUltimaHora(long peticionesUltimaHora) {
		UtilMonitoreo.peticionesUltimaHora = peticionesUltimaHora;
	}
	public static long getPeticionesPorDia() {
		return peticionesPorDia;
	}
	public static void setPeticionesPorDia(long peticionesPorDia) {
		UtilMonitoreo.peticionesPorDia = peticionesPorDia;
	}
	
	public static long getMensajesGuardadosPorDia() {
		return mensajesGuardadosPorDia;
	}
	public static void setMensajesGuardadosPorDia(long mensajesGuardadosPorDia) {
		UtilMonitoreo.mensajesGuardadosPorDia = mensajesGuardadosPorDia;
	}
	
	public static Date getHoraInicioProceso() {
		return horaInicioProceso;
	}
	public static void setHoraInicioProceso(Date horaInicioProceso) {
		UtilMonitoreo.horaInicioProceso = horaInicioProceso;
	}
	public static long getHoraUltimoErrorExterno() {
		return horaUltimoErrorExterno;
	}
	public static void setHoraUltimoErrorExterno(long horaUltimoErrorExterno) {
		UtilMonitoreo.horaUltimoErrorExterno = horaUltimoErrorExterno;
	}
	@SuppressWarnings("unchecked")
	public List<RespuestaError> ordenaReporteIncidencias(List<RespuestaError> incidencias){
		Collections.sort(incidencias, new Comparator() {
			@Override
			public int compare(Object arg0, Object arg1) {
				RespuestaError i1=(RespuestaError)arg0 ;
				RespuestaError i2=(RespuestaError)arg1 ;
				if( i1.getPrioridad() < i2.getPrioridad() ) return -1;
				else return 1;
				
			}
			
		});
		return incidencias;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<RespuestaError> ordenaPorRecurrencia(List<RespuestaError> incidencias){
		Collections.sort(incidencias, new Comparator() {
			@Override
			public int compare(Object arg0, Object arg1) {
				RespuestaError i1=(RespuestaError)arg0 ;
				RespuestaError i2=(RespuestaError)arg1 ;
				if( !( i1.getErroresAcumuladosDia() < i2.getErroresAcumuladosDia() ) ) return -1;
				else return 1;
				
			}
			
		});
		return incidencias;
	}
	
	@SuppressWarnings("unchecked")
	public List<RegistroComportamientoUsuario> ordenaPorNumeroInvocaciones(List<RegistroComportamientoUsuario> usuarios){
		Collections.sort(usuarios, new Comparator() {
			@Override
			public int compare(Object arg0, Object arg1) {
				RegistroComportamientoUsuario i1=(RegistroComportamientoUsuario)arg0 ;
				RegistroComportamientoUsuario i2=(RegistroComportamientoUsuario)arg1 ;
				if( !( i1.getPeticionesMinuto() < i2.getPeticionesMinuto() ) ) return -1;
				else return 1;
			}
			
		});
		return usuarios;
	}
	
	/*
	@SuppressWarnings("unchecked")
	public List<ConsumoServicio> ordenaServiciosPorNumeroInvocaciones(List<ConsumoServicio> servicios){
		Collections.sort(servicios, new Comparator() {
			@Override
			public int compare(Object arg0, Object arg1) {
				ConsumoServicio i1=(ConsumoServicio)arg0 ;
				ConsumoServicio i2=(ConsumoServicio)arg1 ;
				if( !( i1.getPeticionesMinuto() < i2.getPeticionesMinuto() ) ) return -1;
				else return 1;
			}
			
		});
		return servicios;
	}
	*/
	
	

	public List<ConsumoServicio> ordenaServiciosPorNumeroInvocaciones(List<ConsumoServicio> servicios){
		Collections.sort(servicios, new Comparator<ConsumoServicio>() {
			@Override
			public int compare(ConsumoServicio arg0, ConsumoServicio arg1) {
				//ConsumoServicio i1=(ConsumoServicio)arg0 ;
				//ConsumoServicio i2=(ConsumoServicio)arg1 ;
				if( !( arg0.getPeticionesMinuto() < arg1.getPeticionesMinuto() ) ) return -1;
				else return 1;
			}
			
		});
		return servicios;
	}
	
	@SuppressWarnings("unchecked")
	public List<RegistroTiempos> ordenaPorRegion(List<RegistroTiempos> tiempos){
		Collections.sort(tiempos, new Comparator() {
			@Override
			public int compare(Object arg0, Object arg1) {
				RegistroTiempos i1=(RegistroTiempos)arg0 ;
				RegistroTiempos i2=(RegistroTiempos)arg1 ;
				if( !( Integer.parseInt(i1.getRegion()) < Integer.parseInt( i2.getRegion() ) ) ) return -1;
				else return 1;
			}
			
		});
		return tiempos;
	}
	
	/**Selecciona los primerosN usuarios en orden de invocacion de mayor a menor*/
	public LinkedList<RegistroComportamientoUsuario> obtenUsuariosConMasInvocaciones(RegistroComportamientoUsuarios comportamiento,int primerosN){
		Iterator<RegistroComportamientoUsuario> iterator= comportamiento.getRegistroComportamientoUsuarios().values().iterator();
		List<RegistroComportamientoUsuario> usuarios=new ArrayList<RegistroComportamientoUsuario>();
		while(iterator.hasNext()){
			usuarios.add(iterator.next());
		}
		LinkedList<RegistroComportamientoUsuario> topUsuarios=new LinkedList<RegistroComportamientoUsuario>();
		List<RegistroComportamientoUsuario> listaOrdenada=ordenaPorNumeroInvocaciones(usuarios);
		for(int i=0;i<primerosN;i++){
			topUsuarios.add( listaOrdenada.get(0) );
			listaOrdenada.remove( 0 );
		}
		return topUsuarios;
	} 
	
	
	/**Selecciona las primerasN incidencias en orden numero de ocurrencias en intervalo de analisis */
	public LinkedList<RespuestaError> obtenIncidenciasConMasOcurrencia(Iterator<RespuestaError> incidencias,int primerasN){
		LinkedList<RespuestaError> topIncidencias=new LinkedList<RespuestaError>();
		List<RespuestaError> listaOrdenada=ordenaPorRecurrencia(registroIncidenciasToList(incidencias));
		for(int i=0;i<primerasN;i++){
			topIncidencias.add( listaOrdenada.get(0) );
			listaOrdenada.remove( 0 );
		}
		return topIncidencias;
	}
	
	/**Selecciona las primerasN incidencias en orden numero de ocurrencias en intervalo de analisis */
	public LinkedList<ConsumoServicio> obtenServiciosConMasInvocaciones(Iterator<ConsumoServicio> servicios,int primerasN){
		LinkedList<ConsumoServicio> topServicios=new LinkedList<ConsumoServicio>();
		List<ConsumoServicio> listaOrdenada=ordenaServiciosPorNumeroInvocaciones(registroServiciosToList(servicios));
		for(int i=0;i<primerasN;i++){
			topServicios.add( listaOrdenada.get(0) );
			listaOrdenada.remove( 0 );
		}
		return topServicios;
	}
	
	
	/**Selecciona en orden las incidencias con ocurrencias en intervalo de analisis */
	public LinkedList<RespuestaError> obtenIncidenciasConOcurrencia(Iterator<RespuestaError> incidencias){
		LinkedList<RespuestaError> topIncidencias=new LinkedList<RespuestaError>();
		List<RespuestaError> listaOrdenada=ordenaPorRecurrencia(registroIncidenciasToList(incidencias));
		for(int i=0;i<listaOrdenada.size() ;i++){
			if(listaOrdenada.get(0).getErroresAcumuladosDia()>0 ){
				topIncidencias.add( listaOrdenada.get(0) );
				listaOrdenada.remove( 0 );
			}
			else{
				// como esta ordenada implica que si encontro una con 0, la siguiente tambien sera cero
				return topIncidencias;
			}
		}
		return topIncidencias;
	} 
	
	
	public static LinkedList<PropiedadMonitoreo> propertiesToList(){
		LinkedList<PropiedadMonitoreo> propiedadesMonitoreo=new LinkedList<PropiedadMonitoreo>();
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Fecha inicio proceso" ,UtilMonitoreo.getHoraInicioProceso() == null ? (new Date()).toString() : UtilMonitoreo.getHoraInicioProceso().toString() ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Mensajes guardados totales" , UtilMonitoreo.getMensajesGuardados()+"" ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Mensajes guardados por dia" ,UtilMonitoreo.getMensajesGuardadosPorDia()+"" ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Mensajes encolados (cola local)" , UtilMonitoreo.getMensajesEncolados() +""  ) );
                propiedadesMonitoreo.add( new PropiedadMonitoreo("Hora ultimo mensaje guardado" ,UtilMonitoreo.getHoraUltimoMensajeGuardado() == null ? (new Date()).toString() : UtilMonitoreo.getHoraUltimoMensajeGuardado().toString() ) );
		//propiedadesMonitoreo.add( new PropiedadMonitoreo("Hora ultimo mensaje guardado" ,"" ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Id ultima peticion guardada" ,UtilMonitoreo.getUltimoMensajeGuardado() ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Numero peticiones ultima hora" ,UtilMonitoreo.getPeticionesUltimaHora()+"" ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Mensajes guardados ultima hora" ,UtilMonitoreo.getMensajesGuardadosPorHora() +"" ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Numero peticiones del dia " ,UtilMonitoreo.getPeticionesPorDia()+"" ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Encola mensaje en error de BD" ,UtilMonitoreo.getEncolaMensajeEnError()+"" ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Destinatarios para alertas" ,UtilMonitoreo.getDestinatariosAlertas() ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Tiempo maximo para alertas" ,UtilMonitoreo.getTiempoMaximoParaAlerta() +" ms" ) );
		propiedadesMonitoreo.add( new PropiedadMonitoreo("Guarda mensaje en BD" ,UtilMonitoreo.getGuardaMensajeEnBD()+"" ) );
	
		return propiedadesMonitoreo;
	}
	
	public LinkedList<RegistroTiempos> registroTiemposToList(Iterator<RegistroTiempos> tiempos){
		LinkedList<RegistroTiempos> listaTiempos=new LinkedList<RegistroTiempos>();
		RegistroTiempos registro;
		while( tiempos.hasNext() ){
			registro=tiempos.next();
			listaTiempos.add(registro);
		}
		return listaTiempos;
	}
	
	public LinkedList<RegistroTiempos> registroTiemposToListSinTotal(Iterator<RegistroTiempos> tiempos){
		LinkedList<RegistroTiempos> listaTiempos=new LinkedList<RegistroTiempos>();
		RegistroTiempos registro;
		while( tiempos.hasNext() ){
			registro=tiempos.next();
			if( !registro.getRegion().equals("TOTAL") ){
				listaTiempos.add(registro);
			}
		}
		return listaTiempos;
	}
	
	public LinkedList<RespuestaError> registroIncidenciasToList(Iterator<RespuestaError> incicencias){
		LinkedList<RespuestaError> listaIncidencias=new LinkedList<RespuestaError>();
		RespuestaError incidencia;
		while( incicencias.hasNext() ){
			incidencia=incicencias.next();
			listaIncidencias.add(incidencia);
		}
		return listaIncidencias;
	}
	
	public List<RegistroComportamientoUsuario> registroUsuariosToList(Iterator<RegistroComportamientoUsuario> usuarios){
		LinkedList<RegistroComportamientoUsuario> listaUsuarios=new LinkedList<RegistroComportamientoUsuario>();
		while( usuarios.hasNext() ){
			listaUsuarios.add(usuarios.next() );
		}
		return listaUsuarios;
	}
	
	public LinkedList<ConsumoServicio> registroServiciosToList(Iterator<ConsumoServicio> servicios){
		LinkedList<ConsumoServicio> listaServicios=new LinkedList<ConsumoServicio>();
		while( servicios.hasNext() ){
			listaServicios.add(servicios.next() );
		}
		return listaServicios;
	}

    /* monitor_omega */
    private static Object pantallaOmega;
    
    public static synchronized Object getPantallaOmega() {
        return pantallaOmega;
    }
    
    public static synchronized void setPantallaOmega(Object pantallaOmega) {
        UtilMonitoreo.pantallaOmega = pantallaOmega;
    }
}
