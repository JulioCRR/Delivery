package com.telcel.crm.scrapy;

import java.io.*;
import java.util.*;

import javax.resource.*;
import javax.resource.spi.*;
import javax.security.auth.Subject;
import javax.transaction.xa.XAResource;
import org.apache.log4j.Logger;

import com.telcel.crm.scrapy.tn3270.*;

import com.telcel.crm.scrapy.util.CredentialCrypt;


public class ManagedConnectionImpl implements ManagedConnection, RWTnAction {
	
	private static final Logger appLogger = Logger.getLogger(ManagedConnectionImpl.class);

	private static final String TRANSACTIONS_NOT_SUPPORTED_ERROR =
		"Transactions not supported";

	private boolean lock = false;
	private ConnectionImpl connection;
	private Vector listeners = new Vector();
	private PrintWriter logOut;
	public RW3270 rw3270;
	public String sTelefono;
	public String sCuenta;
	public int nPosCursor;
	public int nStatus;
	protected String	    host;
	protected Integer     puerto;
	protected String 		cics;
	protected String 		cmdLogin;
	protected String  	usuario;
	protected String 		clave;
	protected String 		transaccion;
	protected String 		region;	
	public 	long 		timeOut;
	public Hashtable <String, MapaPantalla> 	mapas;
	protected String		sLogin;
	private static int counter = 0;
	
	/** Constructor del Manejador de la Conexion, crea conexion fisica al recurso */
	public 	ManagedConnectionImpl(String host, Integer puerto, String cics, 
					String cmdLogin, String usuario, String password, 
					String transaccion, String region, 
					Long pantallaTimeOut, Hashtable<String, MapaPantalla> mapas, String sLogin) throws ResourceException{
		/*Inicia variables de la Conexion*/
		this.host = host;
		this.puerto = puerto;
		this.cics = cics;
		this.cmdLogin = cmdLogin;
		this.usuario = usuario;
		this.clave = password;
		this.transaccion = transaccion;
		this.region = region;
		this.timeOut = 30000;
		this.mapas = mapas;
		this.sLogin = sLogin;
		String sExeption="";
		boolean bResp = false;
		int nVeces = sLogin.indexOf("loginTSO")>=0 ? 1 : 2;		
		for(int j=0; j<nVeces; j++) {
			if(rw3270 != null) {
			  cierraConexion();
			}
			try {
			    if(sLogin.equals("loginTSO"))
			        bResp = loginTSO();   
			    else if (sLogin.equals("loginTSODES"))
			        bResp = loginTSODES();
			    else
			        bResp = login();
				if(bResp)
					break;
			}catch(IOHTimeOutException eT) {
				sExeption = eT.toString();
				bResp = false;
				appLogger.error(eT);
				break;
			}catch(Exception e) {
				sExeption = e.toString();
				appLogger.error(e);
				bResp = false;
			}	        	
		}
		if(bResp==false) {
			if (rw3270 != null) {	
				cierraConexion();
			}
			throw new ResourceException("(11). Error en login: " + sExeption);
		}
		sTelefono = "";
		sCuenta = "";
		counter ++;
	}
	
	/** Destructor del manejador, se llama antes de elimanr onjeto del Poo, se termina conexion al recurso fisico. */
	public void destroy() throws ResourceException {
		try { 
		     cierraConexion();
		     if(connection != null) 
			   connection.invalidate();
		     connection = null;
		     listeners  = null;
		     appLogger.info("Active Connections : " + --counter);
		} catch(Exception e){
		     appLogger.error("Destroy connection failed : " + e);
		}
	}
	
	public void cierraConexion(){
		try{
			nStatus = RWTnAction.DISCONNECTED_BY_REMOTE_HOST;
			if(connection == null){
				getConnection(new Subject(), null);
			}
			if(rw3270 != null) {
				if(! sLogin.equals("loginTSODES")){
				  rw3270.PF(RW3270.PF4);
				  espera(100);
				  try {
				      enviaComando("cesf logoff", true, 100);
				  } catch(Exception ignored){appLogger.error(ignored);}
				}
			}
		}catch(Exception e){ 
			 appLogger.error("Scrappy cleanConnectionError : " + e);
		} finally{
			try{
				rw3270.disconnect();
			} catch(Exception e){
				 appLogger.error("Scrappy disconnectError : " + e);	
			}
		}
		rw3270 = null;
	}
	
