/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util;

import java.io.UnsupportedEncodingException;
import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
public class CredentialCrypt {

    private static final String DEFAULT_KEY = "Xsw2xsw!";
    private static final String DEFAULT_CHARACTER = "T";

    private static final Logger LOG = LoggerFactory.getLogger(CredentialCrypt.class);

    public String encryptPass(String pass, String key) {
        AES aesPass = new AES();
        aesPass.setKey(key);
        AES aesKey = new AES();
        aesKey.setKey(DEFAULT_KEY);

        String clave = aesPass.encrypt(pass).concat("|").concat(aesKey.encrypt(key.concat(DEFAULT_CHARACTER)));
        return clave;

    }

    public String dencryptPass(String passEncryptor) {
        try {
            String[] passArr = passEncryptor.split("\\|");
            String password = passArr[0];
            String clave = passArr[1];

            byte[] decoded = Base64.decodeBase64(clave);
            clave = new String(decoded, "UTF-8");
            AES aesKey = new AES();
            aesKey.setKey(DEFAULT_KEY);
            clave = aesKey.decrypt(clave);

            decoded = Base64.decodeBase64(password);
            password = new String(decoded, "UTF-8");
            AES aesPasswrod = new AES();
            aesPasswrod.setKey(clave.substring(0, clave.length() - 1));
            password = aesPasswrod.decrypt(password);

            return password;
        } catch (UnsupportedEncodingException ex) {
            LOG.error(null, ex);
            return null;
        }

    }
}
