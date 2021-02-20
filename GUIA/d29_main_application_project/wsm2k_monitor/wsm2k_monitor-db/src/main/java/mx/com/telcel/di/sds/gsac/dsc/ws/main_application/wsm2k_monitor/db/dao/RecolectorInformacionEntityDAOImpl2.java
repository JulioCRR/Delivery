/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.dao;






import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.RecolectorInformacionEntity;
//import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.UtilMonitoreo;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Clase que se encarga de la interaccion en BD con la tabla m2k_info_registro
 * */
public class RecolectorInformacionEntityDAOImpl2 /*implements RecolectorInformacionEntityDAO2*/ {
	
	private static final Logger LOG = LoggerFactory.getLogger(RecolectorInformacionEntityDAOImpl2.class);
	private SessionFactory sessionFactory;

	
	public boolean save(RecolectorInformacionEntity registro){
		LOG.info("Inicio de guardado de registro");
		long tiempoInicial=System.currentTimeMillis();
		try{
			Session session=this.sessionFactory.openSession();		
			//session.merge(registro);
			session.save(registro);
			session.flush();
			session.close();
			LOG.info("fin de guardado de registro");
			LOG.info("s:"+(System.currentTimeMillis()-tiempoInicial));
			return true;
		}
		catch(Exception e){
			LOG.error("Ocurrio una excepcion al guardar el registro",e);
			LOG.info("se:"+(System.currentTimeMillis()-tiempoInicial));
			return false;
		}
	}
	
	/**
	 * M�todo que se encarga de guardar en BD un registro en la tabla m2k_info_registro 
	 * @param registro a persistir en BD
	 * @return true si exito en guardar el registro, de lo contrario false   
	 * */
	//@Transactional
	public boolean saveV2(RecolectorInformacionEntity registro){
		Session session=null;
		//long tiempoInicial=0;
		//System.out.println("guardando registro con @Transactional");
		LOG.error("guardando desde saveV2 - "+registro.getPeticionId() );
                try{
			//tiempoInicial=System.currentTimeMillis();
			session=this.sessionFactory.openSession();
			session.save(registro);
			session.flush();
			session.close();
			//UtilMonitoreo.setMensajesGuardados(1+UtilMonitoreo.getMensajesGuardados() );
			//UtilMonitoreo.setMensajesGuardadosPorHora( 1+ UtilMonitoreo.getMensajesGuardadosPorHora() );
			//UtilMonitoreo.setMensajesGuardadosPorDia(1+UtilMonitoreo.getMensajesGuardadosPorDia()  );
			//UtilMonitoreo.setHoraUltimoMensajeGuardado(new Date(System.currentTimeMillis()));
			//UtilMonitoreo.setUltimoMensajeGuardado(registro.getPeticionId() );
			//LOG.error("tiempo total guardado: "+(tiempoInicial-System.currentTimeMillis()));
			return true;
		}
		catch(HibernateException e){
			if(session!=null && session.isOpen()){
				session.close();
			}
			LOG.error("Ocurrio una excepcion al guardar el registro: "+registro.getPeticionId(),e);
			throw new HibernateException("HibernateException al guardar el registro. \n"+
										  e.getCause()+". \n"+
										  e.getMessage());
		}
		catch(Exception e){
			if(session!=null && session.isOpen()){
				session.close();
			}
			LOG.error("Ocurrio una excepcion al guardar el registro: "+registro.getPeticionId(),e);
			return false;
		}
	}
	
	
	/*public boolean saveV2(RecolectorInformacionEntity registro){
		Session session=null;
		try{
			
			session=this.sessionFactory.openSession();
			
			
			Transaction tx1 = session.beginTransaction();
			//Session session1 = sessionFactory.openSession();
			session.save(registro);
			tx1.commit();
			session.flush();
			session.close();
			
			UtilMonitoreo.setMensajesGuardados(1+UtilMonitoreo.getMensajesGuardados() );
			UtilMonitoreo.setMensajesGuardadosPorDia(1+UtilMonitoreo.getMensajesGuardadosPorDia()  );
			UtilMonitoreo.setHoraUltimoMensajeGuardado(new Date(System.currentTimeMillis()));
			UtilMonitoreo.setUltimoMensajeGuardado(registro.getPeticionId() );
			return true;
		}
		catch(HibernateException e){
			if(session!=null && session.isOpen()){
				session.close();
			}
			LOG.error("Ocurrio una excepcion al guardar el registro: "+registro.getPeticionId(),e);
			throw new HibernateException("HibernateException al guardar el registro. \n"+
										  e.getCause()+". \n"+
										  e.getMessage());
		}
		catch(Exception e){
			if(session!=null && session.isOpen()){
				session.close();
			}
			LOG.error("Ocurrio una excepcion al guardar el registro: "+registro.getPeticionId(),e);
			return false;
		}
	}
	*/
	
	public RecolectorInformacionEntity findById(String id){
		//LOG.info("Inicio de busqueda de registro: "+id);
		RecolectorInformacionEntity registro=null;
		long tiempoInicial=System.currentTimeMillis();
		try{
			Session session=this.sessionFactory.openSession();		
			registro=(RecolectorInformacionEntity)session.get(RecolectorInformacionEntity.class,id);
			session.flush();
			session.close();
			//LOG.info("fin de busqueda de registro");
			LOG.info("f:"+(System.currentTimeMillis()-tiempoInicial));
			return registro;
		}
		catch(Exception e){
			LOG.error("Ocurrio una excepcion al buscar el registro con id: "+id,e);
			LOG.info("fe:"+(System.currentTimeMillis()-tiempoInicial));
			return registro;
		}
	}
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	
	
	
}
