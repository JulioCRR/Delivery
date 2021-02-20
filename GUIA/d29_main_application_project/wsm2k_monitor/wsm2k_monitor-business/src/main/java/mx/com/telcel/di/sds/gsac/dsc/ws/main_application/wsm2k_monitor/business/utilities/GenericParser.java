/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.wsm2k_monitor.business.utilities;

/**
 *
 * @author VI9XXG0
 */

import com.google.gson.Gson;

public class GenericParser {
    
    public String parseToJson(Object object){
		Gson gson = new Gson();
		String jsonInString="";
		jsonInString = gson.toJson(object);
		return jsonInString;
	}
    
    
}
