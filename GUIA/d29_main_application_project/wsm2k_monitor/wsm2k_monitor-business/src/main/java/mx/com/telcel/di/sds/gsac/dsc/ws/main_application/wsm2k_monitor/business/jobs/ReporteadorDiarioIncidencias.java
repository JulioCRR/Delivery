package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import java.util.Date;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.CargadorCatalogoErrores;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.MailManagerMonitor;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class ReporteadorDiarioIncidencias {

	private static final Logger LOG = LoggerFactory.getLogger(ReporteadorDiarioIncidencias.class);
	@Autowired
	private MailManagerMonitor mailManager;
	private String sender;
	@Autowired
	private CargadorCatalogoErrores cargadorCatalogoErrores;
	
	public void enviaReporteDiario(){
		LOG.error("enviando reporte diario");
		String reporte=cargadorCatalogoErrores.reporteToTable();
		String mensaje=" Incidencias presentadas en el dia "
									+new Date(System.currentTimeMillis()).toLocaleString() +
									"<br>Peticiones registradas en el dia : "+UtilMonitoreo.getPeticionesPorDia() +"<br>"+
									"Peticiones registradas ultima hora : "+UtilMonitoreo.getPeticionesUltimaHora() +"<br>"+
									reporte;
		mailManager.sendMimeMail(sender,UtilMonitoreo.getDestinatariosAlertas(),
				 "Incidencias WSM2K. Reporte del dia",mensaje );
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}
	
	
	
}
