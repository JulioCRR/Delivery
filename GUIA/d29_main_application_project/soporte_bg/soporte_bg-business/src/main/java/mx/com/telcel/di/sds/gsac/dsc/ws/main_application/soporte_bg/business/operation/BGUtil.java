/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.soporte_bg.business.operation;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author VI9XXG0
 */
public class BGUtil {

    private final String USER_AGENT = "Mozilla/5.0";
    private static final String SUCCESFULL_TIMER="Successfull test";
    
    private static final Logger LOG = LoggerFactory.getLogger(BGUtil.class);

    public String sendGet() throws Exception {
        String url = "http://intranet.telcel.com:8050/gbweb/GroupBackAdministratorServlet.do?action=startTimer";
        String respuesta = "";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        //add request header
        con.setRequestProperty("User-Agent", USER_AGENT);

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'GET' request to URL : " + url);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        respuesta = response.toString();
        return respuesta;

    }

    public boolean validaRespuesta(String respuesta){
        boolean response=false;
        try{
            if(respuesta.contains(SUCCESFULL_TIMER) ){
                return true;
            }
        }catch(Exception e){
            return false;
        }
        
        return response;
    }
    
}
