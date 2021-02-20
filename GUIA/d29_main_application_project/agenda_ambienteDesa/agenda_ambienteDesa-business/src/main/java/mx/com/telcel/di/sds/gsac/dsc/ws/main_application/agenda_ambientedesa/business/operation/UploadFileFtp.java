package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.operation;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Properties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util.Constants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.PermisosDesarrolloWSM2K;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.MailManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;




@Component
public class UploadFileFtp {
    
    private static final Logger LOG = LoggerFactory.getLogger(UploadFileFtp.class);
    
    @Autowired
    private MailManager mailManagerMain;
    
     SessionFactoryFtp factory=new SessionFactoryFtp();
     
    

    public void uploadPropertiesDesa(List<PermisosDesarrolloWSM2K> listPermisos) throws IOException{
           
        LOG.info("CONECTANDOSE VIA FTP....");
        
        ManipuladorProperties mn=new ManipuladorProperties();
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        Properties prop=mn.escribirPeticiones(listPermisos);   
        ByteArrayInputStream input = null; 

         try {
             prop.store(output, Constants.ARCHIVO_PROPER);
             input = new ByteArrayInputStream(output.toByteArray());
             if (factory.getConfFtp()) {
                 factory.enviarArchivoFtp(Constants.ARCHIVO_PROPER, input);
                 LOG.info("CONEXION VIA FTP CON EXITO.");
                 factory.logoOut();
                 LOG.info("LOGOUT FTP-OK.");
                 factory.closeFtp();
                 LOG.info("DESCONECTADO DEL FTP");
             }else{
             String mError=Constants.MSJ_INFORMATIVO+"\n ftp: "+factory.getHostDesa();
             mailManagerMain.sendMail(Constants.SUBJETCT, mError ) ; 
             
             }  
         } catch (IOException ex ) {
            LOG.error("ERROR AL ENVIAR EL ARCHIVO PROPERTIES"+ex);
         }finally{
             output.close();
             input.close();
             factory.closeFtp();
           
         }
    }
}
