/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.Text;
import org.jdom2.output.XMLOutputter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
public class UtilidadesXMLImp {

    private static final Logger LOG = LoggerFactory.getLogger(UtilidadesXMLImp.class);

    private List<String[]> dataList;
    private String cleanCTG;

    public String normalizaCadenaCTG(String cadena) {
        String cadenaNormalizada = cadena;
        if (cadena.contains("E|ESTATUS")) {
            cadenaNormalizada = cadena.substring(cadena.indexOf("E|ESTATUS"), cadena.length());
        } else if (cadena.contains("F|ESTATUS")) {
            cadenaNormalizada = cadena.substring(cadena.indexOf("F|ESTATUS"), cadena.length());
        } else if (cadena.contains("E|")) {
            cadenaNormalizada = cadena.substring(cadena.indexOf("E|"), cadena.length());
        } else if (cadena.contains("F|")) {
            cadenaNormalizada = cadena.substring(cadena.indexOf("F|"), cadena.length());
        }
        return cadenaNormalizada;
    }

    private String agregarIdPeticion(String resultadoXmlOut, String idPeticion) throws Exception {
        StringBuilder estatusPeticion = new StringBuilder();
        estatusPeticion.append("<ESTATUS IDPETICION=\"");
        estatusPeticion.append(idPeticion);
        estatusPeticion.append("\">");
        String respuesta = resultadoXmlOut.contains("<ESTATUS>") ? resultadoXmlOut.replace("<ESTATUS>", estatusPeticion.toString()) : resultadoXmlOut;
        return XmlUtils.getCleanXml(respuesta);
    }

    public String obtenerRespuesta(String cadena, String idPeticion) throws Exception {
//        LOG.info("PARSEANDO RESPUESTA: " + cadena);

        String cadenaNormalizada = normalizaCadenaCTG(cadena);
        String[] arreglo = cadenaNormalizada.split("\\|");

        if ((arreglo != null) && (arreglo.length > 0) && arreglo[0] != null) {
            ctgParamsSplit(arreglo);
            char respType = arreglo[0].charAt(arreglo[0].length() - 1);
            if (respType == 'F') {
                Element rootElement = ctgParamsSplitAndParse("RespuestaError");
                Document doc = new Document(rootElement);

                return agregarIdPeticion(new XMLOutputter().outputString(doc), idPeticion);
            }
            if (respType == 'E') {
                Element rootElement = ctgParamsSplitAndParse("RespuestaOK");
                Document doc = new Document(rootElement);

                Element elemento = doc.getRootElement().getChild("MENSAJE");
                if (elemento != null) {
                    List compara = elemento.getContent();
                    if ((compara.get(0).equals("")) || (compara.get(0).equals("EXITO"))) {
                        Text t = new Text("PG010 CONSULTA EXITOSA");
                        elemento.removeContent();
                        elemento.addContent(t);
                    }
                }
                return agregarIdPeticion(new XMLOutputter().outputString(doc), idPeticion);
            }
        } else {
            StringBuilder adecuacion = new StringBuilder();
            adecuacion.append("<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soapenc=\"http://schemas.xmlsoap.org/soap/encoding/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">");
            adecuacion.append("<soapenv:Header/>");
            adecuacion.append("<soapenv:Body>");
            adecuacion.append("<p875:ejecutaServicioResponse xmlns:p875=\"http://servicios.web.m2k.sds.telcel.com\">");
            adecuacion.append("<ejecutaServicioReturn><![CDATA[<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><RespuestaError><returnCode>200</returnCode><DescripcionError>Existe un error de comunicacion con CTG ThrowableExceptionRemoteException occurred in server thread; nested exception is:");
            adecuacion.append("java.rmi.RemoteException: ; nested exception is:");
            adecuacion.append("javax.resource.spi.CommException: CTG9630E IOException occurred in communication with CICS</DescripcionError></RespuestaError>]]></ejecutaServicioReturn>");
            adecuacion.append("</p875:ejecutaServicioResponse>");
            adecuacion.append("</soapenv:Body>");
            adecuacion.append("</soapenv:Envelope>");
            return XmlUtils.getCleanXml(adecuacion.toString());
        }
        return cadena;
    }

    private Element ctgParamsSplitAndParse(String rootElementName, String[] arreglo) throws Exception {
        Element rootElement = new Element(rootElementName);
        boolean init = true;
        for (String token : arreglo) {
            if (init) {
                init = false;
                continue;
            }
            if (!token.contains(":")) {
                break;
            }
            String[] data = token.split(":");
            if (StringUtils.isNotBlank(data[0])) {
                Element temp = new Element(data[0].trim().replaceAll("[^\\x20-\\x7e]", "_").replace(" ", "_"));
                if (data.length == 1) {
                    temp.addContent("");
                } else if (data.length == 2) {
                    String tempData = StringUtils.isNotBlank(data[1]) ? data[1] : " ";
                    temp.addContent(tempData);
                } else if (data.length > 2) {
                    StringBuilder sb = new StringBuilder();
                    String prefix = "";
                    for (int iData = 1; iData < data.length; iData++) {
                        sb.append(prefix).append(data[iData]);
                        prefix = ":";
                    }
                    if (sb.length() == 0) {
                        sb.append(" ");
                    }
                    temp.addContent(sb.toString());
                } else {
                    continue;
                }
                rootElement.addContent(temp);
            }
        }
        return rootElement;
    }

    private Element ctgParamsSplitAndParse(String rootElementName) throws Exception {
        Element rootElement = new Element(rootElementName);
        for (String[] data : dataList) {
            Element temp = new Element(data[0]);
            temp.addContent(data[1]);
            rootElement.addContent(temp);
        }
        return rootElement;
    }

    public List<String[]> ctgParamsSplit(String cadena) {
        String cadenaNormalizada = normalizaCadenaCTG(cadena);
        String[] arreglo = cadenaNormalizada.split("\\|");
        return ctgParamsSplit(arreglo);
    }

    public List<String[]> ctgParamsSplit(String[] arreglo) {
        dataList = new ArrayList<>();
        StringBuilder sbTokens = new StringBuilder();
        boolean init = true;
        for (String token : arreglo) {
            if (init) {
                sbTokens.append(token);
                init = false;
                continue;
            }
            if (!token.contains(":")) {
                break;
            }
            String[] data = token.split(":");
            if (!data[0].trim().equals("")) {
                data[0] = data[0].trim().replaceAll("[^\\x20-\\x7e]", "_").replace(" ", "_");
                if (data.length == 1) {
                    data = new String[]{data[0], ""};
                } else if (data.length == 2) {
                    data[1] = StringUtils.isNotEmpty(data[1]) ? data[1] : " ";
                } else if (data.length > 2) {
                    StringBuilder sbTempData = new StringBuilder();
                    String prfx = "";
                    for (int iData = 1; iData < data.length; iData++) {
                        sbTempData.append(prfx).append(data[iData]);
                        prfx = ":";
                    }
                    if (sbTempData.length() == 0) {
                        sbTempData.append(" ");
                    }
                    data = new String[]{data[0], sbTempData.toString()};
                } else {
                    continue;
                }
                sbTokens.append(" ").append(data[0]).append(" ").append(data[1]);
                dataList.add(data);
            }
        }
        cleanCTG = sbTokens.toString();
        return dataList;
    }

    public List<String[]> getDataList() {
        return dataList;
    }

    public String getCleanCTG() {
        return cleanCTG;
    }

}
