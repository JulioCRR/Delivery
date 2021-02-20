package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.business.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Usuario;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.utils.EntityManagerUtil;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.Peticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.PeticionAutorizador;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.ResponsableUsuarioCorp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudPeticion;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.entities.SolicitudUsuarioCorp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.peticiones_ws.db.model.WrapSolicitudPeticion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supaada
 */
@Service
@Transactional(noRollbackFor = NoResultException.class)
public class PeticionesWSDao {

    private static final Logger LOG = LoggerFactory.getLogger(PeticionesWSDao.class);

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private EntityManagerUtil emUtil;

    @Autowired
    private IPeticionesWSRepoPeticion repoPeticion;

    public ResponsableUsuarioCorp getRespUsuCorpByResponsable(Usuario usuario) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT r FROM ResponsableUsuarioCorp r WHERE r.responsable = :usuario", ResponsableUsuarioCorp.class)
                    .setParameter("usuario", usuario)
                    .getSingleResult();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public PeticionAutorizador getPeticionAutorizadorByUsuario(Usuario usuario) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT a FROM PeticionAutorizador a WHERE a.usuario = :usuario", PeticionAutorizador.class)
                    .setParameter("usuario", usuario)
                    .getSingleResult();
        } catch (NoResultException ex) {
        }
        return null;
    }

    // **************************************************
    // Solicitud Usuario Corporativo
    // **************************************************
    public ResponsableUsuarioCorp getRespUsuCorpByUsuarioCorp(String usuarioCorp) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT r FROM ResponsableUsuarioCorp r WHERE r.usuarioCorp = :usuarioCorp", ResponsableUsuarioCorp.class)
                    .setParameter("usuarioCorp", usuarioCorp)
                    .getSingleResult();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<SolicitudUsuarioCorp> getAllSolUsuCorpBySolicitanteAndUsuarioCorpAndEstatus(Usuario usuario, String usuarioCorp, List<Integer> listEstatus) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT s FROM SolicitudUsuarioCorp s WHERE s.solicitante = :usuario AND s.usuarioCorp = :usuarioCorp AND s.estatus IN :listEstatus", SolicitudUsuarioCorp.class)
                    .setParameter("usuario", usuario)
                    .setParameter("usuarioCorp", usuarioCorp)
                    .setParameter("listEstatus", listEstatus)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public SolicitudUsuarioCorp saveSolicitudUsuarioCorp(SolicitudUsuarioCorp solicitud) {
        try {
            em.clear();
            em.persist(solicitud);
            return solicitud;
        } catch (Exception ex) {
            LOG.error("Error al persistir la solicitud de usuario corporativo", ex);
        }
        return null;
    }

    public List<ResponsableUsuarioCorp> getAllRespUsuCorpByListUsuarioCorp(List<String> listUsuarioCorp) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT r FROM ResponsableUsuarioCorp r WHERE r.usuarioCorp IN :listUsuarioCorp", ResponsableUsuarioCorp.class)
                    .setParameter("listUsuarioCorp", listUsuarioCorp)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    // **************************************************
    // Solicitud Peticiones Web
    // **************************************************
    public List<SolicitudUsuarioCorp> getAllSolUsuCorpBySolicitanteAndEstatus(Usuario usuario, Integer estatus) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT s FROM SolicitudUsuarioCorp s WHERE s.solicitante = :usuario AND s.estatus = :estatus", SolicitudUsuarioCorp.class)
                    .setParameter("usuario", usuario)
                    .setParameter("estatus", estatus)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<ResponsableUsuarioCorp> getAllRespUsuCorpByResponsable(Usuario usuario) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT r FROM ResponsableUsuarioCorp r WHERE r.responsable = :usuario", ResponsableUsuarioCorp.class)
                    .setParameter("usuario", usuario)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<Peticion> getAllPeticionByIPAndNullSolicitud(List<String> listIP) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT DISTINCT p FROM Peticion p WHERE p.ip IN :listIP AND p.solicitudPeticion IS NULL", Peticion.class)
                    .setParameter("listIP", listIP)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<Peticion> getAllPeticionByIPAndEstatus(List<String> listIP, List<Integer> listEstatus) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT DISTINCT p FROM Peticion p WHERE p.ip IN :listIP AND p.estatus IN :listEstatus", Peticion.class)
                    .setParameter("listIP", listIP)
                    .setParameter("listEstatus", listEstatus)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<Usuario> getAllAutorizadorByNivel(List<Integer> listNivel) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT DISTINCT a.usuario FROM PeticionAutorizador a WHERE a.nivel IN :listNivel", Usuario.class)
                    .setParameter("listNivel", listNivel)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public boolean saveSolicitudPeticion(WrapSolicitudPeticion wrapSolicitud) throws Exception {
        EntityManager entityManager = emUtil.getEntityManager();
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            SolicitudPeticion solicitud = wrapSolicitud.getSolicitudPeticion();
            entityManager.persist(solicitud);
            if (solicitud.getId() == null) {
                throw new Exception("No se persistio la solicitud");
            }
            for (Peticion peticion : wrapSolicitud.getListPeticion()) {
                peticion.setSolicitudPeticion(solicitud);
                entityManager.persist(peticion);
                if (peticion.getId() == null) {
                    throw new Exception("No se persistio la peticion");
                }
            }
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
            return true;
        } catch (Exception ex) {
            entityManager.getTransaction().rollback();
            throw ex;
        }
    }

    // **************************************************
    // List Solicitudes - Usuario Corporativo
    // **************************************************
    public List<SolicitudUsuarioCorp> getAllSolUsuCorpBySolicitante(Usuario usuario) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT s FROM SolicitudUsuarioCorp s WHERE s.solicitante = :usuario", SolicitudUsuarioCorp.class)
                    .setParameter("usuario", usuario)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<SolicitudUsuarioCorp> getAllSolUsuCorpByResponsable(Usuario usuario) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT DISTINCT s FROM SolicitudUsuarioCorp s, ResponsableUsuarioCorp r WHERE s.usuarioCorp = r.usuarioCorp AND r.responsable = :usuario", SolicitudUsuarioCorp.class)
                    .setParameter("usuario", usuario)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<SolicitudUsuarioCorp> getAllSolUsuCorp() throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT s FROM SolicitudUsuarioCorp s", SolicitudUsuarioCorp.class)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public int updateEstatusSolUsuCorp(List<Long> listId, Integer estatus, String comentario) {
        EntityManager entityManager = emUtil.getEntityManager();
        int updated = 0;
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            updated = entityManager.createQuery("UPDATE SolicitudUsuarioCorp s SET s.estatus = :estatus, s.comentarioResponsable = :comentario WHERE s.id IN :listId")
                    .setParameter("estatus", estatus)
                    .setParameter("comentario", comentario)
                    .setParameter("listId", listId)
                    .executeUpdate();
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
        } catch (Exception ex) {
            LOG.error("Error al realizar la actualizacion", ex);
            entityManager.getTransaction().rollback();
        }
        return updated;
    }

    // **************************************************
    // List Solicitudes - Peticion
    // **************************************************
    public List<SolicitudPeticion> getAllSolPeticionBySolicitante(Usuario usuario) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT s FROM SolicitudPeticion s WHERE s.solicitante = :usuario", SolicitudPeticion.class)
                    .setParameter("usuario", usuario)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<SolicitudPeticion> getAllSolPeticionByAmbiente(List<Integer> listAmbiente) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT DISTINCT s FROM SolicitudPeticion s WHERE s.ambiente IN :listAmbiente", SolicitudPeticion.class)
                    .setParameter("listAmbiente", listAmbiente)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<SolicitudPeticion> getAllSolPeticion() throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT s FROM SolicitudPeticion s", SolicitudPeticion.class)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<Peticion> getAllPeticionBySolicitud(SolicitudPeticion solicitud) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT p FROM Peticion p WHERE p.solicitudPeticion = :solicitud", Peticion.class)
                    .setParameter("solicitud", solicitud)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public int updateEstatusSolPeticionById(List<Long> listId, SolicitudPeticion solicitud) {
        EntityManager entityManager = emUtil.getEntityManager();
        int updated = 0;
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            updated = entityManager.createQuery("UPDATE SolicitudPeticion s SET s.estatus = :estatus, s.autorizador = :autorizador, s.fechaAutorizacion = :fechaAutorizacion, s.comentarioAutorizador = :comentario WHERE s.id IN :listId")
                    .setParameter("estatus", solicitud.getEstatus())
                    .setParameter("autorizador", solicitud.getAutorizador())
                    .setParameter("fechaAutorizacion", solicitud.getFechaAutorizacion())
                    .setParameter("comentario", solicitud.getComentarioAutorizador())
                    .setParameter("listId", listId)
                    .executeUpdate();
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
        } catch (Exception ex) {
            LOG.error("Error al realizar la actualizacion", ex);
            entityManager.getTransaction().rollback();
        }
        return updated;
    }

    public int updateEstatusPeticionBySolPeticion(List<SolicitudPeticion> listId, Integer estatus) {
        EntityManager entityManager = emUtil.getEntityManager();
        int updated = 0;
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            updated = entityManager.createQuery("UPDATE Peticion p SET p.estatus = :estatus WHERE p.solicitudPeticion IN :listId")
                    .setParameter("estatus", estatus)
                    .setParameter("listId", listId)
                    .executeUpdate();
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
        } catch (Exception ex) {
            LOG.error("Error al realizar la actualizacion", ex);
            entityManager.getTransaction().rollback();
        }
        return updated;
    }

    // **************************************************
    // Admin Peticiones
    // **************************************************
    public Page<Peticion> findAllPeticionBySpecification(Specification spec, Pageable pageable) throws Exception {
        return repoPeticion.findAll(spec, pageable);
    }

    public List<Peticion> getAllPeticionBySpecification(Specification spec) throws Exception {
        return repoPeticion.findAll(spec);
    }

    public List<Peticion> getAllPeticionById(List<Long> listId) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT p FROM Peticion p WHERE p.id IN :listId", Peticion.class)
                    .setParameter("listId", listId)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public int updateEstatusPeticionById(List<Long> listId, Integer estatus) throws Exception {
        EntityManager entityManager = emUtil.getEntityManager();
        int updated = 0;
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            updated = entityManager.createQuery("UPDATE Peticion p SET p.estatus = :estatus WHERE p.id IN :listId")
                    .setParameter("estatus", estatus)
                    .setParameter("listId", listId)
                    .executeUpdate();
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
            return updated;
        } catch (Exception ex) {
            LOG.error("Error al realizar la actualizacion");
            entityManager.getTransaction().rollback();
            throw ex;
        }
    }

    public int updatePeticion(List<Peticion> listPeticion) throws Exception {
        EntityManager entityManager = emUtil.getEntityManager();
        int updated = 0;
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            for (Peticion peticion : listPeticion) {
                Peticion db = entityManager.createQuery("SELECT p FROM Peticion p WHERE p.id = :id", Peticion.class)
                        .setParameter("id", peticion.getId())
                        .getSingleResult();
                db.clonePeticion(peticion);
                entityManager.merge(db);
                updated++;
            }
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
            return updated;
        } catch (Exception ex) {
            LOG.error("Error al actualizar las peticiones");
            entityManager.getTransaction().rollback();
            throw ex;
        }
    }

    public List<Peticion> getAllPeticionByIp(String ip) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT p FROM Peticion p WHERE p.ip = :ip", Peticion.class)
                    .setParameter("ip", ip)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public int savePeticion(List<Peticion> listPeticion) throws Exception {
        int saved = 0;
        EntityManager entityManager = emUtil.getEntityManager();
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            for (Peticion peticion : listPeticion) {
                entityManager.persist(peticion);
                if (peticion.getId() == null) {
                    throw new Exception("No se persistio la peticion");
                }
                saved++;
            }
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
            return saved;
        } catch (Exception ex) {
            entityManager.getTransaction().rollback();
            throw ex;
        }
    }

    // **************************************************
    // Job Depuracion
    // **************************************************
    public int updateEstatusSolPeticionById(List<Long> listId, Integer estatus) throws Exception {
        EntityManager entityManager = emUtil.getEntityManager();
        int updated = 0;
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            updated = entityManager.createQuery("UPDATE SolicitudPeticion s SET s.estatus = :estatus WHERE s.id IN :listId")
                    .setParameter("estatus", estatus)
                    .setParameter("listId", listId)
                    .executeUpdate();
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
            return updated;
        } catch (Exception ex) {
            entityManager.getTransaction().rollback();
            throw ex;
        }
    }

    public List<SolicitudPeticion> getAllSolPeticionByFechaCaducidad(Date fechaCaducidad) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT s FROM SolicitudPeticion s WHERE s.fechaCaducidad <= :fechaCaducidad", SolicitudPeticion.class)
                    .setParameter("fechaCaducidad", fechaCaducidad)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<SolicitudUsuarioCorp> getAllSolUsuCorpByDueFechaRegAndListEstatus(Date fechaLimite, List<Integer> listEstatus) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT DISTINCT s FROM SolicitudUsuarioCorp s WHERE s.fechaRegistro <= :fechaLimite AND s.estatus IN :listEstatus", SolicitudUsuarioCorp.class)
                    .setParameter("fechaLimite", fechaLimite)
                    .setParameter("listEstatus", listEstatus)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<SolicitudPeticion> getAllSolPeticionByDueFechaRegAndListEstatus(Date fechaRegistro, List<Integer> listEstatus) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT DISTINCT s FROM SolicitudPeticion s WHERE s.fechaRegistro = :fechaRegistro AND s.estatus IN :listEstatus", SolicitudPeticion.class)
                    .setParameter("fechaRegistro", fechaRegistro)
                    .setParameter("listEstatus", listEstatus)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public List<Peticion> getAllPeticionByEstatus(Integer estatus) throws Exception {
        try {
            em.clear();
            return em.createQuery("SELECT DISTINCT p FROM Peticion p WHERE p.estatus = :estatus", Peticion.class)
                    .setParameter("estatus", estatus)
                    .getResultList();
        } catch (NoResultException ex) {
        }
        return null;
    }

    public int deleteSolUsuCorpById(List<Long> listId) throws Exception {
        int updated = 0;
        EntityManager entityManager = emUtil.getEntityManager();
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            updated = entityManager.createQuery("DELETE FROM SolicitudUsuarioCorp s WHERE s.id IN :listId")
                    .setParameter("listId", listId)
                    .executeUpdate();
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
            return updated;
        } catch (Exception ex) {
            entityManager.getTransaction().rollback();
            throw ex;
        }
    }

    public int deleteSolPeticionAndPeticionByIdSolicitud(List<SolicitudPeticion> listSolicitud) throws Exception {
        List<Long> listId = new ArrayList<>();
        for (SolicitudPeticion solicitud : listSolicitud) {
            listId.add(solicitud.getId());
        }
        int updated = 0;
        EntityManager entityManager = emUtil.getEntityManager();
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            updated = entityManager.createQuery("DELETE FROM Peticion p WHERE p.solicitudPeticion IN :listId")
                    .setParameter("listId", listSolicitud)
                    .executeUpdate();
            entityManager.createQuery("DELETE FROM SolicitudPeticion s WHERE s.id IN :listId")
                    .setParameter("listId", listId)
                    .executeUpdate();
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
            return updated;
        } catch (Exception ex) {
            entityManager.getTransaction().rollback();
            throw ex;
        }
    }

    public int deletePeticionById(List<Long> listId) throws Exception {
        int updated = 0;
        EntityManager entityManager = emUtil.getEntityManager();
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            updated = entityManager.createQuery("DELETE FROM Peticion p WHERE p.id IN :listId")
                    .setParameter("listId", listId)
                    .executeUpdate();
            entityManager.flush();
            entityManager.clear();
            entityManager.getTransaction().commit();
            return updated;
        } catch (Exception ex) {
            entityManager.getTransaction().rollback();
            throw ex;
        }
    }
}
