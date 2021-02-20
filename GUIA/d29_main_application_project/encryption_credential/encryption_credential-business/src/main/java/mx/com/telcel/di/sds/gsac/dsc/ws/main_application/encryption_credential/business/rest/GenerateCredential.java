/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.encryption_credential.business.rest;

import java.io.ByteArrayOutputStream;
//import com.ibm.ctg.client.ECIRequest;
import com.ibm.ctg.client.ECIReturnCodes;
//import java.io.UnsupportedEncodingException;
//import java.io.File;
//import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.CredentialCrypt;
import java.util.HashMap;
import java.util.Map;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.business.init.BusinessConstants;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.session.UserSession;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.AES;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util.SignatureFile;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import org.joda.time.LocalDateTime;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.ApplicationHome;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.db.model.PruebaCtg;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.utils.UtilidadesCTGImp;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.socket.CtgConector;
import mx.com.telcel.di.sds.gsac.dsc.ws.main_application.ctg.execution.business.dao.CtgExecutionDao;
//import org.apache.tomcat.util.codec.binary.Base64;
/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@RestController
public class GenerateCredential {

    private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(GenerateCredential.class);

    private static final String DEFAULT_KEY = "Xsw2xsw!";

    @Autowired
    private UserSession userSession;

    @Autowired
    private SignatureFile signatureFile;
    
    @Autowired
    CtgExecutionDao ctgExecutionDao;
    
    @Autowired
    CtgConector conectorCTG;

    @Value(value = "classpath:encription_credential_format.jasper")
    private Resource usuarioReloadTxt;

    @Value(value = "classpath:logo_blue.png")
    private Resource imageLogo;
    
