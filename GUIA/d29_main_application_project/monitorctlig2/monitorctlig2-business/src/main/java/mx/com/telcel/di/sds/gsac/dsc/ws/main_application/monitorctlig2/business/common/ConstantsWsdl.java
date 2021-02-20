/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.common;

import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CoreFunctions;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
public class ConstantsWsdl {

    public static String getI1H(String region) {
        return new StringBuilder()
                .append("<Request>\n")
                .append("	<user>").append(CoreFunctions.getWSDLProperty("wsdl.i1h.user")).append("</user>\n")
                .append("	<region>").append(region).append("</region>\n")
                .append("	<function>I*1H</function>\n")
                .append("	<action>C</action>\n")
                .append("	<inputParameters>\n")
                .append("		<depurar/>\n")
                .append("	</inputParameters>\n")
                .append("</Request>").toString();
    }

    public static String getI1G(String region) {
        return new StringBuilder()
                .append("<Request>\n")
                .append("	<user>").append(CoreFunctions.getWSDLProperty("wsdl.i1g.user")).append("</user>\n")
                .append("	<region>").append(region).append("</region>\n")
                .append("	<function>I*1G</function>\n")
                .append("	<action>D</action>\n")
                .append("	<inputParameters>\n")
                .append("		<depurar>\n")
                .append("			<p01depurar longitud=\"01\">S</p01depurar>\n")
                .append("		</depurar>\n")
                .append("	</inputParameters>\n")
                .append("</Request>").toString();
    }

    public static String getCISC(String region) {
        return new StringBuilder()
                .append("<Request>\n")
                .append("	<user>").append(CoreFunctions.getWSDLProperty("wsdl.i1g.cics.user")).append("</user>\n")
                .append("	<region>").append("R").append(region).append("</region>\n")
                .append("	<function>I*1G</function>\n")
                .append("	<action>D</action>\n")
                .append("	<inputParameters>\n")
                .append("		<depurar>\n")
                .append("			<p01depurar longitud=\"01\">S</p01depurar>\n")
                .append("		</depurar>\n")
                .append("	</inputParameters>\n")
                .append("</Request>").toString();
    }
    
    public static String getI2W(String region){
    
        return new StringBuilder()
                .append("<Request>\n")
                .append("	<user>").append(CoreFunctions.getWSDLProperty("wsdl.i1h.user")).append("</user>\n")
                .append("	<region>").append(region).append("</region>\n")
                .append("	<function>I*2W</function>\n")
                .append("	<action>A</action>\n")
                .append("	<inputParameters>\n")
                .append("		<actualiza>\n")
                .append("			<p01activa-trans longitud=\"01\">A</p01activa-trans>\n")
                .append("		</actualiza>\n")
                .append("	</inputParameters>\n")
                .append("</Request>").toString();
    }
    
}
