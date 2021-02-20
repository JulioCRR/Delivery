/**
 *
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.ws;

/**
 * @author VI9XXFF
 *
 */
public class RunService {

    public String ejecutaServicio(String sXML) {

        ControlWebServiceSoapBindingStub binding = null;
        String sResponse = "-";

        try {

            binding = (ControlWebServiceSoapBindingStub) new ControlWebServiceServiceLocator().getControlWebService();

            sResponse = binding.ejecutaServicio(sXML);

        } catch (Exception e) {
            e.printStackTrace();
        }

        //System.out.println("RESPUESTA: \n" + sResponse);
        return sResponse;

    }
}
