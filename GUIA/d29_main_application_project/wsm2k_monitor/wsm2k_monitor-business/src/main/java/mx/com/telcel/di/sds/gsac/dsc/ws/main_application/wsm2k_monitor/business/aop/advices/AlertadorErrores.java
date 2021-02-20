/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.aop.advices;

import java.io.IOException;

import javax.jms.JMSException;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RegistroAlertas;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.exception.ExternalException;
//import mx.com.telcel.services.model.mobileReports.GenericParser;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.MailManagerMonitor;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;

import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;

import com.ibm.mq.MQException;
import java.util.Date;

public class AlertadorErrores implements ThrowsAdvice {

	private static final Logger LOG = LoggerFactory.getLogger(AlertadorErrores.class);
	@Autowired
	private MailManagerMonitor mailManager;
	private String sender;
	
	/*@Autowired
	private GPIOSample publisher;
	*/
	/*@Autowired
	private GenericParser parser;
	*/
	@Autowired
	private RegistroAlertas registroAlertas;
	
	public void afterThrowingIllegalArgument(IllegalArgumentException ex) {
		LOG.error("se detecto un IllegalArgumentException. Se enviara un correo de notificacion",ex);
	}
	
	public void afterThrowingArithmeticException(ArithmeticException ex) {
		LOG.error("se detecto un ArithmeticException. Se enviara un correo de notificacion",ex);
	}
	
	public void afterThrowingJMSException(JMSException ex) {
		LOG.error("se detecto un JMSException. Se enviara un correo de notificacion",ex);
		/*mailManager.sendMail(sender,destinatarios,
				 "Alerta M2K_Asincrono. JMSException",
				 ex.getMessage()+"."+ ex.getCause() );*/
	}
	
	public void afterThrowingIOException(IOException ex) {
		LOG.error("se detecto un IOException. Se enviara un correo de notificacion",ex);
		/*mailManager.sendMail(sender,destinatarios,
				 "Alerta M2K_Asincrono. IOException",
				 ex.getMessage()+"."+ ex.getCause() );*/
	}
	
	public void afterThrowingClassNotFoundException(ClassNotFoundException ex) {
		LOG.error("se detecto un ClassNotFoundException. Se enviara un correo de notificacion",ex);
		/*mailManager.sendMail(sender,destinatarios,
				 "Alerta M2K_Asincrono. ClassNotFoundException",
				 ex.getMessage()+"."+ ex.getCause() );*/
	}
	
	public void afterThrowingHibernateException(HibernateException ex) {
		long horaErrorActual=System.currentTimeMillis();
		UtilMonitoreo.setContadorHibernateException(1+ UtilMonitoreo.getContadorHibernateException() );
		if(horaErrorActual - UtilMonitoreo.getHoraUltimoError() > UtilMonitoreo.getTiempoMaximoParaAlerta() ){
			UtilMonitoreo.setHoraUltimoError(System.currentTimeMillis());
			mailManager.sendMail(sender,UtilMonitoreo.getDestinatariosAlertas() ,
					 "Alerta M2K_Asincrono. HibernateException",
					 ex.getMessage()+"."+ ex.getCause() +
					 "\nHibernateException acumuladas desde ultima alerta: "+ UtilMonitoreo.getContadorHibernateException() );
			UtilMonitoreo.setContadorHibernateException(0);
		}
	}
	
	public void afterThrowingMQException(MQException ex) {
		LOG.error("se detecto un MQException. Se enviara un correo de notificacion",ex);
		/*mailManager.sendMail(sender,destinatarios,
				 "Alerta M2K_Asincrono. MQException",
				 ex.getMessage()+"."+ ex.getCause() );*/
	}
	
	public void afterThrowingExternalException(ExternalException ex) {
		LOG.error("se detecto un ExternalException por incidencias acumulados. Se enviara un correo de notificacion",ex);
		long horaErrorActual=System.currentTimeMillis();
		LOG.error("horaErrorActual: "+horaErrorActual);
		LOG.error("diferencia: "+ (horaErrorActual - UtilMonitoreo.getHoraUltimoErrorExterno()));
		
                int horaActual=new Date(System.currentTimeMillis()).getHours();
                if( horaActual>0 && horaActual<23 ){
                    if(horaErrorActual - UtilMonitoreo.getHoraUltimoErrorExterno() > UtilMonitoreo.getTiempoMaximoParaAlerta() ){
			UtilMonitoreo.setHoraUltimoErrorExterno(System.currentTimeMillis());
			
			LOG.error("se enviara correo a: "+ex.getRespuestaError().getDestinatariosAlertas());
			LOG.error("diferencia: "+ (horaErrorActual - UtilMonitoreo.getHoraUltimoErrorExterno()));
			//mailManager.sendMimeMail(sender,UtilMonitoreo.getDestinatariosAlertas(),"Incidencias WSM2K",ex.getMessage() );
			mailManager.sendMimeMail(sender,ex.getRespuestaError().getDestinatariosAlertas() ,"Incidencias WSM2K: "+ex.getRespuestaError().getMensaje(),ex.getMessage() );
			registroAlertas.getAlertas().addFirst( ex.getRespuestaError() );
                    }
                }
	}

	 public void queueMaxDepthAlerta(Integer queueDepth ) {
		LOG.error("se detecto encolamiento de logs en queue . Se enviara un correo de notificacion");
		mailManager.sendMail(sender,UtilMonitoreo.getDestinatariosAlertas(),
				 "Alerta Encolamiento Queue.",
				" El Número de Mensajes en Queue Actualmente es: " + queueDepth +"." );
	}
	
	public void setSender(String sender) {
		this.sender = sender;
	}


	
	
	
	
}
