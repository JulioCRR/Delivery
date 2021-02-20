/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.Properties;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.common.CoreUtilConstants;
import org.springframework.core.io.ClassPathResource;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
public class CoreFunctions {

    private static final String ENCODING_UTF8 = "UTF-8";
    private static String htmlMailTemplate;

    public static String formatXML(String input) {
        if (isNullOrEmpty(input)) {
            return null;
        }
        try {
            Transformer transformer = TransformerFactory.newInstance()
                    .newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty(
                    "{http://xml.apache.org/xslt}indent-amount", "3");

            StreamResult result = new StreamResult(new StringWriter());
            DOMSource source = new DOMSource(parseXml(input));
            transformer.transform(source, result);
            return result.getWriter().toString();
        } catch (ParserConfigurationException | SAXException | IOException | IllegalArgumentException | TransformerException e) {
            return input;
        }
    }

    private static Document parseXml(String in) throws ParserConfigurationException, SAXException, IOException {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        InputSource is = new InputSource(new StringReader(in));
        return db.parse(is);
    }

    public static String getXmpProperty(String name) {
        return getClassPathResourceProperty(CoreUtilConstants.RSC_XMP, name);

    }

    public static String getWSDLProperty(String name) {
        return getClassPathResourceProperty(CoreUtilConstants.RSC_WSDL, name);
    }

    public static String getApplicationProperty(String name) {
        return getClassPathResourceProperty(CoreUtilConstants.RSC_APPLICATION, name);
    }

    public static String getJMSProperty(String name) {
        return getClassPathResourceProperty(CoreUtilConstants.RSC_JMS_CONFIG, name);
    }

    public static String getMailTemplate() {
        if (htmlMailTemplate == null) {
            synchronized (CoreFunctions.class) {
                String template = getClassPathResourceAsString(CoreUtilConstants.RSC_TMPL_MAIL_TEMPLATE, true);
                if (isNullOrEmpty(template)) {
                    return null;
                }

                Properties prop = getClassPathResourceAsProperties(CoreUtilConstants.RSC_MAIL_CONFIG);
                if (prop == null) {
                    return null;
                }

                htmlMailTemplate = template
                        .replace(CoreUtilConstants.HTML_BACKGROUND_PRINCIPAL, prop.getProperty(CoreUtilConstants.PROP_MAIL_TMPL_BACKGROUND_LOGO_URL, ""))
                        .replace(CoreUtilConstants.HTML_TELCEL_LOGO, prop.getProperty(CoreUtilConstants.PROP_MAIL_TMPL_TELCEL_LOGO_URL, ""));
            }
        }
        return htmlMailTemplate;
    }

    public static String getMailTemplate(String subjectTitle, String dataTitle, String data, String footerNote) {
        String template = getMailTemplate();
        if (template == null) {
            return null;
        }
        return template.replace(CoreUtilConstants.HTML_SUBJECT_TITLE, isNullOrEmpty(subjectTitle) ? "" : subjectTitle)
                .replace(CoreUtilConstants.HTML_DATA_TITLE, isNullOrEmpty(dataTitle) ? "" : dataTitle)
                .replace(CoreUtilConstants.HTML_DATA, isNullOrEmpty(data) ? "" : data)
                .replace(CoreUtilConstants.HTML_FOOTER_NOTE, isNullOrEmpty(footerNote) ? "" : footerNote);
    }

    public static String getClassPathResourceProperty(final String resource, final String name) {
        if (isNullOrEmpty(resource) || isNullOrEmpty(name)) {
            return null;
        }
        Properties prop = getClassPathResourceAsProperties(resource);
        if (prop == null) {
            return null;
        }
        return prop.getProperty(name);
    }

    public static Properties getClassPathResourceAsProperties(final String resource) {
        if (isNullOrEmpty(resource)) {
            return null;
        }
        try (InputStream input = new ClassPathResource(resource).getInputStream()) {
            Properties prop = new Properties();
            prop.load(input);
            return prop;
        } catch (Exception ex) {
            return null;
        }
    }

    public static String getClassPathResourceAsString(final String resource) {
        return getClassPathResourceAsString(resource, false);
    }

    public static String getClassPathResourceAsString(final String resource, boolean trim) {
        if (isNullOrEmpty(resource)) {
            return null;
        }
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(
                (new ClassPathResource(resource)).getInputStream(), ENCODING_UTF8))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                if (trim) {
                    line = line.trim();
                }
                sb.append(line).append(System.lineSeparator());
            }
            reader.close();
            return sb.toString();
        } catch (Exception ex) {
            return null;
        }
    }

    public static boolean isNullOrEmpty(String input) {
        return (input == null || input.trim().isEmpty());
    }
}