	/** Devuelve una nueva instancia del objeto Interface de la Conexion */
	public Object getConnection(Subject subject, ConnectionRequestInfo cxRequestInfo)
						throws ResourceException {
		this.lock       = true;
		connection = new ConnectionImpl(this);
		return connection;
	}
	
	
	public Object ejecutaConsulta(String sMapa, String[] nomParams, 
			                   String[] params) throws Exception  {
		MapaPantalla mapa = (MapaPantalla)mapas.get(sMapa);		
		try{
		  return mapa.ejecutaConsulta(this, nomParams, params );
		} catch(IOHTimeOutException e){
			appLogger.error(e);
			throw e;
		} catch(IOHUnexpectedScreenException ex) {
			appLogger.error(ex);
			throw ex;
		} catch(Exception ex) {
			appLogger.error(ex);
			verificaErrorInesperado();
			throw ex;
		}
	}
	
	
	public Object ejecutaActualizacion(String sMapa, String[] nomParams, 
			  String[] params, short nTeclaFuncion) throws Exception  {
		MapaPantalla mapa = (MapaPantalla)mapas.get(sMapa);		
		try{
		    return mapa.ejecutaActualizacion(this, nomParams, params
		    		                              , nTeclaFuncion );
		} catch(IOHTimeOutException e){
			appLogger.error(e);
			throw e;
		} catch(IOHUnexpectedScreenException ex) {
			appLogger.error(ex);
			throw ex;
		} catch(Exception ex) {
			appLogger.error(ex);
			verificaErrorInesperado();
			throw ex;
		}
	}
	
	/** Notifica al POOL que la conexion s elibero y esta lista par volver a ser utilizada*/
	public void close() {
		ConnectionEvent event = null;
		if(rw3270 == null)			
			event = new ConnectionEvent(this, ConnectionEvent.CONNECTION_ERROR_OCCURRED);
		else
			event = new ConnectionEvent(this, ConnectionEvent.CONNECTION_CLOSED);
		event.setConnectionHandle(connection);
		Enumeration list = listeners.elements();
		while (list.hasMoreElements()) {
			try{
				((ConnectionEventListener) list.nextElement()).connectionClosed(event);
			}catch(Exception ignored){appLogger.error(ignored);}
		}
		if(connection != null) 
			connection.invalidate();
		connection = null;
		lock=false;
	}
	
	/** Limpia la conexion en caso de un error */
	public void cleanup() throws ResourceException {
	}

	public void associateConnection(Object connection) throws ResourceException {
		this.connection = (ConnectionImpl)connection;
	}
	public void addConnectionEventListener(ConnectionEventListener listener) {	listeners.add(listener);	}
	public void removeConnectionEventListener(ConnectionEventListener listener) {		listeners.remove(listener);	}

	public XAResource getXAResource() throws ResourceException { throw new NotSupportedException( "(12) ." + TRANSACTIONS_NOT_SUPPORTED_ERROR);	}
	public LocalTransaction getLocalTransaction() throws ResourceException {  appLogger.info("Transaccion"); throw new NotSupportedException("(13) ." + TRANSACTIONS_NOT_SUPPORTED_ERROR); }

	public ManagedConnectionMetaData getMetaData() throws ResourceException {	return new ManagedConnectionMetaDataImpl(connection.getMetaData());	}

	public void        setLogWriter(PrintWriter out) throws ResourceException { this.logOut = out; }
	public PrintWriter getLogWriter()                throws ResourceException { return logOut;	    }

	public boolean isLock() {				return lock;	}
	public void setLock(boolean b) {		lock = b;		}

	public void status(int status) {
		switch(status) {
			case RWTnAction.X_WAIT:
				nStatus = RWTnAction.X_WAIT;
				break;
			case RWTnAction.READY:
				nStatus = RWTnAction.READY;
				break;
			case RWTnAction.DISCONNECTED_BY_REMOTE_HOST:
				nStatus = RWTnAction.DISCONNECTED_BY_REMOTE_HOST;
				break;
		}
  	}
	
	public void incomingData() {	}
	public void cursorMove(int oldPos, int newPos) { 	}
	public void broadcastMessage(String msg) { 	}
	public void beep() {	}
	
