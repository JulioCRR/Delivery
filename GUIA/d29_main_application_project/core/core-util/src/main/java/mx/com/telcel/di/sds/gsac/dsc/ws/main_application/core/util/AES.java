/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.core.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import org.apache.tomcat.util.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Alan Arturo Hernandez Chichitz <alan.chichitz@mail.telcel.com>
 */
public class AES {

    private static final Logger LOG = LoggerFactory.getLogger(AES.class);

    private SecretKeySpec secretKey;
    private byte[] key;

    public void setKey(String myKey) {

        MessageDigest sha = null;
        try {
            key = myKey.getBytes("UTF-8");
            sha = MessageDigest.getInstance("SHA-1");
            key = sha.digest(key);
            key = Arrays.copyOf(key, 16); // use only first 128 bit
            secretKey = new SecretKeySpec(key, "AES");

        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            LOG.error("Error asignado clave de ida ", e);
        }
        // TODO Auto-generated catch block

    }

    public String encrypt(String strToEncrypt) {
        try {
            Cipher cipher = Cipher.getInstance("AES");

            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] bytes = strToEncrypt.getBytes("UTF-8");
            byte[] cipherBytes = cipher.doFinal(bytes);

            return Base64.encodeBase64String(cipherBytes);

        } catch (Exception e) {
            LOG.error("Error while encrypting: ", e);
            return null;
        }

    }

    public String decrypt(String strToDecrypt) {
        try {
            Cipher cipher = Cipher.getInstance("AES");

            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            return new String(cipher.doFinal(Base64.decodeBase64(strToDecrypt)));

        } catch (Exception e) {

            LOG.error("Error while decrypting: ", e);
            return null;
        }

    }
}
