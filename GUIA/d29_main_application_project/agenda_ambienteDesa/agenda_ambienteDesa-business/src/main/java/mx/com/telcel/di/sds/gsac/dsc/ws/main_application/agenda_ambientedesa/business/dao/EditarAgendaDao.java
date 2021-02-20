package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.Repository.AgendaServicesImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.PropertiesModel;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.ServicesPropertiesFuncionTo;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.AgendaDesarrolloWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.PermisosDesarrolloWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.utils.EntityManagerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class EditarAgendaDao {
  private static final Logger LOG = LoggerFactory.getLogger(EditarAgendaDao.class);
  
  @Autowired
  @Qualifier("entityManagerFactory")
  private EntityManagerFactory entityManagerFactory;
  
  private final AgendaDao agendaDao;
  
  @Autowired
  private ServicesPropertiesFuncionTo servicesWS;
  
  @Autowired
  private EntityManagerUtil emUtil;
  
  @Autowired
  public EditarAgendaDao(@Lazy AgendaDao agendaDao) {
    this.agendaDao = agendaDao;
  }
  
  //@Autowired
  //private AgendaServicesImp agendaIm;
  
  public boolean insertarIP(int folio, String ip) {
    List<String> trans = this.agendaDao.getPemisosDesa(Integer.valueOf(folio), 0);
    try {
      EntityManager em = this.entityManagerFactory.createEntityManager();
      EntityTransaction tx = em.getTransaction();
      tx.begin();
      for (String t : trans) {
        PermisosDesarrolloWSM2K permisos = new PermisosDesarrolloWSM2K();
        permisos.setIpDesa(ip);
        permisos.setTransDesa(t);
        permisos.setAgenda(new AgendaDesarrolloWSM2K(folio));
        em.persist(permisos);
      } 
      em.flush();
      em.clear();
      tx.commit();
      return true;
    } catch (Exception ex) {
      LOG.error("Error al insertar la ip ", ex);
      return false;
    } 
  }
  
  public boolean insertarTrans(int folio, List<String> trans) {
    List<String> ips = this.agendaDao.getPemisosDesa(Integer.valueOf(folio), 1);
    try {
      EntityManager emBatch = this.entityManagerFactory.createEntityManager();
      EntityTransaction tx = emBatch.getTransaction();
      tx.begin();
      for (String ip : ips) {
        for (String t : trans) {
          PermisosDesarrolloWSM2K permisos = new PermisosDesarrolloWSM2K();
          permisos.setIpDesa(ip);
          permisos.setTransDesa(t);
          permisos.setAgenda(new AgendaDesarrolloWSM2K(folio));
          emBatch.persist(permisos);
        } 
      } 
      emBatch.flush();
      emBatch.clear();
      tx.commit();
      return true;
    } catch (Exception ex) {
      LOG.error("Error al insertar las transaciones ", ex);
      return false;
    } 
  }
  
  public boolean insertaIps(int folio, List<String> ips) {
    List<String> trans = this.agendaDao.getPemisosDesa(Integer.valueOf(folio), 0);
    try {
      EntityManager em = this.entityManagerFactory.createEntityManager();
      EntityTransaction tx = em.getTransaction();
      tx.begin();
      LOG.info("INICIANDO CARGA DE IPS ==============================================================");
      for (String t : trans) {
        for (String ip : ips) {
          PermisosDesarrolloWSM2K permisos = new PermisosDesarrolloWSM2K();
          permisos.setIpDesa(ip);
          permisos.setTransDesa(t);
          LOG.info("INSERTING AGENDA DESA");
          permisos.setAgenda(new AgendaDesarrolloWSM2K(folio));
          em.persist(permisos);
        } 
      } 
      em.flush();
      em.clear();
      tx.commit();
      return true;
    } catch (Exception ex) {
      LOG.error("Error al insertar ip", ex);
      return false;
    } 
  }
  
  public boolean deleteAgendaById(int folio) {
    try {
      EntityManager em = this.entityManagerFactory.createEntityManager();
      EntityTransaction tx = em.getTransaction();
      AgendaDesarrolloWSM2K agenda = (AgendaDesarrolloWSM2K)em.find(AgendaDesarrolloWSM2K.class, Integer.valueOf(folio));
      tx.begin();
      em.remove(agenda);
      em.flush();
      tx.commit();
      return true;
    } catch (Exception ex) {
      LOG.error("ERROR AL ELIMINAR LA SOLICITUD ", ex);
      return false;
    } 
  }
  
  public boolean updateCatalogoWS() {
    List<PropertiesModel> model = this.servicesWS.readProperties();
    EntityManager em = this.emUtil.getEntityManagerInformix();
    try {
      for (PropertiesModel p : model) {
        LOG.info("SE edita la transaccion" + p.getTransaccion() + "   " + p.getNombreComponente());
        em.clear();
        em.getTransaction().begin();
        int row = em.createQuery("UPDATE M2kCatTransaccionesFront f SET f.nombrePantalla= :pantalla WHERE f.transaccion= :transaccion ").setParameter("pantalla", p.getNombreComponente()).setParameter("transaccion", p.getTransaccion()).executeUpdate();
        em.getTransaction().commit();
        LOG.info("SE MODIFICARON" + row);
      } 
      return true;
    } catch (Exception ex) {
      LOG.error("ERROR AL ELIMINAR LA SOLICITUD ", ex);
      return false;
    } 
  }
}