	public String getDisplay() {
		StringBuilder sb = new StringBuilder("");
	    try {
	        char[] chars=rw3270.getDisplay();
			int cols=rw3270.getCols();
			int rows=rw3270.getRows();
			sb.append("\r\n");
			sb.append("\r\n________________________________________");
			sb.append(    "________________________________________\r\n");
			for(int i=0; i<rows;i++) {
				for(int j=0; j<cols;j++) {
				        sb.append(chars[i*cols+j]);
				}
				sb.append("\r\n");
			}
			sb.append("\r\n________________________________________");
			sb.append(    "________________________________________\r\n");
		}catch(Exception e) {appLogger.error(e);}
		return sb.toString();
	}
	
	public void printDisplay() {
		appLogger.info(getDisplay());
	}
	
	/** Envia un comando a la terminal
     * @param sComando Comando a ser ejecutado si es nulo no se envia nada
     * @param enter		Si se debe de ejecutar el enter o no    **/
    public void enviaComando(String sComando, boolean enter, long nTimeOut) throws Exception {    	
	    synchronized(Thread.currentThread()) {
	    	RW3270Field field;
    	    if(sComando!=null)
    	    	espera(timeOut);
    	    field = rw3270.getField();
    	    try{    	    	
    	        field.setData(sComando);
    	    } catch(IsProtectedException e){
    	    	appLogger.error(e);
    	    	printDisplay();
    	    	throw(new Exception("Unexpected screen status for command: " 
    	    	                                               + sComando));
    	    }
    	    if(enter) { 	    	
    	    	rw3270.enter();
    	    	espera(nTimeOut);
    	    }
	    }
	}
    
    /** Envia un comando a la terminal
     * @param cord la cordena de la pantalla en donde se ejecuta el comando
     * @param sComando Comando a ser ejecutado, si se recibe null no se envia comando
     * @param enter		Si se debe de ejecutar el enter o no    **/
    public void enviaComando(int cord, String sComando, 
            				 boolean pausa, short nTeclaFuncion, long timeOutComando) throws Exception {
	    synchronized(Thread.currentThread()) {	    	
	        RW3270Field field;
	        if(sComando!=null) {
	        	if(rw3270.getField(cord) ==null){
	        		appLogger.info("cord is null");
	        	}
	            field = rw3270.getField(cord);
	            field.setData(sComando);	            
	        }
    	    if(pausa) {
    	    	if(nTeclaFuncion == RW3270.ENTER)
    	    		rw3270.enter();
    	    	else
    	    		rw3270.PF(nTeclaFuncion);
    	        long nTiempoEspera;
    	        if(timeOutComando > 0)
    	        	nTiempoEspera = timeOutComando;
    	        else
    	        	nTiempoEspera = timeOut;
    	        espera(nTiempoEspera);
    	    }
	    }
    }
    
    /** Envia un comando a la terminal esperando a que aparezca alguna cadena  
     *  de parametro en la posicion especificada
     * @param sComando Comando a ser ejecutado si es nulo no se envia nada
     * @param enter				Si se debe de ejecutar el enter o no    
     * @param nTimeOut 			Tiempo maximo de espera    
     * @param sCadBusc 			Cadenas que deben aparecer
     * @param cord 				Posiciones en la pantalla
     * **/
    public int enviaComando(String sComando, boolean enter, long nTimeOut, 
    						 String[] sCadBusc, int[] cord) throws Exception {    	
	    synchronized(Thread.currentThread()) {
	    	RW3270Field field;
    	    if(sComando!=null) {
    	    	espera(timeOut);
    	    	field = rw3270.getField();
    	    	field.setData(sComando);    	    	
    	    }
    	    if(enter) {    	
    	    	rw3270.enter();
    	    	return espera(nTimeOut, sCadBusc, cord);
    	    }
    	    return -1;
	    }
	}

    /**  
     * @return el contenido que se encuentre en la cordenada especificada  	  
     */
 	public String getSegmento(int cord, int longitud) {
 	    return new String(rw3270.getDisplay(), cord, longitud);
 	}
 	

