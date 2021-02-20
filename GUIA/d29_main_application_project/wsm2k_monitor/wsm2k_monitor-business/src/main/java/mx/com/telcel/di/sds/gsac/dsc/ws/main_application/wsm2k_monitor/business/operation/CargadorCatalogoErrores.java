package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.operation;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.CatalogoRespuestasError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.model.RespuestaError;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities.ManipuladorArchivos;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.dao.IncidenciasDAO;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.db.entities.IncidenciaEntity;

public class CargadorCatalogoErrores {

    private static final Logger LOG = LoggerFactory.getLogger(ResponseAnalyzer.class);
    private static final long MILLISECONDS_PER_MINUTE = 60000;
    private static final String LIKE = "like";

    private String archivoCatalogoErrores;
    private LinkedList<RespuestaError> catalogoErroresLike;

    @Autowired
    private CatalogoRespuestasError catalogoRespuestasError;

    @Autowired
    private IncidenciasDAO incidenciasDAO;

    public RespuestaError procesaRegistroCatalogoError(String registro) {
        try {
            StringTokenizer tokenizer = new StringTokenizer(registro, ",");
            RespuestaError respuestaError = new RespuestaError();
            respuestaError.setUsuario(tokenizer.nextToken());
            respuestaError.setCics(tokenizer.nextToken());
            respuestaError.setIntervaloTiempo(Integer.parseInt(tokenizer.nextToken()) * MILLISECONDS_PER_MINUTE);
            respuestaError.setMaximoUmbralErrores(Integer.parseInt(tokenizer.nextToken()));
            respuestaError.setTipo(tokenizer.nextToken());
            respuestaError.setMensaje(tokenizer.nextToken().replace("@", ","));
            respuestaError.setPrioridad(Integer.parseInt(tokenizer.nextToken()));
            respuestaError.setTipoBusqueda(tokenizer.nextToken().replace("@", ","));
            respuestaError.setId(Integer.parseInt(tokenizer.nextToken()));
            respuestaError.setDestinatariosAlertas(tokenizer.nextToken().replace("+", ","));
            return respuestaError;
        } catch (Exception e) {
            //e.printStackTrace();
            return null;
        }
    }

    public RespuestaError procesaRegistroCatalogoError(IncidenciaEntity registro) {
        try {

            RespuestaError respuestaError = new RespuestaError();
            respuestaError.setUsuario("");
            respuestaError.setCics("");
            respuestaError.setIntervaloTiempo(registro.getIntervaloTiempo() * MILLISECONDS_PER_MINUTE);
            respuestaError.setMaximoUmbralErrores(registro.getMaximoUmbralErrores());
            respuestaError.setTipo("");
            respuestaError.setMensaje(registro.getMensaje());
            respuestaError.setPrioridad(1);
            respuestaError.setTipoBusqueda(registro.getTipoBusqueda());
            respuestaError.setId(registro.getId());
            respuestaError.setDestinatariosAlertas(registro.getDestinatariosAlertas());
            return respuestaError;
        } catch (Exception e) {
            //e.printStackTrace();
            return null;
        }
    }

    public HashMap<String, RespuestaError> procesaCatalogoErrores() {
        ManipuladorArchivos ma = new ManipuladorArchivos();
        catalogoErroresLike = new LinkedList<RespuestaError>();
        LinkedList<String> registros = ma.obtenRenglones(archivoCatalogoErrores);
        Iterator<String> iterator = registros.iterator();
        HashMap<String, RespuestaError> hashMap = new HashMap<String, RespuestaError>();
        RespuestaError error;
        LOG.error(" registros en archivo: " + registros.size());
        while (iterator.hasNext()) {
            error = procesaRegistroCatalogoError(iterator.next());
            if (error != null) {
                hashMap.put(error.getMensaje(), error);
                if (error.getTipoBusqueda().equals(LIKE)) {
                    catalogoErroresLike.add(error);
                }
            }
        }
        catalogoRespuestasError.setCatalogoErrores(hashMap);
        catalogoRespuestasError.setCatalogoErroresLike(catalogoErroresLike);
        LOG.error(" size de hashMap de errores: " + catalogoRespuestasError.getCatalogoErrores().size());
        LOG.error(" size de lista errores like: " + catalogoRespuestasError.getCatalogoErroresLike().size());
        return hashMap;
    }

    public HashMap<String, RespuestaError> procesaCatalogoErroresBD() {
        ManipuladorArchivos ma = new ManipuladorArchivos();
        catalogoErroresLike = new LinkedList<RespuestaError>();
        //LinkedList<String> registros= ma.obtenRenglones(archivoCatalogoErrores);
        List<IncidenciaEntity> registros = incidenciasDAO.consultaIncidencias();
        Iterator<IncidenciaEntity> iterator = registros.iterator();
        HashMap<String, RespuestaError> hashMap = new HashMap<String, RespuestaError>();
        RespuestaError error;
        LOG.error("incidencias cargadas desde BD: " + registros.size());
        while (iterator.hasNext()) {
            error = procesaRegistroCatalogoError(iterator.next());
            if (error != null) {
                hashMap.put(error.getMensaje(), error);
                if (error.getTipoBusqueda().equals(LIKE)) {
                    catalogoErroresLike.add(error);
                }
            }
        }
        catalogoRespuestasError.setCatalogoErrores(hashMap);
        catalogoRespuestasError.setCatalogoErroresLike(catalogoErroresLike);
        LOG.error(" size de hashMap de errores: " + catalogoRespuestasError.getCatalogoErrores().size());
        LOG.error(" size de lista errores like: " + catalogoRespuestasError.getCatalogoErroresLike().size());
        return hashMap;
    }

