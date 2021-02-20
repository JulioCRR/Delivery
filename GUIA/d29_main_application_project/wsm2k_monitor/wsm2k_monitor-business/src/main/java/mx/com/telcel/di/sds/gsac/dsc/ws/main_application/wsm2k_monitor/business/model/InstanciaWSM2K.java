package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model;

import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class InstanciaWSM2K {
    
         private static final Logger LOG = LoggerFactory.getLogger(InstanciaWSM2K.class);
    

      //private final String URL_PROD="/telcel-ws-web-1.0.0-Telcel-01/services/ControlWebService";
        private String URL_DESA="/telcel-ws-web-1.0.0-Telcel-01/services/ControlWebService";
        private String URL_PROD="/telcel-ws-web/services/ControlWebService";
        private String endPoint;
	private int id;
	private Long connectionTime;
	private Long readTime;
	private boolean statusValidation;
	private String description;
	private long intentosFallidos;
	private long intentosExitosos;
	private String host;
	private int puerto;
	private Date horaUltimoExito;
	private Date horaUltimoError;
	private long horaUltimaAlerta;
	private String horaUltimoExitoString;
	private String horaUltimoErrorString;
        private short habilitada;
        private String instancia;
	
	private StatusAlertInstancia statusAlert;
	
	
	
	
	public InstanciaWSM2K() {
		super();
		// TODO Auto-generated constructor stub
	}




	public StatusAlertInstancia getStatusAlert() {
		return statusAlert;
	}




	public void setStatusAlert(StatusAlertInstancia statusAlert) {
		this.statusAlert = statusAlert;
	}




	public InstanciaWSM2K(int id, String host, int puerto) {
		super();
		this.id = id;
		this.host = host;
		this.puerto = puerto;
		StringBuilder sb=new StringBuilder();
		sb.append("http://");sb.append(this.host);sb.append(":");
		sb.append(this.puerto);sb.append(getEndPointDesa(host));
		this.endPoint=sb.toString();
                StringBuilder sbIns=new StringBuilder();
                sbIns.append(this.host).append(":").append(this.puerto);
                this.instancia=sbIns.toString();
	}
        
        public InstanciaWSM2K(int id, String host, int puerto, short habilitada) {
		super();
		this.id = id;
		this.host = host;
		this.puerto = puerto;
                this.habilitada = habilitada;
		StringBuilder sb=new StringBuilder();
		sb.append("http://");sb.append(this.host);sb.append(":");
		sb.append(this.puerto);sb.append( getEndPointDesa(host) );
		this.endPoint=sb.toString();
                StringBuilder sbIns=new StringBuilder();
                sbIns.append(this.host).append(":").append(this.puerto);
                this.instancia=sbIns.toString();
	}
        
        
        public String getEndPointDesa(String host){
           if(host.equals("191.9.3.120")){
                this.URL_PROD=this.URL_DESA;
           }
           return this.URL_PROD;
        }




	public int getId() {
		return id;
	}




	public void setId(int id) {
		this.id = id;
	}




	public long getIntentosFallidos() {
		return intentosFallidos;
	}




	public void setIntentosFallidos(long intentosFallidos) {
		this.intentosFallidos = intentosFallidos;
	}




	public long getIntentosExitosos() {
		return intentosExitosos;
	}




	public void setIntentosExitosos(long intentosExitosos) {
		this.intentosExitosos = intentosExitosos;
	}




	public InstanciaWSM2K(String endPoint) {
		super();
		this.endPoint = endPoint;
	}
	
	
	
	
	public String getEndPoint() {
		return endPoint;
	}




	public void setEndPoint(String endPoint) {
		this.endPoint = endPoint;
	}




	public Long getConnectionTime() {
		return connectionTime;
	}




	public void setConnectionTime(Long connectionTime) {
		this.connectionTime = connectionTime;
	}




	public Long getReadTime() {
		return readTime;
	}




	public void setReadTime(Long readTime) {
		this.readTime = readTime;
	}




	public boolean isStatusValidation() {
		return statusValidation;
	}




	public void setStatusValidation(boolean statusValidation) {
		this.statusValidation = statusValidation;
	}




	public String getDescription() {
		return description;
	}




	public void setDescription(String description) {
		this.description = description;
	}

	


	public String getHost() {
		return host;
	}




	public void setHost(String host) {
		this.host = host;
	}




	public int getPuerto() {
		return puerto;
	}




	public void setPuerto(int puerto) {
		this.puerto = puerto;
	}



	public Date getHoraUltimoExito() {
		return horaUltimoExito;
	}




	public void setHoraUltimoExito(Date horaUltimoExito) {
		this.horaUltimoExito = horaUltimoExito;
	}




	public Date getHoraUltimoError() {
		return horaUltimoError;
	}




	public void setHoraUltimoError(Date horaUltimoError) {
		this.horaUltimoError = horaUltimoError;
	}

	
	public long getHoraUltimaAlerta() {
		return horaUltimaAlerta;
	}




	public void setHoraUltimaAlerta(long horaUltimaAlerta) {
		this.horaUltimaAlerta = horaUltimaAlerta;
	}

	
	public String getHoraUltimoExitoString() {
		return horaUltimoExitoString;
	}


	public void setHoraUltimoExitoString(String horaUltimoExitoString) {
		this.horaUltimoExitoString = horaUltimoExitoString;
	}

        
	public String getHoraUltimoErrorString() {
		return horaUltimoErrorString;
	}


	public void setHoraUltimoErrorString(String horaUltimoErrorString) {
		this.horaUltimoErrorString = horaUltimoErrorString;
	}
        
        public short getHabilitada(){
            return habilitada;
        }
        
        public void setHabilitada(short habilitada) {
            this.habilitada = habilitada;
        }

        public String getURL_PROD() {
        return URL_PROD;
        }

    public String getInstancia() {
        return instancia;
    }

    public void setInstancia(String instancia) {
        this.instancia = instancia;
    }

    @Override
    public String toString() {
        return "InstanciaWSM2K{" + "URL_PROD=" + URL_PROD + ", endPoint=" + endPoint + ", id=" + id + ", connectionTime=" + connectionTime + ", readTime=" + readTime + ", statusValidation=" + statusValidation + ", description=" + description + ", intentosFallidos=" + intentosFallidos + ", intentosExitosos=" + intentosExitosos + ", host=" + host + ", puerto=" + puerto + ", horaUltimoExito=" + horaUltimoExito + ", horaUltimoError=" + horaUltimoError + ", horaUltimaAlerta=" + horaUltimaAlerta + ", horaUltimoExitoString=" + horaUltimoExitoString + ", horaUltimoErrorString=" + horaUltimoErrorString + ", habilitada=" + habilitada + ", instancia=" + instancia + ", statusAlert=" + statusAlert + '}';
    }
        
        
        
        

    

        
        
	
}
