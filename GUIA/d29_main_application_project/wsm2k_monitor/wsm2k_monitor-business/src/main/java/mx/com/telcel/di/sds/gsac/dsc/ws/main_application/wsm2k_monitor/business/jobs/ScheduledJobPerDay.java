package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class ScheduledJobPerDay extends QuartzJobBean{

	private ReseteadorIndicadoresDia reseteadorIndicadoresDia;

	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		reseteadorIndicadoresDia.reiniciaIndicadoresPorDia();
	}

	public void setReseteadorIndicadoresDia(
			ReseteadorIndicadoresDia reseteadorIndicadoresDia) {
		this.reseteadorIndicadoresDia = reseteadorIndicadoresDia;
	}
	
	
	
	
}