    public boolean login() throws Exception {
        synchronized(Thread.currentThread()) {
        	nStatus = RWTnAction.DISCONNECTED_BY_REMOTE_HOST;
            if(rw3270==null) {
    	        rw3270 = new RW3270(2, this);
    	        rw3270.connect(host, puerto.intValue());    	        
            }          
            enviaComando(cics, true, timeOut/2);            
            limpiaPantallaLogin();
            enviaComando(cmdLogin, true, timeOut/2);            
            String sMes = getSegmento(1761, 34); 
            if(!sMes.equals("DFHCE3520 Please type your userid."))
            	throw new Exception("(14). Message not found in login: DFHCE3520");
		    enviaComando(usuario, false, timeOut/2);
		    rw3270.tab();
		    rw3270.tab();
		    
		    if (clave.contains("|")) {
				CredentialCrypt credentialCrypt = new CredentialCrypt();
				clave = credentialCrypt.dencryptPass(clave);
			}
		    
		    enviaComando(clave, true, timeOut/2);
		    String sRes = getSegmento(1841,9);
		    if(!sRes.equals("DFHCE3549")) {  // Sign-on is complete 
		        sRes += "#" + getSegmento(1761,69).trim() + getSegmento(1851,68).trim();
		        throw new Exception(" (15). [login] Error en login: (" + usuario +"): " + sRes);
		    }  
		    enviaComando(transaccion, true, timeOut/2);		    
		    enviaComando(region, false, timeOut/2);
		    rw3270.PF(RW3270.PF2);	        
	        espera(timeOut/2);
		    sRes = getSegmento(81,3);
		    if(!sRes.equals(region)) {
		        throw new Exception(" (16). [login] Error en login (" + usuario +"): " + getSegmento(1761,68));
		    }
		    nPosCursor = rw3270.getCursorPosition();
		    return true;
        }
    }
    
