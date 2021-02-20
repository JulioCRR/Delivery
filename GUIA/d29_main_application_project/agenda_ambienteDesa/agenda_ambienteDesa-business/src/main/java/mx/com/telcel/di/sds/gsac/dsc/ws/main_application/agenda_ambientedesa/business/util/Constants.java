package mx.com.telcel.di.sds.gsac.dsc.ws.main_application.agenda_ambientedesa.business.util;



public class Constants {
    
    

    public static final String BASE_NAME = "agenda-ambiente";
    public static final String BASE_NAME_PATH = BASE_NAME + "/";
    
   

    public static final String MAIL_TEMPLATE_AGENDA = "agenda_ambienteDesa/mail_template_agendaDesa.html";
    public static final String TABLA_TEMPLATE = "agenda_ambienteDesa/datosAgenda";
  
    
    public static final String MAIL_SUBJECT = "Confirmación de ambiente de desarrollo WS-M2K.";
    public static final String ENCODING = "UTF-8";
    public static final String HTML_SUBJECT_TITLE = "Ambiente de desarrollo WS-M2K";
    public static final String MSJ_DETALLE = "Detalle de la solicitud";
    public static final String ENDPOINT_DESA = "http://191.9.3.120:9088/telcel-ws-web-1.0.0-Telcel-01/services/ControlWebService";

    public static final String SUBJETCT = "Error de conexion via FTP-Desarrollo";
    public static final String MSJ_INFORMATIVO = "Ocurrio un error en la conexion ftp para crear el archivo peticiones.properties en el ambiente de desarrollo WS-M2K.";
   
    // template del mail
    
    public static final String HTML_DATOS_PETICION = "#DATOS_PETICION";
    
    //perfil Administrador
    public static final int ID_PERFIL = 1;
    
    //archivo propeties
   
     public static final String ARCHIVO_PROPER = "peticiones.properties";
       
     public static final String PROYECTO = "#PROYECTO";
     public static final String USUARIO = "#USUARIO";
     public static final String TELEFONO = "#TELEFONO";
     public static final String IPS = "#IPS";

     public static final String TRANSACCIONES = "#TRANSACCIONES";
     public static final String FECHA_INICIO = "#FECHAINICIO";
     public static final String FECHA_FINAL = "#FECHAFINAL";
     public static final String COMENTARIOS = "#COMENTARIOS";
     public static final String URL_DESA = "#URLDESA";
     public static final String SOPORTE = "#SOPORTE";
  
        
  
    //Politica del soporte
    
    public static final String POLITICA= "El soporte estará bajo demanda y soló será en horario laboral, "
            + "cualquier cosa después de ese horario se revisar al siguiente día hábil. Si se presenta "
            + "alguna duda sobre el servicio favor de contactarnos al correo grupal.";
    
    // validacion de header del calendario para extraer la bitacora solo del mes indicado
    
    public static final String ENERO = "enero";
    public static final String FEBRERO = "febrero";
    public static final String MARZO = "marzo";
    public static final String ABRIL = "abril";
    public static final String MAYO = "mayo";
    public static final String JUNIO = "junio";
    public static final String JULIO = "julio";
    public static final String AGOSTO = "agosto";
    public static final String SEP = "septiembre";
    public static final String OCT = "octubre";
    public static final String NOV = "noviembre";
    public static final String DIC = "diciembre";
    
     

}
