package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;


import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class SheduledJobInstances extends QuartzJobBean{
	
	
	private static final Logger LOG = LoggerFactory.getLogger(SheduledJobInstances.class);
	private ValidadorInstancias validadorInstancias;
	
	
	
	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		//LOG.info("validando insntacias");
		validadorInstancias.validaInstancias();
	}



	public ValidadorInstancias getValidadorInstancias() {
		return validadorInstancias;
	}



	public void setValidadorInstancias(ValidadorInstancias validadorInstancias) {
		this.validadorInstancias = validadorInstancias;
	}
	
	
	
}
