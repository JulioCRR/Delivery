/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.jobs;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation.MonitoreoDepthQueueLogs;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 *
 * @author Praxis
 */
public class ScheduleJobMonitorQueue extends QuartzJobBean{
    private MonitoreoDepthQueueLogs monitoreoDepthQueueLogs;

	@Override
	protected void executeInternal(JobExecutionContext arg0)
			throws JobExecutionException {
		monitoreoDepthQueueLogs.getQueueDepth();
	}

	public MonitoreoDepthQueueLogs getMonitoreoDepthQueueLogs() {
		return monitoreoDepthQueueLogs;
	}

	public void setMonitoreoDepthQueueLogs(
			MonitoreoDepthQueueLogs monitoreoDepthQueueLogs) {
		this.monitoreoDepthQueueLogs = monitoreoDepthQueueLogs;
	}
}