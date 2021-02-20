package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class ScheduledJobPer5minutes extends QuartzJobBean{

	private ReseteadorIndicadores5Minutos reseteadorIndicadores5Minutos;

	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		reseteadorIndicadores5Minutos.reiniciaIndicadores5Minutos();
	}
	
	
	public ReseteadorIndicadores5Minutos getReseteadorIndicadores5Minutos() {
		return reseteadorIndicadores5Minutos;
	}

	public void setReseteadorIndicadores5Minutos(
			ReseteadorIndicadores5Minutos reseteadorIndicadores5Minutos) {
		this.reseteadorIndicadores5Minutos = reseteadorIndicadores5Minutos;
	}
	
	
	
	
}
