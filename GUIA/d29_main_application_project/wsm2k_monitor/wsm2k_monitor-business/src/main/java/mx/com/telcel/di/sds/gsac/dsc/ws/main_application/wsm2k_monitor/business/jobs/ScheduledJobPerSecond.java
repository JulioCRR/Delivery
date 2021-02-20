package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class ScheduledJobPerSecond extends QuartzJobBean{

	private RefrescadorReportes refrescadorReportes ;

	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		refrescadorReportes.refrescaReportes();
	}
	
	
	public RefrescadorReportes getRefrescadorReportes() {
		return refrescadorReportes;
	}

	public void setRefrescadorReportes(RefrescadorReportes refrescadorReportes) {
		this.refrescadorReportes = refrescadorReportes;
	}
	
	
	
}