    public String reporteToTable() {
        Iterator<RespuestaError> iterator = catalogoRespuestasError.getCatalogoErrores().values().iterator();
        RespuestaError respuesta = null;
        StringBuilder sb = new StringBuilder();
        sb.append("<table border='1'>");
        sb.append("<tr><th>Incidencia</th><th>acumulados en invervalo</th><th>acumulados ultima hora</th><th>acumulados dia</th><th>intervalo tiempo (ms)</th><th>maximo umbral alerta</th></tr>");
        while (iterator.hasNext()) {
            respuesta = iterator.next();
            sb.append("<tr>");
            sb.append("<td>");
            sb.append(respuesta.getMensaje());
            sb.append("</td>");
            sb.append("<td>");
            sb.append(respuesta.getErroresAcumulados());
            sb.append("</td>");
            sb.append("<td>");
            sb.append(respuesta.getErroresAcumuladosHora());
            sb.append("</td>");
            sb.append("<td>");
            sb.append(respuesta.getErroresAcumuladosDia());
            sb.append("</td>");
            sb.append("<td>");
            sb.append(respuesta.getIntervaloTiempo());
            sb.append("</td>");
            sb.append("<td>");
            sb.append(respuesta.getMaximoUmbralErrores());
            sb.append("</td>");
            sb.append("</tr>");
        }
        sb.append("</table>");
        return sb.toString();
    }

    public void agregaMonitoreoIncidencia(IncidenciaEntity incidencia){
        RespuestaError error = procesaRegistroCatalogoError(incidencia);
        catalogoRespuestasError.getCatalogoErrores().put(error.getMensaje(), error);
    }
    
    
    public void actualizaMonitoreoIncidencia(IncidenciaEntity incidencia) {
        RespuestaError error = procesaRegistroCatalogoError(incidencia);
        RespuestaError errorCatalogo = null;
        errorCatalogo = catalogoRespuestasError.getCatalogoErrores().get(error.getMensaje());
        if (errorCatalogo == null) {
            errorCatalogo=buscaIncidenciaPorId(incidencia.getId());
        }
        
        error.setErroresAcumulados(errorCatalogo.getErroresAcumulados() );
        error.setErroresAcumuladosDia( errorCatalogo.getErroresAcumuladosDia() );
        error.setErroresAcumuladosHora( errorCatalogo.getErroresAcumuladosHora() );
        error.setHoraInicioIntervalo( errorCatalogo.getHoraInicioIntervalo() );
        error.setHoraUltimoError( errorCatalogo.getHoraUltimoError() );
        error.setHoraUltimoErrorString( errorCatalogo.getHoraUltimoErrorString() );
        catalogoRespuestasError.getCatalogoErrores().remove(errorCatalogo.getMensaje());
        catalogoRespuestasError.getCatalogoErrores().put(error.getMensaje(), error);
        
    }
    
    public RespuestaError buscaIncidenciaPorId(int id){
        Iterator<RespuestaError> iterator=catalogoRespuestasError.getCatalogoErrores().values().iterator();
        RespuestaError errorAux=null;
        while( iterator.hasNext() ){
            errorAux=iterator.next();
            if(errorAux.getId() == id )
                break;
        }
        return errorAux;
        
    }
    
    
    public LinkedList<String> tranformaCatalogoAListaCadenas() {
        Iterator<RespuestaError> iterator = catalogoRespuestasError.getCatalogoErrores().values().iterator();
        RespuestaError respuestaError = null;
        LinkedList<String> cadenas = new LinkedList<String>();
        cadenas.add("Usuario,CICS,intervaloTiempo(minuto),maximoUmbral,tipoServicio,error,prioridad,tipoBusqueda");
        while (iterator.hasNext()) {
            respuestaError = iterator.next();
            respuestaError.setMensaje(respuestaError.getMensaje().replace(",", "@"));
            cadenas.add(respuestaError.toString());
            respuestaError.setMensaje(respuestaError.getMensaje().replace("@", ","));
        }
        return cadenas;
    }

    public LinkedList<RespuestaError> getCatalogoErroresLike() {
        return catalogoErroresLike;
    }

    public void setCatalogoErroresLike(
            LinkedList<RespuestaError> catalogoErroresLike) {
        this.catalogoErroresLike = catalogoErroresLike;
    }

    public String getArchivoCatalogoErrores() {
        return archivoCatalogoErrores;
    }

    public void setArchivoCatalogoErrores(String archivoCatalogoErrores) {
        this.archivoCatalogoErrores = archivoCatalogoErrores;
    }

}
