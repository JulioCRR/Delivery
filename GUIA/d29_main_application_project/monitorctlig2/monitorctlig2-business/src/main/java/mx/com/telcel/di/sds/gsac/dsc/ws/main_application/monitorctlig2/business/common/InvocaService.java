package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class InvocaService {

    private static final Logger LOG = LoggerFactory.getLogger(InvocaService.class);

    @Autowired
    private ApplicationContext context;

    @Autowired
    private ServicioXMP servicioXmp;

    /*
	//Se cargan los codigos de error de mobile en hashtable.
	private static Hashtable<String, M2KDTO> codigosMsg = null;

	private static ServiceM2kJPAImpl dao = null;


	public static ServiceM2kJPAImpl getDao() {
		return dao;
	}

	public static void setDao(ServiceM2kJPAImpl dao) {
		InvocaService.dao = dao;
	}*/
 /*
	public InvocaService()throws Exception{
    	this.cargarCodigosMsg();
    }*/
    public Map<String, String> invocaServicioM2K(ArrayList<String> params, String region) throws IllegalArgumentException, Exception {

        HashMap<String, String> iMap = new HashMap<>();

        iMap.put("aplicacion", "SIAC");
        iMap.put("isProduction", CoreFunctions.getXmpProperty("xmp.isproducion"));
        iMap.put("usuario", CoreFunctions.getXmpProperty("xmp.usuario"));
        iMap.put("idService", CoreFunctions.getXmpProperty("xmp.idservice"));

        params.add("");

        boolean isProduction = Boolean.valueOf(iMap.get("isProduction"));
        //isProduction=false;

        if (isProduction) {
            //verifyRegion(iMap.get("region"), params.get(0).trim());
            iMap.put("region", region);
        } else {
            iMap.put("region", "D09");
            LOG.debug("PRUEBAS EN DESARROLLO, SETEA REGION=D09");
        }

        servicioXmp.iniciarIntentos();
        LOG.debug("INVOKANDO SERVICIO  - PARAMS--->>>: " + params);

        /*
		 * Invoca Servicio
         */
        Map<String, String> oMap = servicioXmp.invokeService(iMap, params);

        /*
		 * Conforma Resultado
         */
        //String estatusEnvioM2k = this.conformaResultado(oMap, serviceId);
        String estatusEnvioM2k = oMap.get("MENSAJE");

        LOG.debug("Request: [" + oMap.get("xmlRequest") + "]");
        LOG.debug("Response: [" + oMap.get("xmlResponse") + "]");
        LOG.debug("Respuesta Service: [" + estatusEnvioM2k + "]");

        //return estatusEnvioM2k;
        return oMap;
    }

    /**
     * Verificar si el String de region proporcionado cumple con el formato
     * valido.
     *
     * @param patron
     * @param region
     * @throws IllegalArgumentException
     */
    private void verifyRegion(String patron, String region) throws IllegalArgumentException {
        Pattern pattern = Pattern.compile(patron);
        Matcher match;
        match = pattern.matcher(region);
        if (!match.find()) {
            Map<String, String> msg = (Map<String, String>) context.getBean("IllegalArgumentException");
            StringBuilder sb = new StringBuilder(msg.get("regionInvalida"));
            int offset = sb.indexOf("?");
            sb.replace(offset, offset + 1, region);
            throw new IllegalArgumentException(sb.toString());
        }
    }

    /**
     * Obtiene el mensaje de Respuesta despues de la ejecuci�n del Servicio.
     * <br>Si la clave (MENSAJE) se encuentra en el mapa, el servicio retorno
     * una respuesta sin excepcion.
     * <br>Si la clave (mensajeExcep) se encuentra en el mapa, el servicio
     * retorno una respuesta de excepcion.
     * <br>Si la clave (PENDIENTE es null) y (mensajeXMPExcep no es null) se
     * encuentran en el mapa, el servicio retorno una respuesta de excepcion de
     * tipo XMP.
     * <br>Si la clave (PENDIENTE no es null) se encuentran en el mapa, el
     * servicio realizo los intentos posibles retorno una respuesta de excepcion
     * de tipo XMP.
     *
     * @param map
     * @param serviceId
     * @return
     */
    /*
    private String conformaResultado(Map<String,String> map, String serviceId){

    	LOG.debug("ConformaResultado.....");

    	String estatus = "";
        String mensaje = "";
        M2KDTO msgDTO = null;



        if(map.get("MENSAJE")!=null){
            mensaje= map.get("MENSAJE").trim();
        }

        if(map.get("PENDIENTE")==null && map.get("mensajeXMPExcep")!=null){
            mensaje= map.get("mensajeXMPExcep").trim();
        }

        if(map.get("mensajeExcep")!=null){
            mensaje= map.get("mensajeExcep").trim();
        }

        //Pendiente es catalogado de esta forma al terminar los reintentos permitidos.
        if(map.get("PENDIENTE")!=null){
        	LOG.debug("PENDIENTE es diferente de null, Reintento automatico.");
            mensaje= map.get("mensajeXMPExcep").trim();
            //return REINTENTO+"|"+mensaje;
            return Constantes.REINTENTO  + "|" + mensaje;
        }


        // Checar si es necesario evaluar el codigo, en caso de pendiente, el detalle queda como pendiente.

         // Evalua MSG

        msgDTO = evaluaMsg(mensaje);
        LOG.debug("1: " + mensaje);
        LOG.debug("2: " + msgDTO);



        //�xito
        if(msgDTO.getTipo().contains("1")){
        	estatus= Constantes.EXITO + "|" + mensaje;
        	//�Es Monitoreo?
        	if(serviceId.equals(Constantes.MONITOREO)){
        		estatus += "|" + map.get("EstatusSolicitud");
        	}
        }

        //Error
        else if(msgDTO.getTipo().contains("2")){
        	estatus= Constantes.ERROR + "|" + mensaje;
        }

      //Tipo 3 o cualquier otro reintento.
        else{
        	LOG.debug("Evaluaci�n es REINTENTO, DTO="+msgDTO.toString());
        	estatus= Constantes.REINTENTO + "|" + mensaje;
        }

        LOG.debug("Retornando estatus: " + estatus);
        return estatus;
    }
     */
    /**
     *
     * @param msg
     * @return
     */
    /*
    private M2KDTO evaluaMsg(String msg){

    	LOG.debug("Message M2K: = "+msg);
    	M2KDTO msgDTO = null;

    	for( Iterator it = codigosMsg.keySet().iterator(); it.hasNext();) {
	        String code = (String)it.next();
	        //LOG.debug("code " + code);
	        if(msg.contains(code)){
	        	LOG.debug("Codigo encontrado.");
	        	LOG.debug("Codigo encontrado=|"+code+"|");
	        	msgDTO = codigosMsg.get(code);
	        	break;
	        }
		}

    	if(msgDTO==null){
    		msgDTO= new M2KDTO();
    		msgDTO.setCodigo("NOTFD");//Codigo Not Found
    		msgDTO.setDescripcion(msg);
    		msgDTO.setTipo("2");
    	}

    	return msgDTO;
	}
     */
    /**
     * Cargar los codigo del catalogo de Respuesta de Mobile en un hastable.
     *
     * @param resultado
     * @param operacion
     * @return
     * @throws Exception
     */
    /*
    private static void cargarCodigosMsg() throws Exception{
    	LOG.debug("Load Messages...");
    	LOG.debug("DAO="+dao);

    	if(codigosMsg!=null){
    		LOG.debug("Los codigos M2K ya se encuentran cargados.");
    		return;
    	}

    	List<M2KDTO> respuesta	= null;
        respuesta = dao.buscaMsgM2k();

    	if(respuesta!=null && respuesta.size()>0){
    		codigosMsg = new Hashtable<String,M2KDTO>();
    		for(int i=0;i<respuesta.size();i++){
    			M2KDTO msg = respuesta.get(i);
    			LOG.debug(msg.getCodigo()+"|"+msg.getDescripcion());
    			codigosMsg.put(msg.getCodigo().trim(), msg);
    		}
    	}
    	else{
    		log.debug("No fue posible obtener los codigos de mensaje.");
    	}
	}

     */
    /**
     * Obtiene el parametro solicitado de un determinado Bean de Spring.
     *
     * @param bean
     * @param servicio
     * @param param
     * @return
     */
    public String getBeanParam(String bean, String param) {

        String parametro = "-";

        try {
            HashMap<String, String> iMap = (HashMap) context.getBean(bean);
            parametro = iMap.get(param);
        } catch (BeansException e) {
            LOG.debug("ERROR AL OBTENER EL BEAN ");
        }

        return parametro;
    }

}
