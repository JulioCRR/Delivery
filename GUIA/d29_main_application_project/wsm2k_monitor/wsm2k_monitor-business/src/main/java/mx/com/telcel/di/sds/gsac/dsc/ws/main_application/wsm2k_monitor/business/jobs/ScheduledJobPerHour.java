package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class ScheduledJobPerHour extends QuartzJobBean {

	private ReseteadorIndicadoresHora reseteadorIndicadoresHora;

	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		reseteadorIndicadoresHora.reiniciaIndicadoresPorHora();
	}

	
	public void setReseteadorIndicadoresHora(
			ReseteadorIndicadoresHora reseteadorIndicadoresHora) {
		this.reseteadorIndicadoresHora = reseteadorIndicadoresHora;
	}

	
	
}
