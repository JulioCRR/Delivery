package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.dao;



import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.Repository.AgendaServicesImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.PermisosIp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.PermisosTrans;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.SolicitudAmbiente;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.FormaterDateAgenda;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.DiasInhabiles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.db.Propiedades;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DiasInhabliesDao {

    private static final Logger LOG = LoggerFactory.getLogger(DiasInhabliesDao.class);

    private final AgendaDao agendaDao;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public DiasInhabliesDao(@Lazy AgendaDao agendaDao) {
        this.agendaDao = agendaDao;
    }
     
    List<DiasInhabiles> diasInhabilesDao;
    
    @Autowired
    private FormaterDateAgenda formato;
    
    @Autowired
    private AgendaServicesImp agendaIm;

    public int buscarLimite(short id){
           int lim=0;
           try {
               Propiedades prop=em.find(Propiedades.class,id);
               lim= Integer.parseInt(prop.getValue());
            return lim;
        } catch (NumberFormatException ex) {
            LOG.error("ERROR AL BUSCAR LOS DIAS INHABILES", ex);
            return 0;
        }
    
    }

    public void buscarDiasInhabiles() {
        try {
            //int days=agendaIm.getLimiteDiasHabiles()+5;
            diasInhabilesDao = em.createQuery("SELECT d FROM DiasInhabiles d WHERE d.diaInhabil BETWEEN   :fechaActual  and   :fechaFinal ORDER BY  d.diaInhabil ", DiasInhabiles.class)
                    .setParameter("fechaActual", new Date())
                    .setParameter("fechaFinal", formato.modificarDia(new Date(),35))
                    .getResultList();
            LOG.info("DIAS INHABILES    " + diasInhabilesDao.size());
        } catch (Exception ex) {
            LOG.error("ERROR AL BUSCAR LOS DIAS INHABILES", ex);
        }
    }

    public List<PermisosIp> getListPermisoIp(SolicitudAmbiente solicitud) {
        List<PermisosIp> listPermisos = Arrays.asList(solicitud.getPermisosIp());
        return listPermisos;
    }

    public List<PermisosTrans> getListPermisoTrans(SolicitudAmbiente solicitud) {
        List<PermisosTrans> lisTrans = Arrays.asList(solicitud.getPermisosTrans());
        return lisTrans;
    }

    public String[] getDiasiInhabiles() {
        int f = 0;
        String[] inh = new String[ getDiasInhabilesDao().size()];
        for (DiasInhabiles d : getDiasInhabilesDao()) {
            inh[f] = formato.formatDateLess(d.getDiaInhabil());                  
            f++;
        }
        return inh;
    }

    
    public boolean validaDiasInahiles(String fechaInicio) {
        boolean validacion = false;
        if (Arrays.asList(getDiasiInhabiles()).contains(fechaInicio)) {
            return true;
        }
        return validacion;
    }

    public List<DiasInhabiles> getDiasInhabilesDao() {
        return diasInhabilesDao;
    }
    

    
    
    public void saveDiasInhabiles(Date fecha){
         DiasInhabiles diasIn = new DiasInhabiles();
         diasIn.setDiaInhabil(fecha);
         em.persist(diasIn);
         em.flush();
 
    }
    
    

    public void getDiasInhaCal(){
        Date today = new Date();
        Calendar cal = Calendar.getInstance();
        LocalDate i = today.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int yIni = i.getYear();
        int yFn = i.getYear() + 1;
        int aumentarDia = 0;
        while (yIni < yFn) {
            cal.setTime(formato.modificarDia(today, aumentarDia));
            Date dateModi = formato.modificarDia(today, aumentarDia);
            int dia = cal.get(Calendar.DAY_OF_WEEK);
            if (dia == 7 || dia == 1) {
                saveDiasInhabiles(dateModi);
            }
            int limite = cal.get(Calendar.YEAR);
            aumentarDia++;
            if (limite == yFn) {
                yIni = limite;
            }
        }

    }
    
    
    

}
