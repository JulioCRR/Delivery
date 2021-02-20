package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.operation;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import org.apache.commons.net.ftp.FTPClient;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


 @Service
public class SessionFactoryFtp implements Runnable {

    private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(SessionFactoryFtp.class);
   
    FTPClient ftpClient = new FTPClient();

    private static String hostDesa;
    private static String userFtpDesa;
    private static int portFtp;
    private static String passwordFtp;
    private int intentos = 3;

   
    public boolean getConfFtp() {
            boolean conexion = false;
            try {
                ftpClient.connect(SessionFactoryFtp.hostDesa, SessionFactoryFtp.portFtp);
                ftpClient.login(SessionFactoryFtp.userFtpDesa, SessionFactoryFtp.passwordFtp);
                ftpClient.enterLocalPassiveMode();
                return true;
            } catch (IOException ex) {
                intentos--;
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ex1) {}
                while (intentos > 0) {
                    LOG.info("CONTEO DE RECONEXION " + intentos);
                    if (this.getConfFtp()) {
                        return true;
                    }
                }
                LOG.error("ERROR EN LA CONEXION VIA FTP " + ex); 
            }
            return conexion;    
    }

    public void logoOut()throws IOException{
        ftpClient.logout();
    }
    
    public void closeFtp() throws IOException{
        ftpClient.disconnect();
    }
    
    public void enviarArchivoFtp(String secondRemoteFile, ByteArrayInputStream input ) throws IOException{
        ftpClient.storeFile(secondRemoteFile, input);
    }

    public String getHostDesa() {
        return hostDesa;
    }

    public void setHostDesa(String hostDesa) {
        SessionFactoryFtp.hostDesa = hostDesa;
    }

    public String getUserFtpDesa() {
        return userFtpDesa;
    }

    public void setUserFtpDesa(String userFtpDesa) {
        SessionFactoryFtp.userFtpDesa = userFtpDesa;
    }

    public int getPortFtp() {
        return portFtp;
    }

    public void setPortFtp(int portFtp) {
        SessionFactoryFtp.portFtp = portFtp;
    }

    public String getPasswordFtp() {
        return passwordFtp;
    }

    public void setPasswordFtp(String passwordFtp) {
        SessionFactoryFtp.passwordFtp = passwordFtp;
    }

    @Override
    public void run() {
      this.getConfFtp();
    }
    
    
}
