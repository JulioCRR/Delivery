package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.ResponseAnalyzer;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class ScheduledJobReports extends QuartzJobBean{

	private static final Logger LOG = LoggerFactory.getLogger(ResponseAnalyzer.class);
	private ReporteadorDiarioIncidencias reporteadorDiarioIncidencias;


	
	
	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		LOG.error("enviando informe diario de incidencias del dia ");
		reporteadorDiarioIncidencias.enviaReporteDiario();
	}

	public ReporteadorDiarioIncidencias getReporteadorDiarioIncidencias() {
		return reporteadorDiarioIncidencias;
	}

	public void setReporteadorDiarioIncidencias(
			ReporteadorDiarioIncidencias reporteadorDiarioIncidencias) {
		this.reporteadorDiarioIncidencias = reporteadorDiarioIncidencias;
	}

	

	
	
}
