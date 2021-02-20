
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.model.PropertiesModel;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

@Service
public class ServicesPropertiesFuncionTo {
    
   
    private static final Logger LOG = LoggerFactory.getLogger(ServicesPropertiesFuncionTo.class);
    
      public List<PropertiesModel> readProperties() {
        List<PropertiesModel> model = new ArrayList<>(); 
        PropertiesModel mod;
        InputStream inputStream = getClass().getResourceAsStream("/agenda_ambienteDesa/funcionToServicio.properties");
	BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
        try {
            String linea;
             String[] parts;
            while ((linea = br.readLine()) != null) {
                if(linea.contains("_")){
                    mod=new PropertiesModel();
                    parts = linea.split("_");
                    mod.setTransaccion(parts[0]);
                    mod.setNombreComponente(parts[1]);
                    model.add(mod);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != br) {
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return model;
    }    
}
