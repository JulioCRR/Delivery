package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.operation;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.db.entities.PermisosDesarrolloWSM2K;
import org.springframework.stereotype.Component;

@Component
public class ManipuladorProperties {

    public List<String> getIpCVS(String permisosDesa) {
        FileReader fr = null;
        BufferedReader br = null;
        List<String> lista = new ArrayList<String>();
        try {
            File archivo = new File(permisosDesa);
            fr = new FileReader(archivo);
            br = new BufferedReader(new InputStreamReader(new FileInputStream(archivo), "UTF8"));
            String linea;
            while ((linea = br.readLine()) != null) {
                lista.add(linea);
            }
        } catch (Exception e) {
            e.printStackTrace();
            lista = null;
        } finally {
            try {
                if (null != fr) {
                    fr.close();
                    br.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return lista;
    }
    
    
    
    public  Properties escribirPeticiones(List<PermisosDesarrolloWSM2K> listPermisos) {

        Properties p = new Properties();
        for (PermisosDesarrolloWSM2K per : listPermisos) {    
            p.setProperty(per.getIpDesa() + "_*_" + per.getTransDesa(), "2000");
        }
        return p;
    }

}