	public boolean loginTSO() throws Exception {
        synchronized(Thread.currentThread()) {
        	String sRes = "";
        	long inicio = System.currentTimeMillis();
        	nStatus = RWTnAction.DISCONNECTED_BY_REMOTE_HOST;
            if(rw3270==null) {
    	        rw3270 = new RW3270(2, this);
    	        rw3270.connect(host, puerto.intValue());    	        
            }
            String[] sCadBusc = {"TSO/E LOGON"};
            int[] nPosBusc = {33};
            enviaComando(cics, true, timeOut, sCadBusc, nPosBusc);            
            sCadBusc = new String[] {"IKJ56425I", "ICH70001I"};            
            nPosBusc = new int[] {1, 1};            
            int nEnc = enviaComando(clave, true, timeOut, sCadBusc, nPosBusc);
		    if(nEnc<0)
		    	throw new Exception(" (17). [loginTSO] Error en login: " + getSegmento(1,159));
		    
		    sRes = getSegmento(1,79);
		  	if(nEnc == 0){
		    	if(sRes.indexOf("REVOKING")>=0)
		    		throw new Exception(" (18). [loginTSO] Error al conectarse a M2K. Usuario revocado: " + sRes);
		    	if(sRes.indexOf("already logged")>=0)   // ALREADY LOGON
		    	   	throw new Exception(" (19). [login] Error al conectarse a M2K. Intente en 7 minutos: " + sRes);
		       	throw new Exception(" (20). [loginTSO] Error al conectarse a M2K. Error: " + sRes);
		    }
		  	sCadBusc = new String[] {"***"};
		  	nPosBusc = new int[] {241};

		  	enviaComando(null, true, timeOut, sCadBusc, nPosBusc);		  	

		  	sCadBusc = new String[] {"MENU PRINCIPAL"};
            nPosBusc = new int[] {21};            		    

            nEnc = enviaComando(null, true, timeOut, sCadBusc, nPosBusc);            	        
		    if(nEnc != 0)
		        throw new Exception(" (21). [loginTSO] Error en login: " + getSegmento(1,159));
		    appLogger.info("tiempo login TSO: " + (System.currentTimeMillis() - inicio ));
		    return true;
        }
    }

	
	/** Login al TSO de Desarrollo*/
	public boolean loginTSODES() throws Exception {
        synchronized(Thread.currentThread()) {
        	String sRes = "";
        	long inicio = System.currentTimeMillis();
        	nStatus = RWTnAction.DISCONNECTED_BY_REMOTE_HOST;
            if(rw3270==null) {
            	appLogger.info(". Conecta rw3270 ");
    	        rw3270 = new RW3270(2, this);
    	        rw3270.connect(host, puerto.intValue()); 	        
            }
            String[] sCadBusc = {"TSO/E LOGON"};
            int[] nPosBusc = {33};
            enviaComando(cics, true, timeOut, sCadBusc, nPosBusc);            
            sCadBusc = new String[] {"LOGON IN PROGRESS", "ICH70001I", "IKT00300I" , "TSOLOGON RECONNECT REJECTED"};            
            enviaComando(579, clave, false, RW3270.ENTER, timeOut);
            enviaComando(1643, "S", false, RW3270.ENTER, timeOut);
            nPosBusc = new int[] {1, 1, 1, 930};            
            int nEnc = enviaComando(null, true, timeOut, sCadBusc, nPosBusc);
		    if(nEnc<0)
		    	throw new Exception(" (22). [loginTSO] Error en login: " + getSegmento(1,159));
		    
		    sRes = getSegmento(1,79);
		  	if(nEnc == 0){
		    	if(sRes.indexOf("REVOKING")>=0) 
		    		throw new Exception(" (23). [loginTSO] Error al conectarse a M2K. Usuario revocado: " + sRes);
		    	if(sRes.indexOf("already logged")>=0)
		    	   	throw new Exception(" (24). [login] Error al conectarse a M2K. Intente en 7 minutos: " + sRes);
		       	throw new Exception(" (25). [loginTSO] Error al conectarse a M2K. Error: " + sRes);
		    }
		  	
		  	sCadBusc = new String[] {"***", "***", "***"};
		  	nPosBusc = new int[] {161, 241, 81};

		  	enviaComando(null, true, timeOut, sCadBusc, nPosBusc);		  	
		  	sCadBusc = new String[] {"MENU PRINCIPAL", "Menu", "Menu"};
		  	nPosBusc = new int[] {21, 4, 3};

            nEnc = enviaComando(null, true, timeOut, sCadBusc, nPosBusc);

		    if(nEnc < 0)
		        throw new Exception(" (26). [loginTSO] Error en login: " + getSegmento(1,159));
		    
		  	sCadBusc = new String[] {"Menu", "Menu"};
            nPosBusc = new int[] {3, 4};            		    

            enviaComando("=6", true, timeOut);
            enviaComando(" ", true, timeOut);
            
            appLogger.info("tiempo login TSO: " + (System.currentTimeMillis() - inicio ));
            return true;
        }
    }
	
	
    /** Borra un parametro de la terminal
     * @param cord la cordena de la pantalla en donde se ejecuta el comando
     * @param tam tamanio del parametro */
    public void borraParametro(int cord, int tam) throws Exception {
	    synchronized(Thread.currentThread()) {
	    	StringBuilder sbParam = new StringBuilder();
	    	for(int i=0; i<tam; i++)
	    		sbParam.append(' ');
	    	rw3270.getField(cord).setData(sbParam.toString());
	    }	    
    }
    
    /** Limpia los parametros y la salida de la pantalla
     * @throws Exception
     */
    public boolean limpiaPantalla() throws Exception {
	    synchronized(Thread.currentThread()) {
	    	rw3270.clear();
	    	espera(timeOut);
	    	
	    	rw3270.clear();
	    	espera(timeOut);
            return true;
	    }	    
    }

    public boolean limpiaPantallaLogin() throws Exception {
	    synchronized(Thread.currentThread()) {
	    	rw3270.clearLogin();  	
	    	espera();
            return true;
	    }	    
    }

    /** Avanza a la siguiente pantalla de resultados
     * @throws Exception
     */
    public void avanzaPantalla(long timeOutComando) throws Exception {
	    synchronized(Thread.currentThread()) {
	        rw3270.PF(RW3270.PF8);
	    	if(timeOutComando > 0)
	    		espera(timeOutComando);
	    	else
	    		espera(timeOut);
	    }	    
    }
    
    public void verificaTiempoRespuesta(long ini, long nTiempoEspera) throws Exception {
    	if(System.currentTimeMillis()-ini>nTiempoEspera)
    		throw new IOHTimeOutException("(27). No se obtuvo respuesta de M2K durante "+(nTiempoEspera/1000)+"s.");
    }    

