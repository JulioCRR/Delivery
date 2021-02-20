/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util;

import com.lowagie.text.DocumentException;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfSignatureAppearance;
import com.lowagie.text.pdf.PdfStamper;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.SignatureException;
import java.security.UnrecoverableKeyException;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
@Service
public class SignatureFile {

    private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(Service.class);

    public static final String PASSWORD_CERT = "XswxsW";

    @Value(value = "classpath:ia.p12")
    private Resource certP12;

    public void signFile(ByteArrayOutputStream inputFile, ByteArrayOutputStream outputStream) {
        try {

            KeyStore ks = KeyStore.getInstance("pkcs12");
            ks.load(certP12.getInputStream(), PASSWORD_CERT.toCharArray());
            String alias = (String) ks.aliases().nextElement();
            PrivateKey key = (PrivateKey) ks.getKey(alias, PASSWORD_CERT.toCharArray());
            Certificate[] chain = ks.getCertificateChain(alias);
            // Recibimos como parámetro de entrada el nombre del archivo PDF a firmar
            PdfReader reader = new PdfReader(inputFile.toByteArray());
//            FileOutputStream fout = new FileOutputStream("RUTA_ARCHIVO_PDF_FIRMADO");

            // Añadimos firma al documento PDF
            PdfStamper stp = PdfStamper.createSignature(reader, outputStream, '?');
            PdfSignatureAppearance sap = stp.getSignatureAppearance();
            sap.setCrypto(key, chain, null, PdfSignatureAppearance.WINCER_SIGNED);
            sap.setReason("Firma PKCS12");
            sap.setLocation("Telcel Signature");
            // Añade la firma visible. Podemos comentarla para que no sea visible.
            sap.setVisibleSignature(new Rectangle(100, 100, 400, 200), 1, null);
            stp.close();
        } catch (DocumentException | IOException | KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException | CertificateException e) {
            LOG.error("Error firmando pdf", e);
        }

    }

    public String signText(String text) {
        try {
            byte[] byteText = text.getBytes("UTF-8");
            KeyStore ks = KeyStore.getInstance("pkcs12");
            ks.load(certP12.getInputStream(), PASSWORD_CERT.toCharArray());
            String alias = (String) ks.aliases().nextElement();
            PrivateKey key = (PrivateKey) ks.getKey(alias, PASSWORD_CERT.toCharArray());

            Signature sig = Signature.getInstance("MD5WithRSA");
            sig.initSign(key);
            sig.update(byteText);
            byte[] signature = sig.sign();

            return Base64.encodeBase64String(signature);
//            return new String(signature, "UTF-8");
        } catch (IOException | InvalidKeyException | KeyStoreException | NoSuchAlgorithmException | SignatureException | UnrecoverableKeyException | CertificateException ex) {
            LOG.error("Error firmando texto", ex);
            return null;
        }
    }

    public boolean verifyText(String text, String signature) {
        try {
            byte[] byteText = text.getBytes("UTF-8");
            byte[] byteSignature = Base64.decodeBase64(signature);
            KeyStore ks = KeyStore.getInstance("pkcs12");
            ks.load(certP12.getInputStream(), PASSWORD_CERT.toCharArray());

            String alias = (String) ks.aliases().nextElement();
            PublicKey key = ks.getCertificate(alias).getPublicKey();

            Signature sig = Signature.getInstance("MD5WithRSA");
            sig.initVerify(key);
            sig.update(byteText);

            return sig.verify(byteSignature);
        } catch (IOException | InvalidKeyException | KeyStoreException | NoSuchAlgorithmException | SignatureException | CertificateException ex) {
            LOG.error("Error verificando text", ex);
            return false;
        }
    }

}
