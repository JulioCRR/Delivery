/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.ls.DOMImplementationLS;
import org.w3c.dom.ls.LSSerializer;
import org.xml.sax.InputSource;

/**
 *
 * @author Ing. Julio Cesar Lechuga Lira <cesar.lechuga@mail.telcel.com>
 */
public class XmlUtils {
 
    public static String getCleanXml(String xml) throws Exception {
		
        String xmlClean = null;
//        System.out.println("XML entrada " + xml);
        // Parse Root Response Service
        DocumentBuilder db = DocumentBuilderFactory.newInstance()
                        .newDocumentBuilder();

        InputSource inEjec = new InputSource();
        inEjec.setCharacterStream(new StringReader(XmlUtils.trimXml(xml)));
        Document responseServiceXML = db.parse(inEjec);

        xmlClean = XmlUtils.getFormattedXml(responseServiceXML);
//        System.out.println("Clean XML " + xmlClean);
        return xmlClean;
    }

    private static String getFormattedXml(Document xml) throws Exception {

            String formatedXML = null;
            StringWriter buf = new StringWriter();

            Transformer xform = TransformerFactory.newInstance().newTransformer();
            xform.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");
            xform.setOutputProperty(OutputKeys.INDENT, "yes");
            //xform.setOutputProperty(OutputKeys.INDENT, "no");
            xform.transform(new DOMSource(xml), new StreamResult(buf));
            formatedXML = buf.toString();

            return formatedXML;
    }

    public static String trimXml(String input) {
        BufferedReader reader = new BufferedReader(new StringReader(input));
        StringBuffer result = new StringBuffer();
        try {
            String line;
            while ( (line = reader.readLine() ) != null)
                result.append(line.trim());
            return result.toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    
}