	protected void espera() throws Exception{
		synchronized(Thread.currentThread()) {
		int i, t;
		RW3270Field field = null;
		for(t=0; t<3; t++) {
			for(i=0; i<50; i++){
				if(nStatus==RWTnAction.READY)
					break;
				Thread.sleep(40);
			}
			if(i>=50)
				throw new IOHTimeOutNoLockException("(28). No se obtuvo respuesta de M2K.");
			for(i=0; i<50; i++){
				if((field=rw3270.getField())!=null)
					if(!field.isProtected())
						break;
				Thread.sleep(40);
			}
			if(i<50)
				break;
			rw3270.enter();			
	    }
		if(t>=3)
			throw new IOHTimeOutNoLockException("(29). No se obtuvo respuesta de M2K.");
		verificaLoginTimeOut();
		}
	}

	protected void espera(long nTimeOut) throws Exception{
		synchronized(Thread.currentThread()) {
		int i = 0;
		if(nTimeOut > 0) {
		  while(i <= nTimeOut){
			if(nStatus==RWTnAction.READY)
					break;
			Thread.sleep(10);
			i += 10;
	      }
		  if(i>=nTimeOut)
			throw new IOHTimeOutException("(30). No se obtuvo respuesta de M2K durante "+(nTimeOut/1000)+"s.");
		}
	  verificaLoginTimeOut();
	  }
	}

    /** Envia un comando a la terminal esperando a que aparezca alguna cadena  
     *  de parametro en la posicion especificada
     * @param nTimeOut 			Tiempo maximo de espera    
     * @param sCadBusc 			Cadenas que deben aparecer
     * @param cord 				Posiciones en la pantalla
     * **/
	protected int espera(long nTimeOut, String[] sCadBusc, int[] cord) throws Exception{
		synchronized(Thread.currentThread()) {
			int i = 0, n = -1;
			String sDisplay;			
			while(i <= nTimeOut){
				sDisplay = new String(rw3270.getDisplay());
				for(n=0; n<sCadBusc.length; n++) {
					if(sDisplay.indexOf(sCadBusc[n]) == cord[n])
						return n;
				}
				Thread.sleep(20);
				i += 20;
			}
			if(i>=nTimeOut)
				throw new IOHTimeOutException("(31). No se obtuvo respuesta de M2K durante "+(nTimeOut/1000)+"s.");
			return -1;
		}
	}

	
	public String getMsgError(String sMapa){
		MapaPantalla mapa = (MapaPantalla)mapas.get(sMapa);
		return "<ERROR><ErrNum>" + mapa.nError + "</ErrNum>" +  
				"<ErrMsg>" + mapa.sMensajeError + "</ErrMsg></ERROR>\r\n";	
	}
	
	public int numError(String sMapa){
		MapaPantalla mapa = (MapaPantalla)mapas.get(sMapa);
		return mapa.nError;
	}
	
	public String msgError(String sMapa){
		MapaPantalla mapa = (MapaPantalla)mapas.get(sMapa);
		return mapa.sMensajeError;	
	}

	public boolean verificaNuevaPantalla(String sMapa) throws Exception {
		MapaPantalla mapa = (MapaPantalla)mapas.get(sMapa);
		return mapa.verificaNuevaPantalla(this);	
	}

	public void verificaErrorInesperado() throws Exception {
		String sRes = getSegmento(1761, 9);
		if(sRes.trim().contains("DFH")) {
			sRes += " " + getSegmento(1770, 69).trim() + " " + getSegmento(1841, 78).trim();
			cierraConexion();
			throw new IOHUnexpectedScreenException("(43). Error inesperado de M2k: " + sRes);
		}
	}

    /* ******************** CAMBIOS DE SOBRE-ESCRITURA ******************** */
    public ManagedConnectionImpl(){}

