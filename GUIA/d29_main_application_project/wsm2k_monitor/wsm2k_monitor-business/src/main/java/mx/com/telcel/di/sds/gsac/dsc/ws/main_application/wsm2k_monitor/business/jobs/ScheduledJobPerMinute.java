package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class ScheduledJobPerMinute extends QuartzJobBean{

	private ReseteadorIndicadoresMinuto reseteadorIndicadoresMinuto;

	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		reseteadorIndicadoresMinuto.reiniciaIndicadoresPorMinuto();
	}

	public ReseteadorIndicadoresMinuto getReseteadorIndicadoresMinuto() {
		return reseteadorIndicadoresMinuto;
	}

	public void setReseteadorIndicadoresMinuto(
			ReseteadorIndicadoresMinuto reseteadorIndicadoresMinuto) {
		this.reseteadorIndicadoresMinuto = reseteadorIndicadoresMinuto;
	}
	
	
	
	
}
