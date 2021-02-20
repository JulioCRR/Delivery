package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.dao;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.business.dao.CatalogosDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.catalogs.db.M2kCatTransaccionesFront;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.PropiedadesDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Propiedades;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.common.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.business.utils.UtilMonitorOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.model.PropiedadesMonitorOmega;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.common.DBConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitor_omega.db.entities.OmegaAlerta;
import org.apache.commons.lang.StringUtils;
import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author VI9XXI3
 */
@Component
@Transactional
public class MonitorOmegaDao {

    private static final Logger LOG = LoggerFactory.getLogger(MonitorOmegaDao.class);

    @PersistenceContext
    private EntityManager em;

    @Autowired
    @Qualifier(value = "entityManagerFactory")
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    private PropiedadesDao propiedadesDao;

    @Autowired
    private CatalogosDao catalogosDao;

    public int getIntervaloRefrescado() {
        Propiedades prop = propiedadesDao.getPropiedadByName(DBConstants.OMEGA_REFRESH_INTERVAL);
        if (prop != null) {
            try {
                return Integer.parseInt(prop.getValue().trim());
            } catch (NumberFormatException ex) {
                LOG.error("Error al intentar obtener el intervalo de refrescado", ex);
            }
        } else {
            LOG.warn("Propiedad no existe; creando nueva propiedad: " + DBConstants.OMEGA_REFRESH_INTERVAL);
            saveIntervaloRefrescado(DBConstants.DEFAULT_REFRESH_INTERVAL);
        }
        return DBConstants.DEFAULT_REFRESH_INTERVAL;
    }

    public boolean saveIntervaloRefrescado(int tiempo) {
        return savePropiedadOmega(DBConstants.OMEGA_REFRESH_INTERVAL, String.valueOf(tiempo));
    }

    public double getUmbralAlertas() {
        Propiedades prop = propiedadesDao.getPropiedadByName(DBConstants.OMEGA_ALERT_THRESHOLD);
        if (prop != null) {
            try {
                return Double.parseDouble(prop.getValue().trim());
            } catch (NumberFormatException ex) {
                LOG.error("Error al intentar obtener el umbral de alerta", ex);
            }
        } else {
            LOG.warn("Propiedad no existe; creando nueva propiedad: " + DBConstants.OMEGA_ALERT_THRESHOLD);
            saveUmbralAlertas(DBConstants.DEFAULT_ALERT_THRESHOLD);
        }
        return DBConstants.DEFAULT_ALERT_THRESHOLD;
    }

    public boolean saveUmbralAlertas(double umbral) {
        return savePropiedadOmega(DBConstants.OMEGA_ALERT_THRESHOLD, String.valueOf(umbral));
    }

    public boolean getMonitorOnOffStatus() {
        Propiedades prop = propiedadesDao.getPropiedadByName(DBConstants.OMEGA_MONITOR_ON);
        if (prop != null) {
            try {
                return Boolean.parseBoolean(prop.getValue().trim().toLowerCase());
            } catch (NumberFormatException ex) {
                LOG.error("Error al intentar obtener el estatus del monitor", ex);
            }
        } else {
            LOG.warn("Propiedad no existe; creando nueva propiedad: " + DBConstants.OMEGA_MONITOR_ON);
            saveMonitorOnOffStatus(DBConstants.DEFAULT_MONITOR_ON);
        }
        return DBConstants.DEFAULT_MONITOR_ON;
    }

    public boolean saveMonitorOnOffStatus(boolean status) {
        return savePropiedadOmega(DBConstants.OMEGA_MONITOR_ON, String.valueOf(status));
    }

    public String getCorreosAlerta() {
        Propiedades prop = propiedadesDao.getPropiedadByName(DBConstants.OMEGA_ALERT_EMAILS);
        if (prop != null) {
            try {
                return (prop.getValue() != null ? prop.getValue().trim() : "");
            } catch (Exception ex) {
                LOG.error("Error al intentar obtener los correos de alerta", ex);
            }
        } else {
            LOG.warn("Propiedad no existe; creando nueva propiedad: " + DBConstants.OMEGA_ALERT_EMAILS);
            savePropiedadOmega(DBConstants.OMEGA_ALERT_EMAILS, "");
        }
        return "";
    }

    public String getCorreosAlertaError() {
        Propiedades prop = propiedadesDao.getPropiedadByName(DBConstants.OMEGA_ALERT_ERROR_EMAILS);
        if (prop != null) {
            try {
                return (prop.getValue() != null ? prop.getValue().trim() : "");
            } catch (Exception ex) {
                LOG.error("Error al intentar obtener los correos de alerta de error", ex);
            }
        } else {
            LOG.warn("Propiedad no existe; creando nueva propiedad: " + DBConstants.OMEGA_ALERT_ERROR_EMAILS);
            savePropiedadOmega(DBConstants.OMEGA_ALERT_ERROR_EMAILS, "");
        }
        return "";
    }