    public String getHost() {return host;}
    public void setHost(String host) {this.host = host;}
    public Integer getPuerto() {return puerto;}
    public void setPuerto(Integer puerto) {this.puerto = puerto;}
    public String getCics() {return cics;}
    public void setCics(String cics) {this.cics = cics;}
    public String getCmdLogin() {return cmdLogin;}
    public void setCmdLogin(String cmdLogin) {this.cmdLogin = cmdLogin;}
    public String getUsuario() {return usuario;}
    public void setUsuario(String usuario) {this.usuario = usuario;}
    public String getClave() {return clave;}
    public void setClave(String clave) {this.clave = clave;}
    public String getTransaccion() {return transaccion;}
    public void setTransaccion(String transaccion) {this.transaccion = transaccion;}
    public String getRegion() {return region;}
    public void setRegion(String region) {this.region = region;}
    public long getTimeOut() {return timeOut;}
    public void setTimeOut(long timeOut) {this.timeOut = timeOut;}
    public Hashtable<String, MapaPantalla> getMapas() {return mapas;}
    public void setMapas(Hashtable<String, MapaPantalla> mapas) {this.mapas = mapas;}
    public String getsLogin() {return sLogin;}
    public void setsLogin(String sLogin) {this.sLogin = sLogin;}

    protected static final long LOGIN_TIME_OUT = 15000L;
    protected long tiempoEjecucion = 0;
    protected boolean bLogin = false;
    protected long inicioLogin = 0;

    /**
     * Obtiene la posicion (coordenada) en la cadena de display. Se debe
     * considerar que la pantalla se define con un tama&ntilde;o de 24*80
     *
     * @param linea - la linea en la pantalla (de 1 a 24)
     * @param col - la columna en la pantalla (de 1 a 80)
     * @return La coordenada en display o -1 si se rebasan los limites
     */
    public short getCoordenada(int linea, int col) {
        if ((linea < 1 || linea > 24) || (col < 1 || col > 80)) {
            return -1;
        }
        return (short) (((linea - 1) * 80) + (col - 1));
    }

    /**
     * Obtiene la posicion (coordenada) en la cadena de display basado en el
     * texto a buscar.
     *
     * @param texto Texto a buscar (sensible a mayusculas)
     * @return La coordenada en display o -1 si no existe el texto o el texto
     * esta vacio o nulo
     */
    public short getCoordenada(String texto) {
        if (texto == null || texto.trim().isEmpty() || !rw3270.contains(texto)) {
            return -1;
        }
        String display = new String(rw3270.getDisplay());
        return (short) display.indexOf(texto);
    }

    public boolean isConnected() {
        if (nStatus != RWTnAction.DISCONNECTED_BY_REMOTE_HOST
                && nStatus != RWTnAction.CONNECTION_ERROR) {
            try {
                rw3270.clear();
                enviaComando(-1, null, true, RW3270.PF5, 1000);
                return true;
            } catch (Exception ex) {
                appLogger.warn("Not connected: " + ex.toString());
                cierraConexion();
            }
        }
        return false;
    }

    public String toStringData() {
        String statusType;
        switch (nStatus) {
            case RWTnAction.DISCONNECTED_BY_REMOTE_HOST:
                statusType = "DISCONNECTED_BY_REMOTE_HOST";
                break;
            case RWTnAction.CONNECTION_ERROR:
                statusType = "CONNECTION_ERROR";
                break;
            case RWTnAction.X_WAIT:
                statusType = "X_WAIT";
                break;
            case RWTnAction.READY:
                statusType = "READY";
                break;
            default:
                statusType = "UNKNOWN_STATUS";
        }
        return "ManagedConnectionImpl {nStatus=" + statusType + " (" + nStatus + ")"
                + ", host=" + host + ", puerto=" + puerto
                + ", cics=" + cics + ", transaccion=" + transaccion
                + ", usuario=" + usuario + ", region=" + region
                + ", tiempoEjecucion= " + tiempoEjecucion + "}";
    }

    public void verificaLoginTimeOut() throws Exception {
        if (bLogin && (System.currentTimeMillis() - inicioLogin) >= LOGIN_TIME_OUT) {
            throw new IOHTimeOutException("(44). Se ha superado el tiempo limite de login de " + LOGIN_TIME_OUT + " ms");
        }
    }

    public void verificaExecTimeOut(long inicioEjecucion) throws Exception {
        verificaExecTimeOut(inicioEjecucion, -1);
    }

    public void verificaExecTimeOut(long inicioEjecucion, long execTimeOut) throws Exception {
        long nTimeOut = (execTimeOut > 0) ? execTimeOut : timeOut;
        if (nTimeOut > 0) {
            if ((System.currentTimeMillis() - inicioEjecucion) >= nTimeOut) {
                throw new IOHTimeOutException("(45). Se ha superado el tiempo limite de ejecucion de " + nTimeOut + " ms");
            }
        }
    }
}