    @Value(value = "classpath:logo_blue_white.png")
    private Resource imageLogoWhite;

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "generate-token-pdf", method = RequestMethod.POST, headers = "content-type=application/x-www-form-urlencoded")
    public ResponseEntity<byte[]> generateTokenPdf(@ModelAttribute CredentialWrapper cw) {

        try {
             // retrieve contents of "C:/tmp/report.pdf" that were written in showHelp
            String date = LocalDateTime.now().toString("yyMMddHHmmss");
            cw.setKey(date);
            AES aesPass = new AES();
            aesPass.setKey(cw.getKey());
            AES aesKey = new AES();
            aesKey.setKey(DEFAULT_KEY);

            HashMap<String, Object> parametersMap = new HashMap();
            String clave = aesPass.encrypt(cw.getPassword()).concat("|").concat(aesKey.encrypt(cw.getKey().concat("T")));
            String user = userSession.getSessionData().getUser().getNEmpleado();
            String signature = clave.concat("|").concat(userSession.getSessionData().getUser().getNEmpleado()).concat("|").concat(date);
            signature = signatureFile.signText(signature);
            parametersMap.put("clave", clave);
            parametersMap.put("message", "Proceso generado por el usuario <b>" + user + "</b>."
                    + "<br/><br/>"
                    + "Esta clave deberá ser ingresada en la configuración del WAS para realizar la autenticación correctamente.");
            parametersMap.put("footer", "SUBDIRECCIÓN DE DESARROLLO DE SOFTWARE <br/>"
                    + "Radiomovil DIPSA S.A. de C.V. Lago Zurich No 245, Edificio Telcel<br/>"
                    + "Col. Ampliación Granada, Delegación Miguel Hidalgo, C.P. 11529, México D.F.<br/>"
                    + "<br/>"
                    + "Uso Interno – Confidencial");
            //parametersMap.put("image_path", imageLogo.getFile().getAbsolutePath());
            parametersMap.put("user", user);
            parametersMap.put("date", date);
            parametersMap.put("signature", signature);
           
            String filename = "credentials-of-" + userSession.getSessionData().getUser().getNEmpleado() + ".pdf";
            String archivoJasper = "/home/ctgm2k/common-projects/encription_credential_format.jasper";
            //String archivoJasper = "D:/encription_credential_format.jasper";
            //byte[] contents = generateJasperReportPDF(usuarioReloadTxt.getFile().getAbsolutePath(), parametersMap, filename);
            byte[] contents = generateJasperReportPDF(archivoJasper, parametersMap, filename);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/pdf"));

//            headers.setContentDispositionFormData("attachment;", filename);
            headers.add("Content-Disposition", "inline; filename=" + filename);
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);

            return response;
        } catch (Exception ex) {
            LOG.error("Exception", ex);
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @RequestMapping(value = BusinessConstants.BASE_PATH_REST + "validate-token-pdf", method = RequestMethod.POST)
    public ResponseEntity<String> validateTokenPdf(@RequestBody CredentialValidationWrapper cvw) {
        String passwordM2k = dencryptPass(cvw.getClave());
        String user = userSession.getSessionData().getUser().getNEmpleado();
        String message;
        boolean error = true;
        PruebaCtg prueba = new PruebaCtg();
        prueba.setUsuario(cvw.getUsuarioM2k().toUpperCase());
        prueba.setPassword(passwordM2k);
        //prueba.setRegion("R09");
        prueba.setRegion(cvw.getRegionM2k());
        prueba.setCadena("C         5555555555");
        prueba.setAmbiente("P");
        prueba.setTransaccion("I*YA");
        prueba.setPrograma("IGTOC0M");
        cvw.setUsuario(user);

        try {
            UtilidadesCTGImp respuesta = conectorCTG.ejecutaProgramaCTG(prueba);

            if (respuesta != null) {
                if (respuesta.getReq().getRc() != ECIReturnCodes.ECI_ERR_NO_CICS) {
                    if (respuesta.getReq().getRc() != ECIReturnCodes.ECI_ERR_SECURITY_ERROR) {
                        message = "{\"value\": " + signatureFile.verifyText(cvw.getToValidate(), cvw.getSignature()) + "}";
                        error = false;

                    } else {
                        message = "Usuario o contraseña de conexión a M2K no es correcta.";
                    }
                } else {
                    message = "No se pudo validar el usuario. Error en comunicación";
                }
            } else {
                message = "No se pudo validar el usuario";
            }
        } catch (Exception ex) {
            message = "ERROR al validar el usuario.";
            LOG.error(message, ex);
        }
        if (error) {
            LOG.error(message);
            message = "{\"message\": \"" + message + "\"}";
        }
        //ResponseEntity<String> response = new ResponseEntity<>("{\"value\": " + signatureFile.verifyText(cvw.getToValidate(), cvw.getSignature()) + "}", HttpStatus.OK);

        return new ResponseEntity<>(message, HttpStatus.OK);
        
    }

    public byte[] generateJasperReportPDF(String reportLocation, Map parameters, String fileName) throws Exception {
        JRPdfExporter exporter = new JRPdfExporter();
        ByteArrayOutputStream outputStreamJasper = new ByteArrayOutputStream();
        ByteArrayOutputStream outputStreamSigned = new ByteArrayOutputStream();

//            JasperReport jasperReport = JasperCompileManager.compileReport(reportLocation);
        JasperPrint jasperPrint = JasperFillManager.fillReport(reportLocation, parameters, new JREmptyDataSource(1));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStreamJasper));
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.exportReport();
//        signatureFile.signFile(outputStreamJasper, outputStreamSigned);
        return outputStreamJasper.toByteArray();

    }
    
     public String dencryptPass(String passEncryptor) {
        try {
            String[] passArr = passEncryptor.split("\\|");
            String password = passArr[0];
            String clave = passArr[1];

            AES aesKey = new AES();
            aesKey.setKey(DEFAULT_KEY);
            clave = aesKey.decrypt(clave);

            AES aesPasswrod = new AES();
            aesPasswrod.setKey(clave.substring(0, clave.length() - 1));
            password = aesPasswrod.decrypt(password);

            return password;
        } catch (Exception ex) {
            LOG.error(null, ex);
            return null;
        }


}
}