    public boolean savePropiedadOmega(String propiedad, String defaultValue) {
        try {
            return (propiedadesDao.savePropiedad(propiedad, defaultValue) != null);
        } catch (Exception ex) {
            LOG.error("Error al guardar la propiedad '" + propiedad + "' con valor '" + defaultValue + "'", ex);
        }
        return false;
    }

    public boolean savePropiedadesOmega(PropiedadesMonitorOmega propiedadOmega) {
        boolean saved = true;
        if (!saveIntervaloRefrescado(propiedadOmega.getIntervaloRefrescado())) {
            saved = false;
        }
        if (!saveUmbralAlertas(propiedadOmega.getUmbralAlertas())) {
            saved = false;
        }
        if (!saveMaxCpu(propiedadOmega.getMaxCpu())) {
            saved = false;
        }
        return saved;
    }

    public void saveAlerta(OmegaAlerta alerta) {
        try {
            em.persist(alerta);
        } catch (Exception ex) {
            LOG.error("Error al insertar " + alerta.toString(), ex);
        }
    }

    public void saveAlertasBatch(List<OmegaAlerta> lista) {
        try {
            EntityManager emBatch = entityManagerFactory.createEntityManager();
            EntityTransaction tx = emBatch.getTransaction();
            tx.begin();
            for (OmegaAlerta alerta : lista) {
                emBatch.persist(alerta);
            }
            emBatch.flush();
            emBatch.clear();
            tx.commit();
        } catch (Exception ex) {
            LOG.error("Error al insertar batch de [" + lista.size() + "] alertas", ex);
        }
    }

    public double getMaxCpu() {
        Propiedades prop = propiedadesDao.getPropiedadByName(DBConstants.OMEGA_MAX_CPU);
        if (prop != null) {
            try {
                return Double.parseDouble(prop.getValue().trim());
            } catch (NumberFormatException ex) {
                LOG.error("Error al intentar obtener el porcentaje CPU maximo", ex);
            }
        } else {
            LOG.warn("Propiedad no existe; creando nueva propiedad: " + DBConstants.OMEGA_MAX_CPU);
            saveMaxCpu(DBConstants.DEFAULT_MAX_CPU);
        }
        return DBConstants.DEFAULT_MAX_CPU;
    }

    public boolean saveMaxCpu(double maxCpu) {
        return savePropiedadOmega(DBConstants.OMEGA_MAX_CPU, String.valueOf(maxCpu));
    }

    public PropiedadesMonitorOmega getPropiedadesMonitorOmega() {
        PropiedadesMonitorOmega propOmega = new PropiedadesMonitorOmega();
        propOmega.setIntervaloRefrescado(getIntervaloRefrescado());
        propOmega.setUmbralAlertas(getUmbralAlertas());
        propOmega.setMonitorOn(getMonitorOnOffStatus());
        propOmega.setCorreosAlerta(getCorreosAlerta());
        propOmega.setCorreosAlertaError(getCorreosAlertaError());
        propOmega.setMaxCpu(getMaxCpu());
        return propOmega;
    }

    public void createMapPantallasM2k() {
        List<M2kCatTransaccionesFront> listCat = catalogosDao.getAllM2kCatTransaccionesFront();
        if (listCat != null) {
            UtilMonitorOmega.getMapPantallasM2k().clear();
            for (M2kCatTransaccionesFront cat : listCat) {
                if (StringUtils.isEmpty(cat.getTransaccion())) {
                    continue;
                }
                UtilMonitorOmega.getMapPantallasM2k().put(
                        cat.getTransaccion().trim().toUpperCase(),
                        StringUtils.defaultIfEmpty(cat.getNombrePantalla(), Constants.NULL_PANTALLA_M2K).toUpperCase());
            }
            LOG.info("Mapa de pantallas generado correctamente con " + UtilMonitorOmega.getMapPantallasM2k().size() + " pantallas");
        }
    }

    public int deleteAllOmegaAlertaByFechaAlertaLimit(LocalDateTime fechaLimite) throws Exception {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        try {
            entityManager.clear();
            entityManager.getTransaction().begin();
            int updated = entityManager.createQuery("DELETE FROM OmegaAlerta o WHERE o.fechaAlerta <= :fechaLimite")
                    .setParameter("fechaLimite", fechaLimite)
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
