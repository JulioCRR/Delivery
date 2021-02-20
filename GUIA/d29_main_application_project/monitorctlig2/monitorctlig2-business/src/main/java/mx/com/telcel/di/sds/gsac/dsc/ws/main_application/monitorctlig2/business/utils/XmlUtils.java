package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.monitorctlig2.business.utils;

import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;

public class XmlUtils {

	
	public static String getXmlPropertyValue(String xml, String property) throws Exception {
		
		String propertyValue = null;
		
		// Xpath factory
        XPath xPath = XPathFactory.newInstance().newXPath();

        // Parse Root Response Service
        DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
		
		// Parse Response ejecutaServicio
        InputSource inEjec = new InputSource();
        inEjec.setCharacterStream(new StringReader(xml));
        Document responseServiceXML = db.parse(inEjec);
		
        propertyValue = xPath.compile("/*/"+property+"/text()").evaluate(responseServiceXML);
        
        return propertyValue;
	}
	
}
