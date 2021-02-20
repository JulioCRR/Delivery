
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util;

import static com.lowagie.text.pdf.PdfName.T;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import static java.util.Spliterators.iterator;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.dao.AgendaDao;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.AgendaDesarrolloWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.PermisosDesarrolloWSM2K;
//import org.apache.commons.collections.IteratorUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class CleanCadenas {
    
     private static final Logger LOG = LoggerFactory.getLogger(AgendaDao.class);
    
    public static String deAccent(String str) {
      String nfdNormalizedString = Normalizer.normalize(str,  Normalizer.Form.NFD); 
      Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
      return pattern.matcher(nfdNormalizedString).replaceAll("");
     }
    
    
    public static List<AgendaDesarrolloWSM2K> cleanList(List<AgendaDesarrolloWSM2K> agenda){
      HashSet<AgendaDesarrolloWSM2K> hashSet = new HashSet<>(agenda);
		agenda.clear();
		agenda.addAll(hashSet);
      return  agenda;
    }

    public static List<String> eliminarRepetidos(String[] permi, List<String> transDao) {
        ArrayList<String> listaTransacciones = new ArrayList<>(Arrays.asList(permi));
        List<String> resTemp = new ArrayList<>();
        for (String t : listaTransacciones) {
            String trasnsaccion = t;
            for (int j = 0; j < transDao.size(); j++) {
                if (trasnsaccion.equals(transDao.get(j))) {
                    resTemp.add(t);
                    LOG.info("se elimina   " + trasnsaccion);
                    break;
                }
            }

        }
        for (String transaccion : resTemp) {
            listaTransacciones.remove(transaccion);
        }
        return listaTransacciones;
    }

    public static boolean validarIp(AgendaDesarrolloWSM2K agenda, String ip) {
        for (PermisosDesarrolloWSM2K p : agenda.getPermisos()) {
            if (ip.equals(p.getIpDesa())) {
                return true;
            }
        }
        return false;
    }

    public static boolean validarTrans(AgendaDesarrolloWSM2K agenda, String transac){
        for(PermisosDesarrolloWSM2K p: agenda.getPermisos()){
            if(transac.equals(p.getTransDesa())){
                return true;
            }
        }
        return false;
    }
    
}